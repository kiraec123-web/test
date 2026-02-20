import { Coffee } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex items-center gap-3 mb-4">
        <Coffee size={32} strokeWidth={1} className="text-brand-primary" />
        <h1 className="font-serif text-3xl text-brand-text">NYC Coffee</h1>
      </div>
      <p className="text-brand-text-muted text-center max-w-md">
        AI-powered ordering at 512 W 43rd St. Chat interface coming soon.
      </p>
    </div>
  );
}
