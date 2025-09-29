import React, { useState } from 'react';
import { Leaf, Search, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

type MedicineView = 'categories' | 'list' | 'detail';

interface NaturalMedicine {
  id: string;
  name: string;
  scientificName: string;
  uses: string[];
  description: string;
  preparation: string;
  precautions: string;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const NaturalMedicineScreen = () => {
  const [currentView, setCurrentView] = useState<MedicineView>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMedicine, setSelectedMedicine] = useState<NaturalMedicine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories: Category[] = [
    {
      id: 'digestive',
      name: 'Manzanilla',
      description: 'Para el estómago',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'respiratory',
      name: 'Jengibre',
      description: 'Náuseas',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'pain',
      name: 'Eucalipto',
      description: 'Congestión nasal',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const medicines: NaturalMedicine[] = [
    {
      id: '1',
      name: 'Manzanilla',
      scientificName: 'Matricaria chamomilla',
      uses: ['Problemas digestivos', 'Insomnio', 'Ansiedad', 'Inflamación'],
      description: 'La manzanilla es una hierba medicinal tradicional conocida por sus propiedades calmantes y antiinflamatorias. Se utiliza comúnmente para tratar problemas digestivos y promover la relajación.',
      preparation: 'Infusión: 1 cucharadita de flores secas en 1 taza de agua caliente, dejar reposar 5-10 minutos.',
      precautions: 'Puede causar reacciones alérgicas en personas sensibles a plantas de la familia Asteraceae.'
    },
    {
      id: '2',
      name: 'Jengibre',
      scientificName: 'Zingiber officinale',
      uses: ['Náuseas', 'Vómitos', 'Digestión', 'Inflamación'],
      description: 'El jengibre es una raíz con potentes propiedades antiinflamatorias y antieméticas, especialmente útil para combatir las náuseas.',
      preparation: 'Té: 1-2 rodajas de jengibre fresco en agua caliente por 10 minutos. También se puede masticar crudo.',
      precautions: 'Consultar con médico si se toman anticoagulantes. Evitar en exceso durante el embarazo.'
    },
    {
      id: '3',
      name: 'Eucalipto',
      scientificName: 'Eucalyptus globulus',
      uses: ['Congestión nasal', 'Tos', 'Problemas respiratorios', 'Antiséptico'],
      description: 'Las hojas de eucalipto contienen eucaliptol, un compuesto con propiedades expectorantes y descongestionantes.',
      preparation: 'Inhalación: Agregar hojas secas a agua hirviendo e inhalar el vapor. También se puede usar aceite esencial.',
      precautions: 'No ingerir aceite esencial puro. Mantener alejado de niños pequeños.'
    }
  ];

  const renderCategories = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Medicina Natural</h2>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar plantas medicinales..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="p-6 cursor-pointer hover:shadow-md transition-shadow border-0 bg-gradient-to-r from-green-50 to-blue-50"
            onClick={() => {
              setSelectedCategory(category.id);
              setCurrentView('list');
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                  <Badge className={`mt-2 ${category.color}`}>
                    Natural
                  </Badge>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Info */}
      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-yellow-600" />
          <div>
            <h4 className="font-medium text-yellow-800">Información Importante</h4>
            <p className="text-sm text-yellow-600">
              La medicina natural complementa, no reemplaza el tratamiento médico. 
              Siempre consulta con un profesional de la salud.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderMedicinesList = () => {
    const filteredMedicines = medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('categories')}
          >
            ← Volver
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">Plantas Medicinales</h2>
          <div></div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nombre o uso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Medicines List */}
        <div className="space-y-4">
          {filteredMedicines.map((medicine) => (
            <Card 
              key={medicine.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedMedicine(medicine);
                setCurrentView('detail');
              }}
            >
              <div className="flex space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{medicine.name}</h3>
                  <p className="text-sm text-gray-600 italic mb-2">{medicine.scientificName}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {medicine.uses.slice(0, 3).map((use, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {use}
                      </Badge>
                    ))}
                    {medicine.uses.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{medicine.uses.length - 3} más
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {medicine.description}
                  </p>
                </div>
                
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-8">
            <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron plantas medicinales</p>
            <p className="text-sm text-gray-500">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    );
  };

  const renderMedicineDetail = () => {
    if (!selectedMedicine) return null;

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('list')}
          >
            ← Volver
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">{selectedMedicine.name}</h2>
          <div></div>
        </div>

        {/* Medicine Header */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{selectedMedicine.name}</h3>
          <p className="text-gray-600 italic">{selectedMedicine.scientificName}</p>
        </div>

        {/* Uses */}
        <Card className="p-4 mb-4">
          <h4 className="font-medium text-gray-800 mb-3">Usos Medicinales</h4>
          <div className="flex flex-wrap gap-2">
            {selectedMedicine.uses.map((use, index) => (
              <Badge key={index} className="bg-green-100 text-green-800">
                {use}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Description */}
        <Card className="p-4 mb-4">
          <h4 className="font-medium text-gray-800 mb-3">Descripción</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {selectedMedicine.description}
          </p>
        </Card>

        {/* Preparation */}
        <Card className="p-4 mb-4">
          <h4 className="font-medium text-gray-800 mb-3">Preparación</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {selectedMedicine.preparation}
          </p>
        </Card>

        {/* Precautions */}
        <Card className="p-4 mb-6 border-yellow-200 bg-yellow-50">
          <h4 className="font-medium text-yellow-800 mb-3">⚠️ Precauciones</h4>
          <p className="text-yellow-700 text-sm leading-relaxed">
            {selectedMedicine.precautions}
          </p>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl">
            <BookOpen className="w-4 h-4 mr-2" />
            Agregar a Mis Remedios
          </Button>
          
          <Button variant="outline" className="w-full py-3 rounded-xl">
            Compartir Información
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-xs text-center">
            <strong>Aviso:</strong> Esta información es solo educativa. 
            Consulta siempre con un profesional de la salud antes de usar remedios naturales, 
            especialmente si tienes condiciones médicas o tomas medicamentos.
          </p>
        </div>
      </div>
    );
  };

  switch (currentView) {
    case 'list':
      return renderMedicinesList();
    case 'detail':
      return renderMedicineDetail();
    default:
      return renderCategories();
  }
};