import React from 'react';
import { shallow } from 'enzyme';
import Popup from '../Components/atoms/Popup';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('should render popup', () => {
  const wrapper = shallow(<Popup />);
  expect(wrapper).toMatchSnapshot();
});
