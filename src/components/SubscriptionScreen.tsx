import React, { useState } from 'react';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SubscriptionScreenProps {
  onSelectPlan: (planId: string, planName: string, price: number) => void;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: 9.99,
      icon: <Star className="w-8 h-8" />,
      color: 'bg-gray-500',
      borderColor: 'border-gray-300 dark:border-gray-600',
      features: [
        'Acceso a chatbot médico',
        'Historial médico básico',
        '5 consultas al mes',
        'Recordatorios de medicamentos',
        'Soporte por email',
      ],
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: 19.99,
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-[#40C4F7]',
      borderColor: 'border-[#40C4F7]',
      popular: true,
      features: [
        'Todo lo del Plan Básico',
        'Consultas ilimitadas',
        'Monitoreo de sensores IoT',
        'Agenda de citas prioritaria',
        'Acceso a medicina natural',
        'Soporte 24/7',
        'Análisis de salud con IA',
      ],
    },
    {
      id: 'family',
      name: 'Plan Familiar',
      price: 29.99,
      icon: <Crown className="w-8 h-8" />,
      color: 'bg-yellow-500',
      borderColor: 'border-yellow-400',
      features: [
        'Todo lo del Plan Premium',
        'Hasta 5 perfiles familiares',
        'Red familiar compartida',
        'Emergencias con geolocalización',
        'Descuentos en hospitales',
        'Consultas a domicilio',
        'Especialistas disponibles',
        'Telemedicina premium',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 pb-20 transition-colors duration-200">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-gray-800 dark:text-gray-100 mb-2">Planes de Suscripción</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        {/* Plans */}
        <div className="space-y-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden border-2 ${plan.borderColor} bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-[#40C4F7] text-white rounded-bl-lg rounded-tr-lg px-3 py-1">
                    Más Popular
                  </Badge>
                </div>
              )}

              <div className="p-6">
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`${plan.color} p-3 rounded-xl text-white`}>
                      {plan.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-800 dark:text-gray-100">{plan.name}</h3>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-gray-800 dark:text-gray-100">${plan.price}</span>
                        <span className="text-gray-500 dark:text-gray-400">/mes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Button
                  onClick={() => onSelectPlan(plan.id, plan.name, plan.price)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-[#40C4F7] hover:bg-[#30B4E7] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                  } transition-colors duration-200`}
                >
                  Seleccionar Plan
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Todos los planes incluyen 7 días de prueba gratuita
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Cancela en cualquier momento sin cargos adicionales
          </p>
        </div>
      </div>
    </div>
  );
};
