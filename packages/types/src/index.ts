// ============================================================
// Astral System — Shared Types
// ============================================================

// --- Site Configuration ---

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  calendlyUrl?: string;
  location?: {
    name: string;
    city: string;
    region?: string;
    country: string;
    coordinates?: { latitude: number; longitude: number };
  };
}

// --- Navigation ---

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  children?: NavLink[];
}

// --- Content Types ---

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  service: string;
  image?: string;
  videoUrl?: string;
  featured?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  credentials: string;
  role: string;
  bio: string;
  photo: string;
  videoIntroUrl?: string;
  email?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: TeamMember;
  publishedAt: string;
  categories: string[];
  body: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SiteSettings {
  announcementBar?: {
    enabled: boolean;
    message: string;
    link?: string;
  };
  whatsappNumber: string;
  email: string;
  instagramHandle: string;
  calendlyUrl: string;
  footerTagline: string;
}

// --- School Types ---

export interface Modality {
  _id: string;
  title: string;
  slug: { current: string };
  description?: unknown[]; // Portable Text
  shortDescription?: string;
  icon?: string;
  featuredImage?: string;
  color?: string;
  isProprietary: boolean;
  createdBy?: {
    name: string;
    photo?: string;
  };
  order: number;
}

export interface CoursePrerequisite {
  _id: string;
  title: string;
  slug: { current: string };
  level?: number;
  tier?: string;
  modality?: {
    title: string;
    slug: { current: string };
  };
}

export interface LessonSummary {
  _id: string;
  title: string;
  slug: { current: string };
  contentType: 'video' | 'text' | 'audio' | 'mixed';
  estimatedMinutes?: number;
  isFree: boolean;
  description?: string;
}

export interface CourseModule {
  title: string;
  description?: string;
  duration?: string;
  lessons?: LessonSummary[];
}

export interface CertificationSummary {
  _id?: string;
  title: string;
  slug: { current: string };
  description?: string;
  badgeImage?: string;
  accreditedBy?: string;
  validityPeriod?: string;
  requirements?: string[];
}

export interface Course {
  _id: string;
  title: string;
  slug: { current: string };
  subtitle?: string;
  shortDescription?: string;
  description?: unknown[]; // Portable Text
  featuredImage?: string;
  modality: {
    _id: string;
    title: string;
    slug: { current: string };
    color?: string;
    featuredImage?: string;
  };
  level?: number;
  tier: string;
  format: string;
  formatNote?: string;
  duration?: string;
  totalHours?: number;
  price?: number;
  earlyBirdPrice?: number;
  depositAmount?: number;
  paymentPlans: boolean;
  modules?: CourseModule[];
  prerequisites?: CoursePrerequisite[];
  outcomes?: string[];
  certification?: CertificationSummary;
  accreditation?: string;
  instructor?: {
    name: string;
    slug?: { current: string };
    role?: string;
    credentials?: string;
    photo?: string;
    shortBio?: string;
  };
  enrollmentOpen: boolean;
  maxStudents?: number;
  nextStartDate?: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface PractitionerService {
  title: string;
  description?: string;
  duration?: string;
  price?: number;
  format?: string;
}

export interface PractitionerCertification {
  certification: {
    _id?: string;
    title: string;
    slug: { current: string };
    badgeImage?: string;
    accreditedBy?: string;
    description?: string;
  };
  dateEarned?: string;
  certificateNumber?: string;
}

export interface Practitioner {
  _id: string;
  name: string;
  slug: { current: string };
  photo?: string;
  bio?: unknown[]; // Portable Text
  shortBio?: string;
  certifications?: PractitionerCertification[];
  services?: PractitionerService[];
  location?: {
    city?: string;
    country?: string;
    timezone?: string;
  };
  bookingUrl?: string;
  email?: string;
  website?: string;
  instagram?: string;
  specialties?: string[];
  languages?: string[];
  featured: boolean;
  isActive: boolean;
}

export interface SchoolEvent {
  _id: string;
  title: string;
  slug: { current: string };
  description?: unknown[]; // Portable Text
  shortDescription?: string;
  featuredImage?: string;
  eventType: string;
  date: string;
  endDate?: string;
  timezone?: string;
  format: string;
  location?: string;
  meetingUrl?: string;
  price: number;
  maxAttendees?: number;
  registrationOpen: boolean;
  facilitator?: {
    name: string;
    slug?: { current: string };
    role?: string;
    photo?: string;
  };
  relatedCourse?: {
    title: string;
    slug: { current: string };
  };
  relatedModality?: {
    title: string;
    slug: { current: string };
  };
}

export interface DigitalProduct {
  _id: string;
  title: string;
  slug: { current: string };
  description?: unknown[]; // Portable Text
  shortDescription?: string;
  featuredImage?: string;
  productType: string;
  price: number;
  featured: boolean;
  relatedModality?: {
    title: string;
    slug: { current: string };
  };
}

// --- Label Helpers ---

export const TIER_LABELS: Record<string, string> = {
  foundation: 'Foundation',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  master: 'Master Practitioner',
  teacher: 'Master Teacher',
};

export const FORMAT_LABELS: Record<string, string> = {
  'in-person': 'In-Person',
  online: 'Online',
  hybrid: 'Hybrid',
};

export const EVENT_TYPE_LABELS: Record<string, string> = {
  workshop: 'Workshop',
  webinar: 'Webinar',
  circle: 'Circle',
  ceremony: 'Ceremony',
  masterclass: 'Masterclass',
  qa: 'Q&A',
};
