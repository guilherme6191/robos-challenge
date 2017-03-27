import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SearchBar from '../../../app/components/SearchBar/SearchBar';

describe('SearchBar component', () => {
  it('render properly', () => {
    const props = {
      onSearch: () => {},
      onTopicChange: () => {},
      topic: 'styles',
    };

    const component = shallow(<SearchBar {...props} />).shallow();
    const expected = (
      <select
        defaultValue="styles"
        name="search-which"
        id="search-which"
        className="form-control"
      >
        <option value="beers">Beers</option>
        <option value="styles">Styles</option>
      </select>);
    expect(component
      .containsMatchingElement(expected)).to.equal(true);
  });
});
