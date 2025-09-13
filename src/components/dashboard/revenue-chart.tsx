"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

// Mock data for revenue chart
const revenueData = [
  {
    month: "Jan",
    revenue: 420000000,
    profit: 126000000,
    treatments: 89,
    patients: 156,
  },
  {
    month: "Feb",
    revenue: 380000000,
    profit: 114000000,
    treatments: 78,
    patients: 142,
  },
  {
    month: "Mar",
    revenue: 450000000,
    profit: 135000000,
    treatments: 95,
    patients: 178,
  },
  {
    month: "Apr",
    revenue: 520000000,
    profit: 156000000,
    treatments: 108,
    patients: 189,
  },
  {
    month: "May",
    revenue: 480000000,
    profit: 144000000,
    treatments: 102,
    patients: 167,
  },
  {
    month: "Jun",
    revenue: 550000000,
    profit: 165000000,
    treatments: 115,
    patients: 201,
  },
  {
    month: "Jul",
    revenue: 580000000,
    profit: 174000000,
    treatments: 125,
    patients: 218,
  },
  {
    month: "Aug",
    revenue: 510000000,
    profit: 153000000,
    treatments: 109,
    patients: 185,
  },
  {
    month: "Sep",
    revenue: 490000000,
    profit: 147000000,
    treatments: 104,
    patients: 172,
  },
  {
    month: "Oct",
    revenue: 470000000,
    profit: 141000000,
    treatments: 98,
    patients: 159,
  },
  {
    month: "Nov",
    revenue: 460000000,
    profit: 138000000,
    treatments: 96,
    patients: 154,
  },
  {
    month: "Dec",
    revenue: 485000000,
    profit: 145500000,
    treatments: 101,
    patients: 168,
  },
];

const formatCurrency = (value: number) => {
  return `Rp ${(value / 1000000).toFixed(0)}M`;
};

export function RevenueChart() {
  const currentMonth = revenueData[11]; // December
  const previousMonth = revenueData[10]; // November
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>📈</span>
              <span>Revenue Analytics</span>
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Monthly revenue and profit trends
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={revenueGrowth.startsWith("-") ? "destructive" : "default"}>
              {revenueGrowth.startsWith("-") ? "📉" : "📈"} {revenueGrowth}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Revenue Bulan Ini</p>
            <p className="text-lg font-bold text-blue-600">
              {formatCurrency(currentMonth.revenue)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Profit Bulan Ini</p>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(currentMonth.profit)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Treatments</p>
            <p className="text-lg font-bold text-purple-600">
              {currentMonth.treatments}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Pasien</p>
            <p className="text-lg font-bold text-orange-600">
              {currentMonth.patients}
            </p>
          </div>
        </div>

        {/* Revenue & Profit Line Chart */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Revenue & Profit Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" tickFormatter={formatCurrency} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name === "revenue" ? "Revenue" : "Profit"
                ]}
                labelStyle={{ color: "#666" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Revenue"
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={3}
                name="Profit"
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Treatments & Patients Bar Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Treatments & Patients Volume</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData.slice(-6)}> {/* Last 6 months */}
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                formatter={(value: number, name: string) => [
                  value,
                  name === "treatments" ? "Treatments" : "Patients"
                ]}
              />
              <Legend />
              <Bar
                dataKey="treatments"
                fill="#8b5cf6"
                name="Treatments"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="patients"
                fill="#f97316"
                name="Patients"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}