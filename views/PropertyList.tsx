
import React, { useState } from 'react';
import { MOCK_PROPERTIES } from '../constants';
import { Property } from '../types';
import { MagnifyingGlassIcon, FunnelIcon, MapPinIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

const PropertyList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = MOCK_PROPERTIES.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex gap-2 sticky top-0 md:static z-10 bg-slate-50 py-2">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou local..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <FunnelIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

// Fix: Typed component with React.FC to correctly handle standard React props like 'key'
const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase">
          {property.status}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-bold border border-white/20">
          R$ {property.price.toLocaleString('pt-BR')}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-slate-800 line-clamp-1">{property.title}</h3>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <MapPinIcon className="w-3 h-3" />
            {property.address}
          </p>
        </div>

        <div className="flex justify-between items-center py-2 border-y border-slate-50">
          <div className="flex items-center gap-1 text-slate-600">
            <ArrowsPointingOutIcon className="w-4 h-4" />
            <span className="text-xs font-semibold">{property.area} m²</span>
          </div>
          <div className="flex gap-3 text-slate-500 text-[11px] font-medium">
            <span>{property.rooms} Qts</span>
            <span>{property.bathrooms} Ban</span>
            <span>{property.parkingSpots} Vgs</span>
          </div>
        </div>

        <button className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
