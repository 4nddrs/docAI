import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type AppointmentView = 'doctors' | 'calendar' | 'confirmation';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avatar?: string;
  nextAvailable: string;
}

export const AppointmentScreen = () => {
  const [currentView, setCurrentView] = useState<AppointmentView>('doctors');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. María González',
      specialty: 'Cardiología',
      rating: 4.8,
      nextAvailable: '25/01/2024',
      avatar: undefined
    },
    {
      id: '2',
      name: 'Dr. Ana Torres',
      specialty: 'Pediatría',
      rating: 4.9,
      nextAvailable: '22/01/2024',
      avatar: undefined
    },
    {
      id: '3',
      name: 'Dr. Carlos Mendoza',
      specialty: 'Medicina General',
      rating: 4.7,
      nextAvailable: '20/01/2024',
      avatar: undefined
    }
  ];

  const appointments = [
    { name: 'Andrea Torres', time: '08:00 AM', type: 'Consulta Externa Psicología', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Juan Mendoza', time: '10:00 AM', type: 'Consulta Externa de la Salud Física', color: 'bg-purple-100 text-purple-800' },
    { name: 'Juana Morola', time: '11:00 AM', type: 'Emergencia Dolor de Cabeza', color: 'bg-green-100 text-green-800' }
  ];

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const renderDoctorsList = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Agendar Consulta</h2>
      
      <div className="space-y-4">
        {doctors.map((doctor) => (
          <Card 
            key={doctor.id}
            className="p-4 bg-white border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedDoctor(doctor);
              setCurrentView('calendar');
            }}
          >
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={doctor.avatar} />
                <AvatarFallback className="bg-blue-500 text-white">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{doctor.rating}</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-500">Próximo:</p>
                <p className="text-sm font-medium text-gray-800">{doctor.nextAvailable}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCalendar = () => {
    const days = generateCalendarDays();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('doctors')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">Agendar</h2>
          <div></div>
        </div>

        {/* Calendar Header */}
        <div className="bg-blue-600 text-white rounded-t-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="font-semibold">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h3>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                className={`aspect-square flex items-center justify-center text-sm rounded ${
                  day ? 'hover:bg-blue-500' : ''
                } ${
                  day === new Date().getDate() && 
                  selectedDate.getMonth() === new Date().getMonth() && 
                  selectedDate.getFullYear() === new Date().getFullYear()
                    ? 'bg-white text-blue-600 font-semibold' : ''
                }`}
                disabled={!day}
                onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments for the day */}
        <div className="space-y-3 mb-6">
          {appointments.map((appointment, index) => (
            <div key={index} className={`p-3 rounded-lg ${appointment.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{appointment.name}</p>
                  <p className="text-xs opacity-75">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{appointment.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => {
            if (!selectedDoctor) return;
            
            // Create appointment request
            const appointmentRequest = {
              doctorId: selectedDoctor.id,
              doctorName: selectedDoctor.name,
              specialty: selectedDoctor.specialty,
              date: selectedDate.toISOString(),
              time: selectedTime || '10:00 AM',
              patientName: 'Juan Pérez', // This would come from user session
              reason: 'Consulta médica',
              status: 'pending',
              createdAt: new Date().toISOString()
            };
            
            // Save to localStorage for demo
            const existingAppointments = JSON.parse(localStorage.getItem('appointmentRequests') || '[]');
            existingAppointments.push(appointmentRequest);
            localStorage.setItem('appointmentRequests', JSON.stringify(existingAppointments));
            
            setCurrentView('confirmation');
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
        >
          Solicitar Cita
        </Button>
      </div>
    );
  };

  const renderConfirmation = () => (
    <div className="p-6 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Calendar className="w-10 h-10 text-green-600" />
      </div>
      
      <h2 className="text-lg font-semibold text-gray-800 mb-2">¡Solicitud Enviada!</h2>
      <p className="text-gray-600 mb-6">Tu solicitud de cita ha sido enviada al doctor y está pendiente de confirmación</p>
      
      {selectedDoctor && (
        <Card className="p-4 mb-6 text-left">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-blue-500 text-white">
                {selectedDoctor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{selectedDoctor.name}</h3>
              <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {selectedDate.toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {selectedTime || '10:00 AM'}
            </div>
          </div>
        </Card>
      )}
      
      <Button
        onClick={() => {
          setCurrentView('doctors');
          setSelectedDoctor(null);
          setSelectedTime('');
        }}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
      >
        Agendar Otra Cita
      </Button>
    </div>
  );

  switch (currentView) {
    case 'calendar':
      return renderCalendar();
    case 'confirmation':
      return renderConfirmation();
    default:
      return renderDoctorsList();
  }
};