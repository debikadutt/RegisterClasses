import React from 'react';
import { data } from './Data';
import 'bulma/css/bulma.css';

const AreaOfStudyComponent = ({ handleChange, handleCheckboxChange, checkedItems, errors }) => {

    /**
     * Clear radio button if checkbox/ area of study is un-checked
     * @param @type string itemName The area of study
     */
    const clearRadioBtn = (itemName) => {
        if (checkedItems[itemName] === undefined || checkedItems[itemName] === false) {
            const nodes = document.querySelectorAll(`[id=${itemName}]`);
            nodes.forEach((node) => {
                node.checked = false;
            });
        }
    };

    return (
        <div>
            <div className='field'>
                <label className='has-text-weight-semibold'>Area of study</label>
                <div className='control pl-5'>
                    {data.map((item) => (
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
                                                checked={clearRadioBtn(item.name)}
                                            />
                                            <span className='px-2'>{study.label}</span>
                                        </label>
                                    </span>
                                ))}
                            </div>
                            {errors[`${item.name}`] && <p className='help is-danger'>{errors[`${item.name}`]}</p>}
                        </div>
                    ))}
                    <div className='pb-2'>{errors.study && <p className='help is-danger'>{errors.study}</p>}</div>
                    <div className='pb-2'>{errors.dates && <p className='help is-danger'>{errors.dates}</p>}</div>
                </div>
            </div>
        </div>
    );
};

export default AreaOfStudyComponent;
