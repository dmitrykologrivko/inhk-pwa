import React from 'react';
import { College } from './college.component';

export default {
    title: 'Components/College',
    component: College,
};

const Template = args => <College {...args}/>

export const Default = Template.bind({});
Default.args = {
    primaryColor: '#4da7fe',
    students: [
        {
            id: 1,
            text: 'IR-001'
        },
        {
            id: 2,
            text: 'IR-002'
        },
        {
            id: 3,
            text: 'TR-001'
        }
    ],
    teachers: [
        {
            id: 1,
            text: 'Lisa Williams'
        },
        {
            id: 2,
            text: 'Eva Johnson'
        },
        {
            id: 3,
            text: 'John Smith'
        },
        {
            id: 4,
            text: 'Eva Philips'
        },
    ]
};
