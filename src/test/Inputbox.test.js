import React from 'react';
import { shallow } from 'enzyme';
import Inputbox from '../Components/atoms/Inputbox';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('should render input box', () => {
  const wrapper = shallow(<Inputbox />);
  expect(wrapper).toMatchSnapshot();
});
