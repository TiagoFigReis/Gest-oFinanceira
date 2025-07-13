import { Button, Checkbox, Form, Input, type FormProps } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../auth/Authorization.service'

type FieldType = {
  email: string;
  senha: string;
  remember?: boolean;
};

export default function LoginForm(){

    const [form] = Form.useForm();

    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email');
        if(email){
            form.setFieldsValue({
                email: email,
                remember: true
            })
        }
    }, [form])

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        if(values.remember){
            localStorage.setItem('email', values.email)
        }else{
            localStorage.removeItem('email')
        }
        login(values.email, values.senha, navigate)

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
    <Form
      name="login_form"
      form={form}
      requiredMark={false}
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{padding:20}}
      className=" bg-white font-normal w-md "
    >
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
        label={<span className='font-semibold'>Senha</span>}
        name="senha"
        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
      >
        <Input.Password placeholder='*******' />
      </Form.Item>

      <div className="flex justify-between items-start">
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Lembrar usuário</Checkbox>
        </Form.Item>

        <Link className="font-normal text-sm mt-1" to={"/"}>
          Esqueceu sua senha?
        </Link>
      </div>

      <Form.Item className='text-center min-w-full'>
        <Button className='min-w-full !font-bold' type="primary" htmlType="submit">
          Entrar
        </Button>
      </Form.Item>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500 font-medium">Ou</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      <div className='flex justify-center gap-1'>
        <p>Não tem uma conta?</p>
        <Link to={"/sign-up"}>Cadastre-se</Link>
      </div>
    </Form>
    );
}