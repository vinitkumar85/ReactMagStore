import React from 'react';
//import Topbar from '../molecules/Topbar';
//import Navbar from '../molecules/Navbar';
//import Mainheader from '../molecules/Mainheader';

const Footer = () => {
    return (
        <footer class="layout__light">
        <div class="container footer__section pt-60 pb-60">
            <div class="row">
                <div class="col-lg-4 col-md-6">
                    <div class="widget__fotter_menu">
                        <h3>Informtion</h3>
                        <ul class="footer-menu">
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">How we are</a></li>
                            <li><a href="#">Faqs</a></li>
                        </ul>                        
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="widget__fotter_menu">
                        <h3>About Us</h3>
                        <ul class="footer-menu">
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">How we are</a></li>
                            <li><a href="#">Faqs</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <ul class="social__media text__dark">
                        <li class="list-inline-item"><a class="facebook" href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li class="list-inline-item"><a class="youtube" href="#"><i class="fab fa-youtube"></i></a></li>
                        <li class="list-inline-item"><a class="linkedin" href="#"><i class="fab fa-linkedin"></i></a></li>
                        <li class="list-inline-item"><a class="google" href="#"><i class="fab fa-google-plus"></i></a></li>
                        <li class="list-inline-item"><a class="twitter" href="#"><i class="fab fa-twitter"></i></a></li>
                    </ul>
                </div>        
            </div>
        </div>
        <div class="footer__copyright">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="copyright__text text-center"> Copyright © 2018 <a href="#">abc.com</a>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </footer>
    )
}

export default Footer;