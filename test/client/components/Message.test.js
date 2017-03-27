import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Message from '../../../app/components/Message/Message';

describe('Message component', () => {
  it('contains danger style message', () => {
    const component = shallow(<Message type="danger" txt="Hello Danger" />).shallow();
    const expected = (<div className="alert alert-danger">Hello Danger</div>);
    expect(component
      .containsMatchingElement(expected)).to.equal(true);
  });

  it('contains success style message', () => {
    const component = shallow(<Message type="success" txt="Hello Wayne" />).shallow();
    const expected = (<div className="alert alert-success">Hello Wayne</div>);
    expect(component
      .containsMatchingElement(expected)).to.equal(true);
  });
});
