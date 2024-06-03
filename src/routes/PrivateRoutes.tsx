import PrivateLayout from '~/layouts/PrivateLayout';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Input, Button } from 'antd';

// Define the Zod schema
const schema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Define TypeScript interface based on the Zod schema
type FormData = z.infer<typeof schema>;

const MyForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };

    return (
        <Form onFinish={handleSubmit(onSubmit)}>
            <Form.Item
                label='Username'
                validateStatus={errors.username ? 'error' : ''}
                help={errors.username ? errors.username.message : ''}
            >
                <Input {...register('username')} />
            </Form.Item>

            <Form.Item
                label='Email'
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email ? errors.email.message : ''}
            >
                <Input {...register('email')} />
            </Form.Item>

            <Form.Item
                label='Password'
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password ? errors.password.message : ''}
            >
                <Input.Password {...register('password')} />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

const PrivateRoutes = [
    {
        path: '/admin',
        element: <PrivateLayout />,
        children: [
            {
                path: 'ok',
                element: <MyForm></MyForm>,
            },
        ],
    },
];

export default PrivateRoutes;