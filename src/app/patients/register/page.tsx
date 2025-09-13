"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PatientForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  gender: "male" | "female" | "";
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
  notes: string;
}

export default function PatientRegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<PatientForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    gender: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PatientForm, string>>>({});

  const handleInputChange = (field: keyof PatientForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof PatientForm, string>> = {};

    switch (step) {
      case 1: // Personal Information
        if (!formData.name.trim()) newErrors.name = "Nama lengkap wajib diisi";
        if (!formData.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi";
        if (!formData.birthDate) newErrors.birthDate = "Tanggal lahir wajib diisi";
        if (!formData.gender) newErrors.gender = "Jenis kelamin wajib dipilih";
        break;
      case 2: // Contact Information
        if (!formData.address.trim()) newErrors.address = "Alamat wajib diisi";
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Format email tidak valid";
        }
        break;
      case 3: // Emergency Contact
        if (!formData.emergencyContactName.trim()) {
          newErrors.emergencyContactName = "Nama kontak darurat wajib diisi";
        }
        if (!formData.emergencyContactPhone.trim()) {
          newErrors.emergencyContactPhone = "Nomor kontak darurat wajib diisi";
        }
        if (!formData.emergencyContactRelationship.trim()) {
          newErrors.emergencyContactRelationship = "Hubungan kontak darurat wajib diisi";
        }
        break;
      case 4: // Medical Information - all optional
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const generateRegistrationNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `REG${year}${month}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const registrationNumber = generateRegistrationNumber();
      
      // Here you would normally send data to your API
      console.log("New patient data:", {
        ...formData,
        registrationNumber,
        createdAt: new Date(),
        id: `p${Date.now()}`,
      });

      toast.success("Pasien berhasil didaftarkan!", {
        description: `Nomor registrasi: ${registrationNumber}`,
        duration: 5000,
      });

      // Redirect to patients list or patient detail
      router.push("/patients");
    } catch (error) {
      toast.error("Gagal mendaftarkan pasien", {
        description: "Silakan coba lagi atau hubungi administrator",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return `${age - 1} tahun`;
    }
    return `${age} tahun`;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informasi Personal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Nomor Telepon *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+62812-3456-7890"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className={errors.birthDate ? "border-red-500" : ""}
                />
                {formData.birthDate && (
                  <p className="text-sm text-gray-500 mt-1">Usia: {calculateAge(formData.birthDate)}</p>
                )}
                {errors.birthDate && <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>}
              </div>

              <div>
                <Label>Jenis Kelamin *</Label>
                <Select 
                  value={formData.gender} 
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">👩 Perempuan</SelectItem>
                    <SelectItem value="male">👨 Laki-laki</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informasi Kontak</h3>
            
            <div>
              <Label htmlFor="email">Email (Opsional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@email.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="address">Alamat Lengkap *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Jl. Sudirman No. 123, Jakarta Selatan"
                rows={3}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Kontak Darurat</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContactName">Nama Kontak Darurat *</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  placeholder="Nama keluarga atau teman"
                  className={errors.emergencyContactName ? "border-red-500" : ""}
                />
                {errors.emergencyContactName && <p className="text-sm text-red-500 mt-1">{errors.emergencyContactName}</p>}
              </div>

              <div>
                <Label htmlFor="emergencyContactPhone">Nomor Telepon *</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  placeholder="+62812-9876-5432"
                  className={errors.emergencyContactPhone ? "border-red-500" : ""}
                />
                {errors.emergencyContactPhone && <p className="text-sm text-red-500 mt-1">{errors.emergencyContactPhone}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="emergencyContactRelationship">Hubungan *</Label>
                <Input
                  id="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => handleInputChange("emergencyContactRelationship", e.target.value)}
                  placeholder="Contoh: Suami, Istri, Anak, Orang Tua, Saudara"
                  className={errors.emergencyContactRelationship ? "border-red-500" : ""}
                />
                {errors.emergencyContactRelationship && <p className="text-sm text-red-500 mt-1">{errors.emergencyContactRelationship}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informasi Medis (Opsional)</h3>
            
            <div>
              <Label htmlFor="medicalHistory">Riwayat Medis</Label>
              <Textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                placeholder="Riwayat penyakit, operasi, atau kondisi medis sebelumnya"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="allergies">Alergi</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                placeholder="Alergi makanan, obat-obatan, atau bahan lainnya"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="currentMedications">Obat yang Sedang Dikonsumsi</Label>
              <Textarea
                id="currentMedications"
                value={formData.currentMedications}
                onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                placeholder="Obat-obatan atau suplemen yang sedang dikonsumsi"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="notes">Catatan Tambahan</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Informasi tambahan yang perlu diketahui"
                rows={2}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Registrasi Pasien Baru</h1>
          <p className="text-gray-600 mt-1">
            Lengkapi informasi pasien untuk mendaftarkan ke sistem klinik
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i + 1} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= currentStep 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    i + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>Personal</span>
            <span>Kontak</span>
            <span>Darurat</span>
            <span>Medis</span>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Step {currentStep} dari {totalSteps}
              </CardTitle>
              <Badge variant="outline">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
          >
            <span className="mr-2">←</span>
            Sebelumnya
          </Button>

          {currentStep < totalSteps ? (
            <Button type="button" onClick={handleNextStep}>
              Selanjutnya
              <span className="ml-2">→</span>
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">⏳</span>
                  Mendaftarkan...
                </>
              ) : (
                <>
                  <span className="mr-2">✅</span>
                  Daftarkan Pasien
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}