import { ClipboardList } from "lucide-react";

export default function BaristaPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-brand-bg-dark">
      <div className="flex items-center gap-3 mb-4">
        <ClipboardList size={32} strokeWidth={1} className="text-brand-primary" />
        <h1 className="font-serif text-3xl text-white">Barista Queue</h1>
      </div>
      <p className="text-stone-400 text-center max-w-md">
        Live order queue coming soon.
      </p>
    </div>
  );
}
