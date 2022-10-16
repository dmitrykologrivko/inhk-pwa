import React from 'react';
import { News } from './news.component';

export default {
    title: 'Components/Schedule/News',
    component: News,
};

const Template = args => (
    <div style={{ padding: '8px', backgroundColor: 'var(--primary-bg-color)' }}>
        <News {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    news: ["Today's lessons will be shorter on 10 mins"]
};
