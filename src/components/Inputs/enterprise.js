import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { TextField, MenuItem } from '@material-ui/core';
import { toast } from 'react-toastify';
import api from '~/services/api';

export default function Enterprise(props) {
    // const { all } = props;
    // console.log(all);
    const [enterprise, setEnterprise] = useState(
        useSelector(state => state.user.profile.enterprise)
    );
    // console.log(useSelector(state => state.user.profile.enterprise));
    const [dataEnterprise, setDataEnterprise] = useState([]);
    const inputRef = useRef();
    useEffect(() => {
        async function loadEnterprise() {
            try {
                const response = await api.get('enterprise');
                setDataEnterprise(response.data);
            } catch (error) {
                toast.error(
                    `Api não conseguiu retornar a Empresa
                         verifique sua conexão - ${error}`
                );
            }
        }

        loadEnterprise();
    }, []);

    const handleChange = e => {
        setEnterprise(e.target.value);
    };

    return (
        <>
            <TextField
                select
                label="Empresa"
                id="enterprise"
                value={dataEnterprise[0]}
                onChange={handleChange}
                name="enterprise"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                ref={inputRef}
                fullWidth
            >
                {/* {all ? (
                    ''
                ) : (
                    <MenuItem key="0" value="0">
                        {' '}
                        0-Todas{' '}
                    </MenuItem>
                )} */}

                {dataEnterprise.map(name => (
                    <MenuItem key={name.emp_codigo} value={name.emp_codigo}>
                        {''
                            .concat(name.emp_codigo)
                            .concat('-')
                            .concat(name.emp_razao)}
                    </MenuItem>
                ))}
            </TextField>
        </>
    );
}
