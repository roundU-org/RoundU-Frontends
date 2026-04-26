import {
  Zap, Droplets, Sparkles, Car, User, LucideIcon, SprayCan,
  Paintbrush, Hammer, AirVent, Bug, Scissors, Flower2, Monitor,
  Refrigerator, Wallpaper, Lock, Smartphone, Music,
  ChefHat, GraduationCap, Dog, HeartPulse, Truck, Plane,
  Dumbbell, Camera as CameraIcon, Tv, Wind, Trash2, Home
} from "lucide-react";

export interface Service {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  commonProblems?: string[];
  relatedServiceIds?: string[];
}

export interface Provider {
  id: string;
  name: string;
  serviceId: string;
  rating: number;
  reviews: number;
  pricePerHr: number;
  distanceKm: number;
  etaMin: number;
  experienceYrs: number;
  avatar: string;
  verified: boolean;
  topRated: boolean;
  bio: string;
  tags: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  providerId: string;
  serviceId: string;
  date: string; // ISO date
  time: string;
  notes: string;
  status: "pending" | "assigned" | "on_the_way" | "arrived" | "in_progress" | "completed" | "cancelled";
  createdAt: number;
  price: number;
  rating?: number;
  review?: string;
  paid?: boolean;
}

export interface ProviderRequest {
  id: string;
  customerName: string;
  serviceId: string;
  address: string;
  date: string;
  time: string;
  price: number;
  status: "pending" | "accepted" | "on_the_way" | "arrived" | "quote_set" | "in_progress" | "completed" | "rejected";
  notes?: string;
  distanceKm?: number;
  customerRating?: number;
  photos?: string[];
  video?: string;
  voiceNote?: string;
  quote?: number;
}

export interface ServiceReport {
  id: string;
  jobId: string;
  rootCause: string;
  severity: number;
  description: string;
  followUp: string;
  beforePhoto?: string;
  afterPhoto?: string;
  submittedAt: number;
}

export const services: Service[] = [
  {
    id: "plumber",
    label: "Plumber",
    icon: Droplets,
    desc: "Pipes & drainage",
    commonProblems: ["Leaking pipes", "Tap repair", "Washbasin clog", "Water tanker", "Bathroom fittings"],
    relatedServiceIds: ["housekeeping", "electrician"]
  },
  {
    id: "electrician",
    label: "Electrician",
    icon: Zap,
    desc: "Wiring & fixtures",
    commonProblems: ["Fan repair", "Short circuit", "Switchboard issues", "New wiring", "MCB tripping"],
    relatedServiceIds: ["housekeeping", "plumber"]
  },
  {
    id: "carwash",
    label: "Car Wash",
    icon: Car,
    desc: "At your doorstep",
    commonProblems: ["Exterior wash", "Interior detailing", "Full car spa"],
    relatedServiceIds: ["drivers", "housekeeping"]
  },
  {
    id: "drivers",
    label: "Acting Drivers",
    icon: User,
    desc: "Expert chauffeurs",
    commonProblems: ["City driving", "Outstation trip", "Pick & drop", "Monthly driver"],
    relatedServiceIds: ["carwash"]
  },
  {
    id: "housekeeping",
    label: "House Keeping",
    icon: SprayCan,
    desc: "Deep & regular",
    commonProblems: ["Kitchen cleaning", "Bathroom deep clean", "Full home clean", "Sofa cleaning"],
    relatedServiceIds: ["plumber", "electrician", "carwash"]
  },
  { id: "painter", label: "Painter", icon: Paintbrush, desc: "Interior & exterior" },
  { id: "carpenter", label: "Carpenter", icon: Hammer, desc: "Furniture & repairs" },
  { id: "acrepair", label: "AC Repair", icon: AirVent, desc: "Service & install" },
  { id: "pestcontrol", label: "Pest Control", icon: Bug, desc: "Termites & bugs" },
  { id: "salon", label: "Salon", icon: Scissors, desc: "Hair & grooming" },
  { id: "gardener", label: "Gardener", icon: Flower2, desc: "Lawn & plants" },
  { id: "tvrepair", label: "TV Repair", icon: Tv, desc: "Display & sound" },
  { id: "fridgerepair", label: "Fridge Repair", icon: Refrigerator, desc: "Cooling issues" },
  { id: "mason", label: "Mason", icon: Wallpaper, desc: "Bricks & cement" },
  { id: "locksmith", label: "Locksmith", icon: Lock, desc: "Keys & locks" },
  { id: "mobile", label: "Mobile Repair", icon: Smartphone, desc: "Screen & battery" },
  { id: "photographer", label: "Photographer", icon: CameraIcon, desc: "Events & portraits" },
  { id: "musician", label: "Musician", icon: Music, desc: "Tutor & events" },
  { id: "chef", label: "Chef", icon: ChefHat, desc: "At home cooking" },
  { id: "tutor", label: "Tutor", icon: GraduationCap, desc: "School & college" },
  { id: "petcare", label: "Pet Care", icon: Dog, desc: "Grooming & walking" },
  { id: "physio", label: "Physio", icon: HeartPulse, desc: "Home therapy" },
  { id: "packers", label: "Packers", icon: Truck, desc: "Home shifting" },
  { id: "travel", label: "Travel Agent", icon: Plane, desc: "Booking & visa" },
  { id: "fitness", label: "Fitness Coach", icon: Dumbbell, desc: "Personal training" },
  { id: "ro", label: "RO Repair", icon: Droplets, desc: "Water purifier" },
  { id: "washingmachine", label: "Washing Machine", icon: Wind, desc: "Repair & service" },
  { id: "junk", label: "Junk Removal", icon: Trash2, desc: "Clear & dispose" },
  { id: "interior", label: "Interior Design", icon: Home, desc: "Consult & decor" },
  { id: "event", label: "Event Planner", icon: Sparkles, desc: "Weddings & parties" },
];

export const getServiceById = (id: string) => services.find((s) => s.id === id);

export interface QuickFix {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const quickFixes: QuickFix[] = [
  { id: "pipe", label: "Pipe leakage", icon: Droplets },
  { id: "switch", label: "Switch repair", icon: Zap },
  { id: "carwash", label: "Car detailing", icon: Car },
  { id: "cleaning", label: "Deep cleaning", icon: SprayCan },
  { id: "driver", label: "Request drive", icon: User },
];

export interface PopularTask {
  id: string;
  serviceId: string;
  category: string;
  title: string;
  description: string;
  priceLabel: string;
  image: string;
}

export const popularTasks: PopularTask[] = [
  {
    id: "pt-1",
    serviceId: "electrician",
    category: "ELECTRICAL",
    title: "Smart Lighting Install",
    description: "Complete setup for all rooms",
    priceLabel: "₹1500+",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=300&fit=crop",
  },
  {
    id: "pt-2",
    serviceId: "plumber",
    category: "PLUMBING",
    title: "Full Bathroom Refit",
    description: "Fixtures, pipes & drainage",
    priceLabel: "₹3000+",
    image: "https://images.unsplash.com/photo-1585128903994-9788298932a4?w=400&h=300&fit=crop",
  },
  {
    id: "pt-3",
    serviceId: "housekeeping",
    category: "HOUSE KEEPING",
    title: "Deep Kitchen Cleaning",
    description: "Full sanitization & degreasing",
    priceLabel: "₹800+",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop",
  },
];

const baseProviders: Omit<Provider, "id" | "serviceId">[] = [
  { name: "Rajesh Kumar", rating: 4.9, reviews: 238, pricePerHr: 299, distanceKm: 1.2, etaMin: 30, experienceYrs: 8, avatar: "RK", verified: true, topRated: true, bio: "Certified expert with 8+ years of hands-on experience. Quick, clean and reliable.", tags: ["Verified", "Fast"], available: true },
  { name: "Suresh Menon", rating: 4.7, reviews: 156, pricePerHr: 249, distanceKm: 2.5, etaMin: 45, experienceYrs: 5, avatar: "SM", verified: true, topRated: false, bio: "Friendly professional focused on quality work and customer satisfaction.", tags: ["Experienced"], available: true },
  { name: "Deepak Jain", rating: 4.8, reviews: 312, pricePerHr: 349, distanceKm: 0.8, etaMin: 20, experienceYrs: 10, avatar: "DJ", verified: true, topRated: true, bio: "Top-rated specialist serving the city for over a decade.", tags: ["Verified", "Top Rated"], available: true },
  { name: "Vikram Singh", rating: 4.6, reviews: 89, pricePerHr: 199, distanceKm: 3.1, etaMin: 50, experienceYrs: 3, avatar: "VS", verified: false, topRated: false, bio: "Affordable and dependable service for all your needs.", tags: ["Budget"], available: true },
  { name: "Arun Patel", rating: 4.9, reviews: 421, pricePerHr: 399, distanceKm: 1.8, etaMin: 35, experienceYrs: 12, avatar: "AP", verified: true, topRated: true, bio: "Premium professional with years of expertise and outstanding reviews.", tags: ["Verified", "Premium"], available: true },
];

// Generate 5 providers per service
export const providers: Provider[] = services.flatMap((s) =>
  baseProviders.map((p, i) => ({
    ...p,
    id: `${s.id}-${i}`,
    serviceId: s.id,
  }))
);

export const getProviderById = (id: string) => providers.find((p) => p.id === id);

// Initial provider-side incoming requests
export const initialProviderRequests: ProviderRequest[] = [
  {
    id: "req-1",
    customerName: "Anita Sharma",
    serviceId: "electrician",
    address: "12, MG Road, Indiranagar",
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    time: "10:00 AM",
    price: 299,
    status: "pending",
    notes: "Fan installation needed.",
    distanceKm: 2.3,
    customerRating: 4.8,
    photos: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=200&fit=crop"],
    video: "https://example.com/video.mp4",
  },
  {
    id: "req-2",
    customerName: "Rohit Verma",
    serviceId: "electrician",
    address: "44, 5th Cross, Koramangala",
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    time: "2:30 PM",
    price: 349,
    status: "pending",
    notes: "Wiring inspection.",
    distanceKm: 4.1,
    customerRating: 4.5,
    voiceNote: "https://example.com/audio.mp3",
  },
  {
    id: "req-3",
    customerName: "Sanjay Gupta",
    serviceId: "plumber",
    address: "BTM Layout, 2nd Stage",
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    time: "09:00 AM",
    price: 499,
    status: "pending",
    notes: "Kitchen sink leakage.",
    distanceKm: 1.5,
    customerRating: 4.9,
    photos: ["https://images.unsplash.com/photo-1585703866243-e6824a61288b?w=200&h=200&fit=crop"],
  },
  {
    id: "req-4",
    customerName: "Meera Nair",
    serviceId: "housekeeping",
    address: "Prestige Shantiniketan, Whitefield",
    date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    time: "11:30 AM",
    price: 899,
    status: "pending",
    notes: "Deep cleaning for 2BHK.",
    distanceKm: 8.2,
    customerRating: 4.7,
  },
  {
    id: "req-5",
    customerName: "Rahul Dravid",
    serviceId: "salon",
    address: "Lavelle Road, Bangalore",
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    time: "5:00 PM",
    price: 599,
    status: "pending",
    notes: "Haircut and beard trim.",
    distanceKm: 3.8,
    customerRating: 5.0,
  },
];

export const initialCompletedJobs: ProviderRequest[] = [
  {
    id: "job-c1",
    customerName: "Priya Das",
    serviceId: "electrician",
    address: "8, Park Street",
    date: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10),
    time: "11:00 AM",
    price: 499,
    status: "completed",
  },
  {
    id: "job-c2",
    customerName: "Karan Mehta",
    serviceId: "electrician",
    address: "21, HSR Layout",
    date: new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10),
    time: "4:00 PM",
    price: 299,
    status: "completed",
  },
];

export const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
];
