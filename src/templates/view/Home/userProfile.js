import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar';
import Footer from '../footer';
import HomePage from './homePage';
import HomeProfile from './homeProfile';
import HomeAbout from './homeAbout';
import { useParams } from "react-router-dom";
import HomeAudio from './homeAudio';
import HomeVideoImage from './homeVideoAndImage';
import { useDispatch } from "react-redux";
import {PROFILE_URL} from '../../../Redux/actions/type';
import { useSelector,connect } from "react-redux"; 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; 
import { RedirectModal } from '../../../utils/errors';
import { StoreMediaShareCount } from "../../../Redux/actions/media-actions";
import { fetchUser } from "../../../Redux/actions/auth-actions";

function UserProfile(props) {

    const { userDetailsById,authuser} = useSelector((state) => state.authReducer);
    const [userid,setuserId] = useState('');
    const [modalStatus,setmodalStatus] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
   
   
    useEffect(() => {
        console.log('greateeeee',params);

       
        if(params.user_id)
        {
            console.log('params.type',params.type);
            console.log('params.mediaId',params.mediaId);
          
            if(params.type !== undefined && params.mediaId !== undefined && authuser.uid !== undefined){

             
                const usrid = Buffer.from(params.user_id, 'base64').toString('ascii');
                const type = Buffer.from(params.type, 'base64').toString('ascii');
                const mediaId = Buffer.from(params.mediaId, 'base64').toString('ascii');
                async function fetchdata() {
                    const data ={
                        user_id:usrid,
                        type:type,
                        mediaId:mediaId,
                        shareBy:authuser.uid,
                    }

                    console.log('check share data',data);
                    await props.StoreMediaShareCount(data);
                }
                fetchdata();
            }
            setuserId(params.user_id) 
            dispatch({ type: PROFILE_URL, data: '' });
        }

    },[authuser.uid]);

    useEffect(() => {
       
        if(modalStatus === false){
            
            if(userDetailsById?.user_active === false )
            {   
                setmodalStatus(true);
                RedirectModal('The user account has been disabled by an administrator.');
            }
        }
        
    },[userDetailsById]);
    
  
    return (
        
        <div className='main-page-wrapper'>
             <Navbar />
            {userDetailsById?.user_active === true &&
            (
           
            <div className='middleMainSection'>

                <div className='topHomeProfile'>
                    <div className='middleSection'>
                        <div className='middleSectionInn'>
                            <HomeProfile props={props} userProfileId={userid}/>
                        </div>
                    </div>
                    <div className='right-top-box hide-mobile'>
                        <div className="ab-desc">
                            <HomeAbout userProfileId={userid} />
                        </div>
                    </div>
                    <div className="about-sec-mobile">
                        <div className="ab-desc">
                            <HomeAbout userProfileId={userid} viewType={'mobile_view'} />
                        </div>
                    </div>
                </div>

                <div className='middleMainSec'>
                    <div className='middleSection hide-mobile'>
                        <div className='middleSectionInn'>
                            <HomePage userProfileId={userid} />
                            <HomeVideoImage userProfileId={userid}/>
                        </div>
                    </div>
                    <div className='rightSection hide-mobile'>
                        <HomeAudio userProfileId={userid}/>
                    </div>

                    <div className='vd-img-section'>
                        <Tabs>
                            <TabList>
                                <Tab>Content</Tab>
                                <Tab>Music</Tab>
                            </TabList>

                            <TabPanel>
                                <HomePage userProfileId={userid} />
                                <HomeVideoImage userProfileId={userid}/>
                            </TabPanel>
                            
                            <TabPanel>
                                <HomeAudio userProfileId={userid}/>
                            </TabPanel>
                        </Tabs> 
                    </div>

                </div>
                
                <Footer userProfileId={userid}/>
            </div>
            )
        }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userDetailsById: state.authReducer.userDetailsById,
        authuser: state.authReducer.authuser,
    }
}

const actionCreators = { StoreMediaShareCount,fetchUser };
export default connect(mapStateToProps,actionCreators)(UserProfile);
