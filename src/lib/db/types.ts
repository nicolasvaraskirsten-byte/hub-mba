// Tipos para Supabase / app

export type UserRole = "admin" | "expert" | "participant";

export type BookingStatus =
  | "requested"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "completed";

export type FavoriteType = "expert" | "participant";

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  user_id: string;
  headline: string | null;
  bio: string | null;
  linkedin_url: string | null;
  company: string | null;
  industry: string | null;
  location: string | null;
  interests: string[];
  goals: string[];
  public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Expert {
  user_id: string;
  expertise: string[];
  years_experience: number | null;
  industries: string[];
  languages: string[];
  featured: boolean;
  calendar_connected: boolean;
  /** URL de Calendly para agendar sesión. Opcional (columna puede no existir aún en DB). */
  calendly_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  requester_user_id: string;
  expert_user_id: string;
  status: BookingStatus;
  start_at: string;
  end_at: string;
  notes: string | null;
  meet_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string | null;
  location: string | null;
  link: string | null;
  tags: string[];
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  url: string;
  tags: string[];
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  target_user_id: string;
  type: FavoriteType;
  created_at: string;
}

// Con joins para UI
export interface UserWithProfile extends User {
  profile?: Profile | null;
  expert?: Expert | null;
}

export interface ExpertWithUser extends Expert {
  user?: User | null;
  profile?: Profile | null;
}

export interface BookingWithParties extends Booking {
  requester?: UserWithProfile | null;
  expert?: ExpertWithUser | null;
}
