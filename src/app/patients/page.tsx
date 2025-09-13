"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockPatients, mockMembers, getMemberByPatientId, getMemberTierColor } from "@/lib/data";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [memberFilter, setMemberFilter] = useState("all");

  // Filter patients based on search and filters
  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGender = genderFilter === "all" || patient.gender === genderFilter;
    
    const member = getMemberByPatientId(patient.id);
    const matchesMember = memberFilter === "all" || 
      (memberFilter === "member" && member) ||
      (memberFilter === "non-member" && !member) ||
      (member && member.tier === memberFilter);

    return matchesSearch && matchesGender && matchesMember;
  });

  const getPatientStats = () => {
    const totalPatients = mockPatients.length;
    const memberCount = mockMembers.length;
    const maleCount = mockPatients.filter(p => p.gender === "male").length;
    const femaleCount = mockPatients.filter(p => p.gender === "female").length;
    
    return { totalPatients, memberCount, maleCount, femaleCount };
  };

  const stats = getPatientStats();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPatientInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Pasien</h1>
          <p className="text-gray-600 mt-1">
            Kelola data pasien, riwayat kunjungan, dan informasi medis
          </p>
        </div>
        <Link href="/patients/register">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <span className="mr-2">👤</span>
            Daftar Pasien Baru
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pasien</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalPatients}</div>
            <p className="text-xs text-gray-500">Terdaftar di sistem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Aktif</CardTitle>
            <span className="text-2xl">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.memberCount}</div>
            <p className="text-xs text-gray-500">
              {((stats.memberCount / stats.totalPatients) * 100).toFixed(1)}% dari total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pasien Wanita</CardTitle>
            <span className="text-2xl">👩</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">{stats.femaleCount}</div>
            <p className="text-xs text-gray-500">
              {((stats.femaleCount / stats.totalPatients) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pasien Pria</CardTitle>
            <span className="text-2xl">👨</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.maleCount}</div>
            <p className="text-xs text-gray-500">
              {((stats.maleCount / stats.totalPatients) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Pencarian & Filter Pasien</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari nama, nomor telepon, atau nomor registrasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter Jenis Kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis Kelamin</SelectItem>
                <SelectItem value="female">Wanita</SelectItem>
                <SelectItem value="male">Pria</SelectItem>
              </SelectContent>
            </Select>
            <Select value={memberFilter} onValueChange={setMemberFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter Membership" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="non-member">Non-Member</SelectItem>
                <SelectItem value="bronze">Bronze Member</SelectItem>
                <SelectItem value="silver">Silver Member</SelectItem>
                <SelectItem value="gold">Gold Member</SelectItem>
                <SelectItem value="platinum">Platinum Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patient List Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Pasien</CardTitle>
            <Badge variant="outline">
              {filteredPatients.length} dari {stats.totalPatients} pasien
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pasien</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Usia & Gender</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Terdaftar</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">🔍</div>
                        <p>Tidak ada pasien yang sesuai dengan kriteria pencarian</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient) => {
                    const member = getMemberByPatientId(patient.id);
                    const age = calculateAge(patient.birthDate);
                    
                    return (
                      <TableRow key={patient.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage 
                                src={patient.profilePhoto} 
                                alt={patient.name} 
                              />
                              <AvatarFallback>
                                {getPatientInitials(patient.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{patient.name}</p>
                              <p className="text-sm text-gray-500">{patient.registrationNumber}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{patient.phone}</p>
                            <p className="text-sm text-gray-500">{patient.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{age} tahun</p>
                            <Badge variant="secondary" className="text-xs">
                              {patient.gender === 'female' ? '👩 Wanita' : '👨 Pria'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {member ? (
                            <Badge className={getMemberTierColor(member.tier)}>
                              ⭐ {member.tier.toUpperCase()}
                            </Badge>
                          ) : (
                            <Badge variant="outline">Non-Member</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{formatDate(patient.createdAt)}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Link href={`/patients/${patient.id}`}>
                              <Button size="sm" variant="outline">
                                Detail
                              </Button>
                            </Link>
                            <Link href={`/patients/${patient.id}/assessment`}>
                              <Button size="sm" variant="outline">
                                Assessment
                              </Button>
                            </Link>
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