import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GroupAddSharpIcon from '@material-ui/icons/GroupAddSharp';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    Input,
    FormControl,
    Divider,
    Card,
    CardContent,
    CardActions,
    Collapse,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    FormGroup,
    DialogContentText,
    Switch,
    FormControlLabel,
} from '@material-ui/core';

import * as Yup from 'yup';
import { useForm } from '~/hooks';
import { useStyles } from './styles';
import api from '~/services/api';

export default function Profile() {
    const [open, setOpen] = useState(false);
    //Se  operation == false  Alteração |  operation == true inclusão;
    const [operation, setOperation] = useState(true);
    const [alterPassword, setAlterPassword] = useState(true);

    const [idHeader, setIdHeader] = useState(0);
    const [name, setName] = useState(false);
    const [openDetele, setOpenDelete] = useState(false);
    const [{ values }, handleChange] = useForm();
    const [dataEnterprise, setDataEnterprise] = useState([]);
    const [dataTableHeader, setDataTableHeader] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const [loading, setLoading] = useState(false);

    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Email Inválido')
            .required('Email Obrigatório'),
        // alterPassword: Yup.boolean(),
        // password: Yup.string().when('alterPassword', {
        //     is: true,
        //     then: Yup.string()
        //         .required('Senha Obrigatório')
        //         .min(6, 'Mínimo 6 caracteres'),
        // }),
        // // password: Yup.string()
        // //     .required('Senha Obrigatório')
        // //     .min(6, 'Mínimo 6 caracteres'),
        // confirmPassword: Yup.string()
        //     .required('Confirmação de Senha Obrigatória')
        //     .min(6, 'Mínimo 6 caracteres'),
        name: Yup.string()
            .required('Nome Obrigatório')
            .min(6, 'Mínimo 6 caracteres'),
    });

    useEffect(() => {
        async function loadEnterprise() {
            const response = await api.get('enterprise');
            setDataEnterprise(response.data);
        }

        loadEnterprise();
    }, []);

    useEffect(() => {
        async function loadTableHeader() {
            const res = await api.get('users');
            const dataTable = res.data;
            setDataTableHeader(dataTable);
        }

        loadTableHeader();
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClickOpen = e => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleChangeSwitch = event => {
        setAlterPassword(event.target.checked);
    };

    const handleClickOpenDelete = (event, id, nameUser) => {
        setIdHeader(id);
        setName(nameUser);
        setOpenDelete(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOperation(true);
        setAlterPassword(true);

        values.enterprise = 0;
        document.querySelector('input[name=name]').value = '';
        document.querySelector('input[name=email]').value = '';
        document.querySelector('input[name=password]').value = '';
        document.querySelector('input[name=confirmPassword]').value = '';
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setIdHeader(0);
    };

    const classes = useStyles();

    async function handleSubmit() {
        // faça o que for preciso :)
        setLoading(true);
        const name = document.querySelector('input[name=name]').value;
        const email = document.querySelector('input[name=email]').value;
        const password = document.querySelector('input[name=password]').value;
        const confirmPassword = document.querySelector(
            'input[name=confirmPassword]'
        ).value;
        const { enterprise } = values;

        const form = { name, email, password, confirmPassword, enterprise };

        schema.validate(form).catch(err => {
            // toast.error(err);
            toast.error(`${err.errors}`);
            //  alert(err);
            setLoading(false);
        });

        if (schema.isValidSync(form)) {
            if (password === confirmPassword) {
                const resp = await api.post('/users', {
                    name,
                    enterprise,
                    email,
                    password,
                    confirmPassword,
                    provider: true,
                });

                if (resp.data) {
                    toast.success(` Usuário Incluído com Sucesso `);
                    const auxValues = dataTableHeader;
                    auxValues.push(resp.data);
                    setDataTableHeader(auxValues);
                    handleClose();
                } else {
                    toast.error(resp.error);
                }
            } else {
                toast.error(
                    'Senha e Confirmação de Senha precisam ser Iguais!'
                );
            }
        }
        setLoading(false);
    }

    const validPassword = (password, confirmPassword) => {
        console.log(`---------------`);
        if (alterPassword === true) {
            console.log(password.trim() !== confirmPassword.trim());
            if (password !== confirmPassword) {
                toast.error('Senha precisa ser igual a Senha de Confirmação');
                return false;
            } else if (password.length < 6) {
                toast.error('Senha precisa ter no mínimo 6 caracteres!!!');
                return false;
            }
        }
        return true;
    };

    async function handleEdit() {
        // faça o que for preciso :)
        setLoading(true);
        const name = document.querySelector('input[name=name]').value;
        const email = document.querySelector('input[name=email]').value;
        const password = document.querySelector('input[name=password]').value;
        const confirmPassword = document.querySelector(
            'input[name=confirmPassword]'
        ).value;
        const { enterprise } = values;

        const form = { name, email, password, confirmPassword, enterprise };

        schema.validate(form).catch(err => {
            // toast.error(err);
            toast.error(`${err.errors}`);
            //  alert(err);
            setLoading(false);
        });

        if (schema.isValidSync(form)) {
            if (validPassword(password, confirmPassword)) {
                const resp = await api.put('/users', {
                    name,
                    enterprise,
                    email,
                    password,
                    confirmPassword,
                    alterPassword,
                    provider: true,
                    idHeader,
                });

                if (resp.data) {
                    toast.success(` Usuário Incluído com Sucesso `);

                    const auxValues = dataTableHeader.filter(t => {
                        return t.id !== idHeader;
                    });
                    auxValues.push({ id: idHeader, name, enterprise, email });
                    setDataTableHeader(auxValues);
                    setIdHeader(0);
                    handleClose();
                } else {
                    toast.error(resp.error);
                }
            }
        }
        setLoading(false);
        console.log('passou');
    }

    async function handleDelete(e, id) {
        try {
            const resp = await api.delete(`/users/`, { data: { id: id } });
            toast.success(` Usuário EXCLUÍDO com Sucesso `);
            const auxValues = dataTableHeader.filter(t => {
                return t.id !== id;
            });
            setDataTableHeader(auxValues);
            handleCloseDelete();
        } catch (err) {
            toast.error(err);
        }
    }

    const handleEditUser = (e, id) => {
        setOperation(false);
        setAlterPassword(false);

        const filterUser = dataTableHeader.filter(user => {
            return user.id === id;
        });
        setIdHeader(id);
        values.enterprise = 0;
        document.querySelector('input[name=name]').value = filterUser[0].name;
        document.querySelector('input[name=email]').value = filterUser[0].email;
        document.querySelector('input[name=password]').value = '';
        document.querySelector('input[name=confirmPassword]').value = '';

        setOpen(true);
    };
    return (
        /**
         * List User
         * */

        <div className={classes.root}>
            <Card>
                <CardActions disableSpacing>
                    <IconButton aria-label="Users">
                        <AccountBoxSharpIcon />
                    </IconButton>
                    <Typography> Usuários</Typography>
                    <IconButton
                        className={classes.IconRight}
                        onClick={handleClickOpen}
                        aria-label="Add"
                    >
                        <GroupAddSharpIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Paper className={classes.paper}>
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="a dense table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Código</TableCell>
                                        <TableCell align="left">Nome</TableCell>
                                        <TableCell align="left">
                                            Email
                                        </TableCell>
                                        <TableCell align="left">
                                            Empresa
                                        </TableCell>
                                        <TableCell align="center">
                                            Ação
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataTableHeader.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.enterprise}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    className={classes.icon}
                                                    onClick={event =>
                                                        handleEditUser(
                                                            event,
                                                            row.id
                                                        )
                                                    }
                                                    aria-label="Edit"
                                                >
                                                    <EditIcon color="primary" />
                                                </IconButton>
                                                <IconButton
                                                    className={classes.icon}
                                                    onClick={event =>
                                                        handleClickOpenDelete(
                                                            event,
                                                            row.id,
                                                            row.name
                                                        )
                                                    }
                                                    aria-label="Delete"
                                                >
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            /> */}
                        </Paper>
                    </CardContent>
                </Collapse>
            </Card>

            <Dialog
                keepMounted={true}
                open={open}
                onClose={handleClose}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                disablePortal={true}
            >
                <DialogTitle>
                    {operation === false ? 'Alterar' : 'Incluir'} Usuário
                </DialogTitle>
                <DialogContent>
                    <form autoComplete="off" schema={schema} noValidate>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-label">Nome</InputLabel>
                            <Input name="name" required id="name-label" />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="email-label">Email</InputLabel>
                            <Input name="email" type="email" id="email-label" />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="enterprise-label">
                                Empresa
                            </InputLabel>
                            <Select
                                labelId="enterprise-label"
                                id="Empresa"
                                value={values.enterprise}
                                onChange={handleChange}
                                name="enterprise"
                                fullWidth
                            >
                                <MenuItem key="0" value="0">
                                    0-Todas
                                </MenuItem>

                                {dataEnterprise.map(name => (
                                    <MenuItem
                                        key={name.emp_codigo}
                                        value={name.emp_codigo}
                                    >
                                        {name.emp_razao}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Divider />
                        <FormGroup row>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="password-label">
                                    Senha
                                </InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password-label"
                                    disabled={!alterPassword}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="confirmPassword-label">
                                    Confirmar Senha
                                </InputLabel>
                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    id="confirmPassword-label "
                                    disabled={!alterPassword}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={alterPassword}
                                        disabled={operation}
                                        onChange={handleChangeSwitch}
                                    />
                                }
                                label="Alterar Senha"
                            />
                        </FormGroup>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            operation ? handleSubmit() : handleEdit()
                        }
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {loading ? 'Enviando...' : 'Salvar'}
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDetele}
                keepMounted
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Excluir Usuário
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {`Realmente  Deseja Excluir o Usuário ? ${idHeader} - ${name}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={event => handleDelete(event, idHeader)}
                    >
                        Deletar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCloseDelete}
                        color="primary"
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
