"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { 
  mockMembers, 
  mockPatients, 
  getPatientById, 
  getMemberTierColor,
  formatCurrency 
} from "@/lib/data";

export default function MembershipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Member benefits configuration
  const memberBenefits = {
    bronze: {
      tier: "Bronze",
      pointsMultiplier: 1,
      discountPercentage: 5,
      birthdayGift: { type: "voucher", value: 100000, description: "Voucher Rp 100K" },
      familyBenefits: ["Basic family consultation discount"],
      exclusiveOffers: false,
      priorityBooking: false,
      icon: "🥉",
      color: "from-orange-400 to-orange-600"
    },
    silver: {
      tier: "Silver", 
      pointsMultiplier: 1.5,
      discountPercentage: 10,
      birthdayGift: { type: "treatment", value: 300000, description: "Free Basic Facial" },
      familyBenefits: ["Family discount 5%", "Free consultation for spouse"],
      exclusiveOffers: true,
      priorityBooking: false,
      icon: "🥈",
      color: "from-gray-400 to-gray-600"
    },
    gold: {
      tier: "Gold",
      pointsMultiplier: 2,
      discountPercentage: 15,
      birthdayGift: { type: "treatment", value: 500000, description: "Free Premium Facial" },
      familyBenefits: ["Family discount 10%", "Free consultation for family (max 3)"],
      exclusiveOffers: true,
      priorityBooking: true,
      icon: "🥇",
      color: "from-yellow-400 to-yellow-600"
    },
    platinum: {
      tier: "Platinum",
      pointsMultiplier: 3,
      discountPercentage: 20,
      birthdayGift: { type: "treatment", value: 1000000, description: "Free Premium Treatment" },
      familyBenefits: ["Family discount 15%", "Unlimited family consultations"],
      exclusiveOffers: true,
      priorityBooking: true,
      icon: "💎",
      color: "from-purple-400 to-purple-600"
    }
  };

  // Filter members
  const filteredMembers = mockMembers.filter(member => {
    const patient = getPatientById(member.patientId);
    if (!patient) return false;

    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.membershipNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.referralCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = tierFilter === "all" || member.tier === tierFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && member.isActive) ||
      (statusFilter === "inactive" && !member.isActive);

    return matchesSearch && matchesTier && matchesStatus;
  });

  const getMembershipStats = () => {
    const totalMembers = mockMembers.length;
    const activeMembers = mockMembers.filter(m => m.isActive).length;
    const tierDistribution = {
      bronze: mockMembers.filter(m => m.tier === "bronze").length,
      silver: mockMembers.filter(m => m.tier === "silver").length,
      gold: mockMembers.filter(m => m.tier === "gold").length,
      platinum: mockMembers.filter(m => m.tier === "platinum").length,
    };
    const totalSpent = mockMembers.reduce((sum, m) => sum + m.totalSpent, 0);
    const totalPoints = mockMembers.reduce((sum, m) => sum + m.points, 0);
    
    return { totalMembers, activeMembers, tierDistribution, totalSpent, totalPoints };
  };

  const stats = getMembershipStats();

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

  const calculatePointsDecay = (member: typeof mockMembers[0]) => {
    const now = new Date();
    const lastDecay = member.lastPointDecay;
    const monthsSinceDecay = (now.getFullYear() - lastDecay.getFullYear()) * 12 + 
                            (now.getMonth() - lastDecay.getMonth());
    
    if (monthsSinceDecay >= 12) {
      const decayAmount = member.points * 0.3; // 30% decay per year
      return Math.floor(decayAmount);
    }
    return 0;
  };

  const getNextTierProgress = (member: typeof mockMembers[0]) => {
    const tiers = ["bronze", "silver", "gold", "platinum"];
    const currentIndex = tiers.indexOf(member.tier);
    
    if (currentIndex === tiers.length - 1) {
      return { nextTier: "Platinum (Max)", progress: 100, needed: 0 };
    }

    const tierRequirements = {
      bronze: 0,
      silver: 5000000,   // 5M
      gold: 15000000,    // 15M
      platinum: 35000000  // 35M
    };

    const nextTier = tiers[currentIndex + 1] as keyof typeof tierRequirements;
    const currentRequired = tierRequirements[member.tier as keyof typeof tierRequirements];
    const nextRequired = tierRequirements[nextTier];
    const progress = ((member.totalSpent - currentRequired) / (nextRequired - currentRequired)) * 100;
    const needed = nextRequired - member.totalSpent;

    return { nextTier, progress: Math.max(0, Math.min(100, progress)), needed };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistem Keanggotaan</h1>
          <p className="text-gray-600 mt-1">
            Kelola membership tiers, loyalty points, dan benefit program
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/membership/points">
            <Button variant="outline">
              <span className="mr-2">🎯</span>
              Points Management
            </Button>
          </Link>
          <Link href="/membership/vouchers">
            <Button variant="outline">
              <span className="mr-2">🎫</span>
              Voucher System
            </Button>
          </Link>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <span className="mr-2">⭐</span>
            Membership Program
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalMembers}</div>
              <div className="text-xs text-gray-500">Total Members</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-xl mb-1">🥉</div>
              <div className="text-lg font-bold text-orange-600">{stats.tierDistribution.bronze}</div>
              <div className="text-xs text-gray-500">Bronze</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-xl mb-1">🥈</div>
              <div className="text-lg font-bold text-gray-600">{stats.tierDistribution.silver}</div>
              <div className="text-xs text-gray-500">Silver</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-xl mb-1">🥇</div>
              <div className="text-lg font-bold text-yellow-600">{stats.tierDistribution.gold}</div>
              <div className="text-xs text-gray-500">Gold</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-xl mb-1">💎</div>
              <div className="text-lg font-bold text-purple-600">{stats.tierDistribution.platinum}</div>
              <div className="text-xs text-gray-500">Platinum</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-sm font-bold text-green-600">
                {formatCurrency(stats.totalSpent)}
              </div>
              <div className="text-xs text-gray-500">Total Spending</div>
              <div className="text-xs text-blue-600 mt-1">
                {stats.totalPoints.toLocaleString()} Points
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Membership Tiers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(memberBenefits).map(([tier, benefits]) => (
          <Card key={tier} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${benefits.color}`}></div>
            <CardHeader className="text-center pb-4">
              <div className="text-4xl mb-2">{benefits.icon}</div>
              <CardTitle className="text-lg">{benefits.tier} Member</CardTitle>
              <p className="text-sm text-gray-500">
                {stats.tierDistribution[tier as keyof typeof stats.tierDistribution]} members
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="font-medium text-green-600">{benefits.discountPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Points:</span>
                  <span className="font-medium">{benefits.pointsMultiplier}x</span>
                </div>
                <div className="space-y-1">
                  <span className="font-medium">Birthday Gift:</span>
                  <p className="text-xs text-gray-600">{benefits.birthdayGift.description}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-medium">Benefits:</span>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {benefits.familyBenefits.map((benefit, index) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                    {benefits.priorityBooking && <li>• Priority booking</li>}
                    {benefits.exclusiveOffers && <li>• Exclusive offers</li>}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Member Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search member name, membership number, or referral code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="bronze">🥉 Bronze</SelectItem>
                <SelectItem value="silver">🥈 Silver</SelectItem>
                <SelectItem value="gold">🥇 Gold</SelectItem>
                <SelectItem value="platinum">💎 Platinum</SelectItem>
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
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Member Directory</CardTitle>
            <Badge variant="outline">
              {filteredMembers.length} members
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Tier & Status</TableHead>
                  <TableHead>Points & Progress</TableHead>
                  <TableHead>Spending</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">👥</div>
                        <p>No members found matching your criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => {
                    const patient = getPatientById(member.patientId);
                    if (!patient) return null;

                    const tierInfo = memberBenefits[member.tier];
                    const nextTierProgress = getNextTierProgress(member);
                    const pendingDecay = calculatePointsDecay(member);
                    
                    return (
                      <TableRow key={member.id} className="hover:bg-gray-50">
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
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>{member.membershipNumber}</span>
                                <span>•</span>
                                <span>Joined {formatDate(member.joinDate)}</span>
                              </div>
                              <p className="text-xs text-blue-600">
                                Referral: {member.referralCode}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{tierInfo.icon}</span>
                              <Badge className={getMemberTierColor(member.tier)}>
                                {member.tier.toUpperCase()}
                              </Badge>
                            </div>
                            <Badge 
                              variant={member.isActive ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {member.isActive ? "✅ Active" : "❌ Inactive"}
                            </Badge>
                            <div className="text-xs text-gray-500">
                              {tierInfo.discountPercentage}% discount • {tierInfo.pointsMultiplier}x points
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {member.points.toLocaleString()} pts
                              </span>
                              {pendingDecay > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  -{pendingDecay} decay
                                </Badge>
                              )}
                            </div>
                            
                            {nextTierProgress.nextTier !== "Platinum (Max)" && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>To {nextTierProgress.nextTier}:</span>
                                  <span>{formatCurrency(nextTierProgress.needed)}</span>
                                </div>
                                <Progress value={nextTierProgress.progress} className="h-2" />
                              </div>
                            )}
                            
                            {member.familyMembers.length > 0 && (
                              <p className="text-xs text-gray-500">
                                👨‍👩‍👧‍👦 {member.familyMembers.length} family members
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {formatCurrency(member.totalSpent)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Total lifetime spending
                            </p>
                            {member.birthdayGiftClaimed && (
                              <Badge variant="secondary" className="text-xs">
                                🎁 Birthday gift claimed
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Link href={`/patients/${member.patientId}`}>
                              <Button size="sm" variant="outline">
                                Profile
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline">
                              Points
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