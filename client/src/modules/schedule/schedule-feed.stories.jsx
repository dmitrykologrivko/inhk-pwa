import React from 'react';
import { ScheduleFeed } from './schedule-feed.component';
import * as NewsStories from './news.stories';
import * as ScheduleStories from './schedule.stories';

export default {
    title: 'Components/Schedule/Schedule Feed',
    component: ScheduleFeed,
};

const Template = args => (
    <div style={{ padding: '8px', backgroundColor: 'var(--primary-bg-color)' }}>
        <ScheduleFeed {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    ...NewsStories.Default.args,
    ...ScheduleStories.Default.args
};
