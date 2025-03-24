'use client';  // Marca este archivo como Client Component

import React, { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import Link from 'next/link'
// Importar componentes de Ant Design
import { Button, Form, Input, message } from 'antd';

const App = () => {
  // Función para manejar el envío del formulario
  const onFinish = (values: any) => {
    // Mostrar un mensaje de éxito con el contenido del formulario
    message.success('Formulario enviado correctamente');
    console.log('Formulario enviado:', values);
    setUsuario([...usuario, values]); // Agregar los valores al array 'usuario'
  };

  const [usuario, setUsuario] = useState<any[]>([]); // El estado 'usuario' es un array vacío inicialmente.
  
  type usuario = {
    username?: string;
    password?: string;
  };

  const [form] = Form.useForm();

  return (
    <div className='bg-amber-50 flex flex-col items-center gap-10'>
      <h1 className='text-6xl p-5'>Cooperativa Olivarera San Sebastián</h1>
      <img src='https://sierradeguadalcanal.com/img/sierra-de-guadalcanal-logo-1441097372.jpg'/>

      {/* Usando el componente Form */}
      <Form
        name="acceso"
        initialValues={{ remember: true }}
        onFinish={onFinish} // Manejador de evento aquí
        layout="vertical"
        className='bg-amber-100 w-1/4'
      >
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            { 
              required: true, 
              message: '¡Por favor ingresa tu correo electrónico!' 
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '¡El correo electrónico no es válido!' 
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { 
                required: true, 
                message: '¡Por favor ingresa tu contraseña!' 
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número, y tener al menos 6 caracteres.'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Enviar
          </Button>
        </Form.Item>

        <Form.Item>
          <p>
            Aún no tienes cuenta, accede a <Link href="/register">Registro</Link> 
          </p>
        </Form.Item>
      </Form>

      {/* Mostrar los usuarios guardados */}
      <div>
        <h2>Usuarios guardados:</h2>
        <pre>{JSON.stringify(usuario, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
