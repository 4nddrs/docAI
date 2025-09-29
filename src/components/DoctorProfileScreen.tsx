import React, { useState } from 'react';
import { User, Edit, Camera, Star, Calendar, Award, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

type ProfileView = 'view' | 'edit';

interface DoctorProfile {
  name: string;
  specialty: string;
  licenseNumber: string;
  email: string;
  phone: string;
  description: string;
  experience: string;
  education: string[];
  certifications: string[];
  languages: string[];
  avatar?: string;
}

export const DoctorProfileScreen = () => {
  const [currentView, setCurrentView] = useState<ProfileView>('view');
  const [profile, setProfile] = useState<DoctorProfile>({
    name: 'Dr. María González',
    specialty: 'Cardiología',
    licenseNumber: '12345678',
    email: 'maria.gonzalez@email.com',
    phone: '+51 987 654 321',
    description: 'Cardióloga con más de 8 años de experiencia en el diagnóstico y tratamiento de enfermedades cardiovasculares. Especializada en procedimientos intervencionistas y cuidados intensivos cardiológicos.',
    experience: '8 años',
    education: [
      'Médico Cirujano - Universidad Nacional Mayor de San Marcos',
      'Especialización en Cardiología - Hospital Nacional Dos de Mayo',
      'Fellowship en Cardiología Intervencionista - Clínica Anglo Americana'
    ],
    certifications: [
      'Certificación en Ecocardiografía',
      'ACLS (Advanced Cardiovascular Life Support)',
      'Certificación en Cateterismo Cardíaco'
    ],
    languages: ['Español', 'Inglés', 'Portugués']
  });

  const [editedProfile, setEditedProfile] = useState<DoctorProfile>(profile);

  const stats = {
    totalPatients: 156,
    appointmentsThisMonth: 42,
    rating: 4.8,
    reviewsCount: 89
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setCurrentView('view');
    alert('Perfil actualizado exitosamente');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setCurrentView('view');
  };

  const renderProfileView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Mi Perfil Profesional</h2>
        <Button
          onClick={() => setCurrentView('edit')}
          size="sm"
          variant="outline"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="p-4 mb-6">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-blue-500 text-white text-2xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
          <p className="text-gray-600">{profile.specialty}</p>
          <p className="text-sm text-gray-500">Matrícula: {profile.licenseNumber}</p>
          
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-800">{stats.rating}</span>
              <span className="text-sm text-gray-500">({stats.reviewsCount} reseñas)</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 text-center">
          <p className="text-2xl font-semibold text-blue-600">{stats.totalPatients}</p>
          <p className="text-sm text-gray-600">Pacientes totales</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-semibold text-green-600">{stats.appointmentsThisMonth}</p>
          <p className="text-sm text-gray-600">Citas este mes</p>
        </Card>
      </div>

      {/* Contact Information */}
      <Card className="p-4 mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Información de Contacto</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="text-gray-800">{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Teléfono</span>
            <span className="text-gray-800">{profile.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Experiencia</span>
            <span className="text-gray-800">{profile.experience}</span>
          </div>
        </div>
      </Card>

      {/* Description */}
      <Card className="p-4 mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Descripción Profesional</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{profile.description}</p>
      </Card>

      {/* Education */}
      <Card className="p-4 mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Formación Académica</h4>
        <div className="space-y-2">
          {profile.education.map((edu, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">{edu}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Certifications */}
      <Card className="p-4 mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Certificaciones</h4>
        <div className="flex flex-wrap gap-2">
          {profile.certifications.map((cert, index) => (
            <Badge key={index} className="bg-green-100 text-green-800">
              {cert}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Languages */}
      <Card className="p-4">
        <h4 className="font-medium text-gray-800 mb-3">Idiomas</h4>
        <div className="flex flex-wrap gap-2">
          {profile.languages.map((lang, index) => (
            <Badge key={index} variant="secondary">
              {lang}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderProfileEdit = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Editar Perfil</h2>
        <div className="flex space-x-2">
          <Button
            onClick={handleCancel}
            size="sm"
            variant="outline"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Guardar
          </Button>
        </div>
      </div>

      <form className="space-y-6">
        {/* Profile Photo */}
        <Card className="p-4">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={editedProfile.avatar} />
                <AvatarFallback className="bg-blue-500 text-white text-2xl">
                  {editedProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600"
                onClick={() => alert('Función de cambio de foto en desarrollo')}
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500">Haz clic para cambiar tu foto</p>
          </div>
        </Card>

        {/* Basic Information */}
        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-4">Información Básica</h4>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-600">Nombre completo</Label>
              <Input
                value={editedProfile.name}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-600">Especialidad</Label>
              <Input
                value={editedProfile.specialty}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, specialty: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-600">Email</Label>
                <Input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-gray-600">Teléfono</Label>
                <Input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-600">Años de experiencia</Label>
              <Input
                value={editedProfile.experience}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, experience: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-gray-600">Descripción profesional</Label>
              <Textarea
                value={editedProfile.description}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, description: e.target.value }))}
                className="mt-2 h-24"
                placeholder="Describe tu experiencia y enfoque profesional..."
              />
            </div>
          </div>
        </Card>

        {/* Education */}
        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-4">Formación Académica</h4>
          <div className="space-y-3">
            {editedProfile.education.map((edu, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={edu}
                  onChange={(e) => {
                    const newEducation = [...editedProfile.education];
                    newEducation[index] = e.target.value;
                    setEditedProfile(prev => ({ ...prev, education: newEducation }));
                  }}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newEducation = editedProfile.education.filter((_, i) => i !== index);
                    setEditedProfile(prev => ({ ...prev, education: newEducation }));
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setEditedProfile(prev => ({ 
                  ...prev, 
                  education: [...prev.education, ''] 
                }));
              }}
            >
              + Agregar formación
            </Button>
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-4">Certificaciones</h4>
          <div className="space-y-3">
            {editedProfile.certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={cert}
                  onChange={(e) => {
                    const newCertifications = [...editedProfile.certifications];
                    newCertifications[index] = e.target.value;
                    setEditedProfile(prev => ({ ...prev, certifications: newCertifications }));
                  }}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newCertifications = editedProfile.certifications.filter((_, i) => i !== index);
                    setEditedProfile(prev => ({ ...prev, certifications: newCertifications }));
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setEditedProfile(prev => ({ 
                  ...prev, 
                  certifications: [...prev.certifications, ''] 
                }));
              }}
            >
              + Agregar certificación
            </Button>
          </div>
        </Card>

        {/* Languages */}
        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-4">Idiomas</h4>
          <div className="space-y-3">
            {editedProfile.languages.map((lang, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={lang}
                  onChange={(e) => {
                    const newLanguages = [...editedProfile.languages];
                    newLanguages[index] = e.target.value;
                    setEditedProfile(prev => ({ ...prev, languages: newLanguages }));
                  }}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newLanguages = editedProfile.languages.filter((_, i) => i !== index);
                    setEditedProfile(prev => ({ ...prev, languages: newLanguages }));
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setEditedProfile(prev => ({ 
                  ...prev, 
                  languages: [...prev.languages, ''] 
                }));
              }}
            >
              + Agregar idioma
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );

  switch (currentView) {
    case 'edit':
      return renderProfileEdit();
    default:
      return renderProfileView();
  }
};