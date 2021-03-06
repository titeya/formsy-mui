import 'jsdom-global/register';

import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Form} from 'formsy-react-2';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import test from 'tape';

import RadioButton from 'material-ui/RadioButton';
import FormsyRadio from './FormsyRadio';
import FormsyRadioGroup from '../FormsyRadioGroup';

Enzyme.configure({ adapter: new Adapter() });

const muiTheme = getMuiTheme();
const mountWithContext = (node) => mount(node, {
  context: {muiTheme},
  childContextTypes: {muiTheme: PropTypes.object.isRequired}
});

test('FormsyRadio renders a material-ui RadioButton', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyRadioGroup name='test'>
        <FormsyRadio />
      </FormsyRadioGroup>
    </Form>
  );

  assert.equals(wrapper.find(RadioButton).length, 1);

  assert.end();
});

test('FormsyRadio change event propogates value to Formsy Form', (assert) => {
  const wrapper = mountWithContext(
    <Form>
      <FormsyRadioGroup name='test' value='foo'>
        <FormsyRadio value='foo' />
        <FormsyRadio value='bar' />
      </FormsyRadioGroup>
    </Form>
  );

  const formsyForm = wrapper.find(Form).instance();

  const input = wrapper.find({value: 'bar'}).last();

  input.instance().checked = true;

  input.simulate('change');

  // Make sure the Formsy Form component has the right value
  assert.equals(formsyForm.getCurrentValues().test, 'bar');

  assert.end();
});
