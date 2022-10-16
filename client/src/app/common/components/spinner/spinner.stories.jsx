import React from 'react';
import { Spinner } from './spinner.component';

export default {
    title: 'Components/Common/Spinner',
    component: Spinner,
};

const Template = args => <Spinner {...args} />

export const Default = Template.bind({});
Default.args = {
    color: '#4da7fe',
    secondaryColor: '#f3f3f3'
};
