import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Teaser from '../Components/atoms/Teaser';
import { Link } from 'react-router-dom';
import { Route, MemoryRouter } from 'react-router-dom';


const mockStore = configureMockStore();
const store = mockStore({});

it('should render teaser', () => {
  const div = document.createElement('div');
  ReactDOM.render( 
   <Teaser />
, div);
  ReactDOM.unmountComponentAtNode(div);
});
