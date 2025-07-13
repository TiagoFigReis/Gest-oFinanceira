import { Button, Form, Input, type FormProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../../core/interfaces/User';
import userService from '../../core/services/user.service';

type FieldType = {
    nome:string;
    sobrenome:string;
    email: string;
    telefone: string;
    senha: string;
    confirmSenha: string;
    remember?: boolean;
};

export default function SignUpForm(){

    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const user : User = {nome: values.nome, sobrenome: values.sobrenome, email:values.email, senha:values.senha, telefone: values.telefone}
        await userService.create(user)
        navigate("/")
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
    <Form
      name="sign-up_form"
      requiredMark={false}
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{padding:20}}
      className=" bg-white font-normal w-md "
    >
        <Form.Item<FieldType>
            label={<span className='font-semibold'>Nome</span>}
            name="nome"
            rules={[
            { required: true, message: 'Por favor, insira seu nome!' },
            ]}
        >
            <Input placeholder='John' />
        </Form.Item>

        <Form.Item<FieldType>
            label={<span className='font-semibold'>Sobrenome</span>}
            name="sobrenome"
            rules={[
            { required: true, message: 'Por favor, insira seu sobrenome!' },
            ]}
        >
            <Input placeholder='Doe' />
        </Form.Item>
        <Form.Item<FieldType>
            label={<span className='font-semibold'>E-mail</span>}
            name="email"
            rules={[
            { required: true, message: 'Por favor, insira seu e-mail!' },
            { type: 'email', message: 'E-mail inválido!' }
            ]}
        >
            <Input placeholder='example@gmail.com' />
        </Form.Item>

        <Form.Item<FieldType>
                label={<span className='font-semibold'>Telefone</span>}
                name="telefone"
                rules={[
                { required: true, message: 'Por favor, insira seu telefone!' },
                {
                    pattern: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                    message: 'Telefone inválido. Ex: (35) 91111-1111',
                },
                ]}
            >
                <Input placeholder='(35) 91111-1111' />
        </Form.Item>

        <Form.Item<FieldType>
            label={<span className='font-semibold'>Senha</span>}
            name="senha"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
            <Input.Password placeholder='*******' />
        </Form.Item>

        <Form.Item<FieldType>
            label={<span className='font-semibold'>Confirmar senha</span>}
            name="confirmSenha"
            dependencies={['senha']}
            rules={[
                { required: true, message: 'Confirme sua senha!' },
                ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('senha') === value) {
                    return Promise.resolve();
                    }
                    return Promise.reject(new Error('As senhas não coincidem!'));
                },
                }),
            ]}
            >
            <Input.Password placeholder='*******' />
        </Form.Item>

        <Form.Item className='text-center min-w-full '>
            <Button className='min-w-full !font-bold' type="primary" htmlType="submit">
            Cadastrar
            </Button>
        </Form.Item>

        <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500 font-medium">Ou</span>
            <div className="flex-grow border-t border-gray-300" />
        </div>

        <div className='flex justify-center gap-1'>
            <p>Já tem uma conta?</p>
            <Link to={"/"}>Faça login</Link>
        </div>
    </Form>
    );
}