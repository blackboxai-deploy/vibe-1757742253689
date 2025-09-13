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
import { mockDashboardKPI, formatCurrency } from "@/lib/data";

export default function FinancePage() {
  const [dateFilter, setDateFilter] = useState("thisMonth");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock financial data
  const revenueData = [
    { month: "Jan", revenue: 420000000, profit: 126000000, expenses: 294000000 },
    { month: "Feb", revenue: 380000000, profit: 114000000, expenses: 266000000 },
    { month: "Mar", revenue: 450000000, profit: 135000000, expenses: 315000000 },
    { month: "Apr", revenue: 520000000, profit: 156000000, expenses: 364000000 },
    { month: "May", revenue: 480000000, profit: 144000000, expenses: 336000000 },
    { month: "Jun", revenue: 550000000, profit: 165000000, expenses: 385000000 },
  ];

  const paymentMethodData = [
    { method: "Cash", amount: 180000000, percentage: 37, color: "#22c55e" },
    { method: "Transfer", amount: 150000000, percentage: 31, color: "#3b82f6" },
    { method: "Card", amount: 98000000, percentage: 20, color: "#8b5cf6" },
    { method: "QRIS", amount: 57000000, percentage: 12, color: "#f59e0b" },
  ];

  const expenseData = [
    { category: "Staff Salaries", amount: 120000000, percentage: 35 },
    { category: "Inventory", amount: 85000000, percentage: 25 },
    { category: "Rent & Utilities", amount: 68000000, percentage: 20 },
    { category: "Marketing", amount: 34000000, percentage: 10 },
    { category: "Equipment", amount: 17000000, percentage: 5 },
    { category: "Other", amount: 17000000, percentage: 5 },
  ];

  const recentTransactions = [
    {
      id: "1",
      type: "income",
      description: "Payment - Maria Rodriguez (Botox Treatment)",
      amount: 5247000,
      method: "Transfer",
      date: new Date("2024-01-20T10:30:00"),
      status: "completed",
      reference: "INV-2024-001"
    },
    {
      id: "2", 
      type: "income",
      description: "Payment - Sarah Kim (Hydrafacial)",
      amount: 1200000,
      method: "Cash",
      date: new Date("2024-01-20T09:15:00"),
      status: "completed",
      reference: "INV-2024-002"
    },
    {
      id: "3",
      type: "expense",
      description: "Inventory Purchase - Botox Allergan",
      amount: 14000000,
      method: "Transfer",
      date: new Date("2024-01-19T14:20:00"),
      status: "completed",
      reference: "PO-2024-015"
    },
    {
      id: "4",
      type: "income",
      description: "Payment - Amanda Chen (Carbon Laser)",
      amount: 1620000,
      method: "QRIS",
      date: new Date("2024-01-19T11:45:00"),
      status: "completed",
      reference: "INV-2024-003"
    },
    {
      id: "5",
      type: "expense",
      description: "Staff Commission - Dr. Sarah Wilson",
      amount: 2500000,
      method: "Transfer",
      date: new Date("2024-01-18T16:00:00"),
      status: "pending",
      reference: "COM-2024-001"
    }
  ];

  const getFinancialSummary = () => {
    const currentMonth = revenueData[revenueData.length - 1];
    const previousMonth = revenueData[revenueData.length - 2];
    
    const totalIncome = recentTransactions
      .filter(t => t.type === "income" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = recentTransactions
      .filter(t => t.type === "expense" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const pendingPayments = recentTransactions
      .filter(t => t.type === "income" && t.status === "pending")
      .reduce((sum, t) => sum + t.amount, 0);

    const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100);
    const profitMargin = (currentMonth.profit / currentMonth.revenue * 100);

    return {
      currentMonthRevenue: currentMonth.revenue,
      currentMonthProfit: currentMonth.profit,
      revenueGrowth,
      profitMargin,
      totalIncome,
      totalExpenses,
      pendingPayments,
      netProfit: totalIncome - totalExpenses
    };
  };

  const summary = getFinancialSummary();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type: string, method: string) => {
    if (type === "income") {
      switch (method) {
        case "Cash": return "💵";
        case "Transfer": return "🏦";
        case "Card": return "💳";
        case "QRIS": return "📱";
        default: return "💰";
      }
    } else {
      return "💸";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Keuangan</h1>
          <p className="text-gray-600 mt-1">
            Dashboard keuangan, pembayaran, invoice, dan laporan
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/finance/payments">
            <Button variant="outline">
              <span className="mr-2">💳</span>
              Payments
            </Button>
          </Link>
          <Link href="/finance/invoices">
            <Button variant="outline">
              <span className="mr-2">🧾</span>
              Invoices
            </Button>
          </Link>
          <Link href="/finance/reports">
            <Button className="bg-green-600 hover:bg-green-700">
              <span className="mr-2">📊</span>
              Financial Reports
            </Button>
          </Link>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Bulan Ini</CardTitle>
            <span className="text-2xl">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(summary.currentMonthRevenue)}
            </div>
            <p className="text-xs text-gray-500">
              <span className={`${summary.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {summary.revenueGrowth >= 0 ? '↗' : '↘'} {Math.abs(summary.revenueGrowth).toFixed(1)}%
              </span> vs bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Bulan Ini</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.currentMonthProfit)}
            </div>
            <p className="text-xs text-gray-500">
              Margin: {summary.profitMargin.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <span className="text-2xl">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(summary.pendingPayments)}
            </div>
            <p className="text-xs text-gray-500">
              {recentTransactions.filter(t => t.status === "pending").length} transaksi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <span className="text-2xl">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {formatCurrency(summary.netProfit)}
            </div>
            <p className="text-xs text-gray-500">
              Revenue - Expenses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" tickFormatter={(value) => `${(value/1000000).toFixed(0)}M`} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    formatCurrency(value),
                    name === "revenue" ? "Revenue" : name === "profit" ? "Profit" : "Expenses"
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Profit"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {paymentMethodData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.method}</span>
                  </div>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#666" />
              <YAxis stroke="#666" tickFormatter={(value) => `${(value/1000000).toFixed(0)}M`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="amount" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">
                      {getTransactionIcon(transaction.type, transaction.method)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{formatDate(transaction.date)}</span>
                      <span>•</span>
                      <span>{transaction.method}</span>
                      <span>•</span>
                      <span>{transaction.reference}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`${getStatusColor(transaction.status)} text-xs`}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">
              <span className="mr-2">👁️</span>
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}