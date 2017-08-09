import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {mount, shallow} from 'enzyme';

import SearchBar from './search-bar';

describe('search-bar component', () => {
  let element, callback;

  beforeEach(() => {
    callback = jest.fn();
    element = shallow(
      <SearchBar/>
    );
  });

  it('should render a form, input and button on load', () => {
      expect(element.find('#searchInput').length).toBe(1);
      expect(element.find('#searchButton').length).toBe(1);
      expect(element.find('#searchForm').length).toBe(1);
  });

  it('should disable the button when no text is entered and enable it when text is', () => {
    const button = element.find('#searchButton');
    const input = element.find('#searchInput');

    expect(element.find('button').prop('disabled')).toBe(true);

    input.simulate('change', {target: {value: 'anything'}});

    expect(element.find('button').prop('disabled')).toBe(false);
  });

  it('should fire the callback function passed as props', () => {
    // Need to mount to ensure we can trigger a button click that fires submit
    element = mount(
      <SearchBar searchCallback={callback}/>
    );

    const button = element.find('#searchButton');
    const input = element.find('#searchInput');
    input.simulate('change', {target: {value: 'anything'}});

    expect(callback).not.toHaveBeenCalled();
    button.get(0).click();
    expect(callback).toHaveBeenCalled();
  });
});