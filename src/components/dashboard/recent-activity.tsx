"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/data";

// Mock recent activity data
const recentActivities = [
  {
    id: "act001",
    type: "payment",
    title: "Payment Received",
    description: "Maria Rodriguez - Botox Treatment",
    amount: 5247000,
    icon: "💰",
    time: "5 menit lalu",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1269e19b-5cbd-48a4-9bb3-dcce4811295c.png",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "act002",
    type: "booking",
    title: "New Booking",
    description: "Jessica Tan - Hydrafacial Premium",
    icon: "📅",
    time: "12 menit lalu",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4634f0b9-7d5f-4a6a-a0b5-0d3df998ee46.png",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "act003",
    type: "checkin",
    title: "Patient Check-in",
    description: "Sarah Kim - IV Vitamin Drip",
    icon: "🚪",
    time: "18 menit lalu",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/76c2f25b-fa66-461e-ad0c-28ddf72485c9.png",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "act004",
    type: "treatment",
    title: "Treatment Completed",
    description: "Amanda Chen - Carbon Laser Facial",
    icon: "✅",
    time: "32 menit lalu",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f150f5a4-9dc8-4996-bd28-5176a4eb19aa.png",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: "act005",
    type: "stock",
    title: "Stock Updated",
    description: "Botox Allergan - 5 units received",
    icon: "📦",
    time: "45 menit lalu",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: "act006",
    type: "membership",
    title: "New Member",
    description: "Priscilla Wijaya upgraded to Gold",
    icon: "⭐",
    time: "1 jam lalu",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/20c027e4-45af-45f9-ac0d-ba63dae4c40d.png",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    id: "act007",
    type: "birthday",
    title: "Birthday Gift Sent",
    description: "Auto voucher sent to 3 members",
    icon: "🎂",
    time: "2 jam lalu",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    id: "act008",
    type: "referral",
    title: "Referral Bonus",
    description: "Maria Rodriguez earned 500 points",
    icon: "🤝",
    time: "3 jam lalu",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/11d46122-f341-45ee-ba80-f6e19ed5eeaf.png",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  }
];

export function RecentActivity() {
  const getInitials = (description: string) => {
    const name = description.split(" - ")[0];
    return name ? name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "??";
  };

  const activityStats = {
    payments: recentActivities.filter(a => a.type === 'payment').length,
    bookings: recentActivities.filter(a => a.type === 'booking').length,
    treatments: recentActivities.filter(a => a.type === 'treatment').length,
    checkins: recentActivities.filter(a => a.type === 'checkin').length,
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>⚡</span>
            <span>Recent Activity</span>
          </CardTitle>
          <Badge variant="outline">
            Live Updates
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Activity Stats */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {activityStats.payments}
            </div>
            <div className="text-xs text-gray-500">Payments</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {activityStats.bookings}
            </div>
            <div className="text-xs text-gray-500">Bookings</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">
              {activityStats.treatments}
            </div>
            <div className="text-xs text-gray-500">Treatments</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {activityStats.checkins}
            </div>
            <div className="text-xs text-gray-500">Check-ins</div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 ${activity.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <span className="text-sm">{activity.icon}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  {activity.amount && (
                    <Badge variant="secondary" className="text-xs">
                      {formatCurrency(activity.amount)}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>

              {activity.avatar && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage 
                    src={activity.avatar} 
                    alt={getInitials(activity.description)} 
                  />
                  <AvatarFallback className="text-xs">
                    {getInitials(activity.description)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">
            <span className="mr-2">👁️</span>
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}