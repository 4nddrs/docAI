import React, { useState } from 'react';
import { Zap, Wifi, Activity, Heart, Thermometer, DropletIcon, Plus, Settings, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

type SensorView = 'dashboard' | 'discovery' | 'detail' | 'setup';

interface Sensor {
  id: string;
  name: string;
  type: string;
  value: string;
  unit: string;
  status: 'connected' | 'disconnected' | 'critical';
  lastReading: string;
  battery: number;
  icon: React.ReactNode;
}

export const SensorsScreen = () => {
  const [currentView, setCurrentView] = useState<SensorView>('dashboard');
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

  const sensors: Sensor[] = [
    {
      id: '1',
      name: 'Monitor Cardíaco',
      type: 'heart_rate',
      value: '72',
      unit: 'bpm',
      status: 'connected',
      lastReading: 'Hace 2 min',
      battery: 85,
      icon: <Heart className="w-6 h-6 text-red-500" />
    },
    {
      id: '2',
      name: 'Sensor de Temperatura',
      type: 'temperature',
      value: '36.5',
      unit: '°C',
      status: 'connected',
      lastReading: 'Hace 5 min',
      battery: 92,
      icon: <Thermometer className="w-6 h-6 text-blue-500" />
    },
    {
      id: '3',
      name: 'Monitor de Presión',
      type: 'blood_pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'critical',
      lastReading: 'Hace 1 hora',
      battery: 45,
      icon: <Activity className="w-6 h-6 text-orange-500" />
    }
  ];

  const heartRateData = [
    { time: '00:00', value: 68 },
    { time: '04:00', value: 65 },
    { time: '08:00', value: 72 },
    { time: '12:00', value: 78 },
    { time: '16:00', value: 74 },
    { time: '20:00', value: 70 },
    { time: '24:00', value: 72 }
  ];

  const availableSensors = [
    { name: 'Sensor Glucosa', network: 'Red_Wifi_Casa', signal: 85 },
    { name: 'Monitor SpO2', network: 'Red_Wifi_Casa', signal: 92 },
    { name: 'Sensor Peso', network: 'Red_Wifi_Casa', signal: 78 }
  ];

  const renderDashboard = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Sensores</h2>
        <Button
          onClick={() => setCurrentView('discovery')}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Añadir
        </Button>
      </div>

      {/* Alert for Critical Values */}
      <Card className="p-4 mb-6 bg-red-50 border-red-200">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <div>
            <h4 className="font-medium text-red-800">Alerta de Sensor</h4>
            <p className="text-sm text-red-600">Monitor de Presión detectó valores elevados</p>
          </div>
        </div>
      </Card>

      {/* Sensors Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {sensors.map((sensor) => (
          <Card 
            key={sensor.id}
            className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
              sensor.status === 'critical' ? 'border-red-200 bg-red-50' : ''
            }`}
            onClick={() => {
              setSelectedSensor(sensor);
              setCurrentView('detail');
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {sensor.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{sensor.name}</h4>
                  <p className="text-sm text-gray-600">{sensor.lastReading}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xl font-semibold text-gray-800">{sensor.value}</span>
                  <span className="text-sm text-gray-600">{sensor.unit}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    className={`text-xs ${
                      sensor.status === 'connected' ? 'bg-green-100 text-green-700' :
                      sensor.status === 'critical' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {sensor.status === 'connected' ? 'Conectado' : 
                     sensor.status === 'critical' ? 'Crítico' : 'Desconectado'}
                  </Badge>
                  <span className="text-xs text-gray-500">{sensor.battery}%</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card className="p-4">
        <h4 className="font-medium text-gray-800 mb-4">Resumen del Día</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-semibold text-gray-800">72</p>
            <p className="text-xs text-gray-600">BPM promedio</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">36.4</p>
            <p className="text-xs text-gray-600">°C promedio</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">3/3</p>
            <p className="text-xs text-gray-600">Sensores activos</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderDiscovery = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('dashboard')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Descubrir Sensores</h2>
        <div></div>
      </div>

      {/* Setup Illustration */}
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2Vuc29ycyUyMGhlYWx0aCUyMG1vbml0b3JpbmclMjBkZXZpY2VzfGVufDF8fHx8MTc1OTE1NjQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Sensor Setup"
              className="w-12 h-12 rounded-lg object-cover"
            />
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Sensor Integrado</h3>
        <p className="text-gray-600 text-sm mb-6">
          Nuestro nuevo sensor lee tu temperatura y ritmo cardíaco en tiempo real. 
          Mantente conectado con la salud de tus seres queridos.
        </p>
      </div>

      {/* Network Discovery */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Sensores en tu red WiFi</h4>
        <div className="space-y-3">
          {availableSensors.map((sensor, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{sensor.name}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Wifi className="w-3 h-3" />
                      <span>{sensor.network}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{sensor.signal}%</p>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 mt-1">
                    Conectar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Button
        onClick={() => setCurrentView('setup')}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
      >
        Configurar Nuevo Sensor
      </Button>
    </div>
  );

  const renderSensorDetail = () => {
    if (!selectedSensor) return null;

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('dashboard')}
          >
            ← Volver
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">{selectedSensor.name}</h2>
          <Button size="sm" variant="outline">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Current Reading */}
        <Card className="p-6 text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {selectedSensor.icon}
          </div>
          <h3 className="text-3xl font-semibold text-gray-800 mb-1">
            {selectedSensor.value} {selectedSensor.unit}
          </h3>
          <p className="text-gray-600">Lectura actual</p>
          <Badge 
            className={`mt-2 ${
              selectedSensor.status === 'connected' ? 'bg-green-100 text-green-700' :
              selectedSensor.status === 'critical' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}
          >
            {selectedSensor.status === 'connected' ? 'Normal' : 
             selectedSensor.status === 'critical' ? 'Alerta' : 'Sin conexión'}
          </Badge>
        </Card>

        {/* Historical Chart */}
        <Card className="p-4 mb-6">
          <h4 className="font-medium text-gray-800 mb-4">Historial (24h)</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sensor Info */}
        <Card className="p-4 mb-6">
          <h4 className="font-medium text-gray-800 mb-4">Información del Sensor</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Estado</p>
              <p className="text-gray-800">Conectado</p>
            </div>
            <div>
              <p className="text-gray-500">Batería</p>
              <p className="text-gray-800">{selectedSensor.battery}%</p>
            </div>
            <div>
              <p className="text-gray-500">Última lectura</p>
              <p className="text-gray-800">{selectedSensor.lastReading}</p>
            </div>
            <div>
              <p className="text-gray-500">Ubicación</p>
              <p className="text-gray-800">Casa - WiFi</p>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-4">Configuración</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Notificaciones</p>
                <p className="text-sm text-gray-600">Alertas por valores críticos</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Datos en tiempo real</p>
                <p className="text-sm text-gray-600">Sincronización automática</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderSetup = () => (
    <div className="p-6 text-center">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('discovery')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Configurar Sensor</h2>
        <div></div>
      </div>

      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <Zap className="w-10 h-10 text-blue-600" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">Próximamente</h3>
      <p className="text-gray-600 mb-8">
        Nuestro nuevo sensor lee tu temperatura y ritmo cardíaco en tiempo real. 
        Mantente conectado con la salud de tus seres queridos.
      </p>

      <Button
        onClick={() => alert('Función en desarrollo')}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
      >
        Notificarme
      </Button>
    </div>
  );

  switch (currentView) {
    case 'discovery':
      return renderDiscovery();
    case 'detail':
      return renderSensorDetail();
    case 'setup':
      return renderSetup();
    default:
      return renderDashboard();
  }
};