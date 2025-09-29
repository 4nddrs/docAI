import React, { useState, useEffect } from 'react';
import { Phone, MapPin, AlertTriangle, Users, FileText, Shield, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface EmergencyScreenProps {
  onBack: () => void;
}

export const EmergencyScreen = ({ onBack }: EmergencyScreenProps) => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [locationShared, setLocationShared] = useState(false);

  const emergencyContacts = [
    { name: 'María Mendoza', relationship: 'Madre', phone: '+51 987 654 321' },
    { name: 'Carlos Mendoza', relationship: 'Padre', phone: '+51 123 456 789' },
    { name: 'Dr. García', relationship: 'Médico', phone: '+51 555 123 456' }
  ];

  const medicalInfo = {
    bloodType: 'O+',
    allergies: ['Penicilina', 'Nueces'],
    medications: ['Captopril 25mg', 'Aspirina 100mg'],
    conditions: ['Hipertensión']
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (emergencyActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (emergencyActive && countdown === 0) {
      // Trigger emergency alert
      triggerEmergencyAlert();
    }
    return () => clearTimeout(timer);
  }, [emergencyActive, countdown]);

  const triggerEmergencyAlert = () => {
    setLocationShared(true);
    // Simulate emergency services notification
    alert('¡Alerta de emergencia enviada! Contactos notificados y ubicación compartida.');
  };

  const startEmergency = () => {
    setEmergencyActive(true);
    setCountdown(10);
  };

  const cancelEmergency = () => {
    setEmergencyActive(false);
    setCountdown(10);
    setLocationShared(false);
  };

  if (emergencyActive) {
    return (
      <div className="min-h-screen bg-red-600 text-white p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <AlertTriangle className="w-16 h-16" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">EMERGENCIA ACTIVA</h1>
          
          {countdown > 0 ? (
            <>
              <p className="text-xl mb-2">Enviando alerta en:</p>
              <div className="text-6xl font-bold mb-4">{countdown}</div>
              <p className="text-lg opacity-75">Presiona cancelar si fue por error</p>
            </>
          ) : (
            <>
              <p className="text-xl mb-4">¡Alerta enviada!</p>
              <p className="text-lg opacity-75">Contactos de emergencia notificados</p>
            </>
          )}
        </div>

        {countdown > 0 && (
          <Button
            onClick={cancelEmergency}
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl"
          >
            <X className="w-6 h-6 mr-2" />
            CANCELAR
          </Button>
        )}

        {countdown === 0 && (
          <div className="w-full max-w-sm space-y-4">
            {locationShared && (
              <Card className="p-4 bg-white bg-opacity-10 border-white border-opacity-20">
                <div className="flex items-center space-x-3 text-white">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Ubicación compartida</p>
                    <p className="text-sm opacity-75">GPS activado y enviado</p>
                  </div>
                </div>
              </Card>
            )}

            <Button
              onClick={onBack}
              className="w-full bg-white text-red-600 hover:bg-gray-100 py-3 rounded-xl"
            >
              Volver al Inicio
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Emergencia</h2>
        <div></div>
      </div>

      {/* Emergency Button */}
      <div className="text-center mb-8">
        <div className="w-48 h-48 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <button
            onClick={startEmergency}
            className="w-40 h-40 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <div className="text-center text-white">
              <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
              <span className="text-lg font-bold">SOS</span>
            </div>
          </button>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Botón de Emergencia</h3>
        <p className="text-gray-600 text-sm">
          Mantén presionado para activar la alerta de emergencia
        </p>
      </div>

      {/* Emergency Info */}
      <div className="space-y-4 mb-6">
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-red-500" />
            <div>
              <h4 className="font-medium text-red-800">¿Qué sucede al activar?</h4>
              <ul className="text-sm text-red-600 mt-1 space-y-1">
                <li>• Se notifica a tus contactos de emergencia</li>
                <li>• Tu ubicación se comparte en tiempo real</li>
                <li>• Se envían tus datos médicos básicos</li>
                <li>• Tienes 10 segundos para cancelar</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Emergency Contacts */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Contactos de Emergencia</h4>
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Medical Information */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Información Médica de Emergencia</h4>
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-800">Tipo de Sangre</p>
              <p className="text-gray-600">{medicalInfo.bloodType}</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Alergias</p>
              <p className="text-gray-600">{medicalInfo.allergies.join(', ')}</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Medicamentos</p>
              <p className="text-gray-600">{medicalInfo.medications.join(', ')}</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Condiciones</p>
              <p className="text-gray-600">{medicalInfo.conditions.join(', ')}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full py-3 rounded-xl flex items-center justify-center"
        >
          <Users className="w-4 h-4 mr-2" />
          Editar Contactos de Emergencia
        </Button>
        
        <Button
          variant="outline"
          className="w-full py-3 rounded-xl flex items-center justify-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          Actualizar Información Médica
        </Button>
      </div>

      {/* Emergency Services */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-medium text-gray-800 mb-3">Servicios de Emergencia</h4>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <button className="p-3 bg-red-100 rounded-lg">
            <Phone className="w-6 h-6 text-red-600 mx-auto mb-1" />
            <p className="text-red-600 font-medium">105</p>
            <p className="text-gray-600 text-xs">Bomberos</p>
          </button>
          <button className="p-3 bg-blue-100 rounded-lg">
            <Phone className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-blue-600 font-medium">106</p>
            <p className="text-gray-600 text-xs">Policía</p>
          </button>
          <button className="p-3 bg-green-100 rounded-lg">
            <Phone className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-green-600 font-medium">117</p>
            <p className="text-gray-600 text-xs">SAMU</p>
          </button>
        </div>
      </div>
    </div>
  );
};