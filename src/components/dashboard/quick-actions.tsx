"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickActions = [
  {
    title: "Booking Baru",
    description: "Buat appointment pasien",
    icon: "📅",
    href: "/services/booking/new",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Daftar Pasien Baru",
    description: "Registrasi pasien baru",
    icon: "👤",
    href: "/patients/register",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Check-in Pasien",
    description: "Pasien datang klinik",
    icon: "🚪",
    href: "/patients/visits/checkin",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Pembayaran",
    description: "Proses pembayaran",
    icon: "💳",
    href: "/finance/payments",
    color: "bg-emerald-500 hover:bg-emerald-600",
  },
  {
    title: "Stok Obat",
    description: "Cek inventaris",
    icon: "📦",
    href: "/inventory/medicines",
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    title: "Laporan Harian",
    description: "Summary hari ini",
    icon: "📊",
    href: "/reports/daily",
    color: "bg-pink-500 hover:bg-pink-600",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>⚡</span>
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center space-y-2 text-white border-0 ${action.color} group hover:scale-105 transition-all duration-200`}
              >
                <span className="text-2xl">{action.icon}</span>
                <div className="text-center">
                  <div className="font-semibold text-sm leading-tight">
                    {action.title}
                  </div>
                  <div className="text-xs opacity-90 mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}