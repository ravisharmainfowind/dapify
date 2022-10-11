import {
    POST_USER_INSTAGRAM_INSIGHTS_REQUEST,GET_USER_INSTAGRAM_INSIGHTS_FAILURE,GET_USER_INSTAGRAM_INSIGHTS_SUCCESS,
    POST_USER_INSTAGRAM_INSIGHTS_POST_REQUEST,GET_USER_INSTAGRAM_INSIGHTS_POST_FAILURE,GET_USER_INSTAGRAM_INSIGHTS_POST_SUCCESS,
    POST_INSTAGRAM_TOP_CITY_AUDIENCE_REQUEST, GET_INSTAGRAM_TOP_CITY_AUDIENCE_FAILURE, GET_INSTAGRAM_TOP_CITY_AUDIENCE_SUCCESS,
    POST_INSTAGRAM_FOLLOWERS_REQUEST, GET_INSTAGRAM_FOLLOWERS_FAILURE, GET_INSTAGRAM_FOLLOWERS_SUCCESS,
    POST_INSTAGRAM_FOLLOWER_GROWTH_REQUEST,GET_INSTAGRAM_FOLLOWER_GROWTH_FAILURE,GET_INSTAGRAM_FOLLOWER_GROWTH_SUCCESS,

} from '../actions/type';

export const initialState = {
    InstaInsightsUser: false,
    InstaUserPost: [],
    InstaAudience: [],
    InstaFollowerCount : 0,
    InstaFollowerGrowth : 0,
};

export default function insightsInstgramReducer(state = initialState, action) {

    switch (action.type) {
        
        case POST_INSTAGRAM_FOLLOWER_GROWTH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_INSTAGRAM_FOLLOWER_GROWTH_SUCCESS:
            return {
                ...state,
                InstaFollowerGrowth: action.payload,
                loading: false
            };
        case GET_INSTAGRAM_FOLLOWER_GROWTH_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_INSTAGRAM_FOLLOWERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_INSTAGRAM_FOLLOWERS_SUCCESS:
            return {
                ...state,
                InstaFollowerCount: action.payload,
                loading: false
            };
        case GET_INSTAGRAM_FOLLOWERS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_INSTAGRAM_TOP_CITY_AUDIENCE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_INSTAGRAM_TOP_CITY_AUDIENCE_SUCCESS:
            return {
                ...state,
                InstaAudience: action.payload,
                loading: false
            };
        case GET_INSTAGRAM_TOP_CITY_AUDIENCE_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_USER_INSTAGRAM_INSIGHTS_POST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_INSTAGRAM_INSIGHTS_POST_SUCCESS:
            return {
                ...state,
                InstaUserPost: action.payload,
                loading: false
            };
        case GET_USER_INSTAGRAM_INSIGHTS_POST_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_USER_INSTAGRAM_INSIGHTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_INSTAGRAM_INSIGHTS_SUCCESS:
            return {
                ...state,
                InstaInsightsUser: action.payload,
                loading: false
            };
        case GET_USER_INSTAGRAM_INSIGHTS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            }; 
        default:
            return state;
    }
}
