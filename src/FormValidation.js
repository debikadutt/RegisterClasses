import * as moment from 'moment';

import { data } from './Data';

/**
 * Function to validate all form fields
 *
 * @param {*} values All form values except checkbox date
 * @param {*} checkedItems Checkbox data or Areas of study checked
 */
export default function validate(values, checkedItems) {
    let errors = {};

    errors = {...errors, ...validateIdentity(values)};

    errors = {...errors,  ...validateAreaOfStudy(checkedItems)};

    // Display error message if class schedule for that area of study is not selected
    let validateStudyScheduleErrors = validateStudySchedule(checkedItems, values);

    errors = {...errors, ...validateStudyScheduleErrors};

    const isOverlap = validateDates(Object.keys(checkedItems), values);

    if (isOverlap) {
        errors.dates = 'Class schedules overlap, please select different schedule';
    }

    return errors;
}

/**
 * Validate Name, Email and Birthday inputs in form
 *
 * @param values Form data
 */
const validateIdentity = (values) => {
    let errors = {};

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.name) {
        errors.name = 'Name is required';
    } else if (values.name.length < 3) {
        errors.name = 'Name must be 3 or more characters';
    }
    if (!values.birthday) {
        errors.birthday = 'Birthday is required';
    }

    return errors;
}

/**
 * Check if dates are valid and if they overlap
 *
 * @param areasOfStudy Areas of Study selected
 * @param values Form values
 */
const validateDates = (areasOfStudy, values) => {
    const result = [];

    // get the corresponding date for the area of study
    areasOfStudy.forEach((study) => {
        result.push(values[study]);
    });

    let schedules = data.map((item) => item.schedule);

    let datesList = [];

    result.forEach((res) => {
        schedules.forEach((item) => {
            item.forEach((a) => {
                if (res === a.label) {
                    datesList.push(
                        [
                            moment(a.startDate).format('YYYY-MM-DD'),
                            moment(a.endDate).format('YYYY-MM-DD')
                        ]
                    );
                }
            });
        });
    });

    return checkOverlappingDates(datesList);
};

/**
 * Function to validate area of study
 * @param checkedItems Selected Checkbox data
 */
const validateAreaOfStudy = (checkedItems) => {
    let errors = {};

    const checkedItemsKeys = Object.keys(checkedItems);

    // check if none of the areas of study is selected
    const allAreFalse = Object.keys(checkedItems).every((k) => !checkedItems[k]);

    // Display error message if none of the areas of study is selected
    if (!checkedItemsKeys.length || allAreFalse) {
        errors.study = 'You must select at least one area of study';
    }
    return errors;
}

/**
 * Function to validate class schedule
 * @param checkedItems 
 * @param values 
 */
const validateStudySchedule = (checkedItems, values) => {
    const checkedItemsKeys = Object.keys(checkedItems);

    let errors = {};

    checkedItemsKeys.forEach((item) => {
        if (checkedItems[item] && !values[item]) {
            errors[`${item}`] = 'Please select one class schedule';
        }
    });

    return errors;
}

/**
 * Function to check if the dates for the class schedule overlap
 * @param datesList List of start and end dates for each course schedule
 */
const checkOverlappingDates = (datesList) => {
    if (datesList.length === 1) return false;

    // sort the list first
    datesList.sort((dates1, dates2) => dates1[0].localeCompare(dates2[0]));

    // check if the current end date is greater than the next start date
    for (let i = 0; i < datesList.length - 1; i++) {
        const currentEndDate = datesList[i][1];
        const nextStartDate = datesList[i + 1][0];

        if (currentEndDate > nextStartDate) {
            return true;
        }
    }

    return false;
};
