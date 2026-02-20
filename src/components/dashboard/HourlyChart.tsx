"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HourlyData {
  hour: string;
  orders: number;
  revenue: number;
}

export default function HourlyChart({ data }: { data: HourlyData[] }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-4 md:p-5 shadow-sm">
      <h3 className="font-serif text-lg text-brand-text mb-4">Orders by Hour</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 12, fill: "#78716C" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#78716C" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E7E5E4",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="orders" fill="#B45309" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
