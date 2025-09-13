"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDashboardKPI, formatCurrency } from "@/lib/data";

const kpiData = [
  {
    title: "Total Pasien",
    value: mockDashboardKPI.totalPatients.toLocaleString(),
    change: "+12 bulan ini",
    icon: "👥",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Pasien Baru Hari Ini",
    value: mockDashboardKPI.newPatientsToday.toString(),
    change: "dari target 5",
    icon: "✨",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Appointment Hari Ini",
    value: mockDashboardKPI.appointmentsToday.toString(),
    change: "sudah dikonfirmasi",
    icon: "📅",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Pendapatan Hari Ini",
    value: formatCurrency(mockDashboardKPI.revenueToday),
    change: "+18.5% vs kemarin",
    icon: "💰",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Pendapatan Bulan Ini",
    value: formatCurrency(mockDashboardKPI.revenueThisMonth),
    change: "85% dari target",
    icon: "📈",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Member Growth",
    value: `+${mockDashboardKPI.membershipGrowth}%`,
    change: "bulan ini",
    icon: "⭐",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {kpi.title}
            </CardTitle>
            <div className={`w-8 h-8 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
              <span className="text-lg">{kpi.icon}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div>
                <div className={`text-2xl font-bold ${kpi.color}`}>
                  {kpi.value}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {kpi.change}
                </p>
              </div>
              {(kpi.title.includes("Pendapatan") || kpi.title.includes("Growth")) && (
                <Badge variant="secondary" className="text-xs">
                  📊 Trending
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}