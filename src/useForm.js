import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [isFinalDisplayVisible, setIsFinalDisplayVisible] = useState(true);

    /**
     * Call function callback once all errors are resolved and submit button is clicked
     */
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            setIsFinalDisplayVisible(true);
            callback();
        }
    }, [errors]);

    /**
     * Remove radio button data is checkbox is un-selected
     */
    useEffect(() => {
        if (checkedItems) {
            let checkedKeys = Object.keys(checkedItems);
            checkedKeys.forEach((k) => {
                if (checkedItems[k] === false) {
                    let valuesObj = values;
                    delete valuesObj[k];
                    setValues(valuesObj);
                }
            });
        }
    }, [checkedItems]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validate(values, checkedItems));
        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        setValues((values) => ({ ...values, [event.target.name]: event.target.value }));
    };

    /**
     * Function to handle checkbox change
     * @param event 
     */
    const handleCheckboxChange = (event) => {
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
    };

    const clearForm = () => {
        setCheckedItems({});
        setValues({});
        setIsFinalDisplayVisible(false);
    };

    return {
        handleChange,
        handleSubmit,
        handleCheckboxChange,
        clearForm,
        isFinalDisplayVisible,
        values,
        errors,
        checkedItems,
    };
};

export default useForm;
