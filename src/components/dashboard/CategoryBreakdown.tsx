"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface CategoryData {
  name: string;
  value: number;
}

const COLORS = ["#B45309", "#059669", "#2563EB"];

export default function CategoryBreakdown({ data }: { data: CategoryData[] }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-4 md:p-5 shadow-sm">
      <h3 className="font-serif text-lg text-brand-text mb-4">Category Breakdown</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              strokeWidth={2}
              stroke="#FFFFFF"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              formatter={(value) => (
                <span className="text-xs text-brand-text">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
