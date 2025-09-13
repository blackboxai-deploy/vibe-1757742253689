"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header() {
  const [notifications] = useState([
    {
      id: "1",
      type: "appointment",
      title: "Appointment Reminder",
      message: "Maria Gonzalez has an appointment in 30 minutes",
      time: "2 min ago",
      isRead: false,
    },
    {
      id: "2",
      type: "stock",
      title: "Low Stock Alert",
      message: "Botox Allergan running low (5 units remaining)",
      time: "15 min ago",
      isRead: false,
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Received",
      message: "Payment of Rp 2,500,000 received from Sarah Kim",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: "4",
      type: "birthday",
      title: "Birthday Alert",
      message: "3 patients have birthdays today - Auto gifts sent",
      time: "3 hours ago",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment": return "📅";
      case "stock": return "📦";
      case "payment": return "💰";
      case "birthday": return "🎂";
      default: return "🔔";
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <Input
            type="search"
            placeholder="Cari pasien, booking, atau layanan..."
            className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Quick Stats */}
        <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span>👥</span>
            <span>12 Pasien Hari Ini</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>💰</span>
            <span>Rp 8.5M Revenue</span>
          </div>
        </div>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2">
              <span className="text-xl">🔔</span>
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t">
              <Button variant="ghost" size="sm" className="w-full text-sm">
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Quick Actions */}
        <Button size="sm" variant="outline" className="hidden md:inline-flex">
          <span className="mr-2">➕</span>
          Quick Book
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/41b92ac4-5ff6-4bf9-a254-345b2612c417.png" alt="Dr. Sarah" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Dr. Sarah Wilson</p>
                <p className="text-xs text-gray-500">Administrator</p>
                <p className="text-xs text-gray-400">sarah.wilson@beautyclinic.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="mr-2">👤</span>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">⚙️</span>
              System Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">🔐</span>
              Security
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">❓</span>
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <span className="mr-2">🚪</span>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}