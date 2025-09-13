"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockMedicines, mockConsumables, formatCurrency } from "@/lib/data";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [viewMode, setViewMode] = useState("medicines");

  // Combine medicines and consumables for unified view
  const allInventory = [
    ...mockMedicines.map(item => ({
      ...item,
      type: "medicine" as const,
      category: item.category,
      stockLevel: (item.quantity / item.minStockLevel) * 100,
      value: item.quantity * item.costPerUnit,
      expiryDays: Math.ceil((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    })),
    ...mockConsumables.map(item => ({
      ...item,
      type: "consumable" as const,
      stockLevel: (item.quantity / item.minStockLevel) * 100,
      value: item.quantity * item.costPerUnit,
      expiryDays: null,
      expiryDate: null,
      sellingPrice: item.costPerUnit * 1.5, // Default markup
      requiresPrescription: false,
      sideEffects: [],
      contraindications: [],
      manufacturer: item.brand
    }))
  ];

  const filteredInventory = allInventory.filter(item => {
    if (viewMode === "medicines" && item.type !== "medicine") return false;
    if (viewMode === "consumables" && item.type !== "consumable") return false;
    
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.manufacturer && item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === "low") matchesStock = item.stockLevel <= 100;
    if (stockFilter === "critical") matchesStock = item.stockLevel <= 50;
    if (stockFilter === "adequate") matchesStock = item.stockLevel > 100;
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const getInventoryStats = () => {
    const totalItems = allInventory.length;
    const lowStock = allInventory.filter(item => item.stockLevel <= 100).length;
    const criticalStock = allInventory.filter(item => item.stockLevel <= 50).length;
    const expiringItems = allInventory.filter(item => item.expiryDays && item.expiryDays <= 30).length;
    const totalValue = allInventory.reduce((sum, item) => sum + item.value, 0);
    
    return { totalItems, lowStock, criticalStock, expiringItems, totalValue };
  };

  const stats = getInventoryStats();

  const getStockStatus = (stockLevel: number) => {
    if (stockLevel <= 50) return { label: "Critical", color: "bg-red-500", textColor: "text-red-700" };
    if (stockLevel <= 100) return { label: "Low", color: "bg-yellow-500", textColor: "text-yellow-700" };
    return { label: "Good", color: "bg-green-500", textColor: "text-green-700" };
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Inventaris</h1>
          <p className="text-gray-600 mt-1">
            Kelola stok obat, bahan habis pakai, dan inventaris klinik
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/inventory/transactions">
            <Button variant="outline">
              <span className="mr-2">📝</span>
              Stock Transactions
            </Button>
          </Link>
          <Link href="/inventory/waste">
            <Button variant="outline">
              <span className="mr-2">🗑️</span>
              Waste Management
            </Button>
          </Link>
          <Button className="bg-green-600 hover:bg-green-700">
            <span className="mr-2">📦</span>
            Add Inventory
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <span className="text-2xl">📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalItems}</div>
            <p className="text-xs text-gray-500">Active inventory items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <span className="text-2xl">⚠️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
            <p className="text-xs text-gray-500">Items need restock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
            <span className="text-2xl">🚨</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.criticalStock}</div>
            <p className="text-xs text-gray-500">Urgent restock needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <span className="text-2xl">⏰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.expiringItems}</div>
            <p className="text-xs text-gray-500">Within 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(stats.totalValue)}
            </div>
            <p className="text-xs text-gray-500">Current stock value</p>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            {/* View Mode Toggle */}
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "all" ? "default" : "outline"}
                onClick={() => setViewMode("all")}
                size="sm"
              >
                All Items
              </Button>
              <Button
                variant={viewMode === "medicines" ? "default" : "outline"}
                onClick={() => setViewMode("medicines")}
                size="sm"
              >
                💊 Medicines ({mockMedicines.length})
              </Button>
              <Button
                variant={viewMode === "consumables" ? "default" : "outline"}
                onClick={() => setViewMode("consumables")}
                size="sm"
              >
                🧴 Consumables ({mockConsumables.length})
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search items, manufacturer, or batch number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="injection">💉 Injection</SelectItem>
                  <SelectItem value="topical">🧴 Topical</SelectItem>
                  <SelectItem value="oral">💊 Oral</SelectItem>
                  <SelectItem value="disposable">🗑️ Disposable</SelectItem>
                  <SelectItem value="equipment">🔧 Equipment</SelectItem>
                  <SelectItem value="supplies">📦 Supplies</SelectItem>
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Stock Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock Levels</SelectItem>
                  <SelectItem value="adequate">✅ Adequate Stock</SelectItem>
                  <SelectItem value="low">⚠️ Low Stock</SelectItem>
                  <SelectItem value="critical">🚨 Critical Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventory Items</CardTitle>
            <Badge variant="outline">
              {filteredInventory.length} items
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Details</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">📦</div>
                        <p>No inventory items found matching your criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item) => {
                    const stockStatus = getStockStatus(item.stockLevel);
                    
                    return (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">
                                {item.type === "medicine" ? "💊" : "🧴"}
                              </span>
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <span>{item.manufacturer}</span>
                                  {item.type === "medicine" && (
                                    <Badge variant="secondary" className="text-xs">
                                      {item.requiresPrescription ? "Prescription" : "OTC"}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              Location: {item.location}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {item.quantity} {item.unit}
                              </span>
                              <Badge 
                                variant="secondary"
                                className={`${stockStatus.textColor} text-xs`}
                              >
                                {stockStatus.label}
                              </Badge>
                            </div>
                            <Progress 
                              value={Math.min(item.stockLevel, 200)} 
                              className="h-2"
                            />
                            <div className="text-xs text-gray-500">
                              Min: {item.minStockLevel} {item.unit}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {formatCurrency(item.value)}
                            </p>
                            <p className="text-xs text-gray-500">
                              @ {formatCurrency(item.costPerUnit)}/{item.unit}
                            </p>
                            {item.sellingPrice && (
                              <p className="text-xs text-green-600">
                                Sell: {formatCurrency(item.sellingPrice)}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.expiryDate ? (
                            <div className="space-y-1">
                              <p className="text-sm">
                                {formatDate(item.expiryDate)}
                              </p>
                              <p className={`text-xs ${
                                item.expiryDays && item.expiryDays <= 30 
                                  ? "text-red-600" 
                                  : "text-gray-500"
                              }`}>
                                {item.expiryDays && item.expiryDays > 0 
                                  ? `${item.expiryDays} days left`
                                  : item.expiryDays && item.expiryDays <= 0
                                  ? "EXPIRED"
                                  : ""}
                              </p>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Restock
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}