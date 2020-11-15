// const areasOfStudy = ['sports', 'music', 'art', 'literature'];
import * as moment from 'moment';

import { checkboxes } from './Data';

export default function validate(values, checkedItems) {
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

    let checkedItemsKeys = Object.keys(checkedItems);

    let allAreFalse = Object.keys(checkedItems).every((k) => !checkedItems[k]);

    if (!checkedItemsKeys.length || allAreFalse) {
        errors.study = 'You must select at least one area of study';
    }

    checkedItemsKeys.forEach((item) => {
        if (checkedItems[item] && !values[item]) {
            errors[`${item}`] = 'Please select one class schedule';
        }
    });

    const isOverlap = validateDates(checkedItemsKeys, values);

    if (isOverlap) {
        errors.dates = 'Class schedules overlap, please select different schedule';
    }

    return errors;
}

const validateDates = (areasOfStudy, values) => {
    const result = [];

    areasOfStudy.forEach((study) => {
        result.push(values[study]);
    });

    let schedules = checkboxes.map((item) => item.schedule);

    let datesList = [];

    result.forEach((res) => {
        schedules.forEach((item) => {
            item.forEach((a) => {
                if (res === a.label) {
                    datesList.push([moment(a.startDate).format('YYYY-MM-DD'), moment(a.endDate).format('YYYY-MM-DD')]);
                }
            });
        });
    });

    return checkOverlappingDates(datesList);
};

const checkOverlappingDates = (datesList) => {
    if (datesList.length === 1) return false;

    datesList.sort((dates1, dates2) => dates1[0].localeCompare(dates2[0]));

    for (let i = 0; i < datesList.length - 1; i++) {
        const currentEndTime = datesList[i][1];
        const nextStartTime = datesList[i + 1][0];

        if (currentEndTime > nextStartTime) {
            return true;
        }
    }

    return false;
};
