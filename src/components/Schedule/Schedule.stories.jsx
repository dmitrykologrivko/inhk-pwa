import React from 'react';
import { Schedule } from './Schedule';

export default {
    title: 'Components/Schedule',
    component: Schedule,
};

const Template = args => <Schedule {...args} />

export const Default = Template.bind({});
Default.args = {
    lessons: [
        {
            number: 1,
            subject: 'Physics',
            teacher: 'John',
            place: '5'
        },
        {
            number: 2,
            subject: 'Mathematics',
            teacher: 'Eva',
            place: '405'
        },
        {
            number: 3,
            subject: 'Informatics',
            teacher: 'John / Eva',
            place: '5 / 405'
        },
    ]
};
