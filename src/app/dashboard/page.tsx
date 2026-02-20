import { BarChart3 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex items-center gap-3 mb-4">
        <BarChart3 size={32} strokeWidth={1} className="text-brand-primary" />
        <h1 className="font-serif text-3xl text-brand-text">Dashboard</h1>
      </div>
      <p className="text-brand-text-muted text-center max-w-md">
        Owner analytics coming soon.
      </p>
    </div>
  );
}
