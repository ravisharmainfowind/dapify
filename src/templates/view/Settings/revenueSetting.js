import React, { useState, useEffect } from 'react'
import user_img from '../../../assets/images/dummy_user.png';
import { Table } from 'react-bootstrap'
import { Button } from '@material-ui/core'
//Redux
import { useSelector, connect } from "react-redux";
import { getUserProfileById, fetchUser } from "../../../Redux/actions/auth-actions";
import { getUserSubscriberCount } from "../../../Redux/actions/subscriber-actions";
import { CreateStripeAccount, getUserAccountDetails, CreateStripeAccountLoginLink, RequestUserPayout } from "../../../Redux/actions/subscriber-actions";
import {
    PayoutFees

} from '../../../Redux/actions/api_url';
import PaidContent from './paidContent';
import { ERROR, Success } from '../../../utils/errors';
import Loader from '../../../utils/Loader';


function RevenueSetting(props, { history }) {
    const { userDetailsById, authuser } = useSelector((state) => state.authReducer);
    const { subscriberCount, stripeAccountData, userStripeAccount, payoutId, loading } = useSelector((state) => state.subscriberReducer);
    const [MonthlyRevenue, setMonthlyRevenue] = useState(0);
    const [showPaidContent, setShowPaidContent] = useState(false);
    const [isLoader, setLoader] = useState(false);
    const [AccountId, setAccountId] = useState('');
    const [StripeFees, setStripeFees] = useState(0);
    const [PayoutPrice, setPayoutPrice] = useState(0);
   // const [Payout_Id, setPayoutId] = useState('');
    const [AccountDetails, setAccountDetails] = useState({
        code: '',
        error: '',
    });
    const [ExternalAccountDetails, setExternalAccountDetails] = useState({
        bankName: '',
        lastFourDigitNo: '',
        accountType: '',
    });

    useEffect(() => {
        setLoader(loading);
        async function fetchdata() {
            if (authuser)


                await props.getUserProfileById(authuser.uid);
            const data = {
                user_id: authuser.uid
            }
            await props.getUserSubscriberCount(data);
        }
        fetchdata();
    }, [authuser.uid,payoutId]);

    useEffect(() => {
        setLoader(loading);
        
    }, [loading]);
    // console.log('user account data before', userDetailsById);


    useEffect(() => {
       
        if (userDetailsById?.subscription) {
            if (userDetailsById?.subscription?.revenue_monthly) {
                var revenueMonthly = userDetailsById?.subscription.revenue_monthly;
                if (revenueMonthly !== 0) {
                    var amount = revenueMonthly;
                    var calculate_fees = amount * PayoutFees;
                    setStripeFees(calculate_fees.toFixed(2));
                    var payout_amt = amount - calculate_fees;
                    setPayoutPrice(payout_amt.toFixed(2));
                    setMonthlyRevenue(revenueMonthly.toFixed(2));
                } else {
                    setMonthlyRevenue(0);
                    setStripeFees(0);
                    setPayoutPrice(0);
                }
            }else{
                setMonthlyRevenue(0);
                setStripeFees(0);
                setPayoutPrice(0);
            }
        }
        if (userDetailsById?.connected_account) {
            if (userDetailsById.connected_account?.accountId) {
                setAccountId(userDetailsById.connected_account.accountId);

                async function fetchdata() {
                    const data = {
                        accountId: userDetailsById.connected_account.accountId,
                    }
                    await props.getUserAccountDetails(data);
                }
                fetchdata();

            }
        }
    }, [userDetailsById,payoutId]);


    console.log('user account data', userDetailsById);
    console.log('user account data', userDetailsById);
    useEffect(() => {
        if (userStripeAccount) {
            if (userStripeAccount?.capabilities) {
                var Usercapability = userStripeAccount?.capabilities;

                if (Usercapability.card_payments === 'inactive' && Usercapability.transfers === 'inactive') {
                    setAccountDetails(
                        {
                            error: "Card payments, payouts and transfers are disabled for this account until missing information is updated.",
                            code: 5,
                        }
                    )
                } else if (Usercapability.card_payments === 'inactive') {
                    setAccountDetails(
                        {
                            error: "Card payments is disabled for this account until missing information is updated.",
                            code: 4,
                        }
                    )
                } else if (Usercapability.transfers === 'inactive') {
                    setAccountDetails(
                        {
                            error: "Transfers is disabled for this account until missing information is updated.",
                            code: 3,
                        }
                    )

                } else if (Usercapability.card_payments === 'pending' || Usercapability.transfers === 'pending') {
                    setAccountDetails(
                        {
                            error: "This account is pending.",
                            code: 2,
                        }
                    )
                } else {
                    setAccountDetails(
                        {
                            error: "",
                            code: 1,
                        }
                    )
                }
            }
            if (userStripeAccount?.external_accounts) {
                var externalAccounts = userStripeAccount?.external_accounts;

                if (externalAccounts?.data?.[0]) {
                    console.log('externalacc===data', externalAccounts?.data);
                    var extrnl_acc = externalAccounts?.data?.[0];
                    if (extrnl_acc !== '') {

                        if (extrnl_acc.object === 'bank_account') {
                            setExternalAccountDetails({
                                bankName: extrnl_acc.bank_name,
                                lastFourDigitNo: '**** **** ***** ' + extrnl_acc?.last4,
                                accountType: 'Bank Account',
                            })
                        } else if (extrnl_acc.object === 'card') {
                            setExternalAccountDetails({
                                bankName: extrnl_acc?.bank_name,
                                lastFourDigitNo: "**** **** ***** " + extrnl_acc?.last4,
                                accountType: 'Debit Card',
                            })
                        } else {
                            setExternalAccountDetails({
                                bankName: "",
                                lastFourDigitNo: "",
                                accountType: "",
                            })
                        }
                    }
                }
            }

        }
    }, [userStripeAccount]);

    console.log('userStripeAccount', userStripeAccount);
    const handleCreateAccount = (e) => {
        if (userDetailsById) {
            const data = {

                refresh_url: window.location.origin+'/settings',
                return_url: window.location.origin+'/settings',
                userdata: userDetailsById,
                type: 'Create',
                AccountId: '',
            }
            props.CreateStripeAccount(data);
        }
    }

console.log('-----window=location -',window.location.origin );

    const handleRevenueProfile = (e) => {

        if (userStripeAccount.details_submitted === false) {
            const data = {

                refresh_url: window.location.origin+'/settings',
                return_url: window.location.origin+'/settings',
                userdata: userDetailsById,
                type: 'Update',
                AccountId: userStripeAccount.id,
            }
            props.CreateStripeAccount(data);

        } else {
            const data = {

                AccountId: userStripeAccount.id
            }
            props.CreateStripeAccountLoginLink(data);

        }
    }

    const handleRequestPayout = (e) => {

        if (userDetailsById.connected_account.accountId) {
            if (PayoutPrice !== 0) {

                var amount = Math.round(PayoutPrice * 100);
                var revenue_monthly = userDetailsById.subscription.revenue_monthly;
                const payout_data = {
                    revenue: revenue_monthly,
                    uid: userDetailsById.uid,
                    accountId: userDetailsById.connected_account.accountId,
                    amount: amount,
                    currency: 'usd',
                    transfer_group: 'Testing',
                }

                console.log('payout_data', payout_data);
                props.RequestUserPayout(payout_data);
            }
            else {
                ERROR("Insufficient Balance");
            }
        }
    }

    return (
        <div className="tab-inner-content social-medias">
            {isLoader ? <Loader isLoader={true} /> : null}
            <PaidContent show={showPaidContent} close={() => setShowPaidContent(false)} />
            <div className='revenueSettingPage'>
                <div className='top-user-sec'>
                    <div className='top-user'>
                        <div class="user-img">
                            <img src={userDetailsById?.avatarURL !== '' ? userDetailsById?.avatarURL : user_img} alt='' />
                        </div>
                    </div>
                    <div className='accr-items'>
                        <div className='accr-item'>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Subscribers</th>
                                        <td>{subscriberCount}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Monthly Revenue</th>
                                        <td>${MonthlyRevenue}</td>
                                    </tr>
                                    <tr>
                                        <th>Fees</th>
                                        <td>${StripeFees}</td>
                                    </tr>
                                    <tr>
                                        <th>Payout</th>
                                        <td>${PayoutPrice}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        {
                            AccountId !== '' && AccountDetails.code === 1 && MonthlyRevenue !== 0 ?
                                (
                                    <div className='accr-card-btn'>
                                        <div className='login-via'>
                                            <Button onClick={handleRequestPayout} className="log-btn btn">Request Payout</Button>
                                        </div>
                                    </div>) :
                                
                                (AccountId !== '' && AccountDetails.code === 1 && MonthlyRevenue === 0 ) ?
                                    (<div className='accr-item'>
                                        <div className='accr-item-ttl'>
                                            <h3>Revenue Profile</h3>
                                            <Button  onClick={() => { setShowPaidContent(true) }} className='btn'>HOW DO I GET PAID?</Button>
                                        </div>


                                        <div className='accr-item-box'>
                                            <div className='card'>
                                                
                                                { ExternalAccountDetails.bankName !== "" ? (
                                                    <div className='card-body'>
                                                        <p style={{ color: "white" }}>{ExternalAccountDetails.bankName}</p>
                                                        <p style={{ color: "white" }}>{ExternalAccountDetails.lastFourDigitNo}</p>

                                                        <Button style={{ color: "white", fontWeight: "bold" }} onClick={handleRevenueProfile}>{ExternalAccountDetails.accountType}</Button>
                                                    </div>
                                                    ) :
                                                    (
                                                    <div className='card-body'>
                                                        <Button className="create-btn btn" onClick={handleRevenueProfile}>Update Profile</Button>
                                                    </div>
                                                    )}
                                                <p style={{ color: "white", fontSize: "12px", margin: "10px" }}>{AccountDetails.error}</p>
                                                <div className='card-footer'>
                                                    <img src={require('../../../assets/images/image20.png').default} alt='' />
                                                </div>
                                            </div>
                                            <div className='accr-card-txt text-center'>DAPIFY TECHNOLOGIES, INC <br /> takes a 17% Fee on all transactions</div>
                                        </div>
                                    </div>
                                    )
                                    :
                                
                                (AccountId !== '' && AccountDetails.code !== 1 ) ?

                                    (<div className='accr-item'>
                                        <div className='accr-item-ttl'>
                                            <h3>Revenue Profile</h3>
                                            <Button  onClick={() => { setShowPaidContent(true) }} className='btn'>HOW DO I GET PAID?</Button>
                                        </div>


                                        <div className='accr-item-box'>
                                            <div className='card'>
                                                
                                                { ExternalAccountDetails.bankName !== "" ? (
                                                    <div className='card-body'>
                                                        <p style={{ color: "white" }}>{ExternalAccountDetails.bankName}</p>
                                                        <p style={{ color: "white" }}>{ExternalAccountDetails.lastFourDigitNo}</p>

                                                        <Button style={{ color: "white", fontWeight: "bold" }} onClick={handleRevenueProfile}>{ExternalAccountDetails.accountType}</Button>
                                                    </div>
                                                    ) :
                                                    (
                                                    <div className='card-body'>
                                                        <Button className="create-btn btn" onClick={handleRevenueProfile}>Update Profile</Button>
                                                    </div>
                                                    )}
                                                <p style={{ color: "white", fontSize: "12px", margin: "10px" }}>{AccountDetails.error}</p>
                                                <div className='card-footer'>
                                                    <img src={require('../../../assets/images/image20.png').default} alt='' />
                                                </div>
                                            </div>
                                            <div className='accr-card-txt text-center'>DAPIFY TECHNOLOGIES, INC <br /> takes a 17% Fee on all transactions</div>
                                        </div>
                                    </div>
                                    )
                                    :
                                    (<div className='accr-item'>
                                        <div className='accr-item-ttl'>
                                            <h3>Revenue Profile</h3>
                                            <Button onClick={() => { setShowPaidContent(true) }} className='btn'>HOW DO I GET PAID?</Button>
                                        </div>
                                        <div className='accr-item-box'>
                                            <div className='card'>
                                                <div className='card-body'>
                                                    <Button onClick={handleCreateAccount} className="create-btn btn">CREATE PROFILE</Button>
                                                </div>
                                                <div className='card-footer'>
                                                    <img src={require('../../../assets/images/image20.png').default} alt='' />
                                                </div>
                                            </div>
                                            <div className='accr-card-txt text-center'>DAPIFY TECHNOLOGIES, INC <br /> takes a 17% Fee on all transactions</div>
                                        </div>
                                    </div>
                                    )
                        }

                    </div>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        subscriberCount: state.subscriberReducer.subscriberCount,
        userDetailsById: state.authReducer.userDetailsById,
        authuser: state.authReducer.authuser,
        stripeAccountData: state.subscriberReducer.stripeAccountData,
        userStripeAccount: state.subscriberReducer.userStripeAccount,
        payoutId: state.subscriberReducer.payoutId,
        loading: state.subscriberReducer.loading,
    }
}
// const actionCreators = { getUserProfileById,fetchUser,CreateStripeAccount,CheckStripeBalance };
const actionCreators = {
    getUserProfileById, fetchUser, getUserSubscriberCount, CreateStripeAccount,
    getUserAccountDetails, CreateStripeAccountLoginLink, RequestUserPayout
};

export default connect(mapStateToProps, actionCreators)(RevenueSetting);


