"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { mockEmployees } from "@/lib/data";

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Mock additional admin data
  const systemUsers = [
    {
      id: "u001",
      employeeId: "e001",
      username: "dr.sarah.wilson",
      email: "sarah.wilson@beautyclinic.com", 
      role: "admin",
      permissions: ["full_access", "user_management", "financial_reports", "system_settings"],
      lastLogin: new Date("2024-01-20T08:30:00"),
      loginCount: 245,
      isActive: true,
      twoFactorEnabled: true,
      sessionTimeout: 60,
    },
    {
      id: "u002", 
      employeeId: "e002",
      username: "dr.michael.chen",
      email: "michael.chen@beautyclinic.com",
      role: "doctor",
      permissions: ["patient_management", "medical_documents", "treatment_records"],
      lastLogin: new Date("2024-01-19T14:15:00"),
      loginCount: 189,
      isActive: true,
      twoFactorEnabled: false,
      sessionTimeout: 60,
    },
    {
      id: "u003",
      employeeId: "e003", 
      username: "nurse.amanda",
      email: "amanda.rodriguez@beautyclinic.com",
      role: "staff",
      permissions: ["patient_management", "inventory_view", "appointment_management"],
      lastLogin: new Date("2024-01-20T07:45:00"),
      loginCount: 156,
      isActive: true,
      twoFactorEnabled: true,
      sessionTimeout: 30,
    },
    {
      id: "u004",
      employeeId: "e004",
      username: "therapist.luna",
      email: "luna.park@beautyclinic.com", 
      role: "staff",
      permissions: ["patient_management", "appointment_management", "service_records"],
      lastLogin: new Date("2024-01-18T16:20:00"),
      loginCount: 98,
      isActive: true,
      twoFactorEnabled: false,
      sessionTimeout: 30,
    },
    {
      id: "u005",
      employeeId: null,
      username: "receptionist.maya",
      email: "maya.receptionist@beautyclinic.com",
      role: "receptionist", 
      permissions: ["patient_registration", "appointment_management", "basic_reports"],
      lastLogin: new Date("2024-01-20T09:00:00"),
      loginCount: 78,
      isActive: true,
      twoFactorEnabled: false,
      sessionTimeout: 120,
    }
  ];

  const systemLogs = [
    {
      id: "log001",
      timestamp: new Date("2024-01-20T10:30:00"),
      userId: "u001",
      action: "user_login",
      description: "Dr. Sarah Wilson logged in from IP 192.168.1.100",
      severity: "info",
      category: "authentication"
    },
    {
      id: "log002", 
      timestamp: new Date("2024-01-20T10:25:00"),
      userId: "u003",
      action: "patient_updated",
      description: "Amanda Rodriguez updated patient record for Maria Isabella Rodriguez",
      severity: "info", 
      category: "patient_management"
    },
    {
      id: "log003",
      timestamp: new Date("2024-01-20T10:15:00"),
      userId: "u002",
      action: "prescription_created",
      description: "Dr. Michael Chen created new prescription RX-2024-003",
      severity: "info",
      category: "medical_documents"
    },
    {
      id: "log004",
      timestamp: new Date("2024-01-20T09:45:00"),
      userId: "u001",
      action: "system_backup", 
      description: "Automated system backup completed successfully",
      severity: "success",
      category: "system"
    },
    {
      id: "log005",
      timestamp: new Date("2024-01-20T09:30:00"),
      userId: null,
      action: "failed_login",
      description: "Failed login attempt from IP 203.142.15.89 (username: admin)",
      severity: "warning",
      category: "security"
    }
  ];

  // Filter users
  const filteredUsers = systemUsers.filter(user => {
    const employee = user.employeeId ? mockEmployees.find(emp => emp.id === user.employeeId) : null;
    
    const matchesSearch = 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (employee && employee.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    const matchesDepartment = departmentFilter === "all" || 
      (employee && employee.department === departmentFilter);

    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const getSystemStats = () => {
    const totalUsers = systemUsers.length;
    const activeUsers = systemUsers.filter(u => u.isActive).length;
    const adminUsers = systemUsers.filter(u => u.role === "admin").length;
    const twoFactorEnabled = systemUsers.filter(u => u.twoFactorEnabled).length;
    const recentLogins = systemUsers.filter(u => {
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      return u.lastLogin > dayAgo;
    }).length;

    return { totalUsers, activeUsers, adminUsers, twoFactorEnabled, recentLogins };
  };

  const stats = getSystemStats();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return "👑";
      case "doctor": return "👨‍⚕️";
      case "staff": return "👩‍💼";
      case "receptionist": return "🎯";
      default: return "👤";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "doctor": return "bg-blue-100 text-blue-800";
      case "staff": return "bg-green-100 text-green-800";
      case "receptionist": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success": return "bg-green-100 text-green-800";
      case "info": return "bg-blue-100 text-blue-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEmployeeName = (employeeId: string | null) => {
    if (!employeeId) return "System User";
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    return employee ? employee.name : "Unknown Employee";
  };

  const getEmployeeInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistem Administrasi</h1>
          <p className="text-gray-600 mt-1">
            Kelola pengguna, permissions, settings, dan monitoring sistem
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/admin/users">
            <Button variant="outline">
              <span className="mr-2">👤</span>
              User Management
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="outline">
              <span className="mr-2">⚙️</span>
              System Settings
            </Button>
          </Link>
          <Button className="bg-red-600 hover:bg-red-700">
            <span className="mr-2">🔒</span>
            Security Center
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
            <p className="text-xs text-gray-500">System users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
            <p className="text-xs text-gray-500">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <span className="text-2xl">👑</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.adminUsers}</div>
            <p className="text-xs text-gray-500">Admin privileges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2FA Enabled</CardTitle>
            <span className="text-2xl">🔐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.twoFactorEnabled}</div>
            <p className="text-xs text-gray-500">
              {((stats.twoFactorEnabled / stats.totalUsers) * 100).toFixed(0)}% coverage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Logins</CardTitle>
            <span className="text-2xl">🕐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.recentLogins}</div>
            <p className="text-xs text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent System Activity</CardTitle>
            <Button variant="outline" size="sm">
              <span className="mr-2">📋</span>
              View All Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="secondary"
                    className={`${getSeverityColor(log.severity)} text-xs`}
                  >
                    {log.severity.toUpperCase()}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {log.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{formatDateTime(log.timestamp)}</span>
                      <span>•</span>
                      <span>{log.category}</span>
                      {log.userId && (
                        <>
                          <span>•</span>
                          <span>{getEmployeeName(systemUsers.find(u => u.id === log.userId)?.employeeId || null)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search username, email, or employee name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">👑 Administrator</SelectItem>
                <SelectItem value="doctor">👨‍⚕️ Doctor</SelectItem>
                <SelectItem value="staff">👩‍💼 Staff</SelectItem>
                <SelectItem value="receptionist">🎯 Receptionist</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">✅ Active</SelectItem>
                <SelectItem value="inactive">❌ Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role & Permissions</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Security</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">👥</div>
                        <p>No users found matching your criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => {
                    const employee = user.employeeId ? mockEmployees.find(emp => emp.id === user.employeeId) : null;
                    const employeeName = employee ? employee.name : "System User";
                    
                    return (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage 
                                src={employee?.avatar} 
                                alt={employeeName} 
                              />
                              <AvatarFallback>
                                {getEmployeeInitials(employeeName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{employeeName}</p>
                              <div className="text-sm text-gray-500">
                                <div>@{user.username}</div>
                                <div>{user.email}</div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{getRoleIcon(user.role)}</span>
                              <Badge className={getRoleColor(user.role)}>
                                {user.role.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500">
                              {user.permissions.length} permissions
                            </div>
                            <div className="text-xs text-gray-400">
                              Session: {user.sessionTimeout}min timeout
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm">
                              Last login: {formatDateTime(user.lastLogin)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.loginCount} total logins
                            </p>
                            <Badge 
                              variant={user.isActive ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {user.isActive ? "✅ Active" : "❌ Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <Badge 
                              variant="secondary"
                              className={`text-xs ${
                                user.twoFactorEnabled 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.twoFactorEnabled ? "🔐 2FA On" : "🚫 2FA Off"}
                            </Badge>
                            <p className="text-xs text-gray-500">
                              Security level: {user.twoFactorEnabled ? "High" : "Basic"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Permissions
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className={user.isActive ? "text-red-600" : "text-green-600"}
                            >
                              {user.isActive ? "Disable" : "Enable"}
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