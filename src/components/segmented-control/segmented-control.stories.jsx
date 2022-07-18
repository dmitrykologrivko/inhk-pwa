import React from 'react';
import { SegmentedControl, SegmentedControlItem } from './segmented-control.component';

export default {
    title: 'Components/Common/Segmented Control',
    component: SegmentedControl,
};

const Template = args => <SegmentedControl {...args}>
    <SegmentedControlItem title='Tab 1' />
    <SegmentedControlItem title='Tab 2' />
    <SegmentedControlItem title='Tab 3' />
</SegmentedControl>

export const Default = Template.bind({});
Default.args = {
    primaryColor: '#4da7fe'
};
