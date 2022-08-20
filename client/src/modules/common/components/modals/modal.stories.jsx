import React from 'react';
import { Modal } from './modal.component';

export default {
    title: 'Components/Common/Modals',
    component: Modal,
};

const Template = args => <Modal {...args}
                                header={<h4>This is title</h4>}
                                body={<p>This is content</p>}
                                footer={<button>Close</button>} />

export const Default = Template.bind({});
Default.args = {
    show: true
};
