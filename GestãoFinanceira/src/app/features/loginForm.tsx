import { Button, Checkbox, Form, Input, type FormProps } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username: string;
  password: string;
  remember?: boolean;
};

export default function LoginForm(){

    const [form] = Form.useForm();

    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('username');
        if(username){
            form.setFieldsValue({
                username: username,
                remember: true
            })
        }
    }, [form])

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        if(values.remember){
            localStorage.setItem('username', values.username)
        }else{
            localStorage.removeItem('username')
        }
        navigate('/home')
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
        label={<span className="text-white">Usuário</span>}
        name="username"
        rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label={<span className="text-white">Senha</span>}
        name="password"
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