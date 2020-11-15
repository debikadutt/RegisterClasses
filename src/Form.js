import React, { useState } from 'react';
import useForm from './useForm';
import validate from './FormValidation';
import 'bulma/css/bulma.css';
import { checkboxes } from './Data';
import DisplayFinalInput from './DisplayFinalInput';

const Form = () => {
    const { values, errors, checkedItems, handleChange, handleSubmit, handleCheckboxChange, clearForm, isFinalDisplayVisible } = useForm(register, validate);

    const [isSubmitted, setIsSubmitted] = useState(false);

    function register() {
        setIsSubmitted(true);
    }

    const clearIfFalse = (itemName) => {
        if (checkedItems[itemName] === undefined || checkedItems[itemName] === false) {
            const nodes = document.querySelectorAll(`[id=${itemName}]`);
            nodes.forEach((node) => {
                node.checked = false;
            });
        }
    };

    return (
        <div className='section is-fullheight'>
            <div className='container'>
                <div className='column is-8 is-offset-2'>
                    <div className='has-text-centered is-size-2'>Class Registration Form</div>
                    <div className='box has-background-link-light'>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className='field'>
                                <label className='has-text-weight-semibold'>Name</label>
                                <div className='control has-icons-left'>
                                    <input className={`input ${errors.name && 'is-danger'}`} type='text' placeholder='Name' value={values.name || ''} name='name' onChange={handleChange} required />
                                    <span className='icon is-small is-left'>
                                        <i className='fa fa-user'></i>
                                    </span>
                                    {errors.name && <p className='help is-danger'>{errors.name}</p>}
                                </div>
                            </div>
                            <div className='field'>
                                <label className='has-text-weight-semibold'>Email</label>
                                <div className='control has-icons-left'>
                                    <input
                                        className={`input ${errors.email && 'is-danger'}`}
                                        type='email'
                                        placeholder='Email'
                                        value={values.email || ''}
                                        name='email'
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className='icon is-small is-left'>
                                        <i className='fa fa-envelope'></i>
                                    </span>
                                    {errors.email && <p className='help is-danger'>{errors.email}</p>}
                                </div>
                            </div>
                            <div className='field'>
                                <label className='has-text-weight-semibold'>Birthday</label>
                                <div className='control'>
                                    <input
                                        max={new Date().toISOString().split('T')[0]}
                                        className='column is-5 px-0 py-0'
                                        type='date'
                                        name='birthday'
                                        placeholder='Birthday'
                                        value={values.birthday || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.birthday && <p className='help is-danger'>{errors.birthday}</p>}
                            </div>
                            <div className='field'>
                                <label className='has-text-weight-semibold'>Area of study</label>
                                <div className='control pl-5'>
                                    {checkboxes.map((item) => (
                                        <div className='pb-5' key={item.key}>
                                            <label className='checkbox'>
                                                <input type='checkbox' checked={checkedItems[item.name] || false} name={item.name} onChange={handleCheckboxChange} />
                                                <i className='px-2'>{item.label}</i>
                                            </label>
                                            <div className='pl-5'>
                                                {item.schedule.map((study) => (
                                                    <span key={study.label}>
                                                        <label className='radio'>
                                                            <input
                                                                type='radio'
                                                                id={item.name}
                                                                name={item.name}
                                                                value={study.label || ''}
                                                                disabled={checkedItems[item.name] ? false : true}
                                                                onChange={handleChange}
                                                                checked={clearIfFalse(item.name)}
                                                            />
                                                            <span className='px-2'>{study.label}</span>
                                                        </label>
                                                    </span>
                                                ))}
                                            </div>
                                            {errors[`${item.name}`] && <p className='help is-danger'>{errors[`${item.name}`]}</p>}
                                        </div>
                                    ))}
                                    {errors.study && <p className='help is-danger'>{errors.study}</p>}
                                    {errors.dates && <p className='help is-danger'>{errors.dates}</p>}
                                </div>
                            </div>
                            <button type='submit' className='button is-block is-info'>
                                Confirm
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {Object.keys(errors).length === 0 && isSubmitted && <DisplayFinalInput values={values} checkedItems={checkedItems} clearForm={clearForm} isFinalDisplayVisible={isFinalDisplayVisible} />}
        </div>
    );
};

export default Form;
