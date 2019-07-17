import React from 'react';
import { shallow } from 'enzyme';
import Flyer from '../Components/atoms/Flyer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('should render Flyer', () => {
    const props = { 'itemdata': { 'qty': 1, 'name': 'test' } };
    const wrapper = shallow(<Flyer {...props} />);
    expect(wrapper).toMatchSnapshot();
});
