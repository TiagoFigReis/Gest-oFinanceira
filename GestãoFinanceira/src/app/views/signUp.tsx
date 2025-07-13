import { AiOutlineDollarCircle } from "react-icons/ai";
import bg from '../../assets/bg.jpg'
import SignUpForm from '../features/signUpForm';

export default function SignUp() {

    return(
        <div style={{backgroundImage:`url(${bg})`}} className=" flex flex-col items-center justify-center font-bold min-h-screen text-xl bg-cover bg-center">
            <div className='flex flex-col items-center bg-white rounded-xl shadow-lg justify-center p-2'>
                <AiOutlineDollarCircle color='blue' size={40} />
                <p>Crie sua conta</p>
                <SignUpForm></SignUpForm>
            </div>
        </div>
    )
}