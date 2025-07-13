import { Button, Checkbox, Form, Input, type FormProps } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{padding:20}}
      className="w-full max-w-sm bg-gray-800 rounded-xl shadow-lg"
    >
      <Form.Item<FieldType>
        label={<span className="text-white">E-mail</span>}
        name="email"
        rules={[
          { required: true, message: 'Por favor, insira seu e-mail!' },
          { type: 'email', message: 'E-mail inválido!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label={<span className="text-white">Senha</span>}
        name="senha"
        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
      >
        <Checkbox className='!text-white'>Lembrar usuário</Checkbox>
      </Form.Item>

      <Form.Item className='text-center'>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    );
}