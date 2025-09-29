import React, { useState } from 'react';
import { Plus, Clock, Check, Bell, Calendar, Pill } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';

type MedicationView = 'list' | 'add' | 'detail';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string[];
  taken: boolean;
  nextDose: string;
  remaining: number;
  reminders: boolean;
}

export const MedicationsScreen = () => {
  const [currentView, setCurrentView] = useState<MedicationView>('list');
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const medications: Medication[] = [
    {
      id: '1',
      name: 'Captopril 25mg',
      dosage: '25mg',
      frequency: 'Cada 8 horas',
      time: ['08:00', '16:00', '00:00'],
      taken: true,
      nextDose: '16:00',
      remaining: 15,
      reminders: true
    },
    {
      id: '2',
      name: 'Aspirina 100mg',
      dosage: '100mg',
      frequency: 'Una vez al día',
      time: ['09:00'],
      taken: false,
      nextDose: '09:00',
      remaining: 30,
      reminders: true
    },
    {
      id: '3',
      name: 'Vitamina D',
      dosage: '1000 UI',
      frequency: 'Diario',
      time: ['10:00'],
      taken: false,
      nextDose: '10:00',
      remaining: 45,
      reminders: false
    }
  ];

  const todayMedications = [
    { name: 'Captopril 25mg', time: '08:00 AM', taken: true, color: 'bg-green-100 text-green-800' },
    { name: 'Aspirina 100mg', time: '09:00 AM', taken: false, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Vitamina D', time: '10:00 AM', taken: false, color: 'bg-blue-100 text-blue-800' }
  ];

  const markAsTaken = (medicationId: string) => {
    // Update medication status
    alert(`Medicamento marcado como tomado`);
  };

  const renderMedicationsList = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Medicamentos</h2>
        <Button
          onClick={() => setCurrentView('add')}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar
        </Button>
      </div>

      {/* Today's Schedule */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-4">Horario de Hoy</h3>
        <div className="space-y-3">
          {todayMedications.map((med, index) => (
            <Card key={index} className={`p-4 ${med.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm opacity-75">{med.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {med.taken ? (
                    <Badge className="bg-green-500 text-white">
                      <Check className="w-3 h-3 mr-1" />
                      Tomado
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white"
                      onClick={() => markAsTaken(index.toString())}
                    >
                      Marcar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* All Medications */}
      <div>
        <h3 className="font-medium text-gray-800 mb-4">Todos los Medicamentos</h3>
        <div className="space-y-3">
          {medications.map((medication) => (
            <Card 
              key={medication.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedMedication(medication);
                setCurrentView('detail');
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Pill className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{medication.name}</h4>
                    <p className="text-sm text-gray-600">{medication.frequency}</p>
                    <p className="text-xs text-gray-500">Próxima dosis: {medication.nextDose}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {medication.reminders && (
                      <Bell className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{medication.remaining} restantes</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAddMedication = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('list')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Agregar Medicamento</h2>
        <div></div>
      </div>

      <form className="space-y-4">
        <div>
          <Label className="text-gray-600">Nombre del medicamento</Label>
          <Input
            placeholder="Ej. Aspirina 100mg"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-600">Dosis</Label>
          <Input
            placeholder="Ej. 100mg, 1 pastilla"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-600">Frecuencia</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Seleccionar frecuencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">Una vez al día</SelectItem>
              <SelectItem value="twice">Dos veces al día</SelectItem>
              <SelectItem value="three">Tres veces al día</SelectItem>
              <SelectItem value="every-6">Cada 6 horas</SelectItem>
              <SelectItem value="every-8">Cada 8 horas</SelectItem>
              <SelectItem value="weekly">Una vez por semana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-600">Horarios</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Input type="time" defaultValue="08:00" />
            <Input type="time" defaultValue="20:00" />
          </div>
        </div>

        <div>
          <Label className="text-gray-600">Duración del tratamiento</Label>
          <div className="flex space-x-2 mt-2">
            <Input placeholder="Cantidad" className="flex-1" />
            <Select>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Días/Semanas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Días</SelectItem>
                <SelectItem value="weeks">Semanas</SelectItem>
                <SelectItem value="months">Meses</SelectItem>
                <SelectItem value="continuous">Continuo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <Label className="text-gray-600">Recordatorios</Label>
            <p className="text-sm text-gray-500">Recibir notificaciones</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div>
          <Label className="text-gray-600">Notas adicionales</Label>
          <Input
            placeholder="Ej. Tomar con comida, evitar alcohol..."
            className="mt-2"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl mt-6"
          onClick={() => setCurrentView('list')}
        >
          Guardar Medicamento
        </Button>
      </form>
    </div>
  );

  const renderMedicationDetail = () => {
    if (!selectedMedication) return null;

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
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Pill className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{selectedMedication.name}</h3>
          <p className="text-gray-600">{selectedMedication.dosage}</p>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h4 className="font-medium text-gray-800 mb-2">Horarios</h4>
            <div className="space-y-2">
              {selectedMedication.time.map((time, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{time}</span>
                  </div>
                  <Badge variant="outline">Diario</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium text-gray-800 mb-2">Información</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Frecuencia</p>
                <p className="text-gray-800">{selectedMedication.frequency}</p>
              </div>
              <div>
                <p className="text-gray-500">Restantes</p>
                <p className="text-gray-800">{selectedMedication.remaining} dosis</p>
              </div>
              <div>
                <p className="text-gray-500">Recordatorios</p>
                <p className="text-gray-800">{selectedMedication.reminders ? 'Activados' : 'Desactivados'}</p>
              </div>
              <div>
                <p className="text-gray-500">Próxima dosis</p>
                <p className="text-gray-800">{selectedMedication.nextDose}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium text-gray-800 mb-2">Historial de Adherencia</h4>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <p className="text-xs text-gray-500">Has tomado 17 de 20 dosis programadas</p>
          </Card>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
            onClick={() => markAsTaken(selectedMedication.id)}
          >
            <Check className="w-4 h-4 mr-2" />
            Marcar como Tomado
          </Button>

          <Button
            variant="outline"
            className="w-full py-3 rounded-xl text-red-600 border-red-200 hover:bg-red-50"
          >
            Pausar Medicamento
          </Button>
        </div>
      </div>
    );
  };

  switch (currentView) {
    case 'add':
      return renderAddMedication();
    case 'detail':
      return renderMedicationDetail();
    default:
      return renderMedicationsList();
  }
};