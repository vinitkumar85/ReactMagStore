import React from 'react';
import { shallow } from 'enzyme';
import Banner from '../Components/molecules/Banner';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('should render banner', () => {
  const wrapper = shallow(<Banner />);
  expect(wrapper).toMatchSnapshot();
});
