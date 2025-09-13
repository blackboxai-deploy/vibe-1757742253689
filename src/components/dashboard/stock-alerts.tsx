"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockMedicines, mockConsumables, formatCurrency } from "@/lib/data";

export function StockAlerts() {
  // Get low stock items
  const lowStockMedicines = mockMedicines.filter(
    medicine => medicine.quantity <= medicine.minStockLevel
  );
  
  const lowStockConsumables = mockConsumables.filter(
    consumable => consumable.quantity <= consumable.minStockLevel
  );

  // Get expiring items (within 30 days)
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
  const expiringMedicines = mockMedicines.filter(
    medicine => medicine.expiryDate <= thirtyDaysFromNow
  );

  const allAlerts = [
    ...lowStockMedicines.map(item => ({
      id: item.id,
      name: item.name,
      type: 'low_stock' as const,
      category: 'medicine' as const,
      current: item.quantity,
      minimum: item.minStockLevel,
      unit: item.unit,
      urgency: item.quantity === 0 ? 'critical' : 'medium',
      value: formatCurrency(item.costPerUnit * item.minStockLevel),
    })),
    ...lowStockConsumables.map(item => ({
      id: item.id,
      name: item.name,
      type: 'low_stock' as const,
      category: 'consumable' as const,
      current: item.quantity,
      minimum: item.minStockLevel,
      unit: item.unit,
      urgency: item.quantity === 0 ? 'critical' : 'medium',
      value: formatCurrency(item.costPerUnit * item.minStockLevel),
    })),
    ...expiringMedicines.map(item => ({
      id: item.id,
      name: item.name,
      type: 'expiring' as const,
      category: 'medicine' as const,
      expiryDate: item.expiryDate,
      quantity: item.quantity,
      unit: item.unit,
      urgency: item.expiryDate <= new Date() ? 'critical' : 
              (item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24) <= 7 ? 'high' : 'medium',
      value: formatCurrency(item.costPerUnit * item.quantity),
    }))
  ].sort((a, b) => {
    const urgencyOrder: { [key: string]: number } = { critical: 0, high: 1, medium: 2 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '⚡';
      default: return 'ℹ️';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntilExpiry = (date: Date) => {
    const diffTime = date.getTime() - Date.now();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>🚨</span>
            <span>Stock Alerts</span>
          </CardTitle>
          <Badge variant="destructive">
            {allAlerts.length} Items
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {allAlerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-gray-500">Semua stock dalam kondisi baik</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allAlerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm">{getUrgencyIcon(alert.urgency)}</span>
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {alert.name}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getUrgencyColor(alert.urgency)}`}
                      >
                        {alert.urgency.toUpperCase()}
                      </Badge>
                    </div>

                    {alert.type === 'low_stock' ? (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Stock Level</span>
                          <span className="font-medium">
                            {alert.current} / {alert.minimum} {alert.unit}
                          </span>
                        </div>
                        <Progress 
                          value={(alert.current / alert.minimum) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum restock: {alert.value}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">
                          Expires: {formatDate(alert.expiryDate!)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getDaysUntilExpiry(alert.expiryDate!) <= 0 
                            ? "EXPIRED" 
                            : `${getDaysUntilExpiry(alert.expiryDate!)} days remaining`
                          } • {alert.quantity} {alert.unit} • {alert.value}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {allAlerts.length > 5 && (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  +{allAlerts.length - 5} more alerts
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 space-y-2">
          <Button variant="outline" className="w-full" size="sm">
            <span className="mr-2">📦</span>
            Manage Inventory
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            <span className="mr-2">🛒</span>
            Create Purchase Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}