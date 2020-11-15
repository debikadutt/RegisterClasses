import React from 'react';

const DisplayFinalInput = ({ values, checkedItems, clearForm, isFinalDisplayVisible }) => {
    let selectedAreas = Object.keys(checkedItems);

    return (
        <>
            {isFinalDisplayVisible && (
                <div className='section is-fullheight'>
                    <div className='container'>
                        <div className='column is-8 is-offset-2'>
                            <div className='box has-background-primary-light'>
                                <div className='py-2'>
                                    <span className='has-text-weight-semibold'>Name:</span> {values.name}
                                </div>
                                <div className='py-2'>
                                    <span className='has-text-weight-semibold'>Email:</span> {values.email}
                                </div>
                                <div className='py-2'>
                                    <span className='has-text-weight-semibold'>Birthday:</span> {values.birthday}
                                </div>
                                <div className='py-2'>
                                    <span className='has-text-weight-semibold'>Area of study:</span>
                                    <div className='pl-5'>
                                        {selectedAreas.map((i) => (
                                            <span key={i}>
                                                {values[i] && (
                                                    <div>
                                                        <i className='is-capitalized'>{i}</i>: {values[i]}
                                                    </div>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={clearForm} className='button is-block is-info'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DisplayFinalInput;
