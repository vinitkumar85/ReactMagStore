import React from 'react';
import Logo from '../atoms/Logo';

import '../../sass/header.scss';

const Reducedheader = () => {
  return (
    <div class="header-mid-area">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="header__logo text-center">
              <Logo />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reducedheader;