"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { formatCurrency, mockDashboardKPI } from "@/lib/data";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("daily");
  const [dateRange, setDateRange] = useState("thisMonth");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock comprehensive reporting data
  const dailySummary = {
    date: new Date("2024-01-20"),
    revenue: 18500000,
    profit: 5550000,
    patients: {
      new: 3,
      returning: 9,
      total: 12
    },
    appointments: {
      scheduled: 15,
      completed: 12,
      cancelled: 2,
      noShow: 1
    },
    treatments: {
      botox: 5,
      facial: 4,
      laser: 2,
      consultation: 1
    },
    staff: {
      doctors: 2,
      nurses: 1,
      therapists: 2
    },
    inventory: {
      lowStock: 3,
      expiring: 1,
      restocked: 2
    }
  };

  const patientDemographics = [
    { ageGroup: "18-25", count: 45, percentage: 18 },
    { ageGroup: "26-35", count: 89, percentage: 36 },
    { ageGroup: "36-45", count: 67, percentage: 27 },
    { ageGroup: "46-55", count: 32, percentage: 13 },
    { ageGroup: "56+", count: 15, percentage: 6 }
  ];

  const treatmentPopularity = [
    { treatment: "Botox Injection", count: 45, revenue: 157500000, color: "#3b82f6" },
    { treatment: "Hydrafacial", count: 38, revenue: 45600000, color: "#10b981" },
    { treatment: "Carbon Laser", count: 28, revenue: 50400000, color: "#8b5cf6" },
    { treatment: "Filler", count: 22, revenue: 99000000, color: "#f59e0b" },
    { treatment: "IV Vitamin", count: 34, revenue: 28900000, color: "#ef4444" }
  ];

  const monthlyTrends = [
    { month: "Jul", patients: 185, revenue: 510000000, treatments: 109 },
    { month: "Aug", patients: 198, revenue: 485000000, treatments: 104 },
    { month: "Sep", patients: 172, revenue: 490000000, treatments: 98 },
    { month: "Oct", patients: 159, revenue: 470000000, treatments: 96 },
    { month: "Nov", patients: 154, revenue: 460000000, treatments: 91 },
    { month: "Dec", patients: 168, revenue: 485000000, treatments: 101 }
  ];

  const staffPerformance = [
    {
      id: "e001",
      name: "Dr. Sarah Wilson", 
      position: "Chief Medical Officer",
      treatments: 85,
      revenue: 298500000,
      rating: 4.9,
      commissionEarned: 59700000,
      specialties: ["Botox", "Surgery", "Consultation"]
    },
    {
      id: "e002",
      name: "Dr. Michael Chen",
      position: "Aesthetic Doctor", 
      treatments: 72,
      revenue: 234000000,
      rating: 4.7,
      commissionEarned: 42120000,
      specialties: ["Filler", "Laser", "Consultation"]
    },
    {
      id: "e004",
      name: "Luna Park",
      position: "Beauty Therapist",
      treatments: 68,
      revenue: 81600000,
      rating: 4.8,
      commissionEarned: 9792000,
      specialties: ["Hydrafacial", "Facial", "Skin Care"]
    },
    {
      id: "e003", 
      name: "Amanda Rodriguez",
      position: "Senior Nurse",
      treatments: 42,
      revenue: 35700000,
      rating: 4.6,
      commissionEarned: 2856000,
      specialties: ["IV Therapy", "Post-care", "Assistance"]
    }
  ];

  const inventoryReports = [
    {
      category: "Critical Stock",
      items: [
        { name: "Glutathione 600mg", current: 3, minimum: 8, status: "critical" },
        { name: "Disposable Syringe 1ml", current: 45, minimum: 50, status: "low" }
      ]
    },
    {
      category: "Expiring Soon", 
      items: [
        { name: "Botox Allergan", expiryDate: new Date("2024-08-30"), daysLeft: 11 },
        { name: "HA Filler", expiryDate: new Date("2024-09-15"), daysLeft: 27 }
      ]
    },
    {
      category: "High Usage",
      items: [
        { name: "Alcohol Swabs", usage: 180, trend: "↗ +15%" },
        { name: "Gauze 4x4", usage: 95, trend: "↗ +8%" }
      ]
    }
  ];

  const membershipAnalysis = {
    totalMembers: 156,
    growth: "+12 this month",
    tierDistribution: [
      { tier: "Bronze", count: 89, percentage: 57, color: "#cd7f32" },
      { tier: "Silver", count: 34, percentage: 22, color: "#c0c0c0" },
      { tier: "Gold", count: 25, percentage: 16, color: "#ffd700" },
      { tier: "Platinum", count: 8, percentage: 5, color: "#e5e4e2" }
    ],
    pointsRedeemed: 45600,
    vouchersIssued: 23,
    birthdayGifts: 12
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-100 text-red-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      case "good": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "✨" : "");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan & Analisis</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive business intelligence dan analytics dashboard
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/reports/daily">
            <Button variant="outline">
              <span className="mr-2">🌅</span>
              Daily Reports
            </Button>
          </Link>
          <Link href="/reports/inventory">
            <Button variant="outline">
              <span className="mr-2">📦</span>
              Inventory Reports
            </Button>
          </Link>
          <Button className="bg-green-600 hover:bg-green-700">
            <span className="mr-2">📊</span>
            Export Reports
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">📅 Daily Summary</SelectItem>
                <SelectItem value="financial">💰 Financial Analysis</SelectItem>
                <SelectItem value="patient">👥 Patient Analytics</SelectItem>
                <SelectItem value="staff">👨‍⚕️ Staff Performance</SelectItem>
                <SelectItem value="inventory">📦 Inventory Reports</SelectItem>
                <SelectItem value="membership">⭐ Membership Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="thisQuarter">This Quarter</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>📈 Daily Summary - {formatDate(dailySummary.date)}</span>
            <Badge variant="outline">Real-time Data</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Financial Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(dailySummary.revenue)}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Revenue Today</p>
                  <div className="text-lg font-semibold text-blue-600">
                    {formatCurrency(dailySummary.profit)}
                  </div>
                  <p className="text-xs text-gray-400">Profit</p>
                </div>
              </CardContent>
            </Card>

            {/* Patient Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {dailySummary.patients.total}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Total Patients</p>
                  <div className="flex justify-center space-x-4 text-sm">
                    <div>
                      <span className="font-semibold text-green-600">{dailySummary.patients.new}</span>
                      <p className="text-xs text-gray-400">New</p>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-600">{dailySummary.patients.returning}</span>
                      <p className="text-xs text-gray-400">Returning</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {dailySummary.appointments.completed}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Completed</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Scheduled: {dailySummary.appointments.scheduled}</div>
                    <div>Cancelled: {dailySummary.appointments.cancelled}</div>
                    <div>No-show: {dailySummary.appointments.noShow}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Staff Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Object.values(dailySummary.staff).reduce((a, b) => a + b, 0)}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Staff Working</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Doctors: {dailySummary.staff.doctors}</div>
                    <div>Nurses: {dailySummary.staff.nurses}</div>
                    <div>Therapists: {dailySummary.staff.therapists}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>📊 6-Month Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "revenue" ? formatCurrency(value) : value,
                    name.charAt(0).toUpperCase() + name.slice(1)
                  ]}
                />
                <Legend />
                <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2} name="Patients" />
                <Line type="monotone" dataKey="treatments" stroke="#10b981" strokeWidth={2} name="Treatments" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Treatment Popularity */}
        <Card>
          <CardHeader>
            <CardTitle>🏆 Treatment Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={treatmentPopularity}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {treatmentPopularity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`${value} treatments`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {treatmentPopularity.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.treatment}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.count} treatments</div>
                    <div className="text-xs text-gray-500">{formatCurrency(item.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Performance */}
      <Card>
        <CardHeader>
          <CardTitle>👨‍⚕️ Staff Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Staff Member</th>
                  <th className="text-center p-4">Treatments</th>
                  <th className="text-center p-4">Revenue</th>
                  <th className="text-center p-4">Rating</th>
                  <th className="text-center p-4">Commission</th>
                  <th className="text-left p-4">Specialties</th>
                </tr>
              </thead>
              <tbody>
                {staffPerformance.map((staff) => (
                  <tr key={staff.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.position}</p>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-lg font-bold text-blue-600">{staff.treatments}</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-sm font-medium">{formatCurrency(staff.revenue)}</div>
                    </td>
                    <td className="text-center p-4">
                      <div>
                        <div className="text-sm">{getRatingStars(staff.rating)}</div>
                        <div className="text-xs text-gray-500">{staff.rating}/5</div>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-sm font-medium text-green-600">
                        {formatCurrency(staff.commissionEarned)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {staff.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Inventory & Membership Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle>📦 Inventory Status Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryReports.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h4 className="font-medium text-sm mb-2">{category.category}</h4>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{item.name}</span>
                        {'current' in item ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {item.current}/{item.minimum}
                            </span>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getStatusColor(item.status)}`}
                            >
                              {item.status}
                            </Badge>
                          </div>
                        ) : 'daysLeft' in item ? (
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${item.daysLeft <= 7 ? getStatusColor('critical') : getStatusColor('low')}`}
                          >
                            {item.daysLeft} days
                          </Badge>
                        ) : (
                          <div className="text-xs">
                            <span className="font-medium">{'usage' in item ? item.usage : ''}</span>
                            <span className="text-gray-500 ml-1">{'trend' in item ? item.trend : ''}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Membership Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>⭐ Membership Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{membershipAnalysis.totalMembers}</div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-xs text-green-600">{membershipAnalysis.growth}</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Tier Distribution</h4>
                {membershipAnalysis.tierDistribution.map((tier, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{tier.tier}</span>
                      <span>{tier.count} ({tier.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${tier.percentage}%`,
                          backgroundColor: tier.color 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Points Redeemed:</span>
                  <span className="font-medium">{membershipAnalysis.pointsRedeemed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vouchers Issued:</span>
                  <span className="font-medium">{membershipAnalysis.vouchersIssued}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Birthday Gifts:</span>
                  <span className="font-medium">{membershipAnalysis.birthdayGifts}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}