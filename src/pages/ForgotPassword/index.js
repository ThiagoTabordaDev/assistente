import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { forgotPassword } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('e-mail Inválido')
        .required('Email Obrigatório'),
});

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    function handleSubmit(email) {
        dispatch(forgotPassword(email));
    }
    return (
        <>
            <Form schema={schema} onSubmit={handleSubmit}>
                <img src={logo} alt="Logo" />
                <h2>Solicitar Senha</h2>

                <Input name="email" type="email" placeholder="Seu e-mail" />

                <Button type="submit" variant="contained" color="primary">
                    {loading ? 'Carregando...' : 'Acessar'}
                </Button>
                <div className="separador" />
                <div>
                    <p>
                        {' Lembrou a  '}
                        <Link to="/">Senha?</Link>
                    </p>
                </div>
            </Form>
        </>
    );
}
