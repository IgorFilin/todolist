import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan/EditableSpan";


export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    changeTitle:{
      description:'callback which the changed title'
    },
    title: {
     defaultValue: 'title'
    },
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
  changeTitle: action('double click changed title')
};
