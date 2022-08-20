import React from 'react';
import { PrimaryButton } from './primary-button.component';

export default {
    title: 'Components/Common/Buttons/Primary',
    component: PrimaryButton,
};

const Template = args => <PrimaryButton {...args} />

export const Default = Template.bind({});
Default.args = {
    title: 'Log In'
};
