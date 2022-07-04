import React from 'react';
import { TabBar, TabBarItem } from './tab-bar.component';
import icon from './location-dot-solid.svg';

export default {
    title: 'Components/Tab Bar',
    component: TabBar,
};

const Template = args => <TabBar {...args}>
    <TabBarItem title='Tab 1' />
    <TabBarItem title='Tab 2' />
    <TabBarItem title='Tab 3' />
</TabBar>

export const Default = Template.bind({});
Default.args = {
    primaryColor: '#4da7fe'
};
