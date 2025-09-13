// ========================================
// COMPREHENSIVE MOCK DATA FOR CLINIC MANAGEMENT SYSTEM
// ========================================

import { 
  Patient, Visit, Service, Booking, Medicine, Consumable, 
  Member, Employee, Prescription, Invoice, DashboardKPI,
  StockTransaction, Commission, Feedback, Product, Notification
} from "./types";

// ========================================
// PATIENTS DATA
// ========================================
export const mockPatients: Patient[] = [
  {
    id: "p001",
    registrationNumber: "REG001",
    name: "Maria Isabella Rodriguez",
    email: "maria.rodriguez@email.com",
    phone: "+62812-3456-7890",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    birthDate: new Date("1985-03-15"),
    gender: "female",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "+62812-9876-5432",
      relationship: "Suami"
    },
    medicalHistory: ["Alergi seafood", "Riwayat operasi mata 2020"],
    allergies: ["Seafood", "Penisilin"],
    currentMedications: ["Vitamin C 1000mg", "Collagen supplement"],
    notes: "Pasien reguler, prefer treatment sore hari",
    profilePhoto: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1857833a-15c8-40d8-8312-6a16f79239a3.png",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "p002",
    registrationNumber: "REG002",
    name: "Sarah Kim Johnson",
    email: "sarah.kim@email.com",
    phone: "+62813-2468-1357",
    address: "Jl. Thamrin No. 45, Jakarta Pusat",
    birthDate: new Date("1990-07-22"),
    gender: "female",
    emergencyContact: {
      name: "Michael Johnson",
      phone: "+62813-7531-9642",
      relationship: "Suami"
    },
    medicalHistory: ["Tidak ada riwayat medis signifikan"],
    allergies: [],
    currentMedications: ["Multivitamin"],
    notes: "First time patient, interested in anti-aging treatments",
    profilePhoto: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cd0d65f1-3350-4b59-9b80-2ba06bf20074.png",
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "p003",
    registrationNumber: "REG003",
    name: "Amanda Chen Wei Ling",
    email: "amanda.chen@email.com",
    phone: "+62814-5678-9012",
    address: "Jl. Kemang Raya No. 78, Jakarta Selatan",
    birthDate: new Date("1988-11-05"),
    gender: "female",
    emergencyContact: {
      name: "David Chen",
      phone: "+62814-2109-8765",
      relationship: "Suami"
    },
    medicalHistory: ["Diabetes tipe 2 terkontrol", "Hipertensi ringan"],
    allergies: ["Lateks"],
    currentMedications: ["Metformin 500mg", "ACE inhibitor"],
    notes: "Requires special attention untuk diabetes management",
    profilePhoto: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c89f3ff5-9d72-4820-83a4-53614a7912b2.png",
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2024-01-05")
  },
  {
    id: "p004",
    registrationNumber: "REG004",
    name: "Jessica Tan Mei Hui",
    email: "jessica.tan@email.com",
    phone: "+62815-3456-7890",
    address: "Jl. Senopati No. 25, Jakarta Selatan",
    birthDate: new Date("1992-09-18"),
    gender: "female",
    emergencyContact: {
      name: "Linda Tan",
      phone: "+62815-9876-5432",
      relationship: "Ibu"
    },
    medicalHistory: ["Riwayat jerawat berat", "Operasi hidung 2021"],
    allergies: ["Sulfa drugs"],
    currentMedications: ["Tretinoin 0.05%", "Moisturizer SPF 30"],
    notes: "Post-surgery follow up, very satisfied dengan results",
    profilePhoto: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7bdb7fed-830c-4b82-877f-a596a11ee6ed.png",
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "p005",
    registrationNumber: "REG005",
    name: "Priscilla Wijaya",
    email: "priscilla.wijaya@email.com",
    phone: "+62816-7890-1234",
    address: "Jl. Pondok Indah No. 89, Jakarta Selatan",
    birthDate: new Date("1987-02-28"),
    gender: "female",
    emergencyContact: {
      name: "Robert Wijaya",
      phone: "+62816-4321-0987",
      relationship: "Suami"
    },
    medicalHistory: ["Melasma", "Riwayat kehamilan 3x"],
    allergies: ["Hydroquinone"],
    currentMedications: ["Vitamin E", "Tranexamic acid"],
    notes: "VIP patient, gold member, always book premium treatments",
    profilePhoto: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a5f5f51d-afe5-4926-b357-6a243c4117cd.png",
    createdAt: new Date("2022-05-15"),
    updatedAt: new Date("2024-01-08")
  }
];

// ========================================
// SERVICES DATA
// ========================================
export const mockServices: Service[] = [
  {
    id: "s001",
    name: "Botox Injection - Forehead",
    category: "injection",
    description: "Anti-aging botox treatment untuk mengurangi kerutan di dahi dengan hasil natural",
    duration: 45,
    price: 3500000,
    commission: 15,
    requiredStaff: ["doctor"],
    equipment: ["Botox Allergan", "Injection needle", "Ice pack", "Antiseptic"],
    beforeAfterPhotos: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/38d7f400-f369-4c45-ae45-1120c82d405c.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/316515a6-6ed1-4377-b94a-cd96c96df591.png"
    ],
    isActive: true,
    popularity: 95,
    createdAt: new Date("2023-01-01")
  },
  {
    id: "s002",
    name: "Filler Injection - Lips",
    category: "injection",
    description: "Hyaluronic acid filler untuk membentuk bibir lebih penuh dan natural",
    duration: 60,
    price: 4500000,
    commission: 18,
    requiredStaff: ["doctor"],
    equipment: ["HA Filler", "Cannula", "Lidocaine", "Ice pack"],
    beforeAfterPhotos: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/349b1831-ecc4-472f-babc-063f80a84a83.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/95cf7c40-f662-416b-aabb-bfaa398f4875.png"
    ],
    isActive: true,
    popularity: 88,
    createdAt: new Date("2023-01-01")
  },
  {
    id: "s003",
    name: "Carbon Laser Facial",
    category: "laser",
    description: "Treatment laser carbon untuk mengecilkan pori dan mencerahkan kulit wajah",
    duration: 90,
    price: 1800000,
    commission: 12,
    requiredStaff: ["doctor", "beautician"],
    equipment: ["Q-Switch Laser", "Carbon mask", "Cooling gel", "Sunscreen"],
    beforeAfterPhotos: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cca4171f-598f-4ab4-9bb4-9a66755e7280.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c89181a5-3120-47b7-b9a5-cd3f1e726f3e.png"
    ],
    isActive: true,
    popularity: 92,
    createdAt: new Date("2023-01-01")
  },
  {
    id: "s004",
    name: "Eyelid Surgery (Blepharoplasty)",
    category: "surgery",
    description: "Operasi kelopak mata untuk menghilangkan kantung mata dan memberikan tampilan fresh",
    duration: 180,
    price: 15000000,
    commission: 25,
    requiredStaff: ["doctor", "nurse"],
    equipment: ["Surgical instruments", "Local anesthesia", "Sutures", "Antibiotics"],
    beforeAfterPhotos: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c4aaac25-0397-4d8b-94a8-0fac15fd043c.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/51b81b9d-3855-41a6-948d-f00a7c52dc52.png"
    ],
    isActive: true,
    popularity: 75,
    createdAt: new Date("2023-01-01")
  },
  {
    id: "s005",
    name: "IV Vitamin Drip - Glow",
    category: "infusion",
    description: "Infus vitamin C, glutathione, dan kolagen untuk glowing skin dari dalam",
    duration: 120,
    price: 850000,
    commission: 10,
    requiredStaff: ["nurse"],
    equipment: ["IV set", "Vitamin C", "Glutathione", "Collagen", "Saline"],
    beforeAfterPhotos: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fa2971b0-f965-444e-b558-6ed07f1edae3.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/600a10d6-639a-4366-8b2e-ce62fc397dd9.png"
    ],
    isActive: true,
    popularity: 89,
    createdAt: new Date("2023-01-01")
  },
  {
    id: "s006",
    name: "Hydrafacial Premium",
    category: "facial",
    description: "Deep cleansing facial dengan teknologi hydradermabrasion dan serum premium",
    duration: 75,
    price: 1200000,
    commission: 15,
    requiredStaff: ["beautician"],
    equipment: ["Hydrafacial machine", "Premium serums", "LED light therapy"],
    beforeAfterPhotos: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3725dc1d-2d9d-4c03-8f97-4b71d1340bcf.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c08674e9-64bc-48ca-aa65-7acd998c3853.png"
    ],
    isActive: true,
    popularity: 94,
    createdAt: new Date("2023-01-01")
  },
  {
    id: "s007",
    name: "RF Skin Tightening",
    category: "laser",
    description: "Radio frequency treatment untuk mengencangkan kulit dan mengurangi fine lines",
    duration: 60,
    price: 2200000,
    commission: 14,
    requiredStaff: ["doctor", "beautician"],
    equipment: ["RF device", "Conductive gel", "Cooling system"],
    beforeAfterPhotos: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b9312a75-bdbd-44ac-983d-c9e751ee55db.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0aec1b6a-633a-499d-88de-fcb75850b52c.png"
    ],
    isActive: true,
    popularity: 82,
    createdAt: new Date("2023-01-01")
  },
  {
    id: "s008",
    name: "Consultation - First Visit",
    category: "consultation",
    description: "Konsultasi komprehensif dengan dokter untuk menentukan treatment plan terbaik",
    duration: 30,
    price: 200000,
    commission: 0,
    requiredStaff: ["doctor"],
    equipment: ["Skin analyzer", "Consultation form", "Camera"],
    beforeAfterPhotos: [],
    isActive: true,
    popularity: 100,
    createdAt: new Date("2023-01-01")
  }
];

// ========================================
// EMPLOYEES DATA
// ========================================
export const mockEmployees: Employee[] = [
  {
    id: "e001",
    employeeNumber: "EMP001",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@beautyclinic.com",
    phone: "+62821-1234-5678",
    position: "Chief Medical Officer",
    department: "medical",
    specializations: ["Aesthetic Medicine", "Dermatology", "Plastic Surgery"],
    qualifications: ["MD", "Aesthetic Medicine Certificate", "Dermatology Board"],
    licenseNumber: "STR-001-2020",
    hireDate: new Date("2020-01-15"),
    salary: 25000000,
    commissionRate: 20,
    isActive: true,
    schedule: {
      "Monday": { startTime: "09:00", endTime: "17:00", isWorking: true },
      "Tuesday": { startTime: "09:00", endTime: "17:00", isWorking: true },
      "Wednesday": { startTime: "09:00", endTime: "17:00", isWorking: true },
      "Thursday": { startTime: "09:00", endTime: "17:00", isWorking: true },
      "Friday": { startTime: "09:00", endTime: "15:00", isWorking: true },
      "Saturday": { startTime: "09:00", endTime: "13:00", isWorking: true },
      "Sunday": { startTime: "", endTime: "", isWorking: false },
    },
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d2890326-8b43-4c8c-a67c-e0eae75346d7.png",
    emergencyContact: {
      name: "James Wilson",
      phone: "+62821-8765-4321",
      relationship: "Suami"
    }
  },
  {
    id: "e002",
    employeeNumber: "EMP002",
    name: "Dr. Michael Chen",
    email: "michael.chen@beautyclinic.com",
    phone: "+62822-2345-6789",
    position: "Aesthetic Doctor",
    department: "medical",
    specializations: ["Injectable Treatments", "Laser Therapy", "Skin Rejuvenation"],
    qualifications: ["MD", "Aesthetic Medicine Diploma"],
    licenseNumber: "STR-002-2021",
    hireDate: new Date("2021-03-01"),
    salary: 18000000,
    commissionRate: 18,
    isActive: true,
    schedule: {
      "Monday": { startTime: "10:00", endTime: "18:00", isWorking: true },
      "Tuesday": { startTime: "10:00", endTime: "18:00", isWorking: true },
      "Wednesday": { startTime: "", endTime: "", isWorking: false },
      "Thursday": { startTime: "10:00", endTime: "18:00", isWorking: true },
      "Friday": { startTime: "10:00", endTime: "18:00", isWorking: true },
      "Saturday": { startTime: "09:00", endTime: "15:00", isWorking: true },
      "Sunday": { startTime: "09:00", endTime: "13:00", isWorking: true },
    },
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/121e344c-4bab-448a-9bb7-f74d64806e44.png",
    emergencyContact: {
      name: "Lisa Chen",
      phone: "+62822-9876-5432",
      relationship: "Istri"
    }
  },
  {
    id: "e003",
    employeeNumber: "EMP003",
    name: "Nurse Amanda Rodriguez",
    email: "amanda.rodriguez@beautyclinic.com",
    phone: "+62823-3456-7890",
    position: "Senior Nurse",
    department: "medical",
    specializations: ["IV Therapy", "Post-procedure Care", "Patient Education"],
    qualifications: ["RN License", "IV Therapy Certificate"],
    licenseNumber: "NURSE-003-2019",
    hireDate: new Date("2019-06-15"),
    salary: 8500000,
    commissionRate: 8,
    isActive: true,
    schedule: {
      "Monday": { startTime: "08:00", endTime: "16:00", isWorking: true },
      "Tuesday": { startTime: "08:00", endTime: "16:00", isWorking: true },
      "Wednesday": { startTime: "08:00", endTime: "16:00", isWorking: true },
      "Thursday": { startTime: "08:00", endTime: "16:00", isWorking: true },
      "Friday": { startTime: "08:00", endTime: "16:00", isWorking: true },
      "Saturday": { startTime: "", endTime: "", isWorking: false },
      "Sunday": { startTime: "", endTime: "", isWorking: false },
    },
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/035861a0-9149-4e0a-a0e9-35c1c51b9308.png",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "+62823-1098-7654",
      relationship: "Suami"
    }
  },
  {
    id: "e004",
    employeeNumber: "EMP004",
    name: "Beauty Therapist Luna Park",
    email: "luna.park@beautyclinic.com",
    phone: "+62824-4567-8901",
    position: "Senior Beauty Therapist",
    department: "medical",
    specializations: ["Facial Treatments", "Hydrafacial", "Skin Analysis"],
    qualifications: ["Beauty Therapy License", "Hydrafacial Certification"],
    hireDate: new Date("2022-01-10"),
    salary: 6500000,
    commissionRate: 12,
    isActive: true,
    schedule: {
      "Monday": { startTime: "09:00", endTime: "17:00", isWorking: true },
      "Tuesday": { startTime: "09:00", endTime: "17:00", isWorking: true },
      "Wednesday": { startTime: "09:00", endTime: "17:00", isWorking: true },
      "Thursday": { startTime: "09:00", endTime: "17:00", isWorking: true },
      "Friday": { startTime: "09:00", endTime: "17:00", isWorking: true },
      "Saturday": { startTime: "09:00", endTime: "15:00", isWorking: true },
      "Sunday": { startTime: "", endTime: "", isWorking: false },
    },
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d2f8838b-325b-4f53-9b93-840c03a07045.png",
    emergencyContact: {
      name: "David Park",
      phone: "+62824-7654-3210",
      relationship: "Ayah"
    }
  }
];

// ========================================
// MEDICINES & INVENTORY DATA
// ========================================
export const mockMedicines: Medicine[] = [
  {
    id: "m001",
    name: "Botox Allergan 100 Units",
    category: "injection",
    manufacturer: "Allergan",
    batchNumber: "BTX2024A",
    expiryDate: new Date("2025-06-30"),
    quantity: 12,
    unit: "vial",
    costPerUnit: 2800000,
    sellingPrice: 3500000,
    minStockLevel: 5,
    location: "Refrigerator A - Shelf 1",
    requiresPrescription: true,
    sideEffects: ["Temporary bruising", "Mild swelling", "Headache"],
    contraindications: ["Pregnancy", "Breastfeeding", "Neuromuscular disorders"],
    createdAt: new Date("2024-01-01")
  },
  {
    id: "m002",
    name: "Hyaluronic Acid Filler 1ml",
    category: "injection",
    manufacturer: "Juvederm",
    batchNumber: "JUV2024B",
    expiryDate: new Date("2025-12-31"),
    quantity: 8,
    unit: "syringe",
    costPerUnit: 3200000,
    sellingPrice: 4500000,
    minStockLevel: 3,
    location: "Refrigerator A - Shelf 2",
    requiresPrescription: true,
    sideEffects: ["Injection site reactions", "Temporary swelling", "Bruising"],
    contraindications: ["Pregnancy", "Active skin infection", "Autoimmune disorders"],
    createdAt: new Date("2024-01-01")
  },
  {
    id: "m003",
    name: "Vitamin C 1000mg Injection",
    category: "injection",
    manufacturer: "Kimia Farma",
    batchNumber: "VTC2024C",
    expiryDate: new Date("2025-03-15"),
    quantity: 25,
    unit: "vial",
    costPerUnit: 45000,
    sellingPrice: 85000,
    minStockLevel: 10,
    location: "Medicine Cabinet B - Drawer 1",
    requiresPrescription: false,
    sideEffects: ["Mild nausea", "Injection site discomfort"],
    contraindications: ["Kidney stones history", "Iron overload"],
    createdAt: new Date("2024-01-01")
  },
  {
    id: "m004",
    name: "Glutathione 600mg",
    category: "injection",
    manufacturer: "Tationil",
    batchNumber: "GLU2024D",
    expiryDate: new Date("2024-08-30"),
    quantity: 3,
    unit: "vial",
    costPerUnit: 180000,
    sellingPrice: 300000,
    minStockLevel: 8,
    location: "Refrigerator A - Shelf 3",
    requiresPrescription: false,
    sideEffects: ["Temporary skin lightening", "Mild dizziness"],
    contraindications: ["Asthma", "Pregnancy", "Breastfeeding"],
    createdAt: new Date("2024-01-01")
  }
];

export const mockConsumables: Consumable[] = [
  {
    id: "c001",
    name: "Disposable Syringe 1ml",
    category: "disposable",
    brand: "BD",
    specifications: "Sterile, single-use, luer lock",
    quantity: 45,
    unit: "pieces",
    costPerUnit: 3500,
    minStockLevel: 50,
    supplierId: "sup001",
    location: "Supply Room A - Shelf 1",
    isDisposable: true,
    usageTracking: true,
    createdAt: new Date("2024-01-01")
  },
  {
    id: "c002",
    name: "Sterile Gauze 4x4",
    category: "supplies",
    brand: "Hansaplast",
    specifications: "Non-woven, sterile packed",
    quantity: 120,
    unit: "pieces",
    costPerUnit: 2500,
    minStockLevel: 100,
    supplierId: "sup002",
    location: "Supply Room A - Shelf 2",
    isDisposable: true,
    usageTracking: false,
    createdAt: new Date("2024-01-01")
  },
  {
    id: "c003",
    name: "Alcohol Swabs",
    category: "supplies",
    brand: "Sensi",
    specifications: "70% isopropyl alcohol, individually packed",
    quantity: 180,
    unit: "pieces",
    costPerUnit: 1200,
    minStockLevel: 200,
    supplierId: "sup001",
    location: "Supply Room A - Drawer 1",
    isDisposable: true,
    usageTracking: false,
    createdAt: new Date("2024-01-01")
  }
];

// ========================================
// MEMBERSHIP DATA
// ========================================
export const mockMembers: Member[] = [
  {
    id: "mb001",
    patientId: "p001",
    membershipNumber: "GOLD001",
    tier: "gold",
    points: 8500,
    totalSpent: 25000000,
    joinDate: new Date("2023-01-20"),
    lastPointDecay: new Date("2024-01-01"),
    birthdayGiftClaimed: true,
    familyMembers: ["p006", "p007"], // family member IDs
    referralCode: "MARIA2024",
    isActive: true
  },
  {
    id: "mb002",
    patientId: "p002",
    membershipNumber: "SILVER001",
    tier: "silver",
    points: 3200,
    totalSpent: 8500000,
    joinDate: new Date("2023-06-15"),
    lastPointDecay: new Date("2024-01-01"),
    birthdayGiftClaimed: false,
    familyMembers: [],
    referralCode: "SARAH2024",
    referredBy: "MARIA2024",
    isActive: true
  },
  {
    id: "mb003",
    patientId: "p005",
    membershipNumber: "PLAT001",
    tier: "platinum",
    points: 15600,
    totalSpent: 45000000,
    joinDate: new Date("2022-05-20"),
    lastPointDecay: new Date("2024-01-01"),
    birthdayGiftClaimed: true,
    familyMembers: ["p008", "p009"],
    referralCode: "PRISC2024",
    isActive: true
  }
];

// ========================================
// BOOKINGS DATA
// ========================================
export const mockBookings: Booking[] = [
  {
    id: "b001",
    patientId: "p001",
    serviceIds: ["s001", "s003"],
    appointmentDate: new Date("2024-01-20"),
    startTime: "10:00",
    endTime: "12:15",
    status: "confirmed",
    assignedStaffId: "e001",
    notes: "Follow-up botox treatment, patient request natural results",
    totalAmount: 5300000,
    depositAmount: 1000000,
    reminderSent: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16")
  },
  {
    id: "b002",
    patientId: "p002",
    serviceIds: ["s006", "s005"],
    appointmentDate: new Date("2024-01-20"),
    startTime: "14:00",
    endTime: "17:15",
    status: "in-progress",
    assignedStaffId: "e004",
    notes: "First time patient, start dengan consultation",
    totalAmount: 2050000,
    reminderSent: true,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "b003",
    patientId: "p003",
    serviceIds: ["s002"],
    appointmentDate: new Date("2024-01-21"),
    startTime: "11:00",
    endTime: "12:00",
    status: "pending",
    notes: "Lip filler top-up session",
    totalAmount: 4500000,
    depositAmount: 2000000,
    reminderSent: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19")
  }
];

// ========================================
// INVOICES & FINANCIAL DATA
// ========================================
export const mockInvoices: Invoice[] = [
  {
    id: "inv001",
    invoiceNumber: "INV-2024-001",
    patientId: "p001",
    bookingId: "b001",
    items: [
      {
        serviceId: "s001",
        serviceName: "Botox Injection - Forehead",
        quantity: 1,
        price: 3500000,
        discount: 350000 // Gold member 10% discount
      },
      {
        serviceId: "s003",
        serviceName: "Carbon Laser Facial",
        quantity: 1,
        price: 1800000,
        discount: 180000
      }
    ],
    subtotal: 5300000,
    discountAmount: 530000,
    taxAmount: 477000,
    totalAmount: 5247000,
    paidAmount: 5247000,
    status: "paid",
    dueDate: new Date("2024-01-27"),
    paidAt: new Date("2024-01-20"),
    notes: "Gold member discount applied",
    createdAt: new Date("2024-01-20")
  }
];

// ========================================
// DASHBOARD KPI DATA
// ========================================
export const mockDashboardKPI: DashboardKPI = {
  totalPatients: 1247,
  newPatientsToday: 3,
  appointmentsToday: 12,
  revenueToday: 18500000,
  revenueThisMonth: 485000000,
  pendingPayments: 8,
  lowStockItems: 3,
  membershipGrowth: 15.8,
  popularServices: [
    { serviceId: "s006", count: 45 },
    { serviceId: "s001", count: 38 },
    { serviceId: "s005", count: 34 },
    { serviceId: "s003", count: 28 }
  ],
  staffPerformance: [
    { staffId: "e001", rating: 4.9, bookings: 85 },
    { staffId: "e002", rating: 4.7, bookings: 72 },
    { staffId: "e004", rating: 4.8, bookings: 68 }
  ]
};

// ========================================
// PRODUCTS FOR E-COMMERCE
// ========================================
export const mockProducts: Product[] = [
  {
    id: "prod001",
    name: "Advanced Vitamin C Serum",
    category: "skincare",
    brand: "SkinMedica",
    description: "Clinical-grade vitamin C serum untuk brightening dan anti-aging",
    price: 850000,
    costPrice: 425000,
    stock: 15,
    minStockLevel: 5,
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2ad6d302-ba72-410d-b64a-a7c7e473a33b.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/34345c3e-0bd1-4b10-a3ae-dc79da43dab7.png"
    ],
    specifications: {
      "Volume": "30ml",
      "Concentration": "20% L-Ascorbic Acid",
      "pH": "3.5-4.0",
      "Shelf Life": "12 months after opening"
    },
    isActive: true,
    weight: 150,
    dimensions: "12cm x 4cm x 4cm",
    createdAt: new Date("2024-01-01")
  },
  {
    id: "prod002",
    name: "Hydrating Collagen Mask",
    category: "skincare",
    brand: "BeautyMed",
    description: "Intensive hydrating mask dengan marine collagen dan hyaluronic acid",
    price: 150000,
    costPrice: 75000,
    stock: 28,
    minStockLevel: 10,
    images: [
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/76738f51-4a0a-465a-a2db-29c1a180bd55.png",
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d6737034-7716-4e2f-9e4c-4486e86403f7.png"
    ],
    specifications: {
      "Type": "Sheet mask",
      "Material": "Bio-cellulose",
      "Usage": "1-2 times per week",
      "Suitable for": "All skin types"
    },
    isActive: true,
    weight: 30,
    dimensions: "15cm x 10cm x 1cm",
    createdAt: new Date("2024-01-01")
  }
];

// ========================================
// NOTIFICATIONS
// ========================================
export const mockNotifications: Notification[] = [
  {
    id: "notif001",
    recipientId: "e001",
    recipientType: "staff",
    type: "appointment",
    title: "Upcoming Appointment",
    message: "Maria Rodriguez appointment in 30 minutes - Botox + Laser",
    channels: ["in_app", "push"],
    sentAt: new Date("2024-01-20T09:30:00"),
    status: "delivered",
    priority: "high",
    createdAt: new Date("2024-01-20T09:30:00")
  },
  {
    id: "notif002",
    recipientId: "admin",
    recipientType: "admin",
    type: "stock_alert",
    title: "Low Stock Alert",
    message: "Glutathione 600mg stock running low (3 units remaining)",
    channels: ["in_app", "email"],
    sentAt: new Date("2024-01-20T08:00:00"),
    status: "delivered",
    priority: "medium",
    createdAt: new Date("2024-01-20T08:00:00")
  }
];

// ========================================
// UTILITY FUNCTIONS
// ========================================
export function getPatientById(id: string): Patient | undefined {
  return mockPatients.find(patient => patient.id === id);
}

export function getServiceById(id: string): Service | undefined {
  return mockServices.find(service => service.id === id);
}

export function getEmployeeById(id: string): Employee | undefined {
  return mockEmployees.find(employee => employee.id === id);
}

export function getMemberByPatientId(patientId: string): Member | undefined {
  return mockMembers.find(member => member.patientId === patientId);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function getStatusColor(status: string): string {
  const statusColors: { [key: string]: string } = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800',
    'paid': 'bg-green-100 text-green-800',
    'unpaid': 'bg-red-100 text-red-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

export function getMemberTierColor(tier: string): string {
  const tierColors: { [key: string]: string } = {
    'bronze': 'bg-orange-100 text-orange-800',
    'silver': 'bg-gray-100 text-gray-800',
    'gold': 'bg-yellow-100 text-yellow-800',
    'platinum': 'bg-purple-100 text-purple-800',
  };
  return tierColors[tier] || 'bg-gray-100 text-gray-800';
}