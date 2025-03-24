'use client';

import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, DatePicker, message } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'; // Importamos el hook useRouter


type User = {
  name?: string;
  surname?:string;
  birthdate?:any;
  username?: string;
  password?: string;
  email?: string;
};


const App: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter(); // Usamos el hook para la redirección

  const onFinish: FormProps<User>['onFinish'] = (values) => {
    console.log('Success:', values);
    message.success({content: "Se ha registrado correctamente",
      className: 'custom-message',
      duration:1,
    });
      setTimeout(() => {
        router.push('/');
      }, 2000); // 2000 ms = 2 seconds
  };
  
  const onFinishFailed: FormProps<User>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error({content:"Formulario incompleto o erróneo",
      className: 'custom-message',
      duration:3,
    })
  };

  return (
    <div className=' w-screen h-screen flex justify-center items-center flex-col gap-10'>
      <p className='text-5xl'>Ingresa tus datos personales</p>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8}}
          wrapperCol={{ span: 14 }}
          initialValues={{name:"Ismael",username:"i", repeatUsername:"i", email:"ismael@gmail.com", repeatEmail:"ismael@gmail.com", password:"aA12345", repeatPassword:"aA12345"}}//{{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className='flex flex-col justify-center bg-[rgba(255,251,0,0.1)] w-2/5 h-4/6 rounded-2xl border-2 border-amber-950'
        > 
          <Form.Item<User>
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Introduce tu nombre' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<User>
            label="Nombre de Usuario"
            name="username"
            rules={[{ required: true, message: 'Introduce tu nombre de usuario' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Repite Nombre de Usuario"
            name="repeatUsername"
            rules={[
              { required: true, message: 'Repite tu nombre de Usuario' },
              {
                validator: (_, value) => {
                  const user = form.getFieldValue('username');
                  if (!value || value === user) {
                    return Promise.resolve();
                  }
                  return Promise.reject('¡los usuarios no coinciden!');
                },
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Fecha de Nacimiento"
            name="birthdate"
            rules={[{ required: true, message: 'Por favor selecciona tu fecha de nacimiento' }]}
          >
          <DatePicker
            format="DD/MM/YYYY"  // Formato de la fecha
            disabledDate={(current) => current && current.isAfter(dayjs().subtract(18, 'years'))}  // Deshabilita fechas de hoy y posteriores a 18 años
          />
          </Form.Item>

          <Form.Item<User>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Introduce tu email' },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '¡El correo electrónico no es válido!' 
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Repite Email"
            name="repeatEmail"
            rules={[
              { required: true, message: 'Repite tu email' },
              {
                validator: (_, value) => {
                  const email = form.getFieldValue('email');
                  if (!value || value === email) {
                    return Promise.resolve();
                  }
                  return Promise.reject('¡los email no coinciden!');
                },
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<User>
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Inserta tu contraseña' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número, y tener al menos 6 caracteres.'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Repite Contraseña"
            name="repeatPassword"
            rules={[
              { required: true, message: 'Repite tu contraseña' },
              {
                validator: (_, value) => {
                  const password = form.getFieldValue('password');
                  if (!value || value === password) {
                    return Promise.resolve();
                  }
                  return Promise.reject('¡Las contraseñas no coinciden!');
                },
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null} className='flex justify-center'  wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" >
              Registro
            </Button>
          </Form.Item>
        </Form>
    </div>
    
  );
};

export default App;
