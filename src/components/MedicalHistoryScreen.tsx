import React, { useState } from 'react';
import { FileText, Download, Plus, Edit, Upload, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type HistoryView = 'categories' | 'form' | 'chronic' | 'allergies' | 'medications' | 'documents';

interface HistoryCategory {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  color: string;
}

export const MedicalHistoryScreen = () => {
  const [currentView, setCurrentView] = useState<HistoryView>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories: HistoryCategory[] = [
    {
      id: 'basic',
      title: 'Datos Básicos',
      description: 'Información personal y contacto',
      completed: true,
      color: 'bg-blue-500'
    },
    {
      id: 'chronic',
      title: 'Enfermedades Crónicas',
      description: 'Condiciones médicas permanentes',
      completed: false,
      color: 'bg-red-500'
    },
    {
      id: 'allergies',
      title: 'Alergias',
      description: 'Reacciones alérgicas conocidas',
      completed: false,
      color: 'bg-orange-500'
    },
    {
      id: 'medications',
      title: 'Medicamentos',
      description: 'Tratamientos actuales',
      completed: true,
      color: 'bg-green-500'
    },
    {
      id: 'lifestyle',
      title: 'Estilo de Vida',
      description: 'Hábitos y actividades',
      completed: false,
      color: 'bg-purple-500'
    },
    {
      id: 'family',
      title: 'Antecedentes Familiares',
      description: 'Historial médico familiar',
      completed: false,
      color: 'bg-indigo-500'
    }
  ];

  const renderCategories = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Historial Médico</h2>
        <Button
          onClick={() => generatePDF()}
          variant="outline"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          PDF
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="p-4 bg-white border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="text-center">
              <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 relative`}>
                <FileText className="w-6 h-6 text-white" />
                {category.completed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <h3 className="font-medium text-gray-800 text-sm mb-1">{category.title}</h3>
              <p className="text-xs text-gray-600">{category.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 space-y-3">
        <Button
          onClick={() => setCurrentView('documents')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
        >
          <Upload className="w-4 h-4 mr-2" />
          Subir Documentos Médicos
        </Button>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-yellow-800">Datos Pendientes</h4>
              <p className="text-sm text-yellow-600">Completa tu historial médico</p>
            </div>
            <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700">
              Completar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChronicForm = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('categories')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Enfermedades Crónicas</h2>
        <div></div>
      </div>

      <form className="space-y-4">
        <div>
          <Label className="text-gray-600">¿Tienes alguna enfermedad crónica?</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="si">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-600">¿Cuál?</Label>
          <Input
            placeholder="Escribe aquí..."
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-600">¿Desde cuándo?</Label>
          <Input
            type="date"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-600">¿Estás en tratamiento?</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="si">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-600">Detalles adicionales</Label>
          <Textarea
            placeholder="Describe tu condición..."
            className="mt-2 h-24"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl mt-6"
        >
          Guardar
        </Button>
      </form>
    </div>
  );

  const renderAllergiesForm = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('categories')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Alergias</h2>
        <div></div>
      </div>

      <form className="space-y-4">
        <div>
          <Label className="text-gray-600">¿Tienes alergias conocidas?</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="si">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-600">Tipo de alergia</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medicamentos">Medicamentos</SelectItem>
              <SelectItem value="alimentos">Alimentos</SelectItem>
              <SelectItem value="ambientales">Ambientales</SelectItem>
              <SelectItem value="otros">Otros</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-600">Alérgeno específico</Label>
          <Input
            placeholder="Ej. Penicilina, nueces, polen..."
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-gray-600">Síntomas</Label>
          <Textarea
            placeholder="Describe los síntomas que experimentas..."
            className="mt-2 h-24"
          />
        </div>

        <div>
          <Label className="text-gray-600">Gravedad</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Seleccionar gravedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leve">Leve</SelectItem>
              <SelectItem value="moderada">Moderada</SelectItem>
              <SelectItem value="severa">Severa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl mt-6"
        >
          Guardar Alergia
        </Button>
      </form>
    </div>
  );

  const renderDocuments = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentView('categories')}
        >
          ← Volver
        </Button>
        <h2 className="text-lg font-semibold text-gray-800">Documentos Médicos</h2>
        <div></div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="font-medium text-gray-700 mb-2">Subir Documentos</h3>
        <p className="text-sm text-gray-500 mb-4">
          Arrastra archivos aquí o haz clic para seleccionar
        </p>
        <Button variant="outline" size="sm">
          Seleccionar Archivos
        </Button>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-800">Documentos guardados</h4>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Examen de sangre</p>
                <p className="text-sm text-gray-500">15/03/2024</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Radiografía</p>
                <p className="text-sm text-gray-500">10/03/2024</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </div>
    </div>
  );

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    switch (categoryId) {
      case 'chronic':
        setCurrentView('chronic');
        break;
      case 'allergies':
        setCurrentView('allergies');
        break;
      case 'medications':
        setCurrentView('medications');
        break;
      default:
        setCurrentView('form');
    }
  };

  const generatePDF = () => {
    // Mock PDF generation
    alert('Generando PDF del historial médico...');
  };

  switch (currentView) {
    case 'chronic':
      return renderChronicForm();
    case 'allergies':
      return renderAllergiesForm();
    case 'documents':
      return renderDocuments();
    default:
      return renderCategories();
  }
};