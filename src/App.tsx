import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Calendar, MapPin, MessageCircle, User, FileText, Hospital, Activity, Settings, LogOut, Pill, Users, Zap, Shield, HelpCircle, Leaf, Moon, Sun, CreditCard } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card } from './components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ChatScreen } from './components/ChatScreen';
import { PostulationScreen } from './components/PostulationScreen';
import { AppointmentScreen } from './components/AppointmentScreen';
import { HospitalsScreen } from './components/HospitalsScreen';
import { MedicalHistoryScreen } from './components/MedicalHistoryScreen';
import { MedicationsScreen } from './components/MedicationsScreen';
import { SensorsScreen } from './components/SensorsScreen';
import { FamilyScreen } from './components/FamilyScreen';
import { EmergencyScreen } from './components/EmergencyScreen';
import { NaturalMedicineScreen } from './components/NaturalMedicineScreen';
import { HelpScreen } from './components/HelpScreen';
import { DoctorPostulationScreen } from './components/DoctorPostulationScreen';
import { AdminPanelScreen } from './components/AdminPanelScreen';
import { DoctorAgendaScreen } from './components/DoctorAgendaScreen';
import { DoctorPatientsScreen } from './components/DoctorPatientsScreen';
import { DoctorProfileScreen } from './components/DoctorProfileScreen';
import { SubscriptionScreen } from './components/SubscriptionScreen';
import { PaymentQRScreen } from './components/PaymentQRScreen';

type Screen = 'splash' | 'auth' | 'home' | 'profile' | 'chat' | 'postulation' | 'hospitals' | 'history' | 'appointment' | 'medications' | 'sensors' | 'family' | 'emergency' | 'natural-medicine' | 'help' | 'doctor-postulation' | 'admin-panel' | 'doctor-agenda' | 'doctor-patients' | 'doctor-profile' | 'subscription' | 'payment-qr';

type UserRole = 'patient' | 'doctor' | 'nurse' | 'admin';

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('patient');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: number } | null>(null);

  // Check for persisted session
  useEffect(() => {
    const savedSession = localStorage.getItem('dociaSession');
    const savedRole = localStorage.getItem('dociaUserRole') as UserRole;
    if (savedSession) {
      setIsAuthenticated(true);
      if (savedRole) {
        setUserRole(savedRole);
      }
      if (currentScreen === 'splash' || currentScreen === 'auth') {
        setCurrentScreen('home');
      }
    }
  }, []);

  const getMenuItems = () => {
    if (userRole === 'doctor' || userRole === 'nurse') {
      return [
        { id: 'home', icon: <User className="w-5 h-5" />, label: 'Dashboard' },
        { id: 'doctor-agenda', icon: <Calendar className="w-5 h-5" />, label: 'Mi Agenda' },
        { id: 'doctor-patients', icon: <Users className="w-5 h-5" />, label: 'Mis Pacientes' },
        { id: 'doctor-profile', icon: <User className="w-5 h-5" />, label: 'Perfil Profesional' },
        { id: 'chat', icon: <MessageCircle className="w-5 h-5" />, label: 'Consultas' },
      ];
    } else if (userRole === 'admin') {
      return [
        { id: 'home', icon: <User className="w-5 h-5" />, label: 'Dashboard' },
        { id: 'admin-panel', icon: <Settings className="w-5 h-5" />, label: 'Panel Admin' },
        { id: 'hospitals', icon: <Hospital className="w-5 h-5" />, label: 'Hospitales' },
      ];
    } else {
      return [
        { id: 'home', icon: <User className="w-5 h-5" />, label: 'Home' },
        { id: 'appointment', icon: <Calendar className="w-5 h-5" />, label: 'Agendar Consulta' },
        { id: 'postulation', icon: <FileText className="w-5 h-5" />, label: 'Postulación' },
        { id: 'chat', icon: <MessageCircle className="w-5 h-5" />, label: 'Chatbot' },
        { id: 'history', icon: <Activity className="w-5 h-5" />, label: 'Historial Médico' },
        { id: 'medications', icon: <Pill className="w-5 h-5" />, label: 'Medicamentos' },
        { id: 'sensors', icon: <Zap className="w-5 h-5" />, label: 'Sensores' },
        { id: 'hospitals', icon: <Hospital className="w-5 h-5" />, label: 'Hospitales' },
        { id: 'family', icon: <Users className="w-5 h-5" />, label: 'Familia' },
        { id: 'natural-medicine', icon: <Leaf className="w-5 h-5" />, label: 'Medicina Natural' },
        { id: 'doctor-postulation', icon: <FileText className="w-5 h-5" />, label: 'Ser Doctor' },
        { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Perfil' },
        { id: 'subscription', icon: <CreditCard className="w-5 h-5" />, label: 'Suscripción' },
      ];
    }
  };

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const handleAuth = (type: 'login' | 'register') => {
    setAuthType(type);
    setCurrentScreen('auth');
  };

  const handleAuthComplete = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('dociaSession', 'true');
    localStorage.setItem('dociaUserRole', role);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('patient');
    localStorage.removeItem('dociaSession');
    localStorage.removeItem('dociaUserRole');
    setCurrentScreen('auth');
    setIsMenuOpen(false);
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    localStorage.setItem('dociaUserRole', newRole);
    if (newRole === 'doctor' || newRole === 'nurse') {
      setShowTermsModal(true);
    }
  };

  // Auto-advance from splash screen
  React.useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('auth');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'auth':
        return (
          <AuthScreen 
            type={authType} 
            onToggleType={() => setAuthType(authType === 'login' ? 'register' : 'login')}
            onComplete={handleAuthComplete}
          />
        );
      case 'home':
        return <HomeScreen onNavigate={handleScreenChange} />;
      case 'profile':
        return <ProfileScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'postulation':
        return <PostulationScreen />;
      case 'appointment':
        return <AppointmentScreen />;
      case 'hospitals':
        return <HospitalsScreen />;
      case 'history':
        return <MedicalHistoryScreen />;
      case 'medications':
        return <MedicationsScreen />;
      case 'sensors':
        return <SensorsScreen />;
      case 'family':
        return <FamilyScreen />;
      case 'emergency':
        return <EmergencyScreen onBack={() => setCurrentScreen('home')} />;
      case 'natural-medicine':
        return <NaturalMedicineScreen />;
      case 'help':
        return <HelpScreen />;
      case 'doctor-postulation':
        return <DoctorPostulationScreen onRoleChange={handleRoleChange} />;
      case 'admin-panel':
        return <AdminPanelScreen />;
      case 'doctor-agenda':
        return <DoctorAgendaScreen />;
      case 'doctor-patients':
        return <DoctorPatientsScreen />;
      case 'doctor-profile':
        return <DoctorProfileScreen />;
      case 'subscription':
        return <SubscriptionScreen 
          onSelectPlan={(planId, planName, price) => {
            setSelectedPlan({ id: planId, name: planName, price });
            setCurrentScreen('payment-qr');
          }} 
        />;
      case 'payment-qr':
        return selectedPlan ? (
          <PaymentQRScreen 
            planName={selectedPlan.name}
            price={selectedPlan.price}
            onBack={() => setCurrentScreen('subscription')}
            onPaymentComplete={() => {
              setCurrentScreen('home');
              setSelectedPlan(null);
            }}
          />
        ) : (
          <SubscriptionScreen 
            onSelectPlan={(planId, planName, price) => {
              setSelectedPlan({ id: planId, name: planName, price });
              setCurrentScreen('payment-qr');
            }} 
          />
        );
      default:
        return <HomeScreen onNavigate={handleScreenChange} userRole={userRole} />;
    }
  };

  const shouldShowMenu = currentScreen !== 'splash' && currentScreen !== 'auth';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile Container */}
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 min-h-screen relative overflow-hidden transition-colors duration-200">
        {/* Header */}
        {shouldShowMenu && (
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-pink-500 fill-current" />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">DocIA</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        )}

        {/* Side Menu */}
        {isMenuOpen && (
          <div className="absolute inset-0 z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-blue-500 text-white">JM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">Juan Mendoza</div>
                      <Badge className="text-xs mt-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {userRole === 'patient' ? 'Paciente' :
                         userRole === 'doctor' ? 'Doctor' :
                         userRole === 'nurse' ? 'Enfermera' : 'Admin'}
                      </Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {getMenuItems().map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleScreenChange(item.id as Screen)}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <span className="text-gray-600 dark:text-gray-300">{item.icon}</span>
                      <span className="text-gray-700 dark:text-gray-200">{item.label}</span>
                    </button>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button 
                      onClick={() => handleScreenChange('emergency')}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 transition-colors duration-200"
                    >
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">🚨 EMERGENCIA</span>
                    </button>
                    <button 
                      onClick={() => handleScreenChange('help')}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      <span className="text-gray-700 dark:text-gray-200">Ayuda</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-600 dark:text-red-400 transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Salir</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="flex-1">
          {renderScreen()}
        </div>

        {/* Terms and Conditions Modal */}
        {showTermsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 mx-4 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Términos y Condiciones</h3>
              <div className="max-h-60 overflow-y-auto text-sm text-gray-600 mb-4">
                <p className="mb-3">
                  Al aceptar estos términos, usted se compromete a:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Proporcionar atención médica profesional y ética</li>
                  <li>Mantener la confidencialidad de los datos de pacientes</li>
                  <li>Cumplir con los horarios establecidos</li>
                  <li>Mantener actualizada su información profesional</li>
                  <li>Seguir las normas de la plataforma DocIA</li>
                </ul>
                <p className="mt-3">
                  DocIA se compromete a verificar sus credenciales y proteger sus datos profesionales.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowTermsModal(false);
                    setUserRole('patient');
                    localStorage.setItem('dociaUserRole', 'patient');
                  }}
                  className="flex-1"
                >
                  Rechazar
                </Button>
                <Button
                  onClick={() => {
                    setShowTermsModal(false);
                    setCurrentScreen('home');
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  Aceptar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}