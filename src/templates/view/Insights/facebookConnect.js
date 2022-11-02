import React,{useEffect, useState} from 'react'
import Navbar from '../Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Tabs, Tab, Accordion } from 'react-bootstrap'
import UserProfile from '../../components/userProfile';
import { getUserProfileById,fetchUser } from "../../../Redux/actions/auth-actions";
import { Button } from '@material-ui/core'
import { useSelector, connect } from "react-redux"; 
import facebook_icon from '../../../assets/images/logos_facebook.svg';
import { getInstgramInsightsUser} from "../../../Redux/actions/insights-Instagram-actions";
import Loader from './../../../utils/Loader';

function FacebookConnect(props) {
    const [isLoader, setLoader] = useState(true);

    const { userDetailsById,authuser} = useSelector((state) => state.authReducer);

    useEffect(() => {
        setLoader(false);
        async function fetchdata(){
          
            await props.getUserProfileById(authuser.uid);  
        }
        fetchdata();
        
    },[authuser.uid]);

    const onSocialLogin = async (event) => {
        setLoader(true);
        console.log('userDetailsById.uid==',userDetailsById.uid)
        if(userDetailsById.uid){
            var accountLinked = false;
            if(userDetailsById?.InsightsTokenData)
            {
                accountLinked = true;
            }
            else{
                accountLinked = false;
            }
            await props.getInstgramInsightsUser(userDetailsById.uid,accountLinked);
            setLoader(false);
        }
    }

    return (
        
        <div className="text-center mt-3">
            {isLoader ? <Loader isLoader={true} /> : null}
            <p className="mb-2">Connect with facebook to check insights.</p>
            <Button onClick={(e) => onSocialLogin('facebook')} className="btn btn-danger">Connect with facebook</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userDetailsById: state.authReducer.userDetailsById,
        authuser: state.authReducer.authuser,
    }
}

const actionCreators = {  getUserProfileById,fetchUser,getInstgramInsightsUser };
export default connect(mapStateToProps, actionCreators)(FacebookConnect);


