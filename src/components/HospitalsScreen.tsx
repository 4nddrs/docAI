import React, { useState } from 'react';
import { MapPin, Star, Phone, Clock, Navigation, Filter, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

type HospitalView = 'list' | 'detail' | 'map';

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  specialties: string[];
  phone: string;
  hours: string;
  emergency: boolean;
  image: string;
}

export const HospitalsScreen = () => {
  const [currentView, setCurrentView] = useState<HospitalView>('list');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'Hospital General',
      address: 'Av. Principal 123, Ciudad',
      distance: '2.5 km',
      rating: 4.5,
      reviews: 120,
      specialties: ['Emergencias', 'Cardiología', 'Pediatría'],
      phone: '+51 123 456 789',
      hours: '24 horas',
      emergency: true,
      image: 'https://images.unsplash.com/photo-1582586730050-7f2ab868926c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbWVkaWNhbCUyMGNlbnRlcnxlbnwxfHx8fDE3NTkxNTY0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '2',
      name: 'Hospital Viedma',
      address: 'Calle Salud 456, Centro',
      distance: '1.8 km',
      rating: 4.8,
      reviews: 89,
      specialties: ['Neurología', 'Oncología', 'Ginecología'],
      phone: '+51 987 654 321',
      hours: '24 horas',
      emergency: true,
      image: 'https://images.unsplash.com/photo-1582586730050-7f2ab868926c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbWVkaWNhbCUyMGNlbnRlcnxlbnwxfHx8fDE3NTkxNTY0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '3',
      name: 'Clínica Especializada',
      address: 'Av. Médica 789, Norte',
      distance: '3.2 km',
      rating: 4.2,
      reviews: 45,
      specialties: ['Dermatología', 'Oftalmología'],
      phone: '+51 555 123 456',
      hours: '8:00 AM - 8:00 PM',
      emergency: false,
      image: 'https://images.unsplash.com/photo-1582586730050-7f2ab868926c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbWVkaWNhbCUyMGNlbnRlcnxlbnwxfHx8fDE3NTkxNTY0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const specialties = ['Todas', 'Emergencias', 'Cardiología', 'Pediatría', 'Neurología', 'Oncología'];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = !selectedFilter || selectedFilter === 'Todas' || 
                         hospital.specialties.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const renderHospitalsList = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Hospitales</h2>
      
      {/* Search and Filter */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar hospitales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {specialties.map(specialty => (
            <Button
              key={specialty}
              variant={selectedFilter === specialty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(specialty === selectedFilter ? '' : specialty)}
              className="whitespace-nowrap"
            >
              {specialty}
            </Button>
          ))}
        </div>
      </div>

      {/* Add Filter Distance */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-blue-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">Añadir Filtro</span>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Distancia
        </Button>
      </div>

      {/* Hospitals List */}
      <div className="space-y-4">
        {filteredHospitals.map((hospital) => (
          <Card 
            key={hospital.id}
            className="p-4 bg-white border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedHospital(hospital);
              setCurrentView('detail');
            }}
          >
            <div className="flex space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{hospital.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{hospital.address}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{hospital.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{hospital.reviews} reseñas</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{hospital.distance}</p>
                    {hospital.emergency && (
                      <Badge className="bg-red-100 text-red-600 text-xs mt-1">24h</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {hospital.specialties.slice(0, 2).map(specialty => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {hospital.specialties.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{hospital.specialties.length - 2} más
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderHospitalDetail = () => {
    if (!selectedHospital) return null;

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('list')}
          >
            ← Volver
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">Hospital Viedma</h2>
          <div></div>
        </div>

        {/* Hospital Image */}
        <div className="w-full h-48 bg-gray-200 rounded-2xl mb-6 overflow-hidden">
          <ImageWithFallback
            src={selectedHospital.image}
            alt={selectedHospital.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hospital Info */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">{selectedHospital.name}</h3>
            <p className="text-gray-600 text-sm">
              Atención Domiciliaria, consulta telefónica. Lorem ipsum 
              dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Dirección</h4>
              <p className="text-sm text-gray-600">{selectedHospital.address}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Teléfono</h4>
              <p className="text-sm text-gray-600">{selectedHospital.phone}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Horarios</h4>
              <p className="text-sm text-gray-600">{selectedHospital.hours}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Valoración</h4>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{selectedHospital.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Map */}
        <div className="bg-blue-100 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300"></div>
          <div className="relative z-10 text-center">
            <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-blue-800 font-medium">53min</p>
            <p className="text-blue-600 text-sm">1.7 mi</p>
          </div>
          <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            48min • 1.6 mi
          </div>
          <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl">
            <Navigation className="w-4 h-4 mr-2" />
            Abrir en Google Maps
          </Button>
          
          <Button variant="outline" className="w-full py-3 rounded-xl">
            <Phone className="w-4 h-4 mr-2" />
            Llamar Hospital
          </Button>
        </div>
      </div>
    );
  };

  switch (currentView) {
    case 'detail':
      return renderHospitalDetail();
    default:
      return renderHospitalsList();
  }
};