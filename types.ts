
export enum PropertyStatus {
  AVAILABLE = 'Disponível',
  SOLD = 'Vendido',
  RENTED = 'Alugado',
  PENDING = 'Pendente'
}

export enum PropertyType {
  APARTMENT = 'Apartamento',
  HOUSE = 'Casa',
  COMMERCIAL = 'Comercial',
  LAND = 'Terreno'
}

export enum AppointmentType {
  VISIT = 'Visita',
  MEETING = 'Reunião',
  CALL = 'Ligação/Follow-up',
  CONTRACT = 'Assinatura',
  OTHER = 'Outro'
}

export enum AppointmentStatus {
  SCHEDULED = 'Agendado',
  CONFIRMED = 'Confirmado',
  COMPLETED = 'Realizado',
  CANCELLED = 'Cancelado'
}

export interface Appointment {
  id: string;
  title: string;
  type: AppointmentType;
  status: AppointmentStatus;
  date: string; // ISO string
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  clientId: string;
  propertyId?: string;
  location: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
}

export enum PlanTier {
  FREE = 'Gratuito',
  PRO = 'Profissional',
  PREMIUM = 'Premium'
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  address: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  parkingSpots: number;
  description: string;
  imageUrl: string;
  realtorId: string;
  lat?: number;
  lng?: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  preferences: {
    type: PropertyType[];
    minPrice: number;
    maxPrice: number;
    location: string;
  };
  interactions: Interaction[];
}

export interface Interaction {
  id: string;
  date: string;
  type: 'visit' | 'call' | 'email' | 'proposal' | 'view';
  notes: string;
  propertyId?: string;
}
