import React,{ useState,useEffect } from 'react'
import Navbar from '../Navbar';
import UserProfile from '../../components/userProfile';
import Footer from '../footer';
import user_img from '../../../assets/images/dummy_user.png';
import square_img from '../../../assets/images/Union.svg';
import mobile_logo from '../../../assets/images/logo.png';
import add_content from '../../../assets/images/plus-mobile.svg';
import { Link } from "react-router-dom";

//Redux
import { useSelector, connect } from "react-redux";
import {getAudience } from "../../../Redux/actions/subscriber-actions";
import { getUserProfileById,fetchUser } from "../../../Redux/actions/auth-actions";
import EncryptProfileUrl from "../../components/encryptProfileUrl";
import Loader from './../../../utils/Loader';

function Audience(props,{history}) {
    console.log('props-----',props);
   
    const { userDetailsById,authuser } = useSelector((state) => state.authReducer);
    const { audienceData ,loading} = useSelector((state) => state.subscriberReducer);
    const [audienceKeyword,setAudienceKeyword] = useState('');
    const [isLoader, setLoader] = useState(false);

    useEffect(() => {

        const data ={
            user_id : authuser.uid,
            type : 'all'
        }
        props.getUserProfileById(authuser.uid);
        props.getAudience(data);
       
       
        
    },[authuser.uid]);



    useEffect(() => {
      setLoader(loading);
       
        
    },[loading]);
    console.log('audienceData=====',audienceData);


    const handleSearch = (e) => {
      
       setAudienceKeyword(e.target.value);
       if(e.target.value.length >= 3){
        const data ={
            user_id : authuser.uid,
            type : 'search',
            search_keyword: e.target.value,
        }
        props.getAudience(data);
       }
       if(e.target.value.length === 0){
        const data ={
            user_id : authuser.uid,
            type : 'all',
        }
        props.getAudience(data);
       }
    }

    const handleClick = (id) => {
       
        if(id){
            var profileUrl =  EncryptProfileUrl(id);
            //props.history.push(profileUrl);
            window.location = profileUrl;
        }
    }

    console.log('audienceDataloading',loading);
    return (
        <div className='main-page-wrapper'>
        <Navbar/>
        {isLoader ? <Loader isLoader={true} /> : null} 
        <div className='middleMainSection'>

            <div className="mob-secion add-content-header"> 
                <div className="mobile-top-logo">
                    <div className="left-square"><img src={square_img} alt='' /></div>
                    <div className="mobile-center-logo"><img src={mobile_logo} alt='' /></div>
                    <div className="mobile-add-content"> <Link to="/addContent"><img src={add_content} alt='' /></Link></div>
                </div>
            </div>

            <div className='middleSection-add-content1'>
                <div className="addContentSec pageAudience">
                    <UserProfile/>

                    <div className="audience-view-page">
                        
                        <div className="search-user">
                            <label>Search User</label>
                            <input type="text" placeholder="" value={audienceKeyword} name="audience_search" onChange={handleSearch}/>
                        </div>
                           
                        {
                            audienceData.length > 0 ? (  
                            <div className="audience-view-users">
                                <ul>
                                    {
                                        audienceData.map((audienceContent,i) => (
                                           
                                            <li>
                                                <div className="user-list-item" onClick={() => handleClick(audienceContent.aud_id)}>
                                                    <div className="user-item-img">
                                                        <span><img src={audienceContent.aud_profile ? audienceContent.aud_profile :user_img } alt='' /></span>
                                                    </div>
                                                    <div className="user-item-name">{audienceContent.aud_name}</div>
                                                </div>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                            ):<p className='text-center'>No audience available</p>
                        }

                    </div>
                </div>
            </div>

            <Footer />

        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        audienceData: state.subscriberReducer.audienceData,
        loading: state.subscriberReducer.loading,
        userDetailsById: state.authReducer.userDetailsById,
        authuser: state.authReducer.authuser,
    }
}

const actionCreators =  { getUserProfileById,fetchUser,getAudience };
export default connect(mapStateToProps, actionCreators)(Audience);

