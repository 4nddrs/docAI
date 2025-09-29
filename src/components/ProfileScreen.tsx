import React, { useState } from 'react';
import { Edit, Copy, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Juan',
    lastName: 'Mendoza',
    phone: '(+51) 7334 5689',
    gender: 'Masculino',
    birthDate: '12/01/1997',
    email: 'juan.mendoza@gmail.com',
    bloodType: 'Desconoce',
    nationality: 'Cardiólogo',
  });

  const profileItems = [
    { label: 'Teléfono', value: userData.phone, icon: <Copy className="w-4 h-4" /> },
    { label: 'Sexo', value: userData.gender },
    { label: 'Fecha de Nacimiento', value: userData.birthDate, icon: <Copy className="w-4 h-4" /> },
    { label: 'Email', value: userData.email, icon: <Copy className="w-4 h-4" /> },
  ];

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  if (isEditing) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Editar Perfil</h2>
        
        <div className="space-y-4">
          <div>
            <Label className="text-gray-600">Nombre</Label>
            <Input
              value={userData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-600">Apellido</Label>
            <Input
              value={userData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-600">Fecha de nacimiento</Label>
            <Input
              value={userData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-600">Sexo</Label>
            <Select defaultValue={userData.gender}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Femenino">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-600">Nacionalidad</Label>
            <Select defaultValue={userData.nationality}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Peruano">Peruano</SelectItem>
                <SelectItem value="Cardiólogo">Cardiólogo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-600">Especialidad</Label>
            <Select defaultValue="Cardiólogo">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cardiólogo">Cardiólogo</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-600">Teléfono</Label>
            <Input
              value={userData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-600">Email</Label>
            <Input
              value={userData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-600">Fecha de Titulación</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                value="TituloDocIA.json.pdf"
                readOnly
                className="flex-1"
              />
              <Button size="sm" variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-3 pt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="bg-blue-500 text-white text-xl">JM</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold text-gray-800">Juan Mendoza</h2>
      </div>

      {/* Profile Information */}
      <div className="space-y-4 mb-8">
        {profileItems.map((item, index) => (
          <Card key={index} className="p-4 bg-white border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                <p className="text-gray-800">{item.value}</p>
              </div>
              {item.icon && (
                <button className="text-gray-400 hover:text-gray-600">
                  {item.icon}
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => setIsEditing(true)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar Perfil
        </Button>

        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-xl"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Salir
        </Button>
      </div>
    </div>
  );
};