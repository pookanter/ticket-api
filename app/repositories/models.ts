export interface Board {
  id: number;
  user_id: number;
  title: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Status {
  id: number;
  board_id: number;
  title: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: number;
  status_id: number;
  title: string;
  description: string;
  contact: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}