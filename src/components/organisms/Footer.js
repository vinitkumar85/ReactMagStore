import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer class="layout__light">
            <div class="container footer__section pt-60 pb-60">
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="widget__fotter_menu">
                            <h3>Informtion</h3>
                            <ul class="footer-menu">
                                <li><Link to='/content/terms'>Terms &amp; Conditions</Link></li>
                                <li><Link to="/content/refund">Return &amp; Refund</Link></li>
                                <li><Link to="/content/shipping">Shipping / Delivery Options</Link></li>
                                <li><Link to="/content/payment">Payment Modes</Link></li>
                                <li><Link to="/content/faqs">FAQs</Link></li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="widget__fotter_menu">
                            <h3>About Us</h3>
                            <ul class="footer-menu">
                                <li><Link to="/content/about">Who we are</Link></li>
                                <li><Link to="/content/contact">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <ul class="social__media text__dark">
                            <li class="list-inline-item"><a class="facebook" href="#"><i class="fab fa-facebook-f"></i></a></li>
                            <li class="list-inline-item"><a class="youtube" href="#"><i class="fab fa-youtube"></i></a></li>
                            <li class="list-inline-item"><a class="twitter" href="#"><i class="fab fa-twitter"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer__copyright">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="copyright__text text-center">Copyright © 2019 <a href="http://shubhkit.com/">shubhkit.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;