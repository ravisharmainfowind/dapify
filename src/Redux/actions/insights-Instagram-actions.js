import {
  POST_USER_INSTAGRAM_INSIGHTS_REQUEST, GET_USER_INSTAGRAM_INSIGHTS_FAILURE, GET_USER_INSTAGRAM_INSIGHTS_SUCCESS,
  POST_USER_INSTAGRAM_INSIGHTS_POST_REQUEST, GET_USER_INSTAGRAM_INSIGHTS_POST_FAILURE, GET_USER_INSTAGRAM_INSIGHTS_POST_SUCCESS,
  POST_INSTAGRAM_TOP_CITY_AUDIENCE_REQUEST, GET_INSTAGRAM_TOP_CITY_AUDIENCE_FAILURE, GET_INSTAGRAM_TOP_CITY_AUDIENCE_SUCCESS,
  POST_INSTAGRAM_FOLLOWERS_REQUEST, GET_INSTAGRAM_FOLLOWERS_FAILURE, GET_INSTAGRAM_FOLLOWERS_SUCCESS,
  POST_INSTAGRAM_FOLLOWER_GROWTH_REQUEST,GET_INSTAGRAM_FOLLOWER_GROWTH_FAILURE,GET_INSTAGRAM_FOLLOWER_GROWTH_SUCCESS,
} from './type';

import {
  LongLiveAccessToken, InstagramBusinessAccount, getInstaUserMediaPost, getInstaUserMediaInsights, getInstaUserFollower,
  InstaTopCityAudience,InstaFollowerGrowth

} from './api_url';
import { facebookProvider, auth } from "../auth-service";
import axios from 'axios';
import firebaseConfig from "../../firebase";
import { ERROR, RedirectModal, Success } from './../../utils/errors';
import 'antd/dist/antd.css'
import * as moment from 'moment';

// For get instagram user
export const getInstgramInsightsUser = (uid,accountLinked) => async dispatch => {
  try {

    var provider_type = facebookProvider;
    var responseToken = '';
    dispatch({ type: POST_USER_INSTAGRAM_INSIGHTS_REQUEST, payload: true });

    if(accountLinked === true){
      responseToken = await auth.signInWithPopup(provider_type)
    }else{
      responseToken = await auth.currentUser.linkWithPopup(provider_type)
    }
    
    console.log('fbresp', responseToken);
    if (responseToken.user) {

      console.log('social login response', responseToken);
      console.log('accesstokennnn', responseToken.credential.accessToken)

      if (responseToken?.credential.accessToken) {
        const tkn_data = {
          token: responseToken.credential.accessToken
        }

        const response = await axios.post(LongLiveAccessToken, tkn_data);
        console.log('insresponse', response);
        if (response.status === 200) {
          if (response.data?.access_token) {
            const expiredate = new Date();
            expiredate.setDate(expiredate.getDate() + 59);
            var newexpiredate = moment(expiredate).format('MM/DD/YYYY HH:mm:ss')

            const accData = {
              token: response.data.access_token,
            }
            console.log('accData', accData);
            const Accountresponse = await axios.post(InstagramBusinessAccount, accData);
            console.log('Accountresponse', Accountresponse);
            if (Accountresponse.status === 200) {

              if (Accountresponse.data.data.length !== 0) {

                const Tokendata =
                {
                  'InsightsTokenData': {
                    'token': response.data.access_token,
                    'date': newexpiredate,
                  },

                  'InsightsUserData': {
                    'username': Accountresponse.data.data[0].instagram_business_account.username,
                    'account_id': Accountresponse.data.data[0].instagram_business_account.id,
                    'name': Accountresponse.data.data[0].name,
                    'id': Accountresponse.data.data[0].id,
                  }
                }

                const resp = await firebaseConfig.firestore().collection('users').doc(uid).update(Tokendata).then(async function (docres) {
                  dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_SUCCESS, payload: true });

                }).catch(function (error) {
                  dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_FAILURE, payload: 'Please try again..' });
                  ERROR('Please try again..');
                })
              } else {
                dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_FAILURE, payload: 'Please try again..' });
                ERROR('Add business Page');
              }


            } else {
              dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_FAILURE, payload: 'Business Account not found' });
              ERROR('Business Account not found');
            }

          } else {
            dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_FAILURE, payload: 'Please try again..' });
            ERROR('Please try again..');
          }
        } else {
          dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_FAILURE, payload: 'Please try again..' });
          ERROR('Please try again..');
        }
      } else {
        dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_FAILURE, payload: 'Please try again..' });
        ERROR('Please try again..');
      }
    } else {
      dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_FAILURE, payload: 'Please try again..' });
      ERROR('Please try again..');
    }

  } catch (error) {
    dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_FAILURE, payload: error });
    if (error.code === 'auth/credential-already-in-use') {
    ERROR('Already exists, Please try with another credential');
    }
  }
};

// get instagram media post
export const getInstaMediaPost = (post_data) => async dispatch => {
  try {

    dispatch({ type: POST_USER_INSTAGRAM_INSIGHTS_POST_REQUEST, payload: true });
    if (post_data) {
      var media_arr = [];
      var user_follower_count = 0;
      var userdata = post_data.userData;

      if (userdata?.InsightsTokenData.token) {

        const postdata = {
          token: userdata.InsightsTokenData.token,
          account_id: userdata.InsightsUserData.account_id,
          since: post_data.since,
          until: post_data.until,

        }
        const response = await axios.post(getInstaUserMediaPost, postdata);

        if (response.status === 200) {
          if (response.data) {
            var i = 0;
            media_arr = response.data.data;
            var media_insights_arr = [];
            const followpostdata = {
              token: userdata.InsightsTokenData.token,
              account_id: userdata.InsightsUserData.account_id,
            }
            const follower_response = await axios.post(getInstaUserFollower, followpostdata);
            console.log('follower_response', follower_response);
            if (follower_response.status === 200) {
              user_follower_count = follower_response.data.followers_count
              media_insights_arr['follower_count'] = user_follower_count;
            } else {
              user_follower_count = 0;
              media_insights_arr['follower_count'] = user_follower_count;
            }

            getInsights(media_arr[i]);

            async function getInsights(media_val) {

              if (media_arr.length > i) {
                var postInsights = {
                  token: userdata.InsightsTokenData.token,
                  post_id: media_val.id,

                }
                const insights_response = await axios.post(getInstaUserMediaInsights, postInsights);

                if (insights_response.status === 200) {

                  media_val['insight_data'] = insights_response.data
                  media_insights_arr.push(media_val);
                  i = i + 1;
                  getInsights(media_arr[i]);

                } else {
                  media_val['insight_data'] = {}
                  media_insights_arr.push(media_val);
                  i = i + 1;
                  getInsights(media_arr[i]);
                }

              }
              if (media_arr.length === media_insights_arr.length) {
                dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_POST_SUCCESS, payload: media_insights_arr });
              } else {
                dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_POST_SUCCESS, payload: [] });
              }
            }

          } else {
            dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_POST_FAILURE, payload: false });

          }
        } else {
          dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_POST_FAILURE, payload: 'Please try again..' });
          ERROR('Please try again..');
        }
      } else {
        dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_POST_FAILURE, payload: 'Please try again..' });
        ERROR('Please try again..');
      }
    } else {
      dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_POST_FAILURE, payload: 'Please try again..' });
      ERROR('Please try again..');
    }
  } catch (error) {
    dispatch({ type: GET_USER_INSTAGRAM_INSIGHTS_POST_FAILURE, payload: error });
    console.log('sociallogin', error.message);
    //ERROR(error.message);
  }
};

// get instagram top city audience
export const getInstaTopCityAudience = (post_data) => async dispatch => {
  try {

    dispatch({ type: POST_INSTAGRAM_TOP_CITY_AUDIENCE_REQUEST, payload: true });
    if (post_data) {
      //var media_arr = [];

      var userdata = post_data.userData;

      if (userdata?.InsightsTokenData.token) {

        const postdata = {
          token: userdata.InsightsTokenData.token,
          account_id: userdata.InsightsUserData.account_id,
          period: "lifetime",
        }
        const response = await axios.post(InstaTopCityAudience, postdata);

        if (response.status === 200) {
          if (response.data) {
            
            dispatch({ type: GET_INSTAGRAM_TOP_CITY_AUDIENCE_SUCCESS, payload: response.data });
          } else {
            dispatch({ type: GET_INSTAGRAM_TOP_CITY_AUDIENCE_FAILURE, payload: 'No record Found' });

          }
        } else {
          dispatch({ type: GET_INSTAGRAM_TOP_CITY_AUDIENCE_FAILURE, payload: 'No record Found.' });

        }
      } else {
        dispatch({ type: GET_INSTAGRAM_TOP_CITY_AUDIENCE_FAILURE, payload: 'No record Found.' });

      }
    } else {
      dispatch({ type: GET_INSTAGRAM_TOP_CITY_AUDIENCE_FAILURE, payload: 'No record Found.' });

    }
  } catch (error) {
    dispatch({ type: GET_INSTAGRAM_TOP_CITY_AUDIENCE_FAILURE, payload: error });
    console.log('sociallogin', error.message);
    //ERROR(error.message);
  }
};


export const getInstaFollowers = (post_data) => async dispatch => {
  try {

    dispatch({ type: POST_INSTAGRAM_FOLLOWERS_REQUEST, payload: true });
    if (post_data) {

      var userdata = post_data.userData;
      if (userdata?.InsightsTokenData.token) {

        const postdata = {
          token: userdata.InsightsTokenData.token,
          account_id: userdata.InsightsUserData.account_id,
        }
        const response = await axios.post(getInstaUserFollower, postdata);

        if (response.status === 200) {
          console.log('follower_res', response.data);
          if (response.data) {
            response.data.type = 'instagram';
            dispatch({ type: GET_INSTAGRAM_FOLLOWERS_SUCCESS, payload: response.data });
          } else {
            dispatch({ type: GET_INSTAGRAM_FOLLOWERS_FAILURE, payload: 'No record Found' });

          }
        } else {
          dispatch({ type: GET_INSTAGRAM_FOLLOWERS_FAILURE, payload: 'No record Found.' });

        }
      } else {
        dispatch({ type: GET_INSTAGRAM_FOLLOWERS_FAILURE, payload: 'No record Found.' });

      }
    } else {
      dispatch({ type: GET_INSTAGRAM_FOLLOWERS_FAILURE, payload: 'No record Found.' });

    }
  } catch (error) {
    dispatch({ type: GET_INSTAGRAM_FOLLOWERS_FAILURE, payload: error });
    console.log('sociallogin', error.message);
    //ERROR(error.message);
  }
};



// get instagram follower growth
export const getFollowersGrowth = (post_data) => async dispatch => {
  try {

    dispatch({ type: POST_INSTAGRAM_FOLLOWER_GROWTH_REQUEST, payload: true });
    if (post_data) {
      //var media_arr = [];

      var userdata = post_data.userData;

      if (userdata?.InsightsTokenData.token) {

        const postdata = {
          token: userdata.InsightsTokenData.token,
          account_id: userdata.InsightsUserData.account_id,
          period: "day",
          since : post_data.since,
          until: post_data.until,
        }
        const response = await axios.post(InstaFollowerGrowth, postdata);
        console.log('followercount---growth',response.data);
        if (response.status === 200) {
          if (response.data) {
            var rescount = 0;
            if(response.data.data[0]?.values){
            var followerres = response.data.data[0].values;
              for (let i = 0; i < followerres.length; i++) {
                rescount = rescount + followerres[i]['value'];
              }
          }
              
            dispatch({ type: GET_INSTAGRAM_FOLLOWER_GROWTH_SUCCESS, payload: rescount });
          } else {
            dispatch({ type: GET_INSTAGRAM_FOLLOWER_GROWTH_FAILURE, payload: 'No record Found' });

          }
        } else {
          dispatch({ type: GET_INSTAGRAM_FOLLOWER_GROWTH_FAILURE, payload: 'No record Found.' });

        }
      } else {
        dispatch({ type: GET_INSTAGRAM_FOLLOWER_GROWTH_FAILURE, payload: 'No record Found.' });

      }
    } else {
      dispatch({ type: GET_INSTAGRAM_FOLLOWER_GROWTH_FAILURE, payload: 'No record Found.' });

    }
  } catch (error) {
    dispatch({ type: GET_INSTAGRAM_FOLLOWER_GROWTH_FAILURE, payload: error });
    console.log('sociallogin', error.message);
    //ERROR(error.message);
  }
};