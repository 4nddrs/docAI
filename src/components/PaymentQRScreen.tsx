import React, { useState, useEffect } from 'react';
import { Check, Copy, CreditCard, QrCode, ArrowLeft, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PaymentQRScreenProps {
  planName: string;
  price: number;
  onBack: () => void;
  onPaymentComplete: () => void;
}

export const PaymentQRScreen: React.FC<PaymentQRScreenProps> = ({
  planName,
  price,
  onBack,
  onPaymentComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Mock payment ID
  const paymentId = `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !paymentConfirmed) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, paymentConfirmed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPaymentId = () => {
    navigator.clipboard.writeText(paymentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  // Generate mock QR code (using a placeholder service)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    `DocIA Payment: ${paymentId} - Amount: $${price}`
  )}`;

  if (paymentConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
        <Card className="max-w-md w-full p-8 text-center bg-white dark:bg-gray-800">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-gray-800 dark:text-gray-100 mb-2">
            ¡Pago Confirmado!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tu suscripción al {planName} ha sido activada exitosamente
          </p>
          <Badge className="bg-[#40C4F7] text-white px-6 py-2">
            Suscripción Activa
          </Badge>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 pb-20 transition-colors duration-200">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 mt-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 mr-4"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-gray-800 dark:text-gray-100">Realizar Pago</h1>
        </div>

        {/* Timer */}
        <Card className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-yellow-800 dark:text-yellow-300">
              Tiempo restante: {formatTime(timeLeft)}
            </span>
          </div>
        </Card>

        {/* Plan Summary */}
        <Card className="mb-6 p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 dark:text-gray-400">Plan seleccionado:</span>
            <span className="text-gray-800 dark:text-gray-100">{planName}</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-800 dark:text-gray-100">Total a pagar:</span>
            <span className="text-gray-800 dark:text-gray-100">${price.toFixed(2)}</span>
          </div>
        </Card>

        {/* QR Code */}
        <Card className="mb-6 p-6 bg-white dark:bg-gray-800">
          <div className="text-center mb-4">
            <QrCode className="w-8 h-8 text-[#40C4F7] mx-auto mb-2" />
            <h3 className="text-gray-800 dark:text-gray-100 mb-1">
              Escanea el código QR
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Usa tu aplicación de pago móvil favorita
            </p>
          </div>

          {/* QR Code Image */}
          <div className="bg-white p-4 rounded-xl flex items-center justify-center mb-4">
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="w-64 h-64"
            />
          </div>

          {/* Payment ID */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">ID de Pago:</span>
              <button
                onClick={handleCopyPaymentId}
                className="flex items-center space-x-1 text-[#40C4F7] hover:text-[#30B4E7] transition-colors duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
            <code className="text-gray-800 dark:text-gray-100 block text-center">
              {paymentId}
            </code>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-6 p-6 bg-white dark:bg-gray-800">
          <h3 className="text-gray-800 dark:text-gray-100 mb-4">
            Métodos de pago aceptados
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {['Yape', 'Plin', 'BCP'].map((method) => (
              <div
                key={method}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center"
              >
                <CreditCard className="w-6 h-6 text-[#40C4F7] mx-auto mb-2" />
                <span className="text-gray-700 dark:text-gray-300">{method}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Instructions */}
        <Card className="mb-6 p-6 bg-white dark:bg-gray-800">
          <h3 className="text-gray-800 dark:text-gray-100 mb-4">
            Instrucciones
          </h3>
          <ol className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#40C4F7] text-white rounded-full flex items-center justify-center">
                1
              </span>
              <span>Abre tu aplicación de pago móvil</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#40C4F7] text-white rounded-full flex items-center justify-center">
                2
              </span>
              <span>Escanea el código QR mostrado arriba</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#40C4F7] text-white rounded-full flex items-center justify-center">
                3
              </span>
              <span>Confirma el pago de ${price.toFixed(2)}</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#40C4F7] text-white rounded-full flex items-center justify-center">
                4
              </span>
              <span>Haz clic en "Ya Realicé el Pago" abajo</span>
            </li>
          </ol>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleConfirmPayment}
            className="w-full bg-[#40C4F7] hover:bg-[#30B4E7] text-white"
          >
            Ya Realicé el Pago
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancelar
          </Button>
        </div>

        {/* Help Note */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            ¿Tienes problemas con el pago?
          </p>
          <button className="text-[#40C4F7] hover:underline mt-1">
            Contactar soporte
          </button>
        </div>
      </div>
    </div>
  );
};
