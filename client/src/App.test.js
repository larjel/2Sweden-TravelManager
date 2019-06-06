import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { findByTestAttr } from './utils/utils';

// Basic setup. Do a shallow render of App and return it.
const setUp = (props = {}) => {
  const component = shallow(<App {...props} />);
  return component;
};

describe('App Component', () => {

  let component;
  beforeEach(() => {
    // Runs before each test
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAttr(component, 'wrapper');
    expect(wrapper.length).toBe(1);
  });

});
