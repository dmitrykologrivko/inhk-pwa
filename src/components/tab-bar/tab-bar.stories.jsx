import React from 'react';
import { TabBar, TabBarItem } from './tab-bar.component';
import { ReactComponent as CalendarIcon } from '../../images/calendar-day-solid.svg';

console.log(CalendarIcon);

export default {
    title: 'Components/Common/Tab Bar',
    component: TabBar,
};

const Template = args => (
    <TabBar {...args}>
        <TabBarItem title='Tab 1' icon={<CalendarIcon />} />
        <TabBarItem title='Tab 2' icon={<CalendarIcon />} />
        <TabBarItem title='Tab 3' icon={<CalendarIcon />} />
    </TabBar>
);

export const Default = Template.bind({});
Default.args = {};
