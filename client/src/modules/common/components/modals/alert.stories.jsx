import React from 'react';
import { Alert } from './alert.component';

export default {
    title: 'Components/Common/Modals/Alert',
    component: Alert,
};

const Template = args => <Alert {...args} />

export const Default = Template.bind({});
Default.args = {
    show: true,
    title: 'Delete app',
    message: 'Do you want to delete this app?',
    negativeButtonLabel: 'No',
    positiveButtonLabel: 'Yes'
};
