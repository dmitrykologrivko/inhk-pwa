import React from 'react';
import { List } from './list.component';

export default {
    title: 'Components/List',
    component: List,
};

const Template = args => <List {...args} />

export const Default = Template.bind({});
Default.args = {
    items: [
        { text: 'item1' },
        { text: 'item2' },
        { text: 'item3' }
    ]
};
