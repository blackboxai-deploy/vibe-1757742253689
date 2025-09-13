// ========================================
// COMPREHENSIVE TYPES FOR CLINIC MANAGEMENT SYSTEM
// ========================================

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'doctor' | 'staff' | 'receptionist';
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

// ========================================
// 1. MANAJEMEN PASIEN
// ========================================

export interface Patient {
  id: string;
  registrationNumber: string;
  name: string;
  email?: string;
  phone: string;
  address: string;
  birthDate: Date;
  gender: 'male' | 'female';
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  notes?: string;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Visit {
  id: string;
  patientId: string;
  checkInTime: Date;
  checkOutTime?: Date;
  status: 'checked-in' | 'in-treatment' | 'completed' | 'cancelled';
  serviceIds: string[];
  staffId: string;
  notes?: string;
  totalAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  visitId: string;
  diagnosis: string;
  treatment: string;
  prescription: string[];
  doctorId: string;
  soapNotes: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  createdAt: Date;
}

export interface Assessment {
  id: string;
  patientId: string;
  visitId: string;
  beforePhotos: string[];
  afterPhotos: string[];
  skinCondition: string;
  recommendations: string[];
  treatmentPlan: string;
  followUpDate?: Date;
  doctorId: string;
  createdAt: Date;
}

export interface InformedConsent {
  id: string;
  patientId: string;
  treatmentId: string;
  consentType: 'treatment' | 'surgery' | 'medication' | 'procedure';
  content: string;
  risks: string[];
  benefits: string[];
  alternatives: string[];
  patientSignature: string;
  doctorSignature: string;
  witnessSignature?: string;
  signedAt: Date;
  isValid: boolean;
}

// ========================================
// 2. LAYANAN KLINIK
// ========================================

export interface Service {
  id: string;
  name: string;
  category: 'facial' | 'surgery' | 'injection' | 'laser' | 'infusion' | 'consultation';
  description: string;
  duration: number; // in minutes
  price: number;
  commission: number; // percentage
  requiredStaff: ('doctor' | 'nurse' | 'beautician')[];
  equipment: string[];
  beforeAfterPhotos: string[];
  isActive: boolean;
  popularity: number;
  createdAt: Date;
}

export interface Booking {
  id: string;
  patientId: string;
  serviceIds: string[];
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  assignedStaffId?: string;
  notes?: string;
  totalAmount: number;
  depositAmount?: number;
  reminderSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffAssignment {
  id: string;
  staffId: string;
  bookingId: string;
  serviceId: string;
  assignedAt: Date;
  completedAt?: Date;
  commission: number;
  performance: number; // 1-5 rating
}

// ========================================
// 3. MANAJEMEN INVENTARIS
// ========================================

export interface Medicine {
  id: string;
  name: string;
  category: 'injection' | 'topical' | 'oral' | 'supplement';
  manufacturer: string;
  batchNumber: string;
  expiryDate: Date;
  quantity: number;
  unit: 'ml' | 'mg' | 'pieces' | 'vial' | 'syringe';
  costPerUnit: number;
  sellingPrice: number;
  minStockLevel: number;
  location: string;
  requiresPrescription: boolean;
  sideEffects: string[];
  contraindications: string[];
  createdAt: Date;
}

export interface Consumable {
  id: string;
  name: string;
  category: 'disposable' | 'equipment' | 'supplies';
  brand: string;
  specifications: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  minStockLevel: number;
  supplierId: string;
  location: string;
  isDisposable: boolean;
  usageTracking: boolean;
  createdAt: Date;
}

export interface StockTransaction {
  id: string;
  itemType: 'medicine' | 'consumable';
  itemId: string;
  transactionType: 'in' | 'out' | 'adjustment' | 'expired' | 'damaged';
  quantity: number;
  reason: string;
  referenceId?: string; // booking, visit, or purchase order
  performedBy: string;
  cost?: number;
  createdAt: Date;
}

export interface WasteRecord {
  id: string;
  wasteType: 'solid' | 'liquid' | 'sharps' | 'pharmaceutical';
  items: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  weight: number;
  disposalMethod: string;
  disposalCompany: string;
  disposalDate: Date;
  certificateNumber: string;
  handledBy: string;
  cost: number;
  createdAt: Date;
}

// ========================================
// 4. SISTEM KEANGGOTAAN
// ========================================

export interface Member {
  id: string;
  patientId: string;
  membershipNumber: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  totalSpent: number;
  joinDate: Date;
  lastPointDecay: Date;
  birthdayGiftClaimed: boolean;
  familyMembers: string[]; // patient IDs
  referralCode: string;
  referredBy?: string;
  isActive: boolean;
}

export interface LoyaltyTransaction {
  id: string;
  memberId: string;
  type: 'earn' | 'redeem' | 'decay' | 'bonus' | 'birthday';
  points: number;
  description: string;
  relatedBookingId?: string;
  createdAt: Date;
}

export interface Voucher {
  id: string;
  code: string;
  memberId?: string; // null for general vouchers
  type: 'discount' | 'treatment' | 'birthday' | 'referral';
  value: number;
  minSpend?: number;
  applicableServices: string[];
  expiryDate: Date;
  isUsed: boolean;
  usedAt?: Date;
  usedInBooking?: string;
  createdAt: Date;
}

export interface MembershipBenefit {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  pointsMultiplier: number;
  discountPercentage: number;
  birthdayGift: {
    type: 'voucher' | 'treatment' | 'product';
    value: number;
    description: string;
  };
  familyBenefits: string[];
  exclusiveOffers: boolean;
  priorityBooking: boolean;
}

// ========================================
// 5. MANAJEMEN KEUANGAN
// ========================================

export interface Payment {
  id: string;
  bookingId?: string;
  patientId: string;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'transfer' | 'qris' | 'installment';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paidAt?: Date;
  refundedAt?: Date;
  refundReason?: string;
  fees: number;
  netAmount: number;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  bookingId?: string;
  items: {
    serviceId: string;
    serviceName: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Date;
  paidAt?: Date;
  notes?: string;
  createdAt: Date;
}

export interface Commission {
  id: string;
  staffId: string;
  bookingId: string;
  serviceId: string;
  commissionType: 'service' | 'referral' | 'bonus';
  percentage: number;
  amount: number;
  status: 'pending' | 'approved' | 'paid';
  approvedBy?: string;
  paidAt?: Date;
  createdAt: Date;
}

export interface FinancialReport {
  period: {
    start: Date;
    end: Date;
  };
  revenue: {
    total: number;
    byService: { serviceId: string; amount: number }[];
    byPaymentMethod: { method: string; amount: number }[];
  };
  expenses: {
    total: number;
    categories: { category: string; amount: number }[];
  };
  commissions: {
    total: number;
    byStaff: { staffId: string; amount: number }[];
  };
  profit: number;
  patientStats: {
    newPatients: number;
    returningPatients: number;
    totalVisits: number;
  };
}

// ========================================
// 6. DOKUMEN MEDIS
// ========================================

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  visitId: string;
  prescriptionNumber: string;
  medications: {
    medicineId: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  diagnosis: string;
  notes?: string;
  doctorSignature: string;
  createdAt: Date;
  isDispensed: boolean;
  dispensedAt?: Date;
}

export interface ReferralLetter {
  id: string;
  patientId: string;
  doctorId: string;
  referralNumber: string;
  referToHospital: string;
  referToDepartment: string;
  referToDoctor?: string;
  diagnosis: string;
  reason: string;
  clinicalFindings: string;
  treatmentGiven: string;
  recommendations: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  doctorSignature: string;
  createdAt: Date;
  followUpRequired: boolean;
}

export interface MedicalCertificate {
  id: string;
  patientId: string;
  doctorId: string;
  certificateNumber: string;
  type: 'sick_leave' | 'fitness' | 'medical_condition' | 'treatment_completion';
  diagnosis?: string;
  recommendedRest?: number; // days
  restrictions?: string[];
  validFrom: Date;
  validTo?: Date;
  purpose: string;
  doctorSignature: string;
  clinicStamp: string;
  createdAt: Date;
}

// ========================================
// 7. SISTEM ADMINISTRASI
// ========================================

export interface Employee {
  id: string;
  employeeNumber: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: 'medical' | 'admin' | 'finance' | 'marketing';
  specializations: string[];
  qualifications: string[];
  licenseNumber?: string;
  hireDate: Date;
  salary: number;
  commissionRate: number;
  isActive: boolean;
  schedule: {
    [key: string]: { // day of week
      startTime: string;
      endTime: string;
      isWorking: boolean;
    };
  };
  avatar?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  type: 'meeting' | 'training' | 'holiday' | 'maintenance' | 'event';
  attendees: string[]; // employee IDs
  location?: string;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  createdBy: string;
  createdAt: Date;
}

export interface BroadcastMessage {
  id: string;
  title: string;
  content: string;
  type: 'sms' | 'email' | 'whatsapp' | 'push';
  targetAudience: 'all_patients' | 'members_only' | 'specific_tier' | 'custom';
  targetCriteria?: {
    memberTier?: string[];
    lastVisit?: number; // days
    totalSpent?: { min?: number; max?: number };
    patientIds?: string[];
  };
  scheduledAt?: Date;
  sentAt?: Date;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  sentCount: number;
  createdBy: string;
  createdAt: Date;
}

export interface OTPRecord {
  id: string;
  phone: string;
  code: string;
  purpose: 'login' | 'booking' | 'payment' | 'registration';
  expiresAt: Date;
  isUsed: boolean;
  usedAt?: Date;
  attempts: number;
  createdAt: Date;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  deviceInfo: string;
  ipAddress: string;
  loginAt: Date;
  lastActivity: Date;
  expiresAt: Date;
  isActive: boolean;
}

// ========================================
// 8. FITUR INTERAKTIF
// ========================================

export interface ChatSession {
  id: string;
  patientId?: string;
  sessionId: string;
  messages: {
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
    metadata?: any;
  }[];
  status: 'active' | 'resolved' | 'escalated';
  createdAt: Date;
  resolvedAt?: Date;
}

export interface SpinwheelReward {
  id: string;
  name: string;
  type: 'points' | 'discount' | 'treatment' | 'product';
  value: number;
  probability: number; // percentage
  isActive: boolean;
  validUntil?: Date;
  usageLimit?: number;
  timesUsed: number;
}

export interface SpinwheelResult {
  id: string;
  memberId: string;
  rewardId: string;
  spunAt: Date;
  rewardClaimed: boolean;
  claimedAt?: Date;
  voucherCode?: string;
}

export interface Feedback {
  id: string;
  patientId: string;
  visitId?: string;
  type: 'service_rating' | 'facility' | 'staff' | 'suggestion' | 'complaint';
  rating?: number; // 1-5
  comment: string;
  category: string;
  isAnonymous: boolean;
  status: 'pending' | 'reviewed' | 'resolved';
  response?: string;
  respondedBy?: string;
  respondedAt?: Date;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category: 'skincare' | 'supplement' | 'equipment' | 'cosmetic';
  brand: string;
  description: string;
  price: number;
  costPrice: number;
  stock: number;
  minStockLevel: number;
  images: string[];
  specifications: { [key: string]: string };
  isActive: boolean;
  weight?: number;
  dimensions?: string;
  createdAt: Date;
}

export interface ShoppingCart {
  id: string;
  patientId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  expiresAt: Date;
  createdAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  patientId: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  deliveredAt?: Date;
}

// ========================================
// 9. LAPORAN & ANALISIS
// ========================================

export interface DashboardKPI {
  totalPatients: number;
  newPatientsToday: number;
  appointmentsToday: number;
  revenueToday: number;
  revenueThisMonth: number;
  pendingPayments: number;
  lowStockItems: number;
  membershipGrowth: number;
  popularServices: { serviceId: string; count: number }[];
  staffPerformance: { staffId: string; rating: number; bookings: number }[];
}

export interface AnalyticsData {
  patientDemographics: {
    ageGroups: { range: string; count: number }[];
    genderDistribution: { gender: string; count: number }[];
    locationDistribution: { area: string; count: number }[];
  };
  serviceAnalytics: {
    popularityTrends: { serviceId: string; bookings: number; revenue: number }[];
    seasonalTrends: { month: string; bookings: number }[];
    conversionRates: { service: string; rate: number }[];
  };
  financialTrends: {
    monthlyRevenue: { month: string; revenue: number; profit: number }[];
    paymentMethodPreference: { method: string; usage: number }[];
    averageSpendPerPatient: number;
  };
  membershipAnalytics: {
    tierDistribution: { tier: string; count: number }[];
    pointsRedemption: { month: string; points: number }[];
    retentionRate: number;
  };
}

// ========================================
// 10. NOTIFICATION SYSTEM
// ========================================

export interface Notification {
  id: string;
  recipientId: string;
  recipientType: 'patient' | 'staff' | 'admin';
  type: 'appointment' | 'payment' | 'stock_alert' | 'birthday' | 'reminder' | 'promotion';
  title: string;
  message: string;
  data?: any;
  channels: ('push' | 'sms' | 'email' | 'in_app')[];
  scheduledAt?: Date;
  sentAt?: Date;
  readAt?: Date;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
}

// ========================================
// UTILITY TYPES
// ========================================

export type AppointmentStatus = Booking['status'];
export type PaymentStatus = Payment['status'];
export type MemberTier = Member['tier'];
export type ServiceCategory = Service['category'];
export type UserRole = User['role'];

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchFilters {
  query?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedBy: string;
  createdAt: Date;
}