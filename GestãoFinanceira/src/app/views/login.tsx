import LoginForm from '../features/loginForm'


export default function Login() {

    return(
        <div className="flex flex-col items-center justify-center gap-2 font-bold min-h-screen bg-black text-white text-xl">
            <p className='text-center'>Olá React</p>
            <LoginForm></LoginForm>
        </div>
    )
}