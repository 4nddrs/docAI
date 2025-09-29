import React, { useState } from 'react';
import { HelpCircle, Book, MessageCircle, Settings, Info, ChevronRight, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

type HelpView = 'main' | 'faq' | 'about' | 'contact';

export const HelpScreen = () => {
  const [currentView, setCurrentView] = useState<HelpView>('main');

  const helpCategories = [
    {
      id: 'faq',
      title: 'Preguntas Frecuentes',
      description: 'Respuestas a las dudas más comunes',
      icon: <HelpCircle className="w-6 h-6 text-blue-600" />
    },
    {
      id: 'about',
      title: 'Acerca De',
      description: 'Información sobre DocIA',
      icon: <Info className="w-6 h-6 text-green-600" />
    },
    {
      id: 'contact',
      title: 'Comentarios y sugerencias',
      description: 'Contáctanos para ayuda',
      icon: <MessageCircle className="w-6 h-6 text-purple-600" />
    }
  ];

  const faqs = [
    {
      question: '¿Cómo funciona el chatbot médico?',
      answer: 'El chatbot de DocIA utiliza inteligencia artificial para proporcionar información médica básica y sugerir hospitales cercanos basándose en tus síntomas. No reemplaza la consulta médica profesional.'
    },
    {
      question: '¿Mis datos médicos están seguros?',
      answer: 'Sí, todos tus datos están encriptados y protegidos. Solo tú y las personas que autorices pueden acceder a tu información médica.'
    },
    {
      question: '¿Cómo agrego sensores de salud?',
      answer: 'Ve a la sección de Sensores y selecciona "Añadir". La app detectará automáticamente dispositivos compatibles en tu red WiFi.'
    },
    {
      question: '¿Puedo compartir mi historial con mi médico?',
      answer: 'Sí, puedes generar un PDF de tu historial médico o compartir acceso temporal a través de la sección de Familia.'
    },
    {
      question: '¿Cómo funcionan los recordatorios de medicamentos?',
      answer: 'Configura tus medicamentos con horarios específicos y recibe notificaciones push. También puedes marcar cuando los tomas para seguimiento.'
    }
  ];

  const renderMain = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Ayuda</h2>
      
      <div className="space-y-4">
        {helpCategories.map((category) => (
          <Card 
            key={category.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setCurrentView(category.id as HelpView)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 space-y-3">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <Book className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-800">Guía de Usuario</h4>
              <p className="text-sm text-blue-600">Aprende a usar todas las funciones</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-green-600" />
            <div>
              <h4 className="font-medium text-green-800">Configuración de Privacidad</h4>
              <p className="text-sm text-green-600">Gestiona tus datos y permisos</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('main')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Preguntas Frecuentes</h2>
        <div></div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="p-4">
            <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">¿No encontraste lo que buscabas?</p>
        <Button
          onClick={() => setCurrentView('contact')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Contáctanos
        </Button>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('main')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Acerca De</h2>
        <div></div>
      </div>

      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">DocIA</h3>
        <p className="text-gray-600">Tu asistente de salud personal</p>
      </div>

      <div className="space-y-6">
        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-3">Nuestra Misión</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            DocIA democratiza el acceso a información médica de calidad, 
            ayudando a las personas a tomar decisiones informadas sobre su salud 
            y conectándolas con los recursos médicos que necesitan.
          </p>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-3">Características Principales</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Chatbot médico inteligente</li>
            <li>• Gestión de historial médico</li>
            <li>• Recordatorios de medicamentos</li>
            <li>• Monitoreo con sensores IoT</li>
            <li>• Red familiar de apoyo</li>
            <li>• Función de emergencia</li>
            <li>• Medicina natural</li>
          </ul>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-3">Información Técnica</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Versión</p>
              <p className="text-gray-800">1.0</p>
            </div>
            <div>
              <p className="text-gray-500">Desarrolladores</p>
              <p className="text-gray-800">Equipo DocIA</p>
            </div>
            <div>
              <p className="text-gray-500">Última actualización</p>
              <p className="text-gray-800">Diciembre 2024</p>
            </div>
            <div>
              <p className="text-gray-500">Soporte</p>
              <p className="text-gray-800">24/7</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-2">Aviso Importante</h4>
          <p className="text-sm text-yellow-700">
            DocIA proporciona información médica general y no debe usarse para 
            diagnósticos o tratamientos. Siempre consulta con profesionales de la salud 
            para decisiones médicas importantes.
          </p>
        </Card>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('main')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Comentarios y sugerencias</h2>
        <div></div>
      </div>

      <div className="space-y-6">
        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-4">Formas de Contacto</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-sm text-gray-600">soporte@docia.app</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-800">Teléfono</p>
                <p className="text-sm text-gray-600">+51 1 234 5678</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-800">Chat en línea</p>
                <p className="text-sm text-gray-600">Disponible 24/7</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-4">Enviar Mensaje</h4>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Asunto</label>
              <select className="w-full p-3 border border-gray-200 rounded-lg">
                <option>Problema técnico</option>
                <option>Sugerencia de mejora</option>
                <option>Consulta general</option>
                <option>Reporte de error</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Mensaje</label>
              <textarea
                className="w-full p-3 border border-gray-200 rounded-lg h-24"
                placeholder="Describe tu consulta o sugerencia..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email de contacto</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="tu@email.com"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
            >
              Enviar Mensaje
            </Button>
          </form>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Tiempo de Respuesta</h4>
          <p className="text-sm text-blue-600">
            Respondemos consultas generales en 24-48 horas. 
            Para emergencias médicas, contacta servicios de emergencia locales.
          </p>
        </Card>
      </div>
    </div>
  );

  switch (currentView) {
    case 'faq':
      return renderFAQ();
    case 'about':
      return renderAbout();
    case 'contact':
      return renderContact();
    default:
      return renderMain();
  }
};