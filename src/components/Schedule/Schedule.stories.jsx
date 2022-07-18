import React from 'react';
import { Schedule } from './schedule.component';

export default {
    title: 'Components/Schedule/Schedule Table',
    component: Schedule,
};

const Template = args => <Schedule {...args} />

export const Default = Template.bind({});
Default.args = {
    lessons: [
        {
            number: 1,
            timeInterval: {
                from: (() => {
                    const now = new Date();
                    now.setHours(now.getHours() - 3);
                    return now;
                })(),
                to: (() => {
                    const now = new Date();
                    now.setHours(now.getHours() - 2);
                    return now;
                })(),
            },
            info: [
                {
                    subject: 'Physics (practice)',
                    teacher: 'John Smith',
                    classRoom: '5'
                },
                {
                    subject: 'Physics (practice)',
                    teacher: 'Kate Smith',
                    classRoom: '6'
                }
            ]
        },
        {
            number: 2,
            timeInterval: {
                from: (() => {
                    const now = new Date();
                    now.setHours(now.getHours() - 1);
                    return now;
                })(),
                to: (() => {
                    const now = new Date();
                    now.setHours(now.getHours() + 1);
                    return now;
                })(),
            },
            info: [
                {
                    subject: 'English',
                    teacher: 'Lisa Williams',
                    classRoom: '425'
                }
            ]
        },
        {
            number: 3,
            timeInterval: {
                from: (() => {
                    const now = new Date();
                    now.setHours(now.getHours() + 4);
                    return now;
                })(),
                to: (() => {
                    const now = new Date();
                    now.setHours(now.getHours() + 5);
                    return now;
                })(),
            },
            info: [
                {
                    subject: 'Mathematics',
                    teacher: 'Eva Johnson',
                    classRoom: '405'
                }
            ]
        },
        {
            number: 4,
            timeInterval: {
                from: (() => {
                    const now = new Date();
                    now.setHours(now.getHours() + 6);
                    return now;
                })(),
                to: (() => {
                    const now = new Date();
                    now.setHours(now.getHours() + 7);
                    return now;
                })(),
            },
            info: [
                {
                    subject: 'Informatics',
                    teacher: 'John Smith',
                    classRoom: '5'
                }
            ]
        },
    ],
    primaryColor: '#4da7fe'
};
