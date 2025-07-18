import LoginForm from '../features/loginForm'
import { AiOutlineDollarCircle } from "react-icons/ai";
import bg from '../../assets/bg.jpg'

export default function Login() {

    return(
        <div style={{backgroundImage:`url(${bg})`}} className=" flex flex-col items-center justify-center font-bold min-h-screen text-xl bg-cover bg-center">
            <div className='flex flex-col items-center bg-white rounded-xl shadow-lg justify-center p-2'>
                <AiOutlineDollarCircle color='blue' size={40} />
                <p>Bem-vindo ao FinançasPro</p>
                <LoginForm></LoginForm>
            </div>
        </div>
    )
}