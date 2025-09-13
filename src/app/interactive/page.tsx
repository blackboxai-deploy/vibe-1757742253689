"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/data";

export default function InteractivePage() {
  const [spinning, setSpinning] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  // Mock interactive features data
  const chatSessions = [
    {
      id: "chat001",
      patientName: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Hi, I'd like to book a botox appointment",
      timestamp: new Date("2024-01-20T10:30:00"),
      status: "active",
      messageCount: 5,
      isResolved: false
    },
    {
      id: "chat002", 
      patientName: "Sarah Kim",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332a78?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thank you for the treatment information",
      timestamp: new Date("2024-01-20T09:15:00"),
      status: "resolved",
      messageCount: 8,
      isResolved: true
    },
    {
      id: "chat003",
      patientName: "Amanda Chen", 
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      lastMessage: "What are the side effects of laser treatment?",
      timestamp: new Date("2024-01-19T16:45:00"),
      status: "pending",
      messageCount: 3,
      isResolved: false
    }
  ];

  const spinwheelRewards = [
    { id: "rw001", name: "10% Discount Voucher", type: "discount", value: 10, probability: 30, color: "#22c55e" },
    { id: "rw002", name: "Free Consultation", type: "treatment", value: 200000, probability: 20, color: "#3b82f6" },
    { id: "rw003", name: "100 Loyalty Points", type: "points", value: 100, probability: 25, color: "#8b5cf6" },
    { id: "rw004", name: "Free Basic Facial", type: "treatment", value: 500000, probability: 15, color: "#f59e0b" },
    { id: "rw005", name: "20% Discount Voucher", type: "discount", value: 20, probability: 8, color: "#ef4444" },
    { id: "rw006", name: "Free Premium Facial", type: "treatment", value: 1000000, probability: 2, color: "#06b6d4" },
  ];

  const feedbackData = [
    {
      id: "fb001",
      patientName: "Jessica Tan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      type: "service_rating",
      rating: 5,
      comment: "Excellent service! The botox treatment was painless and the results are amazing. Dr. Sarah is very professional.",
      category: "Treatment Quality",
      date: new Date("2024-01-20T14:30:00"),
      status: "reviewed",
      response: "Thank you for your kind words! We're delighted you're happy with your results."
    },
    {
      id: "fb002",
      patientName: "Priscilla Wijaya",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", 
      type: "facility",
      rating: 4,
      comment: "The clinic is very clean and modern. However, parking can be difficult during peak hours.",
      category: "Facility",
      date: new Date("2024-01-19T11:20:00"),
      status: "pending",
      response: null
    },
    {
      id: "fb003",
      patientName: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      type: "staff",
      rating: 5,
      comment: "All staff members are very friendly and accommodating. Luna did an amazing hydrafacial!",
      category: "Staff Service", 
      date: new Date("2024-01-18T15:45:00"),
      status: "reviewed",
      response: "We're so happy to hear about your positive experience with our team!"
    }
  ];

  const shopProducts = [
    {
      id: "shop001",
      name: "Vitamin C Serum - Professional Grade",
      category: "skincare",
      price: 850000,
      originalPrice: 1000000,
      discount: 15,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 24,
      stock: 15,
      description: "Clinical-grade vitamin C serum for brightening and anti-aging"
    },
    {
      id: "shop002", 
      name: "Hydrating Collagen Mask (5 pieces)",
      category: "skincare",
      price: 350000,
      originalPrice: 400000,
      discount: 12,
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 18,
      stock: 28,
      description: "Intensive hydrating mask with marine collagen"
    },
    {
      id: "shop003",
      name: "Sunscreen SPF 50+ - Dermatologist Recommended",
      category: "skincare", 
      price: 280000,
      originalPrice: 280000,
      discount: 0,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 31,
      stock: 42,
      description: "Broad spectrum protection with anti-aging benefits"
    }
  ];

  const getInteractiveStats = () => {
    const activeChatSessions = chatSessions.filter(c => c.status === "active").length;
    const pendingFeedback = feedbackData.filter(f => f.status === "pending").length;
    const averageRating = feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length;
    const totalShopProducts = shopProducts.length;
    const totalShopValue = shopProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

    return { activeChatSessions, pendingFeedback, averageRating, totalShopProducts, totalShopValue };
  };

  const stats = getInteractiveStats();

  const handleSpin = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      // Randomly select a reward based on probability
      const randomValue = Math.random() * 100;
      let cumulativeProbability = 0;
      let selectedReward = null;

      for (const reward of spinwheelRewards) {
        cumulativeProbability += reward.probability;
        if (randomValue <= cumulativeProbability) {
          selectedReward = reward;
          break;
        }
      }

      if (selectedReward) {
        alert(`Congratulations! You won: ${selectedReward.name}`);
      }
    }, 3000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "resolved": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "reviewed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "✨" : "");
  };

  const getPatientInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fitur Interaktif</h1>
          <p className="text-gray-600 mt-1">
            AI Assistant, reward system, feedback, dan e-commerce integration
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/interactive/ai-assistant">
            <Button variant="outline">
              <span className="mr-2">🤖</span>
              AI Assistant
            </Button>
          </Link>
          <Link href="/interactive/feedback">
            <Button variant="outline">
              <span className="mr-2">💬</span>
              Feedback Center
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            <span className="mr-2">🎮</span>
            Interactive Hub
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <span className="text-2xl">💬</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeChatSessions}</div>
            <p className="text-xs text-gray-500">Live conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Feedback</CardTitle>
            <span className="text-2xl">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingFeedback}</div>
            <p className="text-xs text-gray-500">Needs response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <span className="text-2xl">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-gray-500">Customer satisfaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shop Products</CardTitle>
            <span className="text-2xl">🛒</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalShopProducts}</div>
            <p className="text-xs text-gray-500">Available items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shop Value</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-emerald-600">
              {formatCurrency(stats.totalShopValue)}
            </div>
            <p className="text-xs text-gray-500">Total inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Assistant Chat */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🤖</span>
              <span>AI Assistant</span>
              <Badge variant="secondary">Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-60 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Hello! I'm your clinic AI assistant. How can I help you today?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2 justify-end">
                    <div className="bg-green-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">I'd like to know about botox pricing</p>
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">👤</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Our Botox treatments start from Rp 3,500,000. Would you like to schedule a consultation with Dr. Sarah Wilson?</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm">Send</Button>
              </div>
            </div>

            {/* Active Chat Sessions */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Active Chat Sessions</h4>
              <div className="space-y-2">
                {chatSessions.slice(0, 3).map((chat) => (
                  <div key={chat.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={chat.avatar} alt={chat.patientName} />
                        <AvatarFallback className="text-xs">
                          {getPatientInitials(chat.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{chat.patientName}</p>
                        <p className="text-xs text-gray-500 truncate w-40">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`text-xs ${getStatusColor(chat.status)}`}>
                      {chat.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spinwheel Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🎡</span>
              <span>Reward Spinwheel</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              {/* Spinwheel Visual */}
              <div className="relative">
                <div className={`w-48 h-48 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center ${spinning ? 'animate-spin' : ''}`}>
                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎁</div>
                      <p className="text-sm font-medium">
                        {spinning ? "Spinning..." : "Spin to Win!"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-800"></div>
                </div>
              </div>

              <Button 
                onClick={handleSpin} 
                disabled={spinning}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {spinning ? "🌀 Spinning..." : "🎯 Spin Now"}
              </Button>

              {/* Rewards List */}
              <div>
                <h4 className="text-sm font-medium mb-3">Available Rewards</h4>
                <div className="space-y-2">
                  {spinwheelRewards.map((reward) => (
                    <div key={reward.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: reward.color }}
                        ></div>
                        <span className="text-sm">{reward.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {reward.probability}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback & Shop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Feedback */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <span>💬</span>
                <span>Patient Feedback</span>
              </CardTitle>
              <Link href="/interactive/feedback">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackData.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={feedback.avatar} alt={feedback.patientName} />
                        <AvatarFallback className="text-xs">
                          {getPatientInitials(feedback.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{feedback.patientName}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{getRatingStars(feedback.rating)}</span>
                          <Badge variant="secondary" className="text-xs">
                            {feedback.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getStatusColor(feedback.status)}`}
                    >
                      {feedback.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {feedback.comment}
                  </p>
                  
                  {feedback.response && (
                    <div className="bg-blue-50 rounded p-2 mt-2">
                      <p className="text-xs text-blue-800">
                        <strong>Response:</strong> {feedback.response}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDate(feedback.date)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* E-commerce Shop */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <span>🛒</span>
                <span>Beauty Shop</span>
              </CardTitle>
              <Link href="/interactive/shop">
                <Button variant="outline" size="sm">View Shop</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shopProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-3 border rounded-lg p-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-bold text-green-600">
                        {formatCurrency(product.price)}
                      </span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-xs text-gray-500 line-through">
                            {formatCurrency(product.originalPrice)}
                          </span>
                          <Badge variant="secondary" className="text-xs bg-red-100 text-red-800">
                            -{product.discount}%
                          </Badge>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs">{getRatingStars(product.rating)}</span>
                      <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                      <span className="text-xs text-gray-500">• Stock: {product.stock}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    🛒 Add
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <p className="text-sm font-medium text-center">
                🎁 Free shipping for orders above {formatCurrency(500000)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}