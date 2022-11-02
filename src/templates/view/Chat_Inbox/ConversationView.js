import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import Moment from 'moment';
import { getUserProfileById, fetchUser } from "../../../Redux/actions/auth-actions";
import { getAudience } from "../../../Redux/actions/subscriber-actions";
import { getConversation, getUnreadMessageCount } from "../../../Redux/actions/chat-actions";
import { addConversation } from "../../../Redux/actions/chat-actions";
import { PostedTime } from '../../components/calendar_date';
import ReadMore from '../../components/readMore';
import Messages from './messages';
import DefaultMessages from './defaultMessagesScreen';
import GroupMessages from './groupMessages';
import { ERROR, Success } from '../../../utils/errors';
import user_img from '../../../assets/images/dummy_user.png';
import backarrow from '../../../assets/images/Arrow-Left.svg';
import * as moment from 'moment';
import { auth } from '../../../Redux/auth-service';

function ConversationView(props) {
    //  UserUnreadMSGCount

    const { audienceData, loading } = useSelector((state) => state.subscriberReducer);
    const { conversationList, ChatId, sendGroupMsgStatus, sendMsgStatus, UserUnreadMSGCount } = useSelector((state) => state.chatReducer);
    const { userDetailsById, authuser } = useSelector((state) => state.authReducer);
    const [room, setRoom] = useState('');
    const [roomList, setRoomList] = useState([]);
    const [nickname, setNickname] = useState('');
    const [startChat, setStartChat] = useState('');
    const [ChatUserKeyword, setChatUserKeyword] = useState('');
    const [RecImg, setRecImg] = useState('');
    const [RecName, setRecName] = useState('');
    const [closeSearch, setCloseSearch] = useState('close');


    const handleChatUser = (e) => {
        setStartChat('');
        setChatUserKeyword(e.target.value);
        if (e.target.value.length > 0) {
            const data = {
                user_id: authuser.uid,
                type: 'search',
                search_keyword: e.target.value,
            }
            props.getAudience(data);
        }
    }

    function sortByDate(a, b) {
        var x = 0;
        var y = 0;


        if (a.lastConversation !== '') {
            // console.log('====date===a',a.lastConversation.date);
            x = moment(a.lastConversation.date, 'DD/MM/YYYY HH:mm:ss').format('MM/DD/YYYY HH:mm:ss');
            x = new Date(x).getTime();
        }
        if (b.lastConversation !== '') {
            // console.log('====date===b',b.lastConversation.date);
            y = moment(b.lastConversation.date, 'DD/MM/YYYY HH:mm:ss').format('MM/DD/YYYY HH:mm:ss');
            y = new Date(y).getTime();
        }
        if (x > y) {
            return -1;
        }
        if (x < y) {
            return 1;
        }
        return 0;
    }

    const save = async (e, img, rec_name) => {

        if (img !== '') {
            setRecImg(img);
        } else {
            setRecImg(user_img);
        }
        setStartChat('single ');
        setCloseSearch('open');
        setRecName(rec_name);

        var rec_id = e;
        const data = {
            recvid: rec_id,
            uid: authuser.uid,
        }

        await props.addConversation(data);
    };

    useEffect(() => {

        const fetchData = async () => {
            await props.getUserProfileById(authuser.uid);
            setNickname(userDetailsById.username);
            const data = {
                uid: authuser.uid,
            }
            await props.getConversation(data);
        }
        fetchData();

    }, [authuser.uid, audienceData, sendGroupMsgStatus, sendMsgStatus, UserUnreadMSGCount]);

    //
    useEffect(() => {
        setRoomList(conversationList);
    }, [conversationList]);


    useEffect(() => {
        setNickname(userDetailsById.username);

    }, [userDetailsById]);


    useEffect(() => {
        if (ChatId !== '') {
            setRoom(ChatId);
            enterChatRoom(ChatId, '');
        }

    }, [ChatId]);

    useEffect(() => {
        const data = {
            user_id: authuser.uid,
            type: 'search',
            search_keyword: 'm',
        }
        props.getAudience(data);
    }, [authuser.uid])



    const enterChatRoom = async (roomname) => {


        setNickname(userDetailsById.username);
        setRoom(roomname);
        setStartChat('single');
        const fetchData = async () => {
            const data = {
                uid: authuser.uid,
            }
            await props.getConversation(data);
            await props.getUserProfileById(authuser.uid);


        };

        fetchData();
    }

    const handleChatWithAllSubscriber = () => {

        setRecImg('');
        setRecName('');
        setChatUserKeyword('');
        setCloseSearch('close');
        const fetchData = async () => {
            setNickname(userDetailsById.username);
            setChatUserKeyword('');
            setStartChat('all');
            const data = {
                user_id: authuser.uid,
                type: 'all',

            }
            await props.getAudience(data);
        }
        fetchData();
    }

    useEffect(() => {
        if (startChat === "all" && loading === false && audienceData.length === 0) {
            ERROR('No subscriber found');
        }
    }, [audienceData, startChat, loading]);

    const handelCloseCompose = () => {
        setRecImg('');
        setRecName('');
        setChatUserKeyword('');
        setCloseSearch('close');
        const fetchData = async () => {
            const data = {
                uid: authuser.uid,
            }
            await props.getConversation(data);
        }
        fetchData();
    }

    const handleRemoveRoom = () => {

        setRoom('');
        setStartChat('');
        // localStorage.removeItem("lestener_Chat_id");
    }
    return (

        <div className={`chat-section-main ${room !== '' ? "UserChatOpen" : startChat === "all" ? "UserChatOpen" : ""}`}>
             {audienceData.length > 0  || roomList.length > 0 ? ( 
                <div className="chat-section-left">
                    <div className="chat-left-inn">
                        <div className="chat-top-search">
                            <h2>Compose New Message</h2>
                            {RecImg !== '' ?
                                <div className='chat-search-items'>
                                    <span>To :</span>
                                    <div className='chat-search-item'>
                                        <div className='chat-lft-item'>
                                            <b>{RecName}</b> <span><img src={RecImg} alt='' /></span>
                                        </div>
                                        <div onClick={handelCloseCompose} className='chat-close-item'>X</div>
                                    </div>
                                </div>
                                :
                                <div className="chat-search-users">
                                    <span>To :</span> <input type="text" name="roomname" id="roomname" value={ChatUserKeyword} onChange={handleChatUser} />
                                </div>
                            }

                        </div>
                        <div className="chat-inn">
                            <div className='chat-btn-subscribers'>
                                <button type="button" onClick={handleChatWithAllSubscriber} className='btn'>All Subscribers</button>
                            </div>

                            {
                                audienceData.length > 0 && closeSearch === 'close' ? (
                                    <div className="chat-view-users">
                                        <ul>
                                            {
                                                audienceData.map((audienceContent, i) => (
                                                    <li>
                                                        <div action onClick={() => { save(audienceContent.aud_id, audienceContent.aud_profile, audienceContent.aud_name) }} className="user-list-item">

                                                            <div className="chat-item-top">
                                                                <div className="user-item-left">
                                                                    <div className="user-item-img">
                                                                        <span><img src={audienceContent?.aud_profile !== '' ? audienceContent?.aud_profile : user_img} alt='' /></span>
                                                                    </div>
                                                                    <div className="user-item-name">{audienceContent.aud_name}</div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </li>
                                                ))
                                            }

                                        </ul>
                                    </div>
                                ) :
                                    <div className="chat-view-users">
                                        <ul>
                                            {roomList.length > 0 ? (roomList.sort(sortByDate)
                                                .map((item, idx) => (
                                                    <li>
                                                        <div action onClick={() => { enterChatRoom(item.key, item.reciever_id) }} className="user-list-item">
                                                            <div className="chat-item-top">
                                                                <div className="user-item-left">
                                                                    <div className="user-item-img">
                                                                        <span><img src={item?.receiverDetails?.avatarURL !== '' ? item?.receiverDetails?.avatarURL : user_img} alt='' /></span>
                                                                    </div>
                                                                    <div className="user-item-name">{item.receiverDetails.username}</div>
                                                                </div>
                                                                <div className="user-item-time">
                                                                    {/* {Moment(new Date(item.lastConversation.date)).format('DD/MM/YYYY HH:mm:ss')} /> :'' } */}
                                                                    {item.lastConversation?.date ? <PostedTime pageName="conversation" posted_time={item.lastConversation.date} /> : ''}
                                                                </div>
                                                            </div>
                                                            <div className="chat-item-mag">
                                                                <div className="chat-msg-inn">
                                                                    <ReadMore length="50" content={item.lastConversation.message} action="no" />
                                                                </div>

                                                                {item.Readingcount > 0 && item.key !== room &&
                                                                    <div className="user-unread_msg">{item.Readingcount}</div>
                                                                }

                                                                {/* { item.unread_msg > 0 &&
                                                            <div className="user-unread_msg">{item.unread_msg}</div>
                                                        }        */}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            ) : ''
                                            }
                                        </ul>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                ) : <p className='dataNfound' style={{width: '100%'}}>There's no messages...</p>}

             {audienceData.length > 0 || roomList.length > 0 ? (
                <div className="chat-section-right">
                    <button onClick={handleRemoveRoom} className="btn"><img src={backarrow} alt="" /></button>
                    <div className="chat-right-inn">
                        {startChat === 'single' && room !== '' ? (

                            <Messages room_id={room} />
                        ) :
                            startChat === 'all' && audienceData.length > 0 ? (
                                <GroupMessages room_id="all" />
                            ) :
                                <DefaultMessages />}
                    </div>
                </div>
              ) : null}
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        audienceData: state.subscriberReducer.audienceData,
        userDetailsById: state.authReducer.userDetailsById,
        authuser: state.authReducer.authuser,
        conversationList: state.chatReducer.conversationList,
        ChatId: state.chatReducer.ChatId,
        sendGroupMsgStatus: state.chatReducer.sendGroupMsgStatus,
        sendMsgStatus: state.chatReducer.sendMsgStatus,
        loading: state.subscriberReducer.loading,
        UserUnreadMSGCount: state.chatReducer.UserUnreadMSGCount,

    }
};

const actionCreators = { getUserProfileById, fetchUser, getAudience, getConversation, addConversation };
export default connect(mapStateToProps, actionCreators)(ConversationView);
