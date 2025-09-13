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
import { mockPatients, mockEmployees, getPatientById, getEmployeeById } from "@/lib/data";

export default function MedicalDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documentType, setDocumentType] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock medical documents data
  const medicalDocuments = [
    {
      id: "rx001",
      type: "prescription",
      documentNumber: "RX-2024-001",
      patientId: "p001",
      doctorId: "e001",
      title: "Prescription - Post Botox Medication",
      medications: [
        { name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "3x daily", duration: "3 days" },
        { name: "Anti-inflammatory cream", dosage: "Apply thin layer", frequency: "2x daily", duration: "7 days" }
      ],
      diagnosis: "Post-botox injection care",
      createdAt: new Date("2024-01-20T10:30:00"),
      status: "active",
      digitalSignature: "Dr. Sarah Wilson - Digital Signature",
    },
    {
      id: "ref001",
      type: "referral",
      documentNumber: "REF-2024-001",
      patientId: "p003",
      doctorId: "e001",
      title: "Referral to Dermatology Specialist",
      referToHospital: "RS Cipto Mangunkusumo",
      referToDepartment: "Dermatology",
      referToDoctor: "Dr. Ahmad Dermatologist",
      diagnosis: "Suspicious pigmented lesion",
      reason: "Further evaluation and possible biopsy",
      urgency: "routine",
      createdAt: new Date("2024-01-19T14:15:00"),
      status: "sent",
      digitalSignature: "Dr. Sarah Wilson - Digital Signature",
    },
    {
      id: "cert001",
      type: "certificate",
      documentNumber: "CERT-2024-001",
      patientId: "p002",
      doctorId: "e002",
      title: "Medical Fitness Certificate",
      certificateType: "fitness",
      purpose: "Employment medical check-up",
      validFrom: new Date("2024-01-18"),
      validTo: new Date("2025-01-18"),
      restrictions: ["None"],
      createdAt: new Date("2024-01-18T16:00:00"),
      status: "issued",
      digitalSignature: "Dr. Michael Chen - Digital Signature",
    },
    {
      id: "rx002",
      type: "prescription",
      documentNumber: "RX-2024-002",
      patientId: "p004",
      doctorId: "e002",
      title: "Prescription - Skin Care Regimen",
      medications: [
        { name: "Tretinoin 0.025%", dosage: "Apply pea-sized amount", frequency: "Once nightly", duration: "30 days" },
        { name: "Moisturizer SPF 30", dosage: "Apply liberally", frequency: "Every morning", duration: "Daily use" },
        { name: "Gentle cleanser", dosage: "Use as needed", frequency: "2x daily", duration: "Daily use" }
      ],
      diagnosis: "Acne vulgaris with post-inflammatory hyperpigmentation",
      createdAt: new Date("2024-01-17T11:20:00"),
      status: "active",
      digitalSignature: "Dr. Michael Chen - Digital Signature",
    },
    {
      id: "cert002",
      type: "certificate",
      documentNumber: "CERT-2024-002",
      patientId: "p005",
      doctorId: "e001",
      title: "Sick Leave Certificate",
      certificateType: "sick_leave",
      purpose: "Recovery from eyelid surgery",
      recommendedRest: 7,
      validFrom: new Date("2024-01-16"),
      validTo: new Date("2024-01-23"),
      restrictions: ["Avoid strenuous activities", "No heavy lifting", "Keep surgical area clean"],
      createdAt: new Date("2024-01-16T09:30:00"),
      status: "issued",
      digitalSignature: "Dr. Sarah Wilson - Digital Signature",
    },
    {
      id: "ref002",
      type: "referral",
      documentNumber: "REF-2024-002",
      patientId: "p001",
      doctorId: "e002",
      title: "Referral for Specialized Treatment",
      referToHospital: "Jakarta Beauty Center",
      referToDepartment: "Advanced Aesthetic Medicine",
      referToDoctor: "Dr. Specialist Name",
      diagnosis: "Complex facial rejuvenation planning",
      reason: "Advanced consultation for comprehensive treatment plan",
      urgency: "routine",
      createdAt: new Date("2024-01-15T13:45:00"),
      status: "pending",
      digitalSignature: "Dr. Michael Chen - Digital Signature",
    }
  ];

  // Filter documents
  const filteredDocuments = medicalDocuments.filter(doc => {
    const patient = getPatientById(doc.patientId);
    const doctor = getEmployeeById(doc.doctorId);
    
    const matchesSearch = 
      patient?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor?.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = documentType === "all" || doc.type === documentType;
    const matchesDoctor = doctorFilter === "all" || doc.doctorId === doctorFilter;
    
    return matchesSearch && matchesType && matchesDoctor;
  });

  const getDocumentStats = () => {
    const total = medicalDocuments.length;
    const prescriptions = medicalDocuments.filter(d => d.type === "prescription").length;
    const referrals = medicalDocuments.filter(d => d.type === "referral").length;
    const certificates = medicalDocuments.filter(d => d.type === "certificate").length;
    const pending = medicalDocuments.filter(d => d.status === "pending").length;

    return { total, prescriptions, referrals, certificates, pending };
  };

  const stats = getDocumentStats();

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "prescription": return "💊";
      case "referral": return "🏥";
      case "certificate": return "📋";
      default: return "📄";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "issued": return "bg-blue-100 text-blue-800";
      case "sent": return "bg-purple-100 text-purple-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent": return "bg-red-100 text-red-800";
      case "routine": return "bg-blue-100 text-blue-800";
      case "emergency": return "bg-red-200 text-red-900";
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

  const getPatientInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dokumen Medis</h1>
          <p className="text-gray-600 mt-1">
            Kelola resep obat, surat rujukan, dan sertifikat medis
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/medical-documents/prescriptions/create">
            <Button variant="outline">
              <span className="mr-2">💊</span>
              New Prescription
            </Button>
          </Link>
          <Link href="/medical-documents/referrals/create">
            <Button variant="outline">
              <span className="mr-2">🏥</span>
              New Referral
            </Button>
          </Link>
          <Link href="/medical-documents/certificates/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <span className="mr-2">📋</span>
              New Certificate
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <span className="text-2xl">📄</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-gray-500">All document types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <span className="text-2xl">💊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.prescriptions}</div>
            <p className="text-xs text-gray-500">Active prescriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Letters</CardTitle>
            <span className="text-2xl">🏥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.referrals}</div>
            <p className="text-xs text-gray-500">Hospital referrals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <span className="text-2xl">📋</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{stats.certificates}</div>
            <p className="text-xs text-gray-500">Medical certificates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <span className="text-2xl">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-gray-500">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search patient name, document number, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="prescription">💊 Prescriptions</SelectItem>
                <SelectItem value="referral">🏥 Referrals</SelectItem>
                <SelectItem value="certificate">📋 Certificates</SelectItem>
              </SelectContent>
            </Select>
            <Select value={doctorFilter} onValueChange={setDoctorFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter Doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                {mockEmployees.filter(emp => emp.position.includes("Doctor")).map(doctor => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Medical Documents</CardTitle>
            <Badge variant="outline">
              {filteredDocuments.length} documents
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Details</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status & Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">📄</div>
                        <p>No medical documents found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => {
                    const patient = getPatientById(doc.patientId);
                    const doctor = getEmployeeById(doc.doctorId);
                    
                    if (!patient || !doctor) return null;

                    return (
                      <TableRow key={doc.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                              <span className="text-lg">{getDocumentIcon(doc.type)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{doc.title}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>{doc.documentNumber}</span>
                                <span>•</span>
                                <Badge variant="secondary" className="text-xs">
                                  {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                                </Badge>
                                {doc.type === "referral" && (
                                  <>
                                    <span>•</span>
                                    <Badge 
                                      variant="secondary"
                                      className={`text-xs ${getUrgencyColor(doc.urgency || "routine")}`}
                                    >
                                      {(doc.urgency || "routine").toUpperCase()}
                                    </Badge>
                                  </>
                                )}
                              </div>
                              
                              {/* Additional Info */}
                              {doc.type === "prescription" && doc.medications && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {doc.medications.length} medications prescribed
                                </p>
                              )}
                              {doc.type === "referral" && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Refer to: {doc.referToHospital} - {doc.referToDepartment}
                                </p>
                              )}
                              {doc.type === "certificate" && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {doc.certificateType?.replace("_", " ")} • Valid until {doc.validTo ? formatDate(doc.validTo) : "N/A"}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={patient.profilePhoto} alt={patient.name} />
                              <AvatarFallback className="text-xs">
                                {getPatientInitials(patient.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                              <p className="text-xs text-gray-500">{patient.registrationNumber}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                            <p className="text-xs text-gray-500">{doctor.position}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge 
                              variant="secondary"
                              className={`text-xs ${getStatusColor(doc.status)}`}
                            >
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </Badge>
                            <p className="text-xs text-gray-500">
                              {formatDateTime(doc.createdAt)}
                            </p>
                            {doc.validTo && (
                              <p className="text-xs text-gray-400">
                                Valid until: {formatDate(doc.validTo)}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              📄 View
                            </Button>
                            <Button size="sm" variant="outline">
                              📥 Download
                            </Button>
                            <Button size="sm" variant="outline">
                              ✏️ Edit
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