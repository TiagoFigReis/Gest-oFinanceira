import httpClient from './httpConfig';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

export async function login  (email : string, senha: string, navigate: (path: string) => void) {
    try{
        const { data } = await httpClient.post('/users/login', { email, senha });
        localStorage.setItem('token', data.token);
        toast.success("Login feito com sucesso!")
        navigate('/home')
    }catch{
        toast.error("Usuário ou senha inválidos!")
    }
  
};

export function logout(navigate: (path: string) => void){
    localStorage.removeItem('token')
    toast.success("Logout feito com sucesso!")
    navigate('/')
}

function isTokenValid(token: string): boolean {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) return false;

    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function isAuthenticated(){
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
        return false;
    }
    return true
}