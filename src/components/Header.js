import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../images/logo.png';
import user from '../images/user.png';
import fire from '../config/fire'
import $ from 'jquery';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userExit:null
        }
        this.logout = this.logout.bind(this)
     }
     logout = () => {
         fire.auth().signOut()
         .then(() => {window.location.href = '/'});
        }

     UserMenu = () => { $('.dropdown__content').toggle({
         duration: 'fast'
     })
    }

    render() {
        let header = $('.header').innerHeight()
        $(window).on("scroll", function() {
            let scrollOffSet = $(this).scrollTop();
            if(scrollOffSet >= (header/10)) {
                $('.header').addClass('header--fixed');
                $('.logo').css('height','60%')
                $('.header').css('height','70px')
                $('.header__inner').css('height','50px')
            } else {
                $('.header').removeClass('header--fixed');
                $('.logo').css('height','75%')
                $('.header').css('height','120px')
                $('.header__inner').css('height','100px')
            }
        });
        return (
            <div className = "head">
                <div className = "header">
                    <div className = "contain">
                        <div className = "header__inner">
                            <div className = "logo"><NavLink to = "../"><img src={logo} className="logoImage" alt = "logo"></img></NavLink></div>
                            { this.props.url &&
                                <div className = "search">
                                    <input type = "text" placeholder = "Find your movie..." onChange = {this.props.searchChange}></input>
                                </div>
                            }               
                            { !this.props.user && 
                            <div className = "header__buttons">
                                <NavLink to = "/login"><button  className = "btn btn-dark btn-header">login</button></NavLink>
                                <NavLink to = "/login"><img alt = "login" src = {user} /></NavLink>
                                <NavLink to = "/registration"><button className = "btn btn-success btn-header registr">registration</button></NavLink>
                            </div>
                            }
                            { this.props.user && 
                            <div className = "header__user">
                                <div className = "user__block">
                                    <div className = "user__uid" onClick = {this.UserMenu}><p>{this.props.email.toUpperCase()}</p></div>
                                    <div className = "dropdown__content">
                                        <li onClick = {this.logout}>logout</li>
                                    </div>
                               </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                { this.props.url &&
                    <div className = "contain">
                        <input type = "text" placeholder = "Find your movie..." className = "mobile_search" onChange = {this.props.searchChange}></input>
                    </div>
                }
            </div>
        )}
}
export default Header;