import { Bottle, Location, Distributor } from './types';

export const MOCK_BOTTLES: Bottle[] = [
  {
    id: '1',
    name: 'Grey Goose Vodka',
    brand: 'Grey Goose',
    category: 'Spirits',
    level: '3/4',
    price: 45.00,
    parLevel: 4,
    currentStock: 2,
    imageUrl: 'https://picsum.photos/seed/goose/200/200',
  },
  {
    id: '2',
    name: 'Casamigos Reposado',
    brand: 'Casamigos',
    category: 'Spirits',
    level: 'Half',
    price: 55.00,
    parLevel: 4,
    currentStock: 2,
    imageUrl: 'https://picsum.photos/seed/casa/200/200',
  },
  {
    id: '3',
    name: 'Hendrick\'s Gin',
    brand: 'Hendrick\'s',
    category: 'Spirits',
    level: '1/4',
    price: 38.00,
    parLevel: 4,
    currentStock: 2,
    imageUrl: 'https://picsum.photos/seed/gin/200/200',
  },
  {
    id: '4',
    name: 'Jack Daniel\'s',
    brand: 'Jack Daniel\'s',
    category: 'Spirits',
    level: 'Almost Full',
    price: 32.00,
    parLevel: 4,
    currentStock: 2,
    imageUrl: 'https://picsum.photos/seed/jack/200/200',
  },
];

export const MOCK_LOCATIONS: Location[] = [
  { id: 'main', name: 'Main Bar', isCurrent: true },
  { id: 'rooftop', name: 'Rooftop Lounge', isCurrent: false },
  { id: 'basement', name: 'Speakeasy', isCurrent: false },
];

export const MOCK_DISTRIBUTORS: Distributor[] = [
  { id: '1', name: 'Southern Glazer\'s', initials: 'SG', email: 'orders@southernglazers.com' },
  { id: '2', name: 'Breakthru Beverage', initials: 'BB', email: 'orders@breakthrubev.com' },
  { id: '3', name: 'Columbia Distributing', initials: 'CD', email: 'orders@coldist.com' },
];

export const CATEGORIES = ['Spirits', 'Beer', 'Wine', 'Other'] as const;
export const LEVELS: { label: string; value: string }[] = [
  { label: '1/4', value: '1/4' },
  { label: 'Half', value: 'Half' },
  { label: '3/4', value: '3/4' },
  { label: 'Almost Full', value: 'Almost Full' },
];
