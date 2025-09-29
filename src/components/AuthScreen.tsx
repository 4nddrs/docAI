import React, { useState } from 'react';
import { Eye, EyeOff, Heart, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface AuthScreenProps {
  type: 'login' | 'register';
  onToggleType: () => void;
  onComplete: (role: 'patient' | 'doctor' | 'nurse' | 'admin') => void;
}

export const AuthScreen = ({ type, onToggleType, onComplete }: AuthScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Predefined users for demo
  const demoUsers = {
    'paciente@docia.com': { password: 'paciente123', role: 'patient' as const },
    'doctor@docia.com': { password: 'doctor123', role: 'doctor' as const },
    'enfermera@docia.com': { password: 'enfermera123', role: 'nurse' as const },
    'admin@docia.com': { password: 'admin123', role: 'admin' as const }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'login') {
      // Check demo credentials
      const user = demoUsers[formData.email as keyof typeof demoUsers];
      if (user && user.password === formData.password) {
        onComplete(user.role);
        return;
      } else if (formData.email && formData.password) {
        // Default to patient role for any other valid email/password
        onComplete('patient');
        return;
      }
    }
    
    // For register or fallback
    onComplete('patient');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center transition-colors duration-200">
      <Card className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg transition-colors duration-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-500 text-white py-4 -mx-6 -mt-6 rounded-t-3xl mb-6">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-6 h-6 text-white fill-current mr-2" />
              <Activity className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold">DocIA</h1>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {type === 'login' ? 'Inicio de Sesión' : 'Registrarme'}
          </h2>
        </div>



        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-600 dark:text-blue-400 font-medium">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="demo@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-4 py-3 rounded-xl border-gray-200 dark:border-gray-600 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-600 dark:text-blue-400 font-medium">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-4 pr-12 py-3 rounded-xl border-gray-200 dark:border-gray-600 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password for Register */}
          {type === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-600 dark:text-blue-400 font-medium">Confirmar contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-4 pr-12 py-3 rounded-xl border-gray-200 dark:border-gray-600 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium mt-6"
          >
            {type === 'login' ? 'INGRESAR' : 'REGISTRARME'}
          </Button>

          {/* Forgot Password Link for Login */}
          {type === 'login' && (
            <div className="text-center">
              <button 
                type="button" 
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                <u>¿Olvidaste tu contraseña?</u>
              </button>
            </div>
          )}

          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 py-3 rounded-xl mt-4 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continuar con Google</span>
          </Button>

          {/* Toggle Auth Type */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={onToggleType}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {type === 'login' ? '¿No tienes cuenta? Registrarse' : '¿Ya tienes cuenta? Iniciar Sesión'}
            </button>
          </div>
        </form>
      </Card>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-sm p-6 bg-white rounded-3xl shadow-lg mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Recuperar Contraseña
            </h3>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="w-full"
              />
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    setShowForgotPassword(false);
                    alert('Enlace de recuperación enviado a tu email');
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};