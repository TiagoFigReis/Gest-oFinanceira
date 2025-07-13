export interface User {
  id?: string;
  nome: string;
  sobrenome: string;
  tipo?: number;
  email: string;
  senha?:string;
  telefone: string;
  created_at?: string;
  updated_at?: string;
}