import React from 'react';
import { SearchInput } from './search-input.component';

export default {
    title: 'Components/Common/Search Input',
    component: SearchInput,
};

const Template = args => <SearchInput {...args}/>

export const Default = Template.bind({});
Default.args = {
    primaryColor: '#4da7fe',
    onInputChange: (value) => {
        console.log(value);
    }
};
