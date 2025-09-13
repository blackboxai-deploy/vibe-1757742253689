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
import { mockServices, formatCurrency } from "@/lib/data";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  // Filter and sort services
  const filteredServices = mockServices
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
      return matchesSearch && matchesCategory && service.isActive;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        case "duration":
          return a.duration - b.duration;
        default:
          return 0;
      }
    });

  const getServiceStats = () => {
    const totalServices = mockServices.filter(s => s.isActive).length;
    const categories = {
      injection: mockServices.filter(s => s.category === "injection" && s.isActive).length,
      laser: mockServices.filter(s => s.category === "laser" && s.isActive).length,
      facial: mockServices.filter(s => s.category === "facial" && s.isActive).length,
      surgery: mockServices.filter(s => s.category === "surgery" && s.isActive).length,
      infusion: mockServices.filter(s => s.category === "infusion" && s.isActive).length,
      consultation: mockServices.filter(s => s.category === "consultation" && s.isActive).length,
    };
    
    return { totalServices, categories };
  };

  const stats = getServiceStats();

  const getCategoryIcon = (category: string) => {
    const icons = {
      injection: "💉",
      laser: "⚡",
      facial: "✨",
      surgery: "🏥",
      infusion: "💧",
      consultation: "👨‍⚕️",
    };
    return icons[category as keyof typeof icons] || "🔹";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      injection: "bg-blue-100 text-blue-800",
      laser: "bg-purple-100 text-purple-800",
      facial: "bg-pink-100 text-pink-800",
      surgery: "bg-red-100 text-red-800",
      infusion: "bg-teal-100 text-teal-800",
      consultation: "bg-gray-100 text-gray-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getDurationText = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`.trim();
    }
    return `${mins}m`;
  };

  const getPopularityStars = (popularity: number) => {
    const stars = Math.round(popularity / 20); // Convert 0-100 to 0-5 stars
    return "⭐".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Layanan Klinik</h1>
          <p className="text-gray-600 mt-1">
            Kelola layanan treatment dan prosedur kecantikan
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/services/booking">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <span className="mr-2">📅</span>
              Booking System
            </Button>
          </Link>
          <Button variant="outline">
            <span className="mr-2">➕</span>
            Tambah Layanan
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalServices}</div>
              <div className="text-xs text-gray-500">Total Layanan</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-xl mb-1">💉</div>
              <div className="text-lg font-bold text-blue-600">{stats.categories.injection}</div>
              <div className="text-xs text-gray-500">Injection</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-xl mb-1">⚡</div>
              <div className="text-lg font-bold text-purple-600">{stats.categories.laser}</div>
              <div className="text-xs text-gray-500">Laser</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-xl mb-1">✨</div>
              <div className="text-lg font-bold text-pink-600">{stats.categories.facial}</div>
              <div className="text-xs text-gray-500">Facial</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-xl mb-1">🏥</div>
              <div className="text-lg font-bold text-red-600">{stats.categories.surgery}</div>
              <div className="text-xs text-gray-500">Surgery</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-xl mb-1">💧</div>
              <div className="text-lg font-bold text-teal-600">{stats.categories.infusion}</div>
              <div className="text-xs text-gray-500">Infusion</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Pencarian & Filter Layanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari nama layanan atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="injection">💉 Injection</SelectItem>
                <SelectItem value="laser">⚡ Laser</SelectItem>
                <SelectItem value="facial">✨ Facial</SelectItem>
                <SelectItem value="surgery">🏥 Surgery</SelectItem>
                <SelectItem value="infusion">💧 Infusion</SelectItem>
                <SelectItem value="consultation">👨‍⚕️ Consultation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularitas</SelectItem>
                <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                <SelectItem value="price-low">Harga Terendah</SelectItem>
                <SelectItem value="duration">Durasi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada layanan yang sesuai
            </h3>
            <p className="text-gray-500">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                      <Badge className={getCategoryColor(service.category)}>
                        {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {service.name}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>

                {/* Before/After Photos */}
                {service.beforeAfterPhotos.length > 0 && (
                  <div className="flex space-x-2 overflow-hidden rounded-lg">
                    {service.beforeAfterPhotos.slice(0, 2).map((photo, index) => (
                      <div key={index} className="flex-1">
                        <img 
                          src={photo} 
                          alt={`${service.name} ${index === 0 ? 'Before' : 'After'}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <p className="text-xs text-gray-500 text-center mt-1">
                          {index === 0 ? 'Before' : 'After'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Service Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Durasi:</span>
                    <span className="font-medium">{getDurationText(service.duration)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Popularitas:</span>
                    <span className="text-sm">{getPopularityStars(service.popularity)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Komisi:</span>
                    <span className="font-medium text-green-600">{service.commission}%</span>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Harga:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Link href={`/services/booking/new?serviceId=${service.id}`} className="flex-1">
                    <Button className="w-full" size="sm">
                      <span className="mr-1">📅</span>
                      Book Now
                    </Button>
                  </Link>
                  <Link href={`/services/${service.id}`}>
                    <Button variant="outline" size="sm">
                      Detail
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Results Info */}
      <div className="text-center text-sm text-gray-500">
        Menampilkan {filteredServices.length} dari {stats.totalServices} layanan aktif
      </div>
    </div>
  );
}