// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import api from '~/services/api';

function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

const SingleAutocomplete = props => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const { labelInput, idInput, ...rest } = props;
    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(3000);
            const inputText = await document.querySelector(`#${idInput}`).value;
            try {
                const response = await api.get(`autocomplete`, {
                    params: { type: labelInput, term: inputText },
                });
                const countries = await response.data;
                if (active) {
                    setOptions(countries);
                }
            } catch (error) {
                toast.error(
                    `Requisição não foi atendida, verifique sua conexão - ${error}`
                );
            }
        })();

        return () => {
            active = false;
        };
    }, [idInput, labelInput, loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id={idInput}
            style={{ minWidth: 200 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={option => `${option.key}-${option.name}`}
            options={options}
            loading={loading}
            renderInput={params => (
                <TextField
                    {...params}
                    label={labelInput}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name={idInput}
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};
export default SingleAutocomplete;
