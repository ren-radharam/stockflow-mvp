"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    name: string;
    quantity: number;
  }[];
}

export function InventoryChart({
  data,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-zinc-900/40
        p-6
        backdrop-blur-xl
      "
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Inventory Analytics
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Product stock overview
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#71717a"
            tickLine={false}
            axisLine={false}
          />

            <Tooltip
            contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "12px",
                color: "#fff",
            }}
            cursor={{
                fill: "rgba(59,130,246,0.1)",
            }}
            />

            <Bar
              dataKey="quantity"
              fill="#3b82f6"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}