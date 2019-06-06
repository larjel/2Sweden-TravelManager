import React from 'react';
import { shallow } from 'enzyme';
import Map from './Map';

// Basic setup. Do a shallow render of Map and return it.
const setUp = (props = {}) => {
  const component = shallow(<Map {...props} />);
  return component;
};

describe('Map Component', () => {

  it('Should NOT render, but return empty', () => {
    const props = {
      searchResponse: null,
      routeDetailsArrIdx: -1,
      routeSegmentArrIdx: -1
    };
    const component = setUp(props);

    expect(component.isEmptyRender()).toBeTruthy();
  });

});
