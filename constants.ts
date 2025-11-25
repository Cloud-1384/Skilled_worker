import { WorkerCategory, WorkerProfile, Product } from './types';

export const APP_NAME = "SkilledHelpers";
export const TAGLINE = "You Save, They Earn!";

export const MOCK_WORKERS: WorkerProfile[] = [
  {
    id: '1',
    name: 'Ramesh Goud',
    category: WorkerCategory.PLUMBER,
    rating: 4.8,
    reviews: 124,
    phone: '+91 98480 12345',
    hourlyRate: 350,
    imageUrl: 'https://ui-avatars.com/api/?name=Ramesh+Goud&background=0D8ABC&color=fff&size=200',
    services: ['Pipe Repair', 'Leakage Fix', 'Tap Installation'],
    description: 'Expert plumber with 15 years of experience in Nizamabad. Specializes in residential leakage fixing and modern bathroom fittings.',
    location: 'Nizamabad, Telangana',
    isVerified: true
  },
  {
    id: '2',
    name: 'Suresh Electricals',
    category: WorkerCategory.ELECTRICIAN,
    rating: 4.9,
    reviews: 89,
    phone: '+91 99590 67890',
    hourlyRate: 400,
    imageUrl: 'https://ui-avatars.com/api/?name=Suresh+E&background=FFC107&color=000&size=200',
    services: ['Wiring', 'Fan Repair', 'Inverter Setup'],
    description: 'Certified electrician available for emergency services in Hyderabad and Secunderabad areas. Quick and safe work guaranteed.',
    location: 'Hyderabad, Telangana',
    isVerified: true
  },
  {
    id: '3',
    name: 'Lakshmi Garden Services',
    category: WorkerCategory.GARDENER,
    rating: 4.7,
    reviews: 56,
    phone: '+91 98660 54321',
    hourlyRate: 300,
    imageUrl: 'https://ui-avatars.com/api/?name=Lakshmi+G&background=4CAF50&color=fff&size=200',
    services: ['Lawn Mowing', 'Planting', 'Pruning'],
    description: 'Passionate gardener offering complete landscape maintenance. We bring your home garden to life with organic manure.',
    location: 'Warangal, Telangana',
    isVerified: true
  },
  {
    id: '4',
    name: 'Abdul Carpenter Works',
    category: WorkerCategory.CARPENTER,
    rating: 4.6,
    reviews: 210,
    phone: '+91 97000 11223',
    hourlyRate: 450,
    imageUrl: 'https://ui-avatars.com/api/?name=Abdul+C&background=795548&color=fff&size=200',
    services: ['Furniture Repair', 'Door Fixing', 'Custom Shelves'],
    description: 'Traditional woodworker skilled in modern furniture design and antique repair. Best rates in Karimnagar.',
    location: 'Karimnagar, Telangana',
    isVerified: true
  },
  {
    id: '5',
    name: 'Venkatesh Painters',
    category: WorkerCategory.PAINTER,
    rating: 4.5,
    reviews: 78,
    phone: '+91 99490 33445',
    hourlyRate: 500,
    imageUrl: 'https://ui-avatars.com/api/?name=Venkatesh+P&background=E91E63&color=fff&size=200',
    services: ['Wall Painting', 'Waterproofing', 'Texture Work'],
    description: 'Professional house painting services. We use high-quality Asian Paints and ensure clean work.',
    location: 'Nizamabad, Telangana',
    isVerified: false
  },
  {
    id: '6',
    name: 'Srinu Plumbing',
    category: WorkerCategory.PLUMBER,
    rating: 4.2,
    reviews: 45,
    phone: '+91 98481 22334',
    hourlyRate: 300,
    imageUrl: 'https://ui-avatars.com/api/?name=Srinu+P&background=0D8ABC&color=fff&size=200',
    services: ['Water Tank Cleaning', 'Motor Repair'],
    description: 'Affordable plumbing services for water tank cleaning and motor repairs in Bodhan and surrounding villages.',
    location: 'Bodhan, Nizamabad',
    isVerified: true
  },
  {
    id: '7',
    name: 'Anjali Arts',
    category: WorkerCategory.ARTS_CRAFTS,
    rating: 5.0,
    reviews: 32,
    phone: '+91 88855 66778',
    hourlyRate: 600,
    imageUrl: 'https://ui-avatars.com/api/?name=Anjali+A&background=9C27B0&color=fff&size=200',
    services: ['Pottery', 'Canvas Painting', 'Handmade Gifts'],
    description: 'Custom handmade gifts and paintings for home decor. Workshops available for kids.',
    location: 'Hyderabad, Telangana',
    isVerified: true
  },
  {
    id: '8',
    name: 'Raju Electricals',
    category: WorkerCategory.ELECTRICIAN,
    rating: 4.4,
    reviews: 67,
    phone: '+91 99123 45678',
    hourlyRate: 350,
    imageUrl: 'https://ui-avatars.com/api/?name=Raju+E&background=FFC107&color=000&size=200',
    services: ['Switchboard Repair', 'Light Installation'],
    description: 'Specialist in LED lighting installation and old wiring replacement.',
    location: 'Siddipet, Telangana',
    isVerified: true
  },
  {
    id: '9',
    name: 'Mohd Pasha',
    category: WorkerCategory.OTHER,
    rating: 4.7,
    reviews: 15,
    phone: '+91 77020 99887',
    hourlyRate: 250,
    imageUrl: 'https://ui-avatars.com/api/?name=Mohd+P&background=607D8B&color=fff&size=200',
    services: ['AC Repair', 'Fridge Repair'],
    description: 'Expert technician for Air Conditioners and Refrigerators. Summer servicing offers available.',
    location: 'Nizamabad, Telangana',
    isVerified: true
  },
  {
    id: '10',
    name: 'Sravani Crafts',
    category: WorkerCategory.ARTS_CRAFTS,
    rating: 4.9,
    reviews: 41,
    phone: '+91 63000 55443',
    hourlyRate: 400,
    imageUrl: 'https://ui-avatars.com/api/?name=Sravani+C&background=9C27B0&color=fff&size=200',
    services: ['Embroidery', 'Fabric Painting'],
    description: 'Beautiful hand embroidery on sarees and dresses. Custom orders accepted.',
    location: 'Warangal, Telangana',
    isVerified: false
  },
  {
    id: '11',
    name: 'Krishna Wood Works',
    category: WorkerCategory.CARPENTER,
    rating: 4.5,
    reviews: 98,
    phone: '+91 94400 33221',
    hourlyRate: 400,
    imageUrl: 'https://ui-avatars.com/api/?name=Krishna+W&background=795548&color=fff&size=200',
    services: ['Sofa Repair', 'Bed Making', 'Polishing'],
    description: 'All types of wood work and polishing done here. Reliable service.',
    location: 'Hyderabad, Telangana',
    isVerified: true
  },
  {
    id: '12',
    name: 'Ravi Home Services',
    category: WorkerCategory.OTHER,
    rating: 4.3,
    reviews: 22,
    phone: '+91 99898 77665',
    hourlyRate: 200,
    imageUrl: 'https://ui-avatars.com/api/?name=Ravi+H&background=607D8B&color=fff&size=200',
    services: ['House Cleaning', 'Pest Control'],
    description: 'Deep cleaning services for apartments and villas. Pest control for termites and cockroaches.',
    location: 'Hyderabad, Telangana',
    isVerified: true
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '101',
    name: 'Heavy Duty Hammer',
    price: 450,
    image: 'https://placehold.co/300x200?text=Hammer',
    category: 'Tools',
    rating: 4.5
  },
  {
    id: '102',
    name: 'Safety Helmet',
    price: 250,
    image: 'https://placehold.co/300x200?text=Helmet',
    category: 'Safety',
    rating: 4.8
  },
  {
    id: '103',
    name: 'Drill Machine Set',
    price: 2500,
    image: 'https://placehold.co/300x200?text=Drill',
    category: 'Tools',
    rating: 4.7
  },
  {
    id: '104',
    name: 'Paint Brush Set',
    price: 350,
    image: 'https://placehold.co/300x200?text=Brushes',
    category: 'Painting',
    rating: 4.2
  }
];

export const CATEGORIES_LIST = [
  { name: 'All', icon: 'fa-layer-group', type: WorkerCategory.ALL },
  { name: 'Plumbers', icon: 'fa-faucet', type: WorkerCategory.PLUMBER },
  { name: 'Electricians', icon: 'fa-bolt', type: WorkerCategory.ELECTRICIAN },
  { name: 'Gardeners', icon: 'fa-leaf', type: WorkerCategory.GARDENER },
  { name: 'Painters', icon: 'fa-paint-roller', type: WorkerCategory.PAINTER },
  { name: 'Carpenters', icon: 'fa-hammer', type: WorkerCategory.CARPENTER },
  { name: 'Arts & Crafts', icon: 'fa-palette', type: WorkerCategory.ARTS_CRAFTS },
  { name: 'Others', icon: 'fa-briefcase', type: WorkerCategory.OTHER },
];