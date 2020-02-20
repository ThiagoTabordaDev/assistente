import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('e-mail Inválido')
        .required('Email Obrigatório'),
    password: Yup.string()
        .required('Senha Obrigatório')
        .min(6, 'Mínimo 6 caracteres'),
});

export default function SingIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }

    return (
        <>
            <Form schema={schema} onSubmit={handleSubmit}>
                <img src={logo} alt="Logo" />
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua Senha"
                />
                <Button type="submit" variant="contained" color="primary">
                    {loading ? 'Carregando...' : 'Acessar'}
                </Button>
                <div className="separador">
                    <p>
                        {' Esqueceu a  '}
                        <Link to="/forgot">Senha?</Link>
                    </p>
                </div>
            </Form>
        </>
    );
}
