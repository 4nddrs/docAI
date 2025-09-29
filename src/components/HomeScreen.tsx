import React from 'react';
import { MessageCircle, MapPin, Calendar, Heart, Activity, Pill, Bell, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  userRole?: 'patient' | 'doctor' | 'nurse' | 'admin';
}

export const HomeScreen = ({ onNavigate, userRole = 'patient' }: HomeScreenProps) => {
  // Data changes based on role
  const getRoleSpecificData = () => {
    switch (userRole) {
      case 'doctor':
        return {
          greeting: 'Dr. García',
          subtitle: 'Sistema Médico Profesional',
          healthData: [
            { time: '08:00', patients: 12, consultations: 8 },
            { time: '12:00', patients: 18, consultations: 15 },
            { time: '16:00', patients: 22, consultations: 19 },
            { time: '20:00', patients: 8, consultations: 6 }
          ],
          alerts: [
            { type: 'patient', message: 'Paciente urgente: María López', time: 'Ahora', urgent: true },
            { type: 'schedule', message: '3 consultas pendientes', time: '30 min', urgent: false },
            { type: 'review', message: 'Revisar historial Juan Pérez', time: '1 hora', urgent: false }
          ],
          stats: [
            { label: 'Pacientes Hoy', value: '24', change: '+3' },
            { label: 'Consultas', value: '18', change: '+2' },
            { label: 'Urgencias', value: '2', change: '0' }
          ]
        };
      case 'nurse':
        return {
          greeting: 'Enfermera Ana',
          subtitle: 'Centro de Atención',
          healthData: [
            { time: '08:00', vitals: 15, medications: 8 },
            { time: '12:00', vitals: 22, medications: 12 },
            { time: '16:00', vitals: 18, medications: 10 },
            { time: '20:00', vitals: 12, medications: 6 }
          ],
          alerts: [
            { type: 'vitals', message: 'Signos vitales paciente 205', time: 'Ahora', urgent: true },
            { type: 'medication', message: 'Administrar medicamentos sala 3', time: '15 min', urgent: false },
            { type: 'round', message: 'Ronda de enfermería programada', time: '45 min', urgent: false }
          ],
          stats: [
            { label: 'Signos Vitales', value: '67', change: '+5' },
            { label: 'Medicamentos', value: '36', change: '+8' },
            { label: 'Pacientes', value: '28', change: '+2' }
          ]
        };
      case 'admin':
        return {
          greeting: 'Admin Sistema',
          subtitle: 'Panel de Control',
          healthData: [
            { time: '08:00', users: 45, systems: 98 },
            { time: '12:00', users: 78, systems: 99 },
            { time: '16:00', users: 92, systems: 97 },
            { time: '20:00', users: 34, systems: 99 }
          ],
          alerts: [
            { type: 'system', message: 'Mantenimiento servidor 2', time: '2 horas', urgent: false },
            { type: 'backup', message: 'Backup completado exitosamente', time: '30 min', urgent: false },
            { type: 'users', message: '5 nuevos usuarios registrados', time: '1 hora', urgent: false }
          ],
          stats: [
            { label: 'Usuarios Activos', value: '234', change: '+12' },
            { label: 'Uptime Sistema', value: '99.8%', change: '+0.1%' },
            { label: 'Consultas/día', value: '1,247', change: '+89' }
          ]
        };
      default: // patient
        return {
          greeting: 'Juan Mendoza',
          subtitle: 'Tu Salud Digital',
          healthData: [
            { time: '08:00', heartRate: 72, pressure: 120 },
            { time: '12:00', heartRate: 78, pressure: 118 },
            { time: '16:00', heartRate: 74, pressure: 122 },
            { time: '20:00', heartRate: 70, pressure: 115 }
          ],
          alerts: [
            { type: 'medication', message: 'Captopril 25mg - 16:00', time: '30 min', urgent: false },
            { type: 'appointment', message: 'Consulta Dr. García', time: '2 días', urgent: false },
            { type: 'sensor', message: 'Presión elevada detectada', time: '1 hora', urgent: true }
          ],
          stats: [
            { label: 'Presión Arterial', value: '120/80', change: 'Normal' },
            { label: 'Frecuencia Cardíaca', value: '72 bpm', change: 'Estable' },
            { label: 'Pasos Hoy', value: '8,234', change: '+15%' }
          ]
        };
    }
  };

  const roleData = getRoleSpecificData();

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Greeting */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-1">Hola, {roleData.greeting}</h1>
            <p className="text-gray-600 dark:text-gray-400">{roleData.subtitle}</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {userRole === 'patient' ? 'Paciente' :
             userRole === 'doctor' ? 'Doctor' :
             userRole === 'nurse' ? 'Enfermera' : 'Admin'}
          </Badge>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {roleData.stats.map((stat, index) => (
          <Card key={index} className="p-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{stat.value}</p>
              <p className="text-xs text-green-600 dark:text-green-400">{stat.change}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Activity Chart */}
      <Card className="p-4 mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">Tendencia del Día</h3>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roleData.healthData}>
              <XAxis dataKey="time" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey={userRole === 'patient' ? 'heartRate' : userRole === 'doctor' ? 'patients' : userRole === 'nurse' ? 'vitals' : 'users'} 
                stroke="#40C4F7" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Alerts and Reminders */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">
            {userRole === 'patient' ? 'Recordatorios' : 
             userRole === 'doctor' ? 'Notificaciones' : 
             userRole === 'nurse' ? 'Tareas Pendientes' : 'Sistema'}
          </h3>
          <Bell className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="space-y-3">
          {roleData.alerts.map((alert, index) => (
            <Card key={index} className={`p-3 transition-colors duration-200 ${
              alert.urgent 
                ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {alert.urgent && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  {alert.type === 'medication' && <Pill className="w-4 h-4 text-blue-500" />}
                  {alert.type === 'appointment' && <Calendar className="w-4 h-4 text-green-500" />}
                  {alert.type === 'patient' && <Heart className="w-4 h-4 text-red-500" />}
                  {alert.type === 'schedule' && <Calendar className="w-4 h-4 text-blue-500" />}
                  {alert.type === 'vitals' && <Activity className="w-4 h-4 text-red-500" />}
                  {alert.type === 'system' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                  <div>
                    <p className={`text-sm font-medium ${
                      alert.urgent 
                        ? 'text-red-800 dark:text-red-200' 
                        : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                  {alert.time}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Illustration */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 text-center relative overflow-hidden transition-colors duration-200">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-16 h-16 bg-purple-300 dark:bg-purple-600 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-pink-300 dark:bg-pink-600 rounded-full"></div>
            <div className="absolute top-1/2 right-8 w-8 h-8 bg-blue-300 dark:bg-blue-600 rounded-full"></div>
          </div>
          
          {/* Main illustration content */}
          <div className="relative z-10">
            <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Medical elements */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                <div className="w-8 h-4 bg-white rounded flex items-center justify-center">
                  <div className="text-xs text-blue-600">+</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-12 left-8">
              <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="text-xs text-green-600">$</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assistant Button */}
      <Button 
        onClick={() => onNavigate('chat')}
        className="w-full bg-[#40C4F7] hover:bg-[#2bb3e8] text-white py-4 rounded-2xl mb-6 font-medium transition-colors duration-200"
      >
        {userRole === 'patient' ? 'Hablar con el Asistente' :
         userRole === 'doctor' ? 'Ver Pacientes' :
         userRole === 'nurse' ? 'Gestionar Turnos' : 'Panel Administrativo'}
      </Button>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-0 cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => onNavigate('hospitals')}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Hospitales</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Cercanos</p>
          </div>
        </Card>

        <Card 
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-0 cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => onNavigate(userRole === 'patient' ? 'postulation' : userRole === 'doctor' ? 'doctor-agenda' : userRole === 'nurse' ? 'sensors' : 'admin-panel')}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
              {userRole === 'patient' ? 'Agendar' :
               userRole === 'doctor' ? 'Agenda' :
               userRole === 'nurse' ? 'Sensores' : 'Panel'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {userRole === 'patient' ? 'Consulta' :
               userRole === 'doctor' ? 'Ver citas' :
               userRole === 'nurse' ? 'Monitoreo' : 'Control'}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};