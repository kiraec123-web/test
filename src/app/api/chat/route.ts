// src/app/api/chat/route.ts
// POST /api/chat — streams a Claude response for the NYC coffee shop cashier.
//
// This module runs server-side only. The ANTHROPIC_API_KEY is never exposed
// to the client bundle.

if (typeof window !== "undefined") {
  throw new Error(
    "[api/chat] This module must only run on the server. " +
      "Do not import it from client-side code.",
  );
}

import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "@/lib/system-prompt";

// Instantiated once at module scope (singleton per serverless instance).
// Reads ANTHROPIC_API_KEY from process.env automatically.
const anthropic = new Anthropic();

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ─── Route Handler ───────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<Response> {
  // ── Parse body ────────────────────────────────────────────────────────────
  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body?.messages;
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  // ── Validate messages ─────────────────────────────────────────────────────
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      "messages must be a non-empty array of {role, content} objects",
      { status: 400 },
    );
  }

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== "user") {
    return new Response(
      "last message must have role 'user'",
      { status: 400 },
    );
  }

  // ── Stream response ───────────────────────────────────────────────────────
  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        const stream = anthropic.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: getSystemPrompt(),
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            // SSE format: "data: <payload>\n\n"
            const payload = JSON.stringify({ text: event.delta.text });
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          }
        }

        // Signal end of stream
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch {
        // Return a plain 500 — no stack traces, no Anthropic error details
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: "Internal server error" })}\n\n`,
          ),
        );
        controller.close();
      }
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no", // disable nginx buffering for SSE
    },
  });
}
