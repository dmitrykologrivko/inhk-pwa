import { useState } from 'react';
import { Card, FlexContainer } from '../containers';
import { debounce } from '../../utils';
import styles from './date-picker.module.css';

export const DAY_SUNDAY = 0;
export const DAY_MONDAY = 1;
export const DAY_TUESDAY = 2;
export const DAY_WEDNESDAY = 3;
export const DAY_THURSDAY = 4;
export const DAY_FRIDAY = 5;
export const DAY_SATURDAY = 6;

export const WEEK = [
    DAY_SUNDAY,
    DAY_MONDAY,
    DAY_TUESDAY,
    DAY_WEDNESDAY,
    DAY_THURSDAY,
    DAY_FRIDAY,
    DAY_SATURDAY
];

function getDaysRow(
    locale,
    actualDate = new Date(),
    firstDayOfWeek = DAY_SUNDAY
) {
    const actualDay = actualDate.getDay();
    const daysRow = [];

    if (actualDay < firstDayOfWeek) {
        let daysBehind = (WEEK.length - actualDay) + (WEEK.length - firstDayOfWeek) - 1;
        if (daysBehind > WEEK.length) {
            daysBehind = WEEK.length - firstDayOfWeek;
        }

        for (let i = daysBehind; i > 0; i--) {
            const date = new Date(actualDate);
            date.setDate(date.getDate() - i);
            daysRow.push(date);
        }
        for (let i = 0; i < WEEK.length - daysBehind; i++) {
            const date = new Date(actualDate);
            date.setDate(date.getDate() + i);
            daysRow.push(date);
        }

        return daysRow;
    }

    const daysAhead = [];
    for (let i = firstDayOfWeek; i < firstDayOfWeek + WEEK.length; i++) {
        daysAhead.push(i);
    }

    for (let day of daysAhead) {
        const date = new Date(actualDate);
        date.setDate(date.getDate() + (day - actualDay));
        daysRow.push(date);
    }

    return daysRow;
}

const testDep = debounce((f) => {
    console.log(typeof f());
}, 1000);

export function DatePicker({
    locale = window.navigator.language,
    firstDayOfWeek = DAY_SUNDAY,
    date = new Date(),
    onChange = _ => {}
}) {
    const [selectedDate, setSelectedDate] = useState(date);

    const daysRow = getDaysRow(locale, selectedDate, firstDayOfWeek)
        .map(day => {
            const isSelectedDay = day.toLocaleDateString(locale) === selectedDate.toLocaleDateString(locale);
            return (
                <li className={styles.day}>
                    <div>
                        {day.toLocaleDateString(locale, { weekday: 'short' })}
                    </div>
                    <div className={`${isSelectedDay ? styles.day__date__selected : ''}`}>
                        {day.getDate()}
                    </div>
                </li>
            );
        });

    return (
        <Card className={styles.date_picker}>
            <FlexContainer flexFlow='column' alignItems='center'>
                <ul className={styles.days_row}>
                    {daysRow}
                </ul>
                <div>
                    <input type='date'
                           value={selectedDate.toISOString().split('T')[0]}
                           onChange={e => {
                               const selectedDate = new Date(e.target.valueAsDate);
                               onChange(selectedDate);
                               setSelectedDate(selectedDate);
                           }} />
                </div>
            </FlexContainer>
        </Card>
    );
}
