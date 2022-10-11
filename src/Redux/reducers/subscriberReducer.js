import {
    POST_NEWSLETTER_REQUEST, GET_NEWSLETTER_SUCCESS, GET_NEWSLETTER_FAILURE,
    POST_SUBSCRIPTION_PAYMENT_REQUEST,GET_SUBSCRIPTION_PAYMENT_SUCCESS,GET_SUBSCRIPTION_PAYMENT_FAILURE,
    POST_SUBSCRIPTION_EXPIRED_REQUEST,GET_SUBSCRIPTION_EXPIRED_SUCCESS,GET_SUBSCRIPTION_EXPIRED_FAILURE,
    POST_AUDIENCE_DATA_REQUEST,GET_AUDIENCE_DATA_SUCCESS,GET_AUDIENCE_DATA_FAILURE,
    POST_SUBSCRIBEUSER_STATUS_REQUEST,GET_SUBSCRIBEUSER_STATUS_SUCCESS,GET_SUBSCRIBEUSER_STATUS_FAILURE,
    GET_USER_SUBSCRIBEUSER_COUNT_SUCCESS,POST_USER_SUBSCRIBEUSER_COUNT_REQUEST,GET_USER_SUBSCRIBEUSER_COUNT_FAILURE,
    POST_CREATE_STRIPE_ACCOUNT_REQUEST, GET_CREATE_STRIPE_ACCOUNT_SUCCESS, GET_CREATE_STRIPE_ACCOUNT_FAILURE,
    POST_USER_STRIPE_ACCOUNT_DETAILS_REQUEST, GET_USER_STRIPE_ACCOUNT_DETAILS_SUCCESS, GET_USER_STRIPE_ACCOUNT_DETAILS_FAILURE,
    POST_USER_STRIPE_ACCOUNT_LOGIN_LINKS_REQUEST, GET_USER_STRIPE_ACCOUNT_LOGIN_LINKS_SUCCESS, GET_USER_STRIPE_ACCOUNT_LOGIN_LINKS_FAILURE,
    POST_USER_PAYOUT_REQUEST, GET_USER_PAYOUT_SUCCESS, GET_USER_PAYOUT_FAILURE,

} from '../actions/type';

export const initialState = {
    newsletter: false,
    subscribeData: [],
    subscribeExpired: '',
    audienceData:[],
    SubscribedUserStatus:false,
    subscriberCount : 0,
    stripeAccountData: '',
    userStripeAccount : [],
    stripeLoginLink : '',
    payoutId : '',
};

export default function mediaReducer(state = initialState, action) {

    switch (action.type) {
        
        case POST_USER_PAYOUT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_PAYOUT_SUCCESS:
            return {
                ...state,
                payoutId: action.payload,
                loading: false
            };
        case GET_USER_PAYOUT_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_USER_STRIPE_ACCOUNT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_STRIPE_ACCOUNT_DETAILS_SUCCESS:
            return {
                ...state,
                userStripeAccount: action.payload,
                loading: false
            };
        case GET_USER_STRIPE_ACCOUNT_DETAILS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_USER_STRIPE_ACCOUNT_LOGIN_LINKS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_STRIPE_ACCOUNT_LOGIN_LINKS_SUCCESS:
            return {
                ...state,
                stripeLoginLink: action.payload,
                loading: false
            };
        case GET_USER_STRIPE_ACCOUNT_LOGIN_LINKS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_CREATE_STRIPE_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_CREATE_STRIPE_ACCOUNT_SUCCESS:
            return {
                ...state,
                stripeAccountData: action.payload,
                loading: false
            };
        case GET_CREATE_STRIPE_ACCOUNT_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_USER_SUBSCRIBEUSER_COUNT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USER_SUBSCRIBEUSER_COUNT_SUCCESS:
            return {
                ...state,
                subscriberCount: action.payload,
                loading: false
            };
        case GET_USER_SUBSCRIBEUSER_COUNT_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_SUBSCRIBEUSER_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_SUBSCRIBEUSER_STATUS_SUCCESS:
            return {
                ...state,
                SubscribedUserStatus: action.payload,
                loading: false
            };
        case GET_SUBSCRIBEUSER_STATUS_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_AUDIENCE_DATA_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_AUDIENCE_DATA_SUCCESS:
            return {
                ...state,
                audienceData: action.payload,
                loading: false
            };
        case GET_AUDIENCE_DATA_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_SUBSCRIPTION_EXPIRED_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_SUBSCRIPTION_EXPIRED_SUCCESS:
            return {
                ...state,
                subscribeExpired: action.payload,
                loading: false
            };
        case GET_SUBSCRIPTION_EXPIRED_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_SUBSCRIPTION_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_SUBSCRIPTION_PAYMENT_SUCCESS:
            return {
                ...state,
                subscribeData: action.payload,
                loading: false
            };
        case GET_SUBSCRIPTION_PAYMENT_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case POST_NEWSLETTER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_NEWSLETTER_SUCCESS:
            return {
                ...state,
                newsletter: true,
                loading: false
            };
        case GET_NEWSLETTER_FAILURE:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
