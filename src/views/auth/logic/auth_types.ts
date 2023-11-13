export interface User {
  id: number;
  name: string;
  surname: string;
  role: 'ADMIN' | 'ROOT' | 'MANAGER';
  genre?: 'WOMAN' | 'MEN';
  email: string | null;
  phone: string;
  country_code: string;
  phone_for_call?: string;
  created_at: string;
  updated_at: string;
}
