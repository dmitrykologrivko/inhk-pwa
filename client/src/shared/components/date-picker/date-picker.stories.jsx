import React from 'react';
import { DatePicker } from './date-picker.component';

export default {
    title: 'Components/Common/DatePicker',
    component: DatePicker,
};

const Template = args => (
    <div style={{ padding: '8px', backgroundColor: 'var(--primary-bg-color)' }}>
        <DatePicker {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {};
