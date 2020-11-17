import React from 'react';

/**
 * Component to display final data for submission
 * 
 */
const DisplayFinalInput = ({ values, checkedItems, clearForm, isFinalDisplayVisible }) => {
    const selectedAreas = Object.keys(checkedItems);
    
    const getCourseData = () => {
        let res = {};
        selectedAreas.forEach((s) => {
            if (values[s]) {
                res[s] = values[s];
            }
        });
        return res;
    };

    const identityObject = {
        "name": `${values.name}`,
        "email": `${values.email}`,
        "birthday": `${values.birthday}`
    }

    const output = {
        ...identityObject,
        ...getCourseData()
    };

    // Logs the json object to the console.
    const logOutput = () => {
        let jsonOutput = {};
        let res = [];
        let getCourseDataObj = getCourseData();
        Object.keys(getCourseDataObj).forEach(item => {
            res.push({ [item] : getCourseDataObj[item] });
        });

        jsonOutput = {
            ...identityObject,
            "schedule": [
                ...res
            ]
        };
        console.log('logOutput', jsonOutput);
    };

    return (
        <>
            {isFinalDisplayVisible && (
                <div className='section is-fullheight'>
                    <div className='container'>
                        <div className='column is-8 is-offset-2'>
                            <div className='box has-background-primary-light'>
                                {Object.keys(output).map((item) => (
                                    <span key={item}>
                                        <div className='py-2'>
                                            <span className='has-text-weight-semibold is-capitalized'>{item}</span>
                                            {' '}
                                            {output[item]}
                                        </div>
                                    </span>
                                ))}
                                {/* Clear form and hide this component after Submit button is clicked */}
                                <button onClick={() => { clearForm(); logOutput(); }} className='button is-block is-info'>
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
