import React, { useState } from 'react';
import { Calendar, Clock, User, Check, X, RotateCcw, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

type AgendaView = 'calendar' | 'settings' | 'appointment-detail';

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  reason: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected' | 'rescheduled';
  notes?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export const DoctorAgendaScreen = () => {
  const [currentView, setCurrentView] = useState<AgendaView>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'accept' | 'reject' | 'reschedule'>('accept');
  const [actionNotes, setActionNotes] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  // Mock schedule settings
  const [scheduleSettings, setScheduleSettings] = useState({
    workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    startTime: '08:00',
    endTime: '17:00',
    slotDuration: 30, // minutes
    breakTime: '12:00-13:00'
  });

  // Mock appointments
  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Ana Mendoza',
      patientEmail: 'ana.mendoza@email.com',
      reason: 'Control cardiológico rutinario',
      date: '2024-01-20',
      time: '09:00',
      status: 'pending'
    },
    {
      id: '2',
      patientName: 'Carlos Torres',
      patientEmail: 'carlos.torres@email.com',
      reason: 'Dolor en el pecho',
      date: '2024-01-20',
      time: '10:30',
      status: 'accepted',
      notes: 'Paciente con antecedentes de hipertensión'
    },
    {
      id: '3',
      patientName: 'María López',
      patientEmail: 'maria.lopez@email.com',
      reason: 'Consulta por arritmias',
      date: '2024-01-20',
      time: '14:00',
      status: 'pending'
    },
    {
      id: '4',
      patientName: 'Pedro García',
      patientEmail: 'pedro.garcia@email.com',
      reason: 'Segunda opinión',
      date: '2024-01-21',
      time: '11:00',
      status: 'rejected',
      notes: 'Reagendado por conflicto de horarios'
    }
  ];

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const hasAppointments = (day: number) => {
    if (!day) return false;
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    return getAppointmentsForDate(date).length > 0;
  };

  const handleAppointmentAction = () => {
    if (!selectedAppointment) return;

    const action = actionType === 'accept' ? 'aceptada' : 
                  actionType === 'reject' ? 'rechazada' : 'reprogramada';
    
    let message = `Cita ${action} para ${selectedAppointment.patientName}`;
    if (actionNotes) message += `\nNotas: ${actionNotes}`;
    if (actionType === 'reschedule' && rescheduleDate && rescheduleTime) {
      message += `\nNueva fecha: ${rescheduleDate} a las ${rescheduleTime}`;
    }

    alert(message);
    setShowActionModal(false);
    setActionNotes('');
    setRescheduleDate('');
    setRescheduleTime('');
    setCurrentView('calendar');
  };

  const renderCalendar = () => {
    const days = generateCalendarDays();
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

    const selectedDateAppointments = getAppointmentsForDate(selectedDate);

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Mi Agenda</h2>
          <Button
            onClick={() => setCurrentView('settings')}
            size="sm"
            variant="outline"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Header */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="font-semibold text-gray-800">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h3>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs py-2 text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                className={`aspect-square flex items-center justify-center text-sm rounded relative ${
                  day ? 'hover:bg-gray-100' : ''
                } ${
                  day === selectedDate.getDate() && 
                  selectedDate.getMonth() === new Date().getMonth() && 
                  selectedDate.getFullYear() === new Date().getFullYear()
                    ? 'bg-blue-100 text-blue-600 font-semibold' : ''
                }`}
                disabled={!day}
                onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
              >
                {day}
                {hasAppointments(day) && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Appointments for selected date */}
        <div>
          <h3 className="font-medium text-gray-800 mb-4">
            Citas para {selectedDate.toLocaleDateString()}
          </h3>
          
          {selectedDateAppointments.length === 0 ? (
            <Card className="p-6 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hay citas programadas para este día</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {selectedDateAppointments.map((appointment) => (
                <Card 
                  key={appointment.id}
                  className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                    appointment.status === 'pending' ? 'border-yellow-200 bg-yellow-50' :
                    appointment.status === 'accepted' ? 'border-green-200 bg-green-50' :
                    appointment.status === 'rejected' ? 'border-red-200 bg-red-50' :
                    'border-purple-200 bg-purple-50'
                  }`}
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setCurrentView('appointment-detail');
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{appointment.patientName}</h4>
                        <p className="text-sm text-gray-600">{appointment.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-800">{appointment.time}</span>
                      </div>
                      <Badge className={`text-xs ${
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {appointment.status === 'pending' ? 'Pendiente' :
                         appointment.status === 'accepted' ? 'Aceptada' :
                         appointment.status === 'rejected' ? 'Rechazada' : 'Reprogramada'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAppointmentDetail = () => {
    if (!selectedAppointment) return null;

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('calendar')}
          >
            ← Volver
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">Detalle de Cita</h2>
          <div></div>
        </div>

        <Card className="p-4 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{selectedAppointment.patientName}</h3>
              <p className="text-gray-600">{selectedAppointment.patientEmail}</p>
              <Badge className={`mt-1 ${
                selectedAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                selectedAppointment.status === 'accepted' ? 'bg-green-100 text-green-800' :
                selectedAppointment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {selectedAppointment.status === 'pending' ? 'Pendiente' :
                 selectedAppointment.status === 'accepted' ? 'Aceptada' :
                 selectedAppointment.status === 'rejected' ? 'Rechazada' : 'Reprogramada'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Fecha</p>
              <p className="text-gray-800">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Hora</p>
              <p className="text-gray-800">{selectedAppointment.time}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-500 text-sm">Motivo de consulta</p>
            <p className="text-gray-800">{selectedAppointment.reason}</p>
          </div>

          {selectedAppointment.notes && (
            <div>
              <p className="text-gray-500 text-sm">Notas</p>
              <p className="text-gray-800 text-sm">{selectedAppointment.notes}</p>
            </div>
          )}
        </Card>

        {selectedAppointment.status === 'pending' && (
          <div className="space-y-3">
            <Button
              onClick={() => {
                setActionType('accept');
                setShowActionModal(true);
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
            >
              <Check className="w-4 h-4 mr-2" />
              Aceptar Cita
            </Button>
            
            <Button
              onClick={() => {
                setActionType('reschedule');
                setShowActionModal(true);
              }}
              variant="outline"
              className="w-full py-3 rounded-xl"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reprogramar
            </Button>

            <Button
              onClick={() => {
                setActionType('reject');
                setShowActionModal(true);
              }}
              variant="outline"
              className="w-full py-3 rounded-xl text-red-600 border-red-200 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Rechazar Cita
            </Button>
          </div>
        )}

        {/* Action Modal */}
        {showActionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 mx-4 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {actionType === 'accept' ? 'Aceptar Cita' :
                 actionType === 'reject' ? 'Rechazar Cita' : 'Reprogramar Cita'}
              </h3>
              
              <div className="space-y-4">
                {actionType === 'reschedule' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Nueva fecha</label>
                      <Input
                        type="date"
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Nueva hora</label>
                      <Input
                        type="time"
                        value={rescheduleTime}
                        onChange={(e) => setRescheduleTime(e.target.value)}
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    {actionType === 'reject' ? 'Motivo del rechazo' : 'Notas (opcional)'}
                  </label>
                  <Textarea
                    placeholder={actionType === 'reject' ? 'Explica el motivo...' : 'Notas adicionales...'}
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    className="h-24"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowActionModal(false);
                      setActionNotes('');
                      setRescheduleDate('');
                      setRescheduleTime('');
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAppointmentAction}
                    className={`flex-1 ${
                      actionType === 'accept' ? 'bg-green-500 hover:bg-green-600' :
                      actionType === 'reject' ? 'bg-red-500 hover:bg-red-600' :
                      'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {actionType === 'accept' ? 'Aceptar' :
                     actionType === 'reject' ? 'Rechazar' : 'Reprogramar'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('calendar')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Configurar Horarios</h2>
        <div></div>
      </div>

      <Card className="p-4 mb-6">
        <h3 className="font-medium text-gray-800 mb-4">Días laborales</h3>
        <div className="space-y-3">
          {[
            { id: 'monday', label: 'Lunes' },
            { id: 'tuesday', label: 'Martes' },
            { id: 'wednesday', label: 'Miércoles' },
            { id: 'thursday', label: 'Jueves' },
            { id: 'friday', label: 'Viernes' },
            { id: 'saturday', label: 'Sábado' },
            { id: 'sunday', label: 'Domingo' }
          ].map((day) => (
            <div key={day.id} className="flex items-center justify-between">
              <span className="text-gray-700">{day.label}</span>
              <Switch
                checked={scheduleSettings.workDays.includes(day.id)}
                onCheckedChange={(checked) => {
                  setScheduleSettings(prev => ({
                    ...prev,
                    workDays: checked 
                      ? [...prev.workDays, day.id]
                      : prev.workDays.filter(d => d !== day.id)
                  }));
                }}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 mb-6">
        <h3 className="font-medium text-gray-800 mb-4">Horarios de atención</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Hora de inicio</label>
              <Input
                type="time"
                value={scheduleSettings.startTime}
                onChange={(e) => setScheduleSettings(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Hora de fin</label>
              <Input
                type="time"
                value={scheduleSettings.endTime}
                onChange={(e) => setScheduleSettings(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Duración de citas (minutos)</label>
            <Select
              value={scheduleSettings.slotDuration.toString()}
              onValueChange={(value) => setScheduleSettings(prev => ({ ...prev, slotDuration: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutos</SelectItem>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="60">60 minutos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Horario de almuerzo</label>
            <Input
              placeholder="12:00-13:00"
              value={scheduleSettings.breakTime}
              onChange={(e) => setScheduleSettings(prev => ({ ...prev, breakTime: e.target.value }))}
            />
          </div>
        </div>
      </Card>

      <Button
        onClick={() => {
          alert('Configuración guardada exitosamente');
          setCurrentView('calendar');
        }}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
      >
        Guardar Configuración
      </Button>
    </div>
  );

  switch (currentView) {
    case 'settings':
      return renderSettings();
    case 'appointment-detail':
      return renderAppointmentDetail();
    default:
      return renderCalendar();
  }
};