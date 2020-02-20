/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import {
    TextField,
    MenuItem,
    Card,
    CardContent,
    CardActions,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    Typography,
    IconButton,
    TableRow,
    Paper,
    Dialog,
    InputAdornment,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    TablePagination,
    Switch,
    FormControl,
    FormControlLabel,
} from '@material-ui/core';
import { green, blue, blueGrey } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { toast } from 'react-toastify';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import PageviewIcon from '@material-ui/icons/Pageview';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';
import * as Yup from 'yup';
import { Enterprise, SingleAutocomplete } from '~/components/Inputs';

import { useStyles } from './styles';
import api from '~/services/api';

export default function Home() {
    const classes = useStyles();
    const schemaHeader = Yup.object().shape({
        identerprise: Yup.string().required('Empresa é Obrigatório!!!'),
        idprovider: Yup.string().required('Fornecedor é Obrigatório!!!'),
    });
    const [loader, setLoader] = useState(false);

    const [expanded, setExpanded] = useState(true);
    const [purchaseDayStock, setPurchaseDayStock] = useState(true);
    const [productAboutMaxStock, setProductAboutMaxStock] = useState(false);
    const [expandedProduct, setExpandedProduct] = useState(true);
    const [isInsert, setIsInsert] = useState(true);
    const [openDetele, setOpenDelete] = useState(false);
    const [state, setState] = useState(0);
    const [idHeader, setIdHeader] = useState(0);
    const [dataTableHeader, setDataTableHeader] = useState([]);
    const [dataTableProduct, setDataTableProduct] = useState([]);
    const [name, setName] = useState('');
    const [openDialogHeader, setOpenDialogHeader] = useState(false);
    const [openDialogFilter, setOpenDialogFilter] = useState(false);
    const [openDialogDetails, setOpenDialogDetails] = useState(false);

    /** Pagination Header */
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rowsHeader, setRowsHeader] = React.useState(1);

    /** Variaveis detalhes  */
    const [idProduct, setIdProduct] = React.useState(0);
    const [description, setDescription] = React.useState(0);
    const [stock, setStock] = React.useState(0);
    const [stockCd, setStockCd] = React.useState(0);
    const [spin, setSpin] = React.useState(0);
    const [maxStock, setMaxStock] = React.useState(0);
    const [codeBar, setCodeBar] = React.useState('');
    const [stockDays, setStockDays] = React.useState('');

    /** Pagination body */
    const [pageProduct, setPageProduct] = React.useState(0);
    const [rowsPerPageProduct, setRowsPerPageProduct] = React.useState(25);
    const [rowsProduct, setRowsProduct] = React.useState(1);
    /** loader */

    useEffect(() => {
        function loadTableHeader() {
            handleList();
        }

        loadTableHeader();
    }, [rowsPerPage, page]);

    useEffect(() => {
        function loadTableProduct() {
            if (idHeader > 0) handleListProduct();
        }
        loadTableProduct();
    }, [rowsPerPageProduct, pageProduct]);

    const handleChange = e => {
        setState(e.target.value);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleExpandClickProduct = () => {
        setExpandedProduct(!expandedProduct);
    };

    const handleCloseDialogHeader = () => {
        setOpenDialogHeader(false);
    };

    const handleCloseDialogDetails = () => {
        setOpenDialogDetails(false);
    };

    const handleOpenDialogInsertHeader = (insert = true) => {
        setIsInsert(insert);
        setIdHeader(0);
        setDataTableProduct([]);
        setOpenDialogHeader(true);
    };

    /** Function Dialog Filter */
    const handleOpenDialogFilter = () => {
        setOpenDialogFilter(true);
    };

    const handleCloseDialogFilter = () => {
        setOpenDialogFilter(false);
    };

    const handleExport = async (id, idprovider, identerprise, cd) => {
        try {
            const resp = await api.post('shoppingRequestDetails', {
                id,
                idprovider,
                identerprise,
                cd,
            });
            const pathFile = `${api.defaults.baseURL}${resp.data.path}`;
            console.log(pathFile);
            const a = document.createElement('a');

            a.href = pathFile;
            a.target = '_blank';
            a.download = `solicitação_${id}_Empresa_${identerprise}_Fornecedor_${idprovider}.xml`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            toast.error(`A requisição não teve êxito -\n ${e}`);
        }
    };

    const handleExportXls = async (id, idprovider, identerprise, cd) => {
        try {
            const resp = await api.patch('shoppingRequestDetails', {
                id,
                idprovider,
                identerprise,
                cd,
            });
            const pathFile = `${api.defaults.baseURL}${resp.data.path}`;
            console.log(pathFile);
            const a = document.createElement('a');

            a.href = pathFile;
            a.target = '_blank';
            a.download = `solicitação_${id}_Empresa_${identerprise}_Fornecedor_${idprovider}.xml`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            toast.error(`A requisição não teve êxito -\n ${e}`);
        }
    };

    const handleSubmit = async event => {
        setLoader(true);
        const enterprise = document.getElementsByName('enterprise')[0].value;
        const [provider] = document
            .getElementsByName('provider')[0]
            .value.split('-');

        const values = {
            identerprise: enterprise,
            idprovider: provider,
        };

        schemaHeader.validate(values).catch(err => {
            // toast.error(err);
            toast.error(` ${err.errors}`);
            setLoader(false);
            //  alert(err);
        });

        if (schemaHeader.isValidSync(values)) {
            try {
                const resp = await api.post('/shoppingRequest', values);
                const { id } = resp.data;
                toast.success(` Pedido ${id} - Incluído com Sucesso `);
                setIdHeader(id);
                document.getElementsByName('provider')[0].value = '';
                document.getElementsByName('status')[0].value = 0;
                handleCloseDialogHeader();
                page !== 0 ? setPage(0) : handleList();
                handleOpenDialogFilter();
                setLoader(false);
            } catch (error) {
                toast.error(`A requisição não teve êxito -\n ${error}`);
                setIdHeader(0);
                setLoader(false);
            }
        }
        // setLoading(false);
    };

    const handleList = async () => {
        setLoader(true);
        try {
            const enterprise = document.getElementsByName('enterprise')[0]
                .value;
            const status = document.getElementsByName('status')[0].value;
            const [provider] = document
                .getElementsByName('provider')[0]
                .value.split('-');

            const values = {
                identerprise: enterprise,
                idprovider: provider,
                status,
                page,
                rowsPerPage,
            };

            const resp = await api.get('/shoppingRequest', { params: values });
            // toast.success(
            //     ` Pedidos ${page * rowsPerPage + 1} a ${(page + 1) *
            //         rowsPerPage}  `
            // );
            document.getElementsByName('provider')[0].value = '';
            handleCloseDialogHeader();
            setDataTableHeader(resp.data.results);
            setRowsHeader(resp.data.rows[0].rows);
            setLoader(false);
        } catch (error) {
            toast.error(`A requisição não teve êxito -\n ${error}`);
            setLoader(false);
        }

        // setLoading(false);
    };

    const handleListPage = () => (page === 0 ? handleList() : setPage(0));
    const handleListPageProduct = () =>
        pageProduct === 0 ? handleListProduct() : setPageProduct(0);

    /** Delete Purchase  */
    async function handleDelete(e, id) {
        try {
            const resp = await api.delete(`/shoppingRequest/`, {
                data: { id },
            });
            toast.success(` Pedido EXCLUÍDO com Sucesso `);
            const auxValues = dataTableHeader.filter(t => {
                return t.id !== id;
            });
            setDataTableHeader(auxValues);
            handleCloseDelete();
            setLoader(false);
        } catch (err) {
            toast.error(err);
            setLoader(false);
        }
    }

    const handleClickOpenDelete = (event, id, nameUser) => {
        setIdHeader(id);
        setName(nameUser);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setIdHeader(0);
    };

    const handleEditHeader = (event, id) => {
        setIdHeader(id);
        setDataTableProduct([]);
        setOpenDialogFilter(true);
    };

    const handleChangeSwitch = () => {
        setPurchaseDayStock(!purchaseDayStock);
    };

    const handleProductAboutMaxStock = () => {
        setProductAboutMaxStock(!productAboutMaxStock);
    };

    const handleEditStatus = async (e, id, status) => {
        try {
            const resp = await api.put(`/shoppingRequest/`, {
                data: { id, status },
            });
            toast.success(` Status Alterado com Sucesso!!! `);
            const auxValues = dataTableHeader.filter(t => {
                return t.id !== id;
            });
            setDataTableHeader(auxValues);
        } catch (err) {
            toast.error(err);
        }
    };

    /** Paginação Cabecalho */

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        if (page !== 0) setPage(0);
    };

    /** Functions body */

    const handleListProduct = async () => {
        try {
            setLoader(true);
            const filterHeader = dataTableHeader.filter(user => {
                return user.id === idHeader;
            });
            console.log(filterHeader);

            const id = idHeader;
            const { cd, identerprise, idprovider } = filterHeader[0];
            const [family] = document
                .getElementsByName('family')[0]
                .value.split('-');
            const [department] = document
                .getElementsByName('department')[0]
                .value.split('-');
            const [section] = document
                .getElementsByName('section')[0]
                .value.split('-');
            const [product] = document
                .getElementsByName('product')[0]
                .value.split('-');
            const dayStock = document.getElementsByName('dayStock')[0].value;

            const values = {
                id,
                cd,
                identerprise,
                idprovider,
                family,
                department,
                section,
                product,
                dayStock,
                pageProduct,
                rowsPerPageProduct,
                purchaseDayStock,
                productAboutMaxStock,
            };

            const resp = await api.get('/shoppingRequestDetails', {
                params: values,
            });
            // toast.success(
            //     ` Pedidos ${page * rowsPerPage + 1} a ${(page + 1) *
            //         rowsPerPage}  `
            // );
            handleCloseDialogFilter();
            setDataTableProduct(resp.data.results);
            setRowsProduct(resp.data.rows[0].rows);
            if (expanded === true) setExpanded(false);
            setLoader(false);
        } catch (error) {
            toast.error(`A requisição não teve êxito -\n ${error}`);
            setLoader(false);
        }
    };

    const handleChangePageProduct = (event, newPage) => {
        setPageProduct(newPage);
    };

    const handleChangeRowsPerPageProduct = event => {
        setRowsPerPageProduct(parseInt(event.target.value, 10));
        if (pageProduct !== 0) setPageProduct(0);
    };

    const handleUpdateAmount = async event => {
        try {
            const { value } = event.target;
            const [idProduct, id, maxstock] = event.target.id.split('-');

            console.log(`IdProduto  ${idProduct}`);
            console.log(` ${maxstock}`);
            if (maxstock < value && maxstock > 0) {
                alert(
                    ` Qtde. Pedida ${new Intl.NumberFormat('de-DE', {
                        maximumSignificantDigits: 2,
                    }).format(
                        value
                    )} Maior Que estoque Máximo ${new Intl.NumberFormat(
                        'de-DE',
                        { maximumSignificantDigits: 2 }
                    ).format(maxstock)}`
                );
            }
            const values = {
                amount: value,
                id,
                idProduct,
                idRequest: idHeader,
            };
            const resp = api.put('/shoppingRequestDetails', {
                params: values,
            });
        } catch (error) {
            toast.error(`A requisição não teve êxito -\n ${error}`);
        }
    };

    const handleDetailsProduct = id => {
        console.log(id);
        const auxValues = dataTableProduct.filter(t => {
            return t.idproduct === id;
        });
        console.log(auxValues[0]);
        setOpenDialogDetails(true);
        setIdProduct(auxValues[0].idproduct);
        setDescription(auxValues[0].description);
        setStock(auxValues[0].stock);
        setStockCd(auxValues[0].stockCd);
        setSpin(auxValues[0].spin);
        setMaxStock(auxValues[0].maxStock);
        setCodeBar(auxValues[0].codeBar);
        setStockDays(auxValues[0].stockDays);
    };

    return (
        <div className={classes.root}>
            {/* Header */}
            <Card className={classes.card}>
                <CardActions disableSpacing>
                    <IconButton aria-label="PurchaseShopping">
                        <Tooltip title="Pedido" arrow>
                            <ShoppingCartIcon />
                        </Tooltip>
                        <Typography> Pedidos </Typography>
                    </IconButton>

                    <IconButton
                        className={classes.IconRight}
                        onClick={handleOpenDialogInsertHeader}
                        aria-label="Add"
                    >
                        <Tooltip title="Incluir" arrow>
                            <AddShoppingCartIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        className={classes.expand}
                        onClick={() => handleOpenDialogInsertHeader(false)}
                        aria-label="filter header"
                    >
                        <Tooltip title="Filtrar" arrow>
                            <FilterListOutlinedIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <Tooltip title="Esconder" arrow>
                            <ExpandMoreIcon />
                        </Tooltip>
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
                                        <TableCell align="center">
                                            Ação
                                        </TableCell>
                                        <TableCell>Código</TableCell>
                                        <TableCell align="left">
                                            Empresa
                                        </TableCell>
                                        <TableCell align="left">
                                            Fornecedor
                                        </TableCell>
                                        <TableCell align="left">
                                            Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataTableHeader.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell align="center">
                                                <IconButton
                                                    disabled={
                                                        row.status ===
                                                        'Concluído'
                                                    }
                                                    className={classes.icon}
                                                    onClick={event =>
                                                        handleEditStatus(
                                                            event,
                                                            row.id,
                                                            row.status
                                                        )
                                                    }
                                                    aria-label="Edit"
                                                >
                                                    <Tooltip
                                                        title={`Alterar Stauts${row.status}`}
                                                        arrow
                                                    >
                                                        <NewReleasesIcon
                                                            fontSize="small"
                                                            style={
                                                                row.status ===
                                                                'Aberto'
                                                                    ? {
                                                                          color:
                                                                              green[500],
                                                                      }
                                                                    : row.status ===
                                                                      'Fechado'
                                                                    ? {
                                                                          color:
                                                                              blue[500],
                                                                      }
                                                                    : {
                                                                          color:
                                                                              blueGrey[200],
                                                                      }
                                                            }
                                                        />
                                                    </Tooltip>
                                                </IconButton>
                                                <IconButton
                                                    disabled={
                                                        row.status !== 'Aberto'
                                                    }
                                                    className={classes.icon}
                                                    onClick={event =>
                                                        handleEditHeader(
                                                            event,
                                                            row.id
                                                        )
                                                    }
                                                    aria-label="Edit"
                                                >
                                                    <Tooltip
                                                        title="Editar"
                                                        arrow
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </Tooltip>
                                                </IconButton>
                                                <IconButton
                                                    disabled={
                                                        row.status !== 'Aberto'
                                                    }
                                                    className={classes.icon}
                                                    onClick={event =>
                                                        handleClickOpenDelete(
                                                            event,
                                                            row.id,
                                                            row.provider
                                                        )
                                                    }
                                                    aria-label="Delete"
                                                >
                                                    {' '}
                                                    <Tooltip
                                                        title="Excluir"
                                                        arrow
                                                    >
                                                        <DeleteIcon
                                                            fontSize="small"
                                                            color="error"
                                                        />
                                                    </Tooltip>
                                                </IconButton>
                                                <IconButton
                                                    disabled={
                                                        row.status === 'Aberto'
                                                    }
                                                    className={classes.icon}
                                                    onClick={event =>
                                                        handleExport(
                                                            row.id,
                                                            row.idprovider,
                                                            row.identerprise,
                                                            row.cd
                                                        )
                                                    }
                                                    aria-label="Export "
                                                >
                                                    <Tooltip
                                                        title="Exportar Xml"
                                                        arrow
                                                    >
                                                        <CloudDownloadIcon
                                                            fontSize="small"
                                                            style={{
                                                                color:
                                                                    row.status ===
                                                                    'Aberto'
                                                                        ? 'disabled'
                                                                        : green[500],
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </IconButton>

                                                <IconButton
                                                    className={classes.icon}
                                                    onClick={event =>
                                                        handleExportXls(
                                                            row.id,
                                                            row.idprovider,
                                                            row.identerprise,
                                                            row.cd
                                                        )
                                                    }
                                                    aria-label="Export xls"
                                                >
                                                    <Tooltip
                                                        title="Exportar para Excel"
                                                        arrow
                                                    >
                                                        <AssignmentIcon
                                                            fontSize="small"
                                                            style={{
                                                                color:
                                                                    green[500],
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.identerprise} -{' '}
                                                {row.enterprise}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.provider}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.status}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {loader && (
                                <LinearProgress
                                    size={24}
                                    className={classes.buttonProgress}
                                />
                            )}
                            <TablePagination
                                labelRowsPerPage="Linhas por Página"
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                backIconButtonText="Ant."
                                nextIconButtonText="Próx."
                                count={rowsHeader}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                            <div>
                                <small>Status Pedido:</small>{' '}
                                <NewReleasesIcon
                                    fontSize="small"
                                    style={{ color: green[500] }}
                                />{' '}
                                <small>Aberto</small>
                                <NewReleasesIcon
                                    fontSize="small"
                                    style={{ color: blue[500] }}
                                />{' '}
                                <small> Fechado</small>
                                <NewReleasesIcon
                                    fontSize="small"
                                    style={{ color: blueGrey[200] }}
                                />{' '}
                                <small> Concluído</small>
                            </div>
                        </Paper>
                    </CardContent>
                </Collapse>
            </Card>

            {/* Body  */}

            <Card className={classes.card}>
                <CardActions disableSpacing>
                    <IconButton aria-label="Product">
                        <Tooltip title="Produtos" arrow>
                            <AssignmentIcon />
                        </Tooltip>
                        <Typography>
                            {' '}
                            Produtos{' '}
                            {idHeader !== 0 ? `| Pedido: ${idHeader}` : ''}
                        </Typography>
                    </IconButton>

                    <IconButton
                        disabled={idHeader === 0}
                        className={classes.IconRight}
                        onClick={() => handleOpenDialogFilter()}
                        aria-label="filter Product"
                    >
                        <Tooltip title="Filtrar" arrow>
                            <FilterListOutlinedIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expandedProduct,
                        })}
                        onClick={handleExpandClickProduct}
                        aria-expanded={expandedProduct}
                        aria-label="show more"
                    >
                        <Tooltip title="Esconder" arrow>
                            <ExpandMoreIcon />
                        </Tooltip>
                    </IconButton>
                </CardActions>
                <Collapse in={expandedProduct} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Paper className={classes.paper}>
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="a dense table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            Código
                                        </TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell align="center">
                                            Sugestão
                                        </TableCell>
                                        <TableCell align="center">
                                            Pedido
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataTableProduct.map(row => (
                                        <TableRow key={row.idproduct}>
                                            <TableCell align="center">
                                                {row.idproduct}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.description}
                                            </TableCell>
                                            <TableCell align="right">
                                                {new Intl.NumberFormat(
                                                    'de-DE',
                                                    {
                                                        maximumSignificantDigits: 2,
                                                    }
                                                ).format(row.suggestion)}
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField
                                                    id={`${row.idproduct}-${row.id}-${row.maxStock}`}
                                                    defaultValue={row.amount}
                                                    size="small"
                                                    type="number"
                                                    className={
                                                        classes.inputRight
                                                    }
                                                    onBlur={handleUpdateAmount}
                                                    inputProps={{
                                                        min: '0',
                                                        tabindex: row.idproduct,
                                                        onfocusin:
                                                            " this.value=' ' ",
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <IconButton aria-label="Details Product">
                                                                    <PageviewIcon
                                                                        onClick={() =>
                                                                            handleDetailsProduct(
                                                                                row.idproduct
                                                                            )
                                                                        }
                                                                    />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div>
                                {loader && (
                                    <LinearProgress
                                        size={24}
                                        className={classes.buttonProgress}
                                    />
                                )}
                            </div>
                            <TablePagination
                                labelRowsPerPage="Linhas por Página"
                                rowsPerPageOptions={[25, 50, 100]}
                                component="div"
                                disabled={loader}
                                backIconButtonText="Ant."
                                nextIconButtonText="Próx."
                                count={rowsProduct}
                                rowsPerPage={rowsPerPageProduct}
                                page={pageProduct}
                                onChangePage={handleChangePageProduct}
                                onChangeRowsPerPage={
                                    handleChangeRowsPerPageProduct
                                }
                            />
                        </Paper>
                    </CardContent>
                </Collapse>
            </Card>

            {/* Dialog Header */}
            <Dialog
                open={openDialogHeader}
                keepMounted
                onClose={handleCloseDialogHeader}
                onEscapeKeyDown={handleCloseDialogHeader}
                disableBackdropClick
                disableEscapeKeyDown
                disablePortal
            >
                <DialogTitle>Solicitação de Compra</DialogTitle>
                <DialogContent>
                    <form autoComplete="off" noValidate>
                        <Enterprise // all={true}
                        />
                        <SingleAutocomplete
                            idInput="provider"
                            labelInput="Fornecedor"
                        />
                        <TextField
                            select
                            label="Status"
                            id="Status"
                            disabled={isInsert}
                            value={state}
                            onChange={handleChange}
                            margin="normal"
                            name="status"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            fullWidth
                        >
                            <MenuItem value="0">Aberto</MenuItem>
                            <MenuItem value="1">Fechado</MenuItem>
                            <MenuItem value="2">Concluído</MenuItem>
                        </TextField>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        // disabled
                        onClick={() =>
                            isInsert ? handleSubmit() : handleListPage()
                        }
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loader}
                    >
                        {loader && (
                            <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />
                        )}
                        {isInsert ? 'Salvar' : 'Filtrar'}
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseDialogHeader}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog Delete */}
            <Dialog
                open={openDetele}
                keepMounted
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Excluir Pedido
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {`Realmente  Deseja Excluir o Pedido ? ${idHeader} - ${name}`}
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

            {/* Dialog filter  */}

            <Dialog
                open={openDialogFilter}
                keepMounted
                onClose={handleCloseDialogFilter}
                onEscapeKeyDown={handleCloseDialogFilter}
                disableBackdropClick
                disableEscapeKeyDown
                disablePortal
            >
                <DialogTitle>
                    Filtro de Produtos{' '}
                    {idHeader !== 0 ? `| Pedido: ${idHeader}` : ''}{' '}
                </DialogTitle>
                <DialogContent>
                    <form autoComplete="off" noValidate>
                        <SingleAutocomplete
                            idInput="family"
                            labelInput="Família"
                        />

                        <SingleAutocomplete
                            idInput="department"
                            labelInput="Departamento"
                        />
                        <SingleAutocomplete
                            idInput="section"
                            labelInput="Seção"
                        />
                        <SingleAutocomplete
                            idInput="product"
                            labelInput="Produto"
                        />

                        <TextField
                            id="dayStock"
                            name="dayStock"
                            fullWidth
                            margin="normal"
                            label="Dias de Estoque"
                            type="number"
                            defaultValue="15"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={purchaseDayStock}
                                    onChange={handleChangeSwitch}
                                />
                            }
                            label="Somente Produtos com dias de Estoque Menor que Sugestão "
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={productAboutMaxStock}
                                    onChange={handleProductAboutMaxStock}
                                />
                            }
                            label="Produtos Pedidos com Estoque ACIMA do MÁXIMO "
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <div className={classes.wrapper}>
                        <Button
                            onClick={handleListPageProduct}
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loader}
                        >
                            {loader && (
                                <CircularProgress
                                    size={24}
                                    className={classes.buttonProgress}
                                />
                            )}
                            Filtrar
                        </Button>
                    </div>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseDialogFilter}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog Detalhes  */}

            <Dialog
                open={openDialogDetails}
                keepMounted
                onClose={handleCloseDialogDetails}
                onEscapeKeyDown={handleCloseDialogDetails}
                disableBackdropClick
                disableEscapeKeyDown
                disablePortal
            >
                <DialogTitle>
                    Detalhes Produto{' '}
                    {idHeader !== 0 ? `| ${idProduct} - ${description}` : ''}{' '}
                </DialogTitle>
                <DialogContent>
                    <form autoComplete="off" noValidate>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="stock"
                                size="small"
                                name="stock"
                                fullWidth
                                disabled
                                margin="normal"
                                label="Estoque"
                                type="number"
                                value={stock}
                                className={classes.inputRight}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />

                            <TextField
                                id="stockCd"
                                size="small"
                                name="stockCd"
                                disabled
                                fullWidth
                                margin="normal"
                                label="Estoque CD"
                                type="number"
                                className={classes.inputRight}
                                value={stockCd}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="maxStock"
                                disabled
                                size="small"
                                name="maxStock"
                                fullWidth
                                margin="normal"
                                label="Estoque Máximo"
                                type="number"
                                value={maxStock}
                                className={classes.inputRight}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />

                            <TextField
                                id="spin"
                                disabled
                                size="small"
                                name="spin"
                                fullWidth
                                margin="normal"
                                label="Giro"
                                type="number"
                                className={classes.inputRight}
                                value={spin}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                disabled
                                id="codebar"
                                size="small"
                                name="codebar"
                                fullWidth
                                margin="normal"
                                label="Código de Barras"
                                type="text"
                                className={classes.inputRight}
                                value={codeBar}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                disabled
                                id="stockdays"
                                size="small"
                                name="stockdays"
                                fullWidth
                                margin="normal"
                                label="Dias de Estoque"
                                type="text"
                                className={classes.inputRight}
                                value={stockDays}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseDialogDetails}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
