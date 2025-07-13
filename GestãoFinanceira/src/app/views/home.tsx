import {Button} from 'antd'
import {logout} from '../../auth/Authorization.service'
import {useNavigate } from 'react-router-dom';
import { AiOutlineDollarCircle,  } from 'react-icons/ai';
import { BiLogOut } from "react-icons/bi";

export default function Home() {

    const navigate = useNavigate();

    return( 
        <div className='min-h-screen w-screen flex flex-col  bg-white'>
            <header className='border border-gray-200 p-4'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-1'>
                        <AiOutlineDollarCircle color='blue' size={40} />
                        <p className='font-bold text-2xl'>FinançasPro</p>
                    </div>
                    <Button
                    onClick={() => logout(navigate)}
                    className=" hover:!text-red-600 !border-none !shadow-none !text-red-500"
                    >
                        <BiLogOut size={25} />
                    </Button>
                </div>
            </header>
            <main className='flex flex-col flex-1 bg-gray-100 justify-between items-center gap1'>
                <div className='m-2'>
                    Saldo Atual
                </div>
                <div className='m-2'>
                    Visão Geral
                </div>
                <div className='m-2'>
                    Transações Recentes
                </div>
            </main>
        </div>  
    )
}