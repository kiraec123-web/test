import { Coffee } from "lucide-react";

export default function Logo({ size = "default" }: { size?: "small" | "default" }) {
  const iconSize = size === "small" ? 18 : 24;

  return (
    <div className="flex items-center gap-2">
      <Coffee size={iconSize} strokeWidth={1.5} className="text-brand-primary" />
      <span className="font-serif text-lg text-brand-text">NYC Coffee</span>
    </div>
  );
}
