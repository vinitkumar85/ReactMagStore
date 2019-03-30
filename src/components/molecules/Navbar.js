import React, {Component} from 'react';
import Navitem from '../atoms/Navitem'
import '../../sass/nav.scss';

    class Topbar extends Component {
        constructor(props) {
            super(props);
            this.state = {
                navStatus : false
            };
        }
        handleChecked = () => {
            this.setState({navStatus: !this.state.navStatus});
        }
        closeNav = () => {
            this.setState({navStatus: false});
        }

    render() {
        //let checkboxelm = this.state.navStatus === 'true' ? <input type="checkbox" checked /> : <input type="checkbox" />
        return (
        <div class="header-bottom-area">
            <nav role="navigation" class="navbar navbar-expand-sm navbar-light scrolling-navbar">
                <div className="navbar-toggle">
                    
                    <input type="checkbox" checked={this.state.navStatus} onChange={ this.handleChecked } />
                    <span></span>
                    <span></span>
                    <span></span>
                    <div className="navbar-toggle__links">
                    <ul class="navbar-nav justify-content-end" onClick={ this.closeNav }>
                        {this.props.navLinks.map((link, index) => (
                            <Navitem key={index} linkItem={link} />
                        ))}
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
}

export default Topbar;