import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Tabs, Tab, Accordion } from 'react-bootstrap'
import UserProfile from '../../components/userProfile';
import { useSelector, connect } from "react-redux"; 
import * as moment from 'moment';
import FacebookConnect from './facebookConnect';
import InsightsView from  './insightsView';
import { getUserProfileById,fetchUser } from "../../../Redux/actions/auth-actions";
import Loader from './../../../utils/Loader';
import square_img from '../../../assets/images/Union.svg';
import mobile_logo from '../../../assets/images/logo.png';
import add_content from '../../../assets/images/plus-mobile.svg';
import { Link } from "react-router-dom";


function Insights(props) {

   
    const [isLoader, setLoader] = useState(true);
    const [insightUserStatus,setInsightUserStatus] = useState(false);
    const { userDetailsById,authuser} = useSelector((state) => state.authReducer);
    const {InstaInsightsUser} = useSelector((state) => state.insightsInstgramReducer);

    useEffect(() => {
        console.log('instauser',userDetailsById);
        if(userDetailsById?.InsightsTokenData)
        {
            var newDate = new Date();
            var newDateCheck = moment(newDate).format('MM/DD/YYYY HH:mm:ss');
            if (userDetailsById?.InsightsTokenData.date > newDateCheck) {
                if(userDetailsById?.InsightsUserData){
                    if(userDetailsById.InsightsUserData !== ""){
                        setInsightUserStatus(true);
                    }
                }
            }
        }
         
    },[userDetailsById,InstaInsightsUser]);

    useEffect(() => {
        if(InstaInsightsUser === true){
            setInsightUserStatus(true);
        }
       
        setLoader(false);
         
    },[insightUserStatus,InstaInsightsUser]);
   console.log('InstaInsightsUser===p',InstaInsightsUser);

    return (
        
        <div className='main-page-wrapper'>
            {isLoader ? <Loader isLoader={true} /> : null}
        <Navbar/>
       
        <div className='middleMainSection'>

            <div className="mob-secion add-content-header"> 
                <div className="mobile-top-logo">
                    <div className="left-square"><img src={square_img} alt='' /></div>
                    <div className="mobile-center-logo"><img src={mobile_logo} alt='' /></div>
                    <div className="mobile-add-content"> <Link to="/addContent"><img src={add_content} alt='' /></Link></div>
                </div>
            </div>

            <div className='middleSection-add-insights'>
                <div className="addContentSec">
                <UserProfile/>

                    <div className="insights-view-page">
                    {
                        insightUserStatus === true ?
                        <InsightsView/>
                         : 
                        <FacebookConnect/>
                    }
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}
const mapStateToProps = (state) => {
    return {
        userDetailsById: state.authReducer.userDetailsById,
        authuser: state.authReducer.authuser,
        InstaInsightsUser:state.insightsInstgramReducer,
    }
}


const actionCreators = {  getUserProfileById,fetchUser };
export default connect(mapStateToProps, actionCreators)(Insights);

