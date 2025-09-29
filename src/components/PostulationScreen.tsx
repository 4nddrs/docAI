import React, { useState } from 'react';
import { Check, X, FileText, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

type PostulationView = 'list' | 'detail' | 'edit';

export const PostulationScreen = () => {
  const [currentView, setCurrentView] = useState<PostulationView>('list');
  const [selectedPostulation, setSelectedPostulation] = useState<number | null>(null);

  const postulations = [
    {
      id: 1,
      title: 'Postulación 1',
      status: 'completed',
      icon: <Check className="w-6 h-6 text-green-500" />
    },
    {
      id: 2,
      title: 'Postulación 2',
      status: 'completed',
      icon: <Check className="w-6 h-6 text-green-500" />
    }
  ];

  const renderPostulationList = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Postulación</h2>
      
      <div className="space-y-4">
        {postulations.map((postulation) => (
          <Card
            key={postulation.id}
            className="p-6 bg-white border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedPostulation(postulation.id);
              setCurrentView('detail');
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <span className="font-medium text-gray-800">{postulation.title}</span>
              </div>
              <div className="relative">
                {postulation.icon}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPostulationDetail = () => (
    <div className="p-6 text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-8">Postulación</h2>
      
      <div className="mb-8">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-800">Postulación 2</h3>
      </div>

      <div className="space-y-4">
        <Button
          onClick={() => setCurrentView('edit')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>

        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-xl"
        >
          <X className="w-4 h-4 mr-2" />
          Cancelar
        </Button>
      </div>
    </div>
  );

  const renderPostulationEdit = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Postulación</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Nombre</label>
          <input
            type="text"
            defaultValue="Juan"
            className="w-full p-3 border border-gray-200 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Apellido</label>
          <input
            type="text"
            defaultValue="Mendoza"
            className="w-full p-3 border border-gray-200 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Fecha de nacimiento</label>
          <input
            type="date"
            defaultValue="1997-01-12"
            className="w-full p-3 border border-gray-200 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Sexo</label>
          <select className="w-full p-3 border border-gray-200 rounded-lg">
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Nacionalidad</label>
          <select className="w-full p-3 border border-gray-200 rounded-lg">
            <option value="12713423">12713423</option>
            <option value="Peruano">Peruano</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Especialidad</label>
          <select className="w-full p-3 border border-gray-200 rounded-lg">
            <option value="Cardiólogo">Cardiólogo</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Teléfono</label>
          <input
            type="tel"
            defaultValue="(+51) 7334 5689"
            className="w-full p-3 border border-gray-200 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Email</label>
          <input
            type="email"
            defaultValue="juan.mendoza@gmail.com"
            className="w-full p-3 border border-gray-200 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-2 block">Fecha de Titulación</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              defaultValue="TituloDocIA.json.pdf"
              className="flex-1 p-3 border border-gray-200 rounded-lg"
              readOnly
            />
            <Button size="sm" variant="outline" className="px-4">
              📎
            </Button>
          </div>
        </div>

        <div className="flex space-x-3 pt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentView('list')}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => setCurrentView('detail')}
            className="flex-1 bg-blue-500 hover:bg-blue-600"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );

  switch (currentView) {
    case 'detail':
      return renderPostulationDetail();
    case 'edit':
      return renderPostulationEdit();
    default:
      return renderPostulationList();
  }
};