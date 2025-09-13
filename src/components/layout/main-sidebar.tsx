"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: "📊",
  },
  {
    id: "patients",
    label: "Manajemen Pasien",
    href: "/patients",
    icon: "👥",
    children: [
      { id: "patient-list", label: "Daftar Pasien", href: "/patients", icon: "📋" },
      { id: "patient-register", label: "Registrasi Baru", href: "/patients/register", icon: "✍️" },
      { id: "patient-visits", label: "Tracking Kunjungan", href: "/patients/visits", icon: "🚪" },
    ]
  },
  {
    id: "services",
    label: "Layanan Klinik",
    href: "/services",
    icon: "💎",
    children: [
      { id: "service-catalog", label: "Katalog Layanan", href: "/services", icon: "📑" },
      { id: "bookings", label: "Booking System", href: "/services/booking", icon: "📅" },
      { id: "staff-assignment", label: "Assignment Staff", href: "/services/staff-assignment", icon: "👨‍⚕️" },
      { id: "commissions", label: "Komisi", href: "/services/commissions", icon: "💰" },
    ]
  },
  {
    id: "inventory",
    label: "Manajemen Inventaris",
    href: "/inventory",
    icon: "📦",
    badge: "3", // Low stock alerts
    children: [
      { id: "medicines", label: "Stok Obat", href: "/inventory/medicines", icon: "💊" },
      { id: "consumables", label: "Bahan Habis Pakai", href: "/inventory/consumables", icon: "🧴" },
      { id: "transactions", label: "Transaksi Stok", href: "/inventory/transactions", icon: "📝" },
      { id: "waste", label: "Manajemen Limbah", href: "/inventory/waste", icon: "🗑️" },
    ]
  },
  {
    id: "membership",
    label: "Sistem Keanggotaan",
    href: "/membership",
    icon: "⭐",
    children: [
      { id: "member-dashboard", label: "Dashboard Member", href: "/membership", icon: "🏆" },
      { id: "loyalty-points", label: "Loyalty Points", href: "/membership/points", icon: "🎯" },
      { id: "birthday-gifts", label: "Birthday Gifts", href: "/membership/birthday-gifts", icon: "🎁" },
      { id: "vouchers", label: "Voucher System", href: "/membership/vouchers", icon: "🎫" },
      { id: "family-benefits", label: "Family Benefits", href: "/membership/family", icon: "👨‍👩‍👧‍👦" },
    ]
  },
  {
    id: "finance",
    label: "Manajemen Keuangan",
    href: "/finance",
    icon: "💳",
    children: [
      { id: "finance-dashboard", label: "Dashboard Keuangan", href: "/finance", icon: "📈" },
      { id: "payments", label: "Pembayaran", href: "/finance/payments", icon: "💸" },
      { id: "invoices", label: "Invoice", href: "/finance/invoices", icon: "🧾" },
      { id: "referrals", label: "Komisi Referral", href: "/finance/referrals", icon: "🤝" },
      { id: "reports", label: "Laporan Keuangan", href: "/finance/reports", icon: "📊" },
    ]
  },
  {
    id: "medical-docs",
    label: "Dokumen Medis",
    href: "/medical-documents",
    icon: "📄",
    children: [
      { id: "prescriptions", label: "Resep Obat", href: "/medical-documents/prescriptions", icon: "💊" },
      { id: "referrals", label: "Surat Rujukan", href: "/medical-documents/referrals", icon: "🏥" },
      { id: "certificates", label: "Surat Keterangan", href: "/medical-documents/certificates", icon: "📋" },
    ]
  },
  {
    id: "admin",
    label: "Sistem Administrasi",
    href: "/admin",
    icon: "⚙️",
    children: [
      { id: "users", label: "User Management", href: "/admin/users", icon: "👤" },
      { id: "employees", label: "Employee Management", href: "/admin/employees", icon: "👷" },
      { id: "calendar", label: "Calendar Events", href: "/admin/calendar", icon: "📅" },
      { id: "broadcast", label: "Broadcast Messages", href: "/admin/broadcast", icon: "📢" },
      { id: "settings", label: "System Settings", href: "/admin/settings", icon: "🔧" },
    ]
  },
  {
    id: "interactive",
    label: "Fitur Interaktif",
    href: "/interactive",
    icon: "🎮",
    children: [
      { id: "ai-assistant", label: "AI Assistant", href: "/interactive/ai-assistant", icon: "🤖" },
      { id: "spinwheel", label: "Spinwheel Rewards", href: "/interactive/spinwheel", icon: "🎡" },
      { id: "feedback", label: "Kritik & Saran", href: "/interactive/feedback", icon: "💬" },
      { id: "shop", label: "Shopping System", href: "/interactive/shop", icon: "🛒" },
    ]
  },
  {
    id: "reports",
    label: "Laporan & Analisis",
    href: "/reports",
    icon: "📈",
    children: [
      { id: "daily-summary", label: "Summary Harian", href: "/reports/daily", icon: "🌅" },
      { id: "inventory-reports", label: "Laporan Stok", href: "/reports/inventory", icon: "📦" },
      { id: "commission-reports", label: "Laporan Komisi", href: "/reports/commission", icon: "💰" },
      { id: "patient-reports", label: "Laporan Pasien", href: "/reports/patients", icon: "👥" },
    ]
  },
];

export function MainSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["patients", "services"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.href);

    return (
      <div key={item.id} className="space-y-1">
        {hasChildren ? (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal",
              depth > 0 && "ml-4 text-sm",
              active && "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
            )}
            onClick={() => toggleExpanded(item.id)}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {item.badge}
              </Badge>
            )}
            <span className={cn("ml-2 transition-transform", isExpanded && "rotate-90")}>
              ▶️
            </span>
          </Button>
        ) : (
          <Link href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                depth > 0 && "ml-4 text-sm",
                active && "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
              )}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        )}
        
        {hasChildren && isExpanded && (
          <div className="space-y-1 pl-2">
            {item.children!.map(child => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Logo & Title */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">🏥</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Beauty Clinic</h1>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>v1.0.0</span>
          <span>© 2024 Beauty Clinic</span>
        </div>
      </div>
    </div>
  );
}