import React, { useState } from 'react';
import { User, Search, Calendar, FileText, Phone, Mail, History, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type PatientsView = 'list' | 'detail';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  lastVisit: string;
  nextAppointment?: string;
  totalVisits: number;
  conditions: string[];
  notes: string;
}

interface Visit {
  id: string;
  date: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

export const DoctorPatientsScreen = () => {
  const [currentView, setCurrentView] = useState<PatientsView>('list');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock patients data
  const patients: Patient[] = [
    {
      id: '1',
      name: 'Ana Mendoza',
      email: 'ana.mendoza@email.com',
      phone: '+51 987 654 321',
      age: 45,
      lastVisit: '2024-01-15',
      nextAppointment: '2024-01-25',
      totalVisits: 8,
      conditions: ['Hipertensión', 'Diabetes tipo 2'],
      notes: 'Paciente con buen control de presión arterial. Requiere seguimiento de glucosa.'
    },
    {
      id: '2',
      name: 'Carlos Torres',
      email: 'carlos.torres@email.com',
      phone: '+51 123 456 789',
      age: 52,
      lastVisit: '2024-01-10',
      totalVisits: 12,
      conditions: ['Arritmia', 'Colesterol alto'],
      notes: 'Paciente con arritmia controlada. Revisar estudios cardiológicos en próxima cita.'
    },
    {
      id: '3',
      name: 'María López',
      email: 'maria.lopez@email.com',
      phone: '+51 555 123 456',
      age: 38,
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-30',
      totalVisits: 5,
      conditions: ['Ansiedad'],
      notes: 'Primera consulta cardiológica. Sin antecedentes cardíacos previos.'
    },
    {
      id: '4',
      name: 'Pedro García',
      email: 'pedro.garcia@email.com',
      phone: '+51 444 555 666',
      age: 61,
      lastVisit: '2024-01-05',
      totalVisits: 15,
      conditions: ['Insuficiencia cardíaca', 'Hipertensión'],
      notes: 'Paciente crónico estable. Control mensual requerido.'
    }
  ];

  // Mock visit history
  const visitHistory: Record<string, Visit[]> = {
    '1': [
      {
        id: 'v1',
        date: '2024-01-15',
        reason: 'Control rutinario',
        diagnosis: 'Hipertensión controlada',
        treatment: 'Continuar con medicación actual',
        notes: 'Presión arterial dentro de rangos normales. Paciente adherente al tratamiento.'
      },
      {
        id: 'v2',
        date: '2023-12-15',
        reason: 'Ajuste de medicación',
        diagnosis: 'Hipertensión',
        treatment: 'Aumento de dosis de Losartán',
        notes: 'Presión arterial ligeramente elevada. Se ajusta medicación.'
      }
    ]
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.conditions.some(condition => 
      condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderPatientsList = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Mis Pacientes</h2>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar pacientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-center">
            <p className="text-2xl font-semibold text-blue-700">{patients.length}</p>
            <p className="text-sm text-blue-600">Total Pacientes</p>
          </div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-center">
            <p className="text-2xl font-semibold text-green-700">
              {patients.filter(p => p.nextAppointment).length}
            </p>
            <p className="text-sm text-green-600">Próximas Citas</p>
          </div>
        </Card>
      </div>

      {/* Patients List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <Card 
            key={patient.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedPatient(patient);
              setCurrentView('detail');
            }}
          >
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-blue-500 text-white">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{patient.name}</h4>
                <p className="text-sm text-gray-600">{patient.age} años</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patient.conditions.slice(0, 2).map((condition, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                  {patient.conditions.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{patient.conditions.length - 2} más
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-500">Última visita</p>
                <p className="text-sm font-medium text-gray-800">
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </p>
                {patient.nextAppointment && (
                  <p className="text-xs text-green-600 mt-1">
                    Próxima: {new Date(patient.nextAppointment).toLocaleDateString()}
                  </p>
                )}
                <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No se encontraron pacientes</p>
          <p className="text-sm text-gray-500">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );

  const renderPatientDetail = () => {
    if (!selectedPatient) return null;

    const patientVisits = visitHistory[selectedPatient.id] || [];

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
          <h2 className="text-lg font-semibold text-gray-800">Perfil del Paciente</h2>
          <div></div>
        </div>

        {/* Patient Header */}
        <Card className="p-4 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-blue-500 text-white text-lg">
                {selectedPatient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{selectedPatient.name}</h3>
              <p className="text-gray-600">{selectedPatient.age} años</p>
              <p className="text-sm text-gray-500">{selectedPatient.totalVisits} visitas totales</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="text-gray-800">{selectedPatient.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Teléfono</p>
              <p className="text-gray-800">{selectedPatient.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Última visita</p>
              <p className="text-gray-800">
                {new Date(selectedPatient.lastVisit).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Próxima cita</p>
              <p className="text-gray-800">
                {selectedPatient.nextAppointment 
                  ? new Date(selectedPatient.nextAppointment).toLocaleDateString()
                  : 'No programada'
                }
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Condiciones médicas</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedPatient.conditions.map((condition, index) => (
                <Badge key={index} className="bg-red-100 text-red-800">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>

          {selectedPatient.notes && (
            <div className="mt-4">
              <p className="text-gray-500 text-sm">Notas del médico</p>
              <p className="text-gray-800 text-sm mt-1">{selectedPatient.notes}</p>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button variant="outline" className="py-3">
            <Phone className="w-4 h-4 mr-2" />
            Llamar
          </Button>
          <Button variant="outline" className="py-3">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
        </div>

        {/* Visit History */}
        <div>
          <h4 className="font-medium text-gray-800 mb-4">Historial de Visitas</h4>
          
          {patientVisits.length === 0 ? (
            <Card className="p-6 text-center">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hay historial de visitas disponible</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {patientVisits.map((visit) => (
                <Card key={visit.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-gray-800">{visit.reason}</h5>
                      <p className="text-sm text-gray-600">
                        {new Date(visit.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Consulta
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-500">Diagnóstico</p>
                      <p className="text-gray-800">{visit.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tratamiento</p>
                      <p className="text-gray-800">{visit.treatment}</p>
                    </div>
                    {visit.notes && (
                      <div>
                        <p className="text-gray-500">Observaciones</p>
                        <p className="text-gray-800">{visit.notes}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Add New Visit Note */}
        <Card className="p-4 mt-6 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-800">Agregar Nota de Visita</h4>
              <p className="text-sm text-blue-600">
                Registra observaciones de la consulta actual
              </p>
            </div>
          </div>
          <Button 
            className="w-full mt-3 bg-blue-500 hover:bg-blue-600"
            onClick={() => alert('Función de notas médicas en desarrollo')}
          >
            Nueva Nota
          </Button>
        </Card>
      </div>
    );
  };

  switch (currentView) {
    case 'detail':
      return renderPatientDetail();
    default:
      return renderPatientsList();
  }
};