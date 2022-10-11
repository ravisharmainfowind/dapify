import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import { NavLink } from "react-router-dom";
import Navhead from './Navhead';
import { getUserProfileById, fetchUser } from "../../Redux/actions/auth-actions";
import { getUnreadMessageCount } from "../../Redux/actions/chat-actions";
import { getUnreadNotificationCount } from "../../Redux/actions/notification-actions";
import { useSelector, connect } from "react-redux";
import dummy_user from '../../assets/images/dummy_user.png';
import Tooltip from '@material-ui/core/Tooltip';
import { useLocation } from "react-router-dom";

function Navbar(props) {

    const { userDetailsById, authuser } = useSelector((state) => state.authReducer);
    const { UserUnreadMSGCount, messageList, listenerData } = useSelector((state) => state.chatReducer);
    const { UserUnreadNotificationCount, notification_data } = useSelector((state) => state.notificationsReducer);
    const location_back = useLocation();
    const [unreadCount, setUnreadCount, UnreadCountRef] = useState(0);
    // const [UnreadNotificationCount,setUnreadNotificationCount ,UnreadNotificationCountRef ] = useState(0);
    const [UnreadNotificationCount, setUnreadNotificationCount] = useState(0);

    useEffect(() => {
        if (listenerData !== null) {
            listenerData.off('child_added');
            console.log('check first');
        }

        async function fetchdata() {
            await props.getUserProfileById(authuser.uid);
            const data = {
                uid: authuser.uid,
            }
            await props.getUnreadMessageCount(data);
            await props.getUnreadNotificationCount(data);
        }
        fetchdata();

    }, [authuser.uid, notification_data]);


    useEffect(() => {
        console.log("21212", UserUnreadNotificationCount);
        setUnreadNotificationCount(UserUnreadNotificationCount);
    }, [UserUnreadNotificationCount, notification_data]);

    useEffect(() => {
        setUnreadCount(UserUnreadMSGCount);

        // return () => {
        //     // For Firebase-Listener-OFF
        //     const listenerChatId = localStorage.getItem("lestener_Chat_id");
        //     // console.log("LOCALEEEEEEEE", listenerChatId);
            
        //     var CurrenmsgrefListner = firebaseConfig.database().ref('chats/');
            
        //         (listenerChatId !== null) 
        //         ? CurrenmsgrefListner.child(listenerChatId).off('child_removed') 
        //         : CurrenmsgrefListner.child(listenerChatId).on('child_added')
            
        //     // if (listenerChatId !== null) {
        //     //     // CurrenmsgrefListner.child(listenerChatId).off('child_added');
        //     //     CurrenmsgrefListner.child(listenerChatId).off('child_removed');
        //     // }
        // }
        
    }, [UserUnreadMSGCount, setUnreadCount]);
    
    console.log('--UserUnreadMSGCount', UserUnreadMSGCount);

    return (

        <div className='sidebar'>
            <Navhead />
            <div className='main-menus'>
                <div className="menus">
                    <ul>
                        <li className="nav-item home-icon">
                            <NavLink className="nav-link" to='/dashboard'><img src={require('../../assets/images/icon01.svg').default} alt='' /> <span>HOME</span></NavLink>
                        </li>
                        <li className="nav-item notification-icon">
                            <NavLink className="nav-link" to='/notifications'><img src={require('../../assets/images/icon02.svg').default} alt='' /> <span>Notifications</span> <span className="n-num">{UnreadNotificationCount > 0 ? UnreadNotificationCount : 0}</span></NavLink>

                        </li>
                        <li className="nav-item insights-icon">
                            <NavLink className="nav-link" to='/insights'><img src={require('../../assets/images/icon03.svg').default} alt='' /> <span>insights</span></NavLink>
                        </li>
                        <li className="nav-item inbox-icon">

                            {/* <NavLink  className="nav-link" to='/inbox'><img src={require('../../assets/images/icon04.svg').default} alt='' /><span>inbox</span>{UserUnreadMSGCount > 0 && ( <span className="n-num">{UserUnreadMSGCount}</span>)}</NavLink> */}
                            {unreadCount === 0 || window.location.pathname === '/inbox' ?
                                <NavLink className="nav-link" to='/inbox'><img src={require('../../assets/images/icon04.svg').default} alt='' /><span>inbox</span></NavLink>
                                : <NavLink className="nav-link" to='/inbox'><img src={require('../../assets/images/icon04.svg').default} alt='' /><span>inbox</span><span className="n-num">{unreadCount}</span></NavLink>
                            }
                        </li>
                        <li className="nav-item audience-icon">
                            <NavLink className="nav-link" to='/audience'><img src={require('../../assets/images/icon05.svg').default} alt='' /> <span>Audience</span></NavLink>
                        </li>
                        <li className="nav-item home-icon">

                            <NavLink className="nav-link" to='/saves'><img src={require('../../assets/images/save_icon.svg').default} alt='' /> <span>Saves</span></NavLink>

                        </li>
                        <li className="nav-item settings-icon">
                            <NavLink exact className="nav-link" to={{
                                pathname: "/settings",
                                prevPath: location_back.pathname,
                            }} ><img src={require('../../assets/images/icon06.svg').default} alt='' /> <span>settings</span></NavLink>
                        </li>
                        <li className="nav-item profile-icon">
                            <NavLink exact className="nav-link" to={{
                                pathname: "/settings",
                                prevPath: location_back.pathname,
                            }}><img src={userDetailsById?.avatarURL ? userDetailsById.avatarURL : dummy_user} alt='' /> <span>Profile</span></NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userDetailsById: state.authReducer.userDetailsById,
        authuser: state.authReducer.authuser,
        UserUnreadMSGCount: state.chatReducer.UserUnreadMSGCount,
        UserUnreadNotificationCount: state.notificationsReducer.UserUnreadNotificationCount,
        notification_data: state.notificationsReducer.notification_data,
        messageList: state.chatReducer.messageList,
        listenerData: state.chatReducer.listenerData,
    }
}

const actionCreators = { getUserProfileById, fetchUser, getUnreadMessageCount, getUnreadNotificationCount };
export default connect(mapStateToProps, actionCreators)(Navbar);