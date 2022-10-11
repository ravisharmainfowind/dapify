// export const API_URL ='https://app.dapify.io/';
export const API_URL = 'http://localhost:8000/';


// Auth API.
export const DISABLE_USER = API_URL +'disable-user';
export const PAYMENT_LINK = API_URL +'stripe/charge';
export const USER_NOTIFICATION = API_URL +'user-push-notification';
export const InstgramData = API_URL +'insight-data';
export const LongLiveAccessToken = API_URL +'getLongLiveAccessToken';
export const InstagramBusinessAccount = API_URL +'getInstagramBusinessAccount';
export const getInstaUserMediaPost = API_URL +'getInstagramUserMediaPost';
export const getInstaUserMediaInsights = API_URL +'getInstaUserMediaInsights';
export const getInstaUserFollower = API_URL +'getInstaUserFollower';
export const InstaTopCityAudience = API_URL +'getInstaTopCityAudience';
export const InstaFollowerGrowth = API_URL +'getInstaFollowerGrowth';
export const CREATE_STRIPE_ACCOUNT = API_URL +'createStripeAccount';
export const CREATE_STRIPE_ACCOUNT_LINK = API_URL +'createStripeAccountLink';
export const GET_USER_STRIPE_ACCOUNT_DETAILS = API_URL +'getUserStripeAccountDetails';
export const GET_USER_STRIPE_ACCOUNT_LOGIN_LINK = API_URL +'getUserStripeAccountLoginLink';
export const SEND_PAYOUT_REQUEST = API_URL +'requestUserPayout';

export const PayoutFees = 0.17;