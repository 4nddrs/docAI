import React, { useState } from 'react';
import { Users, Plus, UserPlus, Share, Bell, Shield, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

type FamilyView = 'list' | 'add' | 'detail' | 'share';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  emergency: boolean;
  connected: boolean;
  avatar?: string;
  lastSeen: string;
}

export const FamilyScreen = () => {
  const [currentView, setCurrentView] = useState<FamilyView>('list');
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const familyMembers: FamilyMember[] = [
    {
      id: '1',
      name: 'María Mendoza',
      relationship: 'Madre',
      email: 'maria.mendoza@email.com',
      phone: '+51 987 654 321',
      emergency: true,
      connected: true,
      lastSeen: 'Activa ahora'
    },
    {
      id: '2',
      name: 'Carlos Mendoza',
      relationship: 'Padre',
      email: 'carlos.mendoza@email.com',
      phone: '+51 123 456 789',
      emergency: true,
      connected: false,
      lastSeen: 'Hace 2 horas'
    },
    {
      id: '3',
      name: 'Ana Mendoza',
      relationship: 'Hermana',
      email: 'ana.mendoza@email.com',
      phone: '+51 555 123 456',
      emergency: false,
      connected: true,
      lastSeen: 'Hace 30 min'
    }
  ];

  const pendingInvitations = [
    { name: 'Luis Mendoza', relationship: 'Hermano', status: 'pending' },
    { name: 'Dr. García', relationship: 'Médico', status: 'sent' }
  ];

  const renderFamilyList = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Familia</h2>
        <Button
          onClick={() => setCurrentView('add')}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir
        </Button>
      </div>

      {/* Emergency Contacts */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-4">Contactos de Emergencia</h3>
        <div className="space-y-3">
          {familyMembers.filter(member => member.emergency).map((member) => (
            <Card 
              key={member.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow border-red-100 bg-red-50"
              onClick={() => {
                setSelectedMember(member);
                setCurrentView('detail');
              }}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-red-500 text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.relationship}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge 
                      className={`text-xs ${
                        member.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {member.connected ? 'En línea' : 'Desconectado'}
                    </Badge>
                    <Shield className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500">{member.lastSeen}</p>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline" className="p-2">
                      <Phone className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="p-2">
                      <Mail className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* All Family Members */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-4">Miembros de la Familia</h3>
        <div className="space-y-3">
          {familyMembers.map((member) => (
            <Card 
              key={member.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedMember(member);
                setCurrentView('detail');
              }}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.relationship}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge 
                      className={`text-xs ${
                        member.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {member.connected ? 'En línea' : 'Desconectado'}
                    </Badge>
                    {member.emergency && <Shield className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500">{member.lastSeen}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-800 mb-4">Invitaciones Pendientes</h3>
          <div className="space-y-3">
            {pendingInvitations.map((invitation, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{invitation.name}</p>
                      <p className="text-sm text-gray-600">{invitation.relationship}</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">
                    {invitation.status === 'pending' ? 'Pendiente' : 'Enviada'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Share Access */}
      <div className="mt-8">
        <Button
          onClick={() => setCurrentView('share')}
          variant="outline"
          className="w-full py-3 rounded-xl"
        >
          <Share className="w-4 h-4 mr-2" />
          Compartir Mi Historial
        </Button>
      </div>
    </div>
  );

  const renderAddFamily = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('list')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Añadir Familiar</h2>
        <div></div>
      </div>

      <form className="space-y-4">
        <div>
          <Label className="text-gray-600">Nombre completo</Label>
          <Input
            placeholder="Ej. María Mendoza"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-600">Parentesco</Label>
          <Input
            placeholder="Ej. Madre, Padre, Hermano/a"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-600">Email</Label>
          <Input
            type="email"
            placeholder="email@ejemplo.com"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-600">Teléfono</Label>
          <Input
            type="tel"
            placeholder="+51 123 456 789"
            className="mt-2"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <Label className="text-gray-600">Contacto de emergencia</Label>
            <p className="text-sm text-gray-500">Recibirá alertas críticas</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <Label className="text-gray-600">Acceso a historial</Label>
            <p className="text-sm text-gray-500">Puede ver mis datos médicos</p>
          </div>
          <Switch />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl mt-6"
          onClick={() => setCurrentView('list')}
        >
          Enviar Invitación
        </Button>
      </form>
    </div>
  );

  const renderMemberDetail = () => {
    if (!selectedMember) return null;

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
          <h2 className="text-lg font-semibold text-gray-800">Detalles</h2>
          <Button size="sm" variant="outline">
            Editar
          </Button>
        </div>

        <div className="text-center mb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={selectedMember.avatar} />
            <AvatarFallback className="bg-blue-500 text-white text-lg">
              {selectedMember.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold text-gray-800">{selectedMember.name}</h3>
          <p className="text-gray-600">{selectedMember.relationship}</p>
          <Badge 
            className={`mt-2 ${
              selectedMember.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {selectedMember.connected ? 'En línea' : 'Desconectado'}
          </Badge>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h4 className="font-medium text-gray-800 mb-3">Información de Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{selectedMember.email}</span>
                </div>
                <Button size="sm" variant="outline">
                  Email
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{selectedMember.phone}</span>
                </div>
                <Button size="sm" variant="outline">
                  Llamar
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium text-gray-800 mb-3">Configuración</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Contacto de emergencia</p>
                  <p className="text-sm text-gray-600">Recibe alertas críticas</p>
                </div>
                <Switch checked={selectedMember.emergency} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Acceso a historial</p>
                  <p className="text-sm text-gray-600">Puede ver mis datos médicos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Notificaciones</p>
                  <p className="text-sm text-gray-600">Alertas de medicamentos y citas</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium text-gray-800 mb-3">Actividad Reciente</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">• Vio tu historial médico - Hace 2 días</p>
              <p className="text-gray-600">• Recibió alerta de medicamento - Hace 1 semana</p>
              <p className="text-gray-600">• Se unió a la familia - Hace 1 mes</p>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full py-3 rounded-xl text-red-600 border-red-200 hover:bg-red-50"
          >
            Remover de la Familia
          </Button>
        </div>
      </div>
    );
  };

  const renderShareAccess = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('list')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Compartir Historial</h2>
        <div></div>
      </div>

      <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-3">
          <Share className="w-6 h-6 text-blue-500" />
          <div>
            <h4 className="font-medium text-blue-800">Acceso Temporal</h4>
            <p className="text-sm text-blue-600">Comparte tu historial por tiempo limitado</p>
          </div>
        </div>
      </Card>

      <form className="space-y-4">
        <div>
          <Label className="text-gray-600">Email del destinatario</Label>
          <Input
            type="email"
            placeholder="medico@hospital.com"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-600">Duración del acceso</Label>
          <select className="w-full p-3 border border-gray-200 rounded-lg mt-2">
            <option value="1">1 día</option>
            <option value="3">3 días</option>
            <option value="7">1 semana</option>
            <option value="30">1 mes</option>
          </select>
        </div>

        <div>
          <Label className="text-gray-600">Información a compartir</Label>
          <div className="space-y-2 mt-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Datos básicos</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Alergias</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Medicamentos actuales</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Historial completo</span>
            </label>
          </div>
        </div>

        <div>
          <Label className="text-gray-600">Mensaje (opcional)</Label>
          <textarea
            placeholder="Mensaje para el destinatario..."
            className="w-full p-3 border border-gray-200 rounded-lg mt-2 h-20"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl mt-6"
        >
          Compartir Historial
        </Button>
      </form>
    </div>
  );

  switch (currentView) {
    case 'add':
      return renderAddFamily();
    case 'detail':
      return renderMemberDetail();
    case 'share':
      return renderShareAccess();
    default:
      return renderFamilyList();
  }
};