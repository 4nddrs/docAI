import React, { useState } from 'react';
import { User, FileText, Check, X, Download, Eye, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

type AdminView = 'list' | 'detail';

interface Postulation {
  id: string;
  fullName: string;
  specialty: string;
  licenseNumber: string;
  email: string;
  phone: string;
  type: 'doctor' | 'nurse';
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  experience?: string;
  description?: string;
  cvFile?: string;
  titleFile?: string;
}

export const AdminPanelScreen = () => {
  const [currentView, setCurrentView] = useState<AdminView>('list');
  const [selectedPostulation, setSelectedPostulation] = useState<Postulation | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Mock data for demo
  const postulations: Postulation[] = [
    {
      id: '1',
      fullName: 'Dr. María González',
      specialty: 'Cardiología',
      licenseNumber: '12345678',
      email: 'maria.gonzalez@email.com',
      phone: '+51 987 654 321',
      type: 'doctor',
      submissionDate: '2024-01-15T10:30:00Z',
      status: 'pending',
      experience: '8 años',
      description: 'Cardióloga con experiencia en cuidados intensivos y procedimientos intervencionistas.',
      cvFile: 'cv_maria_gonzalez.pdf',
      titleFile: 'titulo_maria_gonzalez.pdf'
    },
    {
      id: '2',
      fullName: 'Enf. Carlos Mendoza',
      specialty: 'Cuidados Intensivos',
      licenseNumber: '87654321',
      email: 'carlos.mendoza@email.com',
      phone: '+51 123 456 789',
      type: 'nurse',
      submissionDate: '2024-01-14T15:45:00Z',
      status: 'pending',
      experience: '5 años',
      description: 'Enfermero especializado en UCI con certificación en reanimación cardiopulmonar.',
      cvFile: 'cv_carlos_mendoza.pdf',
      titleFile: 'titulo_carlos_mendoza.pdf'
    },
    {
      id: '3',
      fullName: 'Dr. Ana Torres',
      specialty: 'Pediatría',
      licenseNumber: '11223344',
      email: 'ana.torres@email.com',
      phone: '+51 555 123 456',
      type: 'doctor',
      submissionDate: '2024-01-13T09:15:00Z',
      status: 'approved',
      experience: '12 años',
      description: 'Pediatra con subespecialidad en neonatología y cuidados intensivos pediátricos.'
    },
    {
      id: '4',
      fullName: 'Enf. Luis Vargas',
      specialty: 'Enfermería General',
      licenseNumber: '55667788',
      email: 'luis.vargas@email.com',
      phone: '+51 444 555 666',
      type: 'nurse',
      submissionDate: '2024-01-12T14:20:00Z',
      status: 'rejected',
      experience: '3 años'
    }
  ];

  const filteredPostulations = postulations.filter(postulation => {
    if (filterStatus === 'all') return true;
    return postulation.status === filterStatus;
  });

  const handleApprove = (postulation: Postulation) => {
    // In a real app, this would make an API call
    alert(`Postulación de ${postulation.fullName} aprobada. Se enviará notificación por email.`);
    setCurrentView('list');
  };

  const handleReject = () => {
    if (!selectedPostulation || !rejectReason.trim()) return;
    
    // In a real app, this would make an API call
    alert(`Postulación de ${selectedPostulation.fullName} rechazada.\nMotivo: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason('');
    setCurrentView('list');
  };

  const renderPostulationsList = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Panel de Administración</h2>
        <Badge className="bg-blue-100 text-blue-800">
          {filteredPostulations.length} postulaciones
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las postulaciones</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="approved">Aprobadas</SelectItem>
            <SelectItem value="rejected">Rechazadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <p className="text-2xl font-semibold text-yellow-700">
              {postulations.filter(p => p.status === 'pending').length}
            </p>
            <p className="text-sm text-yellow-600">Pendientes</p>
          </div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-center">
            <p className="text-2xl font-semibold text-green-700">
              {postulations.filter(p => p.status === 'approved').length}
            </p>
            <p className="text-sm text-green-600">Aprobadas</p>
          </div>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="text-center">
            <p className="text-2xl font-semibold text-red-700">
              {postulations.filter(p => p.status === 'rejected').length}
            </p>
            <p className="text-sm text-red-600">Rechazadas</p>
          </div>
        </Card>
      </div>

      {/* Postulations List */}
      <div className="space-y-4">
        {filteredPostulations.map((postulation) => (
          <Card 
            key={postulation.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedPostulation(postulation);
              setCurrentView('detail');
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  postulation.type === 'doctor' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <User className={`w-6 h-6 ${
                    postulation.type === 'doctor' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{postulation.fullName}</h4>
                  <p className="text-sm text-gray-600">{postulation.specialty}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(postulation.submissionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`${
                  postulation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  postulation.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                } mb-2`}>
                  {postulation.status === 'pending' ? 'Pendiente' :
                   postulation.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                </Badge>
                <p className="text-xs text-gray-500">
                  {postulation.type === 'doctor' ? 'Médico' : 'Enfermera/o'}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPostulations.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No hay postulaciones para mostrar</p>
        </div>
      )}
    </div>
  );

  const renderPostulationDetail = () => {
    if (!selectedPostulation) return null;

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
          <h2 className="text-lg font-semibold text-gray-800">Revisar Postulación</h2>
          <div></div>
        </div>

        {/* Professional Info */}
        <Card className="p-4 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              selectedPostulation.type === 'doctor' ? 'bg-blue-100' : 'bg-purple-100'
            }`}>
              <User className={`w-8 h-8 ${
                selectedPostulation.type === 'doctor' ? 'text-blue-600' : 'text-purple-600'
              }`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{selectedPostulation.fullName}</h3>
              <p className="text-gray-600">{selectedPostulation.specialty}</p>
              <Badge className={`${
                selectedPostulation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                selectedPostulation.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              } mt-1`}>
                {selectedPostulation.status === 'pending' ? 'Pendiente' :
                 selectedPostulation.status === 'approved' ? 'Aprobada' : 'Rechazada'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Tipo de profesional</p>
              <p className="text-gray-800">{selectedPostulation.type === 'doctor' ? 'Médico' : 'Enfermera/o'}</p>
            </div>
            <div>
              <p className="text-gray-500">Número de matrícula</p>
              <p className="text-gray-800">{selectedPostulation.licenseNumber}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="text-gray-800">{selectedPostulation.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Teléfono</p>
              <p className="text-gray-800">{selectedPostulation.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Experiencia</p>
              <p className="text-gray-800">{selectedPostulation.experience || 'No especificada'}</p>
            </div>
            <div>
              <p className="text-gray-500">Fecha de postulación</p>
              <p className="text-gray-800">
                {new Date(selectedPostulation.submissionDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {selectedPostulation.description && (
            <div className="mt-4">
              <p className="text-gray-500 text-sm">Descripción profesional</p>
              <p className="text-gray-800 text-sm mt-1">{selectedPostulation.description}</p>
            </div>
          )}
        </Card>

        {/* Documents */}
        <Card className="p-4 mb-6">
          <h4 className="font-medium text-gray-800 mb-4">Documentos</h4>
          <div className="space-y-3">
            {selectedPostulation.cvFile && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Curriculum Vitae</p>
                    <p className="text-xs text-gray-500">{selectedPostulation.cvFile}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {selectedPostulation.titleFile && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Título Profesional</p>
                    <p className="text-xs text-gray-500">{selectedPostulation.titleFile}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Actions */}
        {selectedPostulation.status === 'pending' && (
          <div className="space-y-3">
            <Button
              onClick={() => handleApprove(selectedPostulation)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
            >
              <Check className="w-4 h-4 mr-2" />
              Aprobar Postulación
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowRejectModal(true)}
              className="w-full py-3 rounded-xl text-red-600 border-red-200 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Rechazar Postulación
            </Button>
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 mx-4 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Rechazar Postulación</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Motivo del rechazo (se enviará al postulante)
                  </label>
                  <Textarea
                    placeholder="Explica el motivo del rechazo..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="h-24"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectReason('');
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleReject}
                    className="flex-1 bg-red-500 hover:bg-red-600"
                    disabled={!rejectReason.trim()}
                  >
                    Rechazar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  switch (currentView) {
    case 'detail':
      return renderPostulationDetail();
    default:
      return renderPostulationsList();
  }
};