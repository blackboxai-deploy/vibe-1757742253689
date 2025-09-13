"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockBookings, mockPatients, mockServices, getPatientById, getServiceById, formatTime, getStatusColor } from "@/lib/data";

export function AppointmentSummary() {
  // Get today's appointments
  const today = new Date();
  const todayString = today.toDateString();
  
  const todayAppointments = mockBookings.filter(booking => 
    booking.appointmentDate.toDateString() === todayString
  );

  const getPatientName = (patientId: string) => {
    const patient = getPatientById(patientId);
    return patient ? patient.name : "Unknown Patient";
  };

  const getServiceNames = (serviceIds: string[]) => {
    return serviceIds.map(id => {
      const service = getServiceById(id);
      return service ? service.name : "Unknown Service";
    }).join(", ");
  };

  const getPatientInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const statusStats = {
    confirmed: todayAppointments.filter(a => a.status === 'confirmed').length,
    'in-progress': todayAppointments.filter(a => a.status === 'in-progress').length,
    completed: todayAppointments.filter(a => a.status === 'completed').length,
    pending: todayAppointments.filter(a => a.status === 'pending').length,
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>📅</span>
            <span>Appointment Hari Ini</span>
          </CardTitle>
          <Badge variant="outline">
            {todayAppointments.length} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Status Overview */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {statusStats.confirmed}
            </div>
            <div className="text-xs text-gray-500">Confirmed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {statusStats['in-progress']}
            </div>
            <div className="text-xs text-gray-500">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-600">
              {statusStats.completed}
            </div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">
              {statusStats.pending}
            </div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {todayAppointments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-gray-500">Tidak ada appointment hari ini</p>
            </div>
          ) : (
            todayAppointments.map((appointment) => {
              const patientName = getPatientName(appointment.patientId);
              const serviceNames = getServiceNames(appointment.serviceIds);
              
              return (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage 
                        src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5a2e0eb7-737d-43fe-8429-8e48a3985270.png}`} 
                        alt={patientName} 
                      />
                      <AvatarFallback>
                        {getPatientInitials(patientName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{patientName}</p>
                      <p className="text-sm text-gray-600 truncate max-w-48">
                        {serviceNames}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                      </div>
                      <Badge 
                        className={`text-xs ${getStatusColor(appointment.status)}`}
                        variant="secondary"
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      Detail
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">
            <span className="mr-2">👀</span>
            Lihat Semua Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}