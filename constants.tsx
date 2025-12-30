
import { Property, PropertyType, PropertyStatus, Client, Appointment, AppointmentType, AppointmentStatus } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Apartamento Luxo Jardins',
    type: PropertyType.APARTMENT,
    status: PropertyStatus.AVAILABLE,
    address: 'Alameda Campinas, Jardins, SP',
    price: 1500000,
    area: 120,
    rooms: 3,
    bathrooms: 2,
    parkingSpots: 2,
    description: 'Excelente apartamento reformado com vista panorâmica.',
    imageUrl: 'https://picsum.photos/seed/prop1/800/600',
    realtorId: 'r1'
  },
  {
    id: 'p2',
    title: 'Casa de Condomínio',
    type: PropertyType.HOUSE,
    status: PropertyStatus.AVAILABLE,
    address: 'Alphaville, Barueri, SP',
    price: 3200000,
    area: 450,
    rooms: 5,
    bathrooms: 6,
    parkingSpots: 4,
    description: 'Mansão moderna com piscina e área gourmet completa.',
    imageUrl: 'https://picsum.photos/seed/prop2/800/600',
    realtorId: 'r1'
  },
  {
    id: 'p3',
    title: 'Loft Industrial Pinheiros',
    type: PropertyType.APARTMENT,
    status: PropertyStatus.AVAILABLE,
    address: 'Rua dos Pinheiros, SP',
    price: 850000,
    area: 65,
    rooms: 1,
    bathrooms: 1,
    parkingSpots: 1,
    description: 'Estilo industrial autêntico perto do metrô.',
    imageUrl: 'https://picsum.photos/seed/prop3/800/600',
    realtorId: 'r1'
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 98888-7777',
    birthDate: '1985-05-20',
    preferences: {
      type: [PropertyType.APARTMENT],
      minPrice: 700000,
      maxPrice: 2000000,
      location: 'São Paulo Centro/Oeste'
    },
    interactions: [
      { id: 'i1', date: '2023-10-25', type: 'view', notes: 'Visualizou apto Jardins', propertyId: 'p1' }
    ]
  },
  {
    id: 'c2',
    name: 'Maria Oliveira',
    email: 'maria@email.com',
    phone: '(11) 97777-6666',
    birthDate: '1990-12-10',
    preferences: {
      type: [PropertyType.HOUSE],
      minPrice: 2000000,
      maxPrice: 5000000,
      location: 'Alphaville/Tamboré'
    },
    interactions: []
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    title: 'Visita Técnica: Apto Jardins',
    type: AppointmentType.VISIT,
    status: AppointmentStatus.CONFIRMED,
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:00',
    clientId: 'c1',
    propertyId: 'p1',
    location: 'Alameda Campinas, Jardins, SP',
    priority: 'high'
  },
  {
    id: 'a2',
    title: 'Apresentação de Proposta',
    type: AppointmentType.MEETING,
    status: AppointmentStatus.SCHEDULED,
    date: new Date().toISOString().split('T')[0],
    startTime: '14:30',
    endTime: '15:30',
    clientId: 'c2',
    location: 'Escritório Central / Online',
    priority: 'medium'
  }
];
