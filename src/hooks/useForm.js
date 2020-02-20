import { useState } from 'react';

const useForm = () => {
    const [values, setValues] = useState({ enterprise: 0 });

    const handleChange = event => {
        event.stopPropagation();
        const auxValues = { ...values };
        auxValues[event.target.name] = event.target.value;
        setValues(auxValues);
    };

    const handleEdit = auxValues => {
        setValues(auxValues);
    };

    // const handleSubmit = callback => event => {
    //     event.preventDefault();
    //     setLoading(true);
    //     callback();
    //     setLoading(false);
    // };

    return [{ values }, handleChange, handleEdit];
};

export default useForm;
