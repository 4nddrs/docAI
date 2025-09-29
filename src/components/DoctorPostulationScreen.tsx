import React, { useState } from 'react';
import { Upload, User, FileText, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

type PostulationView = 'form' | 'status';

interface PostulationData {
  fullName: string;
  specialty: string;
  licenseNumber: string;
  email: string;
  phone: string;
  experience: string;
  description: string;
  cvFile: File | null;
  titleFile: File | null;
}

interface DoctorPostulationScreenProps {
  onRoleChange: (role: 'doctor' | 'nurse') => void;
}

export const DoctorPostulationScreen = ({ onRoleChange }: DoctorPostulationScreenProps) => {
  const [currentView, setCurrentView] = useState<PostulationView>('form');
  const [postulationType, setPostulationType] = useState<'doctor' | 'nurse'>('doctor');
  const [formData, setFormData] = useState<PostulationData>({
    fullName: '',
    specialty: '',
    licenseNumber: '',
    email: '',
    phone: '',
    experience: '',
    description: '',
    cvFile: null,
    titleFile: null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const specialties = {
    doctor: [
      'Medicina General',
      'Cardiología', 
      'Neurología',
      'Pediatría',
      'Ginecología',
      'Dermatología',
      'Oncología',
      'Psiquiatría'
    ],
    nurse: [
      'Enfermería General',
      'Cuidados Intensivos',
      'Enfermería Pediátrica',
      'Enfermería Geriátrica',
      'Enfermería Quirúrgica',
      'Salud Mental'
    ]
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Nombre completo es obligatorio';
    if (!formData.specialty) newErrors.specialty = 'Especialidad es obligatoria';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'Número de matrícula es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'Email es obligatorio';
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono es obligatorio';
    if (!formData.cvFile) newErrors.cvFile = 'CV es obligatorio';
    if (!formData.titleFile) newErrors.titleFile = 'Título profesional es obligatorio';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (field: 'cvFile' | 'titleFile', file: File | null) => {
    if (file) {
      // Validate file type and size
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, [field]: 'Solo se permiten archivos PDF' }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setErrors(prev => ({ ...prev, [field]: 'El archivo debe ser menor a 10MB' }));
        return;
      }
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save postulation data to localStorage for demo
      const postulation = {
        ...formData,
        type: postulationType,
        submissionDate: new Date().toISOString(),
        status: 'pending'
      };
      localStorage.setItem('doctorPostulation', JSON.stringify(postulation));
      setCurrentView('status');
    }
  };

  const renderForm = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
        Postulación {postulationType === 'doctor' ? 'Médico' : 'Enfermera/o'}
      </h2>

      {/* Type Selection */}
      <div className="flex space-x-4 mb-6">
        <Button
          variant={postulationType === 'doctor' ? 'default' : 'outline'}
          onClick={() => setPostulationType('doctor')}
          className="flex-1"
        >
          Doctor/a
        </Button>
        <Button
          variant={postulationType === 'nurse' ? 'default' : 'outline'}
          onClick={() => setPostulationType('nurse')}
          className="flex-1"
        >
          Enfermera/o
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-800 mb-4">Información Personal</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-gray-600">Nombre completo *</Label>
              <Input
                placeholder="Ej. Dr. María González"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className={`mt-2 ${errors.fullName ? 'border-red-300' : ''}`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-600">
                {postulationType === 'doctor' ? 'Especialidad médica' : 'Área de enfermería'} *
              </Label>
              <Select value={formData.specialty} onValueChange={(value) => setFormData(prev => ({ ...prev, specialty: value }))}>
                <SelectTrigger className={`mt-2 ${errors.specialty ? 'border-red-300' : ''}`}>
                  <SelectValue placeholder="Seleccionar especialidad" />
                </SelectTrigger>
                <SelectContent>
                  {specialties[postulationType].map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.specialty && (
                <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-600">
                {postulationType === 'doctor' ? 'Número de matrícula médica' : 'Número de registro sanitario'} *
              </Label>
              <Input
                placeholder="Ej. 12345678"
                value={formData.licenseNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                className={`mt-2 ${errors.licenseNumber ? 'border-red-300' : ''}`}
              />
              {errors.licenseNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-600">Email *</Label>
                <Input
                  type="email"
                  placeholder="email@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`mt-2 ${errors.email ? 'border-red-300' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Label className="text-gray-600">Teléfono *</Label>
                <Input
                  type="tel"
                  placeholder="+51 123 456 789"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`mt-2 ${errors.phone ? 'border-red-300' : ''}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <Label className="text-gray-600">Años de experiencia</Label>
              <Input
                placeholder="Ej. 5 años"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-600">Descripción profesional</Label>
              <Textarea
                placeholder="Breve descripción de tu experiencia y enfoque profesional..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="mt-2 h-24"
              />
            </div>
          </div>
        </Card>

        {/* Document Upload */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-800 mb-4">Documentos Requeridos</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-gray-600">Curriculum Vitae (PDF) *</Label>
              <div className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center ${
                errors.cvFile ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Arrastra tu CV aquí o haz clic para seleccionar</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload('cvFile', e.target.files?.[0] || null)}
                  className="hidden"
                  id="cv-upload"
                />
                <label htmlFor="cv-upload">
                  <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                    Seleccionar archivo
                  </Button>
                </label>
                {formData.cvFile && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData.cvFile.name}</p>
                )}
              </div>
              {errors.cvFile && (
                <p className="text-red-500 text-xs mt-1">{errors.cvFile}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-600">Título Profesional (PDF) *</Label>
              <div className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center ${
                errors.titleFile ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}>
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Arrastra tu título aquí o haz clic para seleccionar</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload('titleFile', e.target.files?.[0] || null)}
                  className="hidden"
                  id="title-upload"
                />
                <label htmlFor="title-upload">
                  <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                    Seleccionar archivo
                  </Button>
                </label>
                {formData.titleFile && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData.titleFile.name}</p>
                )}
              </div>
              {errors.titleFile && (
                <p className="text-red-500 text-xs mt-1">{errors.titleFile}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
        >
          Enviar Postulación
        </Button>
      </form>
    </div>
  );

  const renderStatus = () => {
    const postulation = JSON.parse(localStorage.getItem('doctorPostulation') || '{}');
    
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Estado de Postulación</h2>
        
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Postulación Enviada</h3>
          <p className="text-gray-600">Tu solicitud está siendo revisada</p>
        </div>

        <Card className="p-4 mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Resumen de tu postulación</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Fecha de envío:</span>
              <span className="text-gray-800">
                {new Date(postulation.submissionDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tipo:</span>
              <span className="text-gray-800">
                {postulation.type === 'doctor' ? 'Médico' : 'Enfermera/o'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nombre:</span>
              <span className="text-gray-800">{postulation.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Especialidad:</span>
              <span className="text-gray-800">{postulation.specialty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <Badge className="bg-yellow-100 text-yellow-800">
                Pendiente
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-800">Proceso de Revisión</h4>
              <p className="text-sm text-blue-600">
                Nuestro equipo revisará tus documentos en 24-48 horas. 
                Recibirás una notificación con el resultado.
              </p>
            </div>
          </div>
        </Card>

        {/* Demo buttons for testing */}
        <div className="space-y-3">
          <Button
            onClick={() => {
              const approved = { ...postulation, status: 'approved' };
              localStorage.setItem('doctorPostulation', JSON.stringify(approved));
              onRoleChange(postulation.type);
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
          >
            [DEMO] Simular Aprobación
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setCurrentView('form')}
            className="w-full py-3 rounded-xl"
          >
            Editar Postulación
          </Button>
        </div>
      </div>
    );
  };

  switch (currentView) {
    case 'status':
      return renderStatus();
    default:
      return renderForm();
  }
};