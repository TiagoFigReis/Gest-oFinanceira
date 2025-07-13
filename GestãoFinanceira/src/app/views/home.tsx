import {Button} from 'antd'
import {logout} from '../../auth/Authorization.service'
import {useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return( 
        <div className='min-h-screen min-w-screen flex flex-col gap-2 justify-center items-center bg-black'>
            <p className="font-bold text-white text-xl">Bem-Vindo</p>
            <Button onClick={() => logout(navigate)} type='primary'>Sair</Button>
        </div>  
    )
}