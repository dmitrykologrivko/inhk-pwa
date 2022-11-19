import { useState, useRef, useEffect } from 'react';
import { FlexContainer } from '../containers';
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

export function DatePicker({
    locale = window.navigator.language,
    firstDayOfWeek = DAY_SUNDAY,
    date = new Date(),
    onChange = _ => {},
    displayOnly = true
}) {
    const DEBOUNCE_DELAY = 700;

    const [selectedDate, setSelectedDate] = useState(date);
    const inputDateRef = useRef();

    const onInputDateChange = debounce(() => {
        const selectedDate = new Date(inputDateRef.current.valueAsDate);
        setSelectedDate(selectedDate);
        onChange(selectedDate);
    }, DEBOUNCE_DELAY);

    useEffect(() => {
        inputDateRef.current.value = date.toISOString().split('T')[0];
    }, [date]);

    const daysRow = getDaysRow(locale, selectedDate, firstDayOfWeek)
        .map((day, index) => {
            const isSelectedDay = day.toLocaleDateString(locale) === selectedDate.toLocaleDateString(locale);
            return (
                <li key={index} className={styles.day}>
                    <div>
                        {day.toLocaleDateString(locale, { weekday: 'short' })}
                    </div>
                    <FlexContainer minHeight='25px'
                                   alignItems='center'
                                   justifyContent='center'>
                        <span className={`${isSelectedDay ? styles.day__date__selected : ''}`}>
                            {day.getDate()}
                        </span>
                    </FlexContainer>
                </li>
            );
        });
    const formattedDate = `${selectedDate.getDate()} 
            ${selectedDate.toLocaleDateString(locale, { month: 'long' })} ${selectedDate.getFullYear()}`;

    return (
        <FlexContainer alignItems='center' flexFlow='column'>
            <ul className={styles.days_row}>
                {daysRow}
            </ul>
            <div style={{ display: `${displayOnly ? '' : 'none'}` }}>
                {formattedDate}
            </div>
            <div style={{ display: `${displayOnly ? 'none' : ''}` }}>
                <input className={styles.date_input}
                       ref={inputDateRef}
                       type='date'
                       onChange={onInputDateChange} />
            </div>
        </FlexContainer>
    );
}
