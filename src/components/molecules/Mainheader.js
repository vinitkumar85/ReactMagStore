import React from 'react';
import Logo from '../atoms/Logo';
import Search from '../atoms/Search';
import Cart from '../atoms/Cart';

import '../../sass/header.scss';

const Mainheader = () => {
  return (
    <div class="header-mid-area">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-4">
            <div class="header__logo float-right">
              <Logo />
            </div>
          </div>
          <div class="col-md-6 col-8">
            <div class="col-12 col-md-8 header__search">
              <Search />
            </div>
            <div class="col-12 col-md-4 cart__total">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mainheader;