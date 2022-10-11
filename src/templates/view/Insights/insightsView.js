import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { useSelector, connect } from "react-redux";
import { getInstgramInsightsUser, getInstaMediaPost, getInstaTopCityAudience, getInstaFollowers, getFollowersGrowth } from "../../../Redux/actions/insights-Instagram-actions";
import { getUserSubscriberCount } from "../../../Redux/actions/subscriber-actions";
import NumberToAbbreviate from "../../components/numberToAbbreviated";
//import FollowerChart from './followerChart';
import { Button } from '@material-ui/core'
import user_img from '../../../assets/images/dummy_user.png';
import Loader from './../../../utils/Loader';
import { set } from 'react-hook-form';

function InsightsView(props) {

    const [isLoader, setLoader] = useState(true);
    const { subscriberCount } = useSelector((state) => state.subscriberReducer);
    const { InstaUserPost, InstaAudience, InstaFollowerCount, InstaFollowerGrowth } = useSelector((state) => state.insightsInstgramReducer);
    const { userDetailsById, authuser } = useSelector((state) => state.authReducer);
    const [grossRevenue, setGrossRevenue] = useState(0);
    const [period, setPeriod] = useState('week');
    const [periodText, setPeriodText] = useState('This Week');
    const [avg_comment_count, setAvg_comment_count] = useState(0);
    const [avg_like_count, setAvg_like_count] = useState(0);
    const [avg_engagement_count, setAvg_engagement_count] = useState(0);
    const [avg_impression_count, setAvg_impression_count] = useState(0);
    const [avg_reach_count, setAvg_reach_count] = useState(0);
    const [instaPost, setInstaPost] = useState([]);
    const [endDate, setEndDate] = useState(new Date());
    const [FollowerRes, setFollowerRes] = useState([]);
    const [startDate, setStartDate] = useState(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7));
    const [FollowerColour, setFollowerColour] = useState([]);
    const [TotalFollower, setTotalFollower] = useState(0);
    const [CityWiseAudience, setCityWiseAudience] = useState([]);
    const [FollowerGrowthRate, setFollowerGrowthRate] = useState(0);



    useEffect(() => {

        async function fetchdata() {

            const data = {
                user_id: authuser.uid
            }
            await props.getUserSubscriberCount(data);
            const mediadata = {
                userData: userDetailsById,
                since: startDate,
                until: endDate,
            }
            await props.getInstaMediaPost(mediadata);
            const auddata = {
                userData: userDetailsById,
            }
            await props.getInstaTopCityAudience(auddata);
            await props.getInstaFollowers(auddata);
        }
        fetchdata();

    }, [authuser.uid, period]);

    useEffect(() => {
        if (userDetailsById !== '') {
            if (userDetailsById?.subscription) {
                if (userDetailsById?.subscription?.revenue_monthly) {
                    var monthlyRevenue = userDetailsById?.subscription?.revenue_monthly;
                    monthlyRevenue = monthlyRevenue.toFixed(2);
                    setGrossRevenue(monthlyRevenue);
                }
            }
        }
    }, [userDetailsById]);

    useEffect(() => {
        if (InstaFollowerCount) {

            // for getting follower growth in last 28 days
            const now = new Date();
            var untilldate = new Date();
            var sincedate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 28);
            async function fetchdata() {
                const followerGrowth = {
                    userData: userDetailsById,
                    until: untilldate,
                    since: sincedate,
                }
                await props.getFollowersGrowth(followerGrowth);
            }
            fetchdata();


            setLoader(false);
            var follower_no = 0;
            var follower_data = [];
            var follower_colour = [];
            if (InstaFollowerCount.followers_count !== 0) {

                follower_no = NumberToAbbreviate(InstaFollowerCount.followers_count);
                follower_data = [
                    ['Task', ''],
                    [InstaFollowerCount.type, InstaFollowerCount.followers_count]
                ]

                follower_colour = [
                    '#8a3ab9'
                ]
            }

            setTotalFollower(follower_no);
            setFollowerRes(follower_data);
            setFollowerColour(follower_colour);
        }

    }, [InstaFollowerCount]);
    console.log('InstaUserPost========', InstaUserPost);

    const getPeriod = async (event) => {
        const now = new Date();
        var startdate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        var enddate = new Date();

        var periodval = event.target.value
        console.log('evnt', event.target.value)
        setPeriod(periodval);
        if (periodval === "week") {

            const now = new Date();
            startdate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
            enddate = new Date();

            setStartDate(startdate);
            setEndDate(enddate);
            setPeriodText('This Week');
        } else if (periodval === "day_28") {
            const now = new Date();
            startdate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
            enddate = new Date();

            setStartDate(startdate);
            setEndDate(enddate);
            setPeriodText('This Month');
        } else if (periodval === "day") {
            const now = new Date();
            startdate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            enddate = new Date();

            setStartDate(startdate);
            setEndDate(enddate);
            setPeriodText('Today');
        }
    }


    useEffect(() => {
        setCityWiseAudience([]);
        var city_aud = {};
        if (InstaAudience) {
            if (InstaAudience?.data) {
                if (InstaAudience?.data.length > 0) {
                    if (InstaAudience?.data[0].name === "audience_city") {

                        if (InstaAudience?.data[0]?.values[0]) {
                            if (InstaAudience?.data[0].values[0]?.value) {
                                city_aud = InstaAudience?.data[0].values[0].value

                                let audentries = Object.entries(city_aud);
                                var keysSorted = audentries.sort((a, b) => b[1] - a[1]);
                                setCityWiseAudience(keysSorted);
                            }
                        }

                        console.log('aud sort', keysSorted);
                    }
                }
                console.log('my InstaAudience', InstaAudience);

            }
        }

    }, [InstaAudience]);

    useEffect(() => {
        if (InstaFollowerCount.followers_count !== 0) {
            console.log('kookokokoko', InstaFollowerCount.followers_count);
            if (InstaFollowerGrowth !== '') {
                var follower_count = InstaFollowerCount.followers_count;
                var instaFollowerRate = '';
                instaFollowerRate = (InstaFollowerGrowth / follower_count) * 100;
                instaFollowerRate = instaFollowerRate.toFixed(1);
                setFollowerGrowthRate(instaFollowerRate);
            }
        }
    }, [InstaFollowerGrowth, InstaFollowerCount]);

    console.log('InstaFollowerGrowth----', InstaFollowerGrowth);

    useEffect(() => {
        setLoader(false);
        var comment_count = 0;
        var post_count = 0;
        var like_count = 0;
        var avg_comment_count = 0;
        var avg_like_count = 0;
        var insight_data = '';
        var engagement_count = 0;
        var impression_count = 0;
        var reach_count = 0;
        var saves_count = 0;
        var avg_engagement_count = 0;
        var avg_impression_count = 0;
        var avg_reach_count = 0;
        var engagement_calculate = 0;
        var avg_engagement_calculate = 0;

        if (InstaUserPost.length !== 0) {
            var user_follower = InstaUserPost.follower_count;
            InstaUserPost.map((mediaval) => {
                insight_data = mediaval.insight_data.data;
                var imp_val = 0;
                var engag_val = 0;
                var reac_val = 0;
                var saves_val = 0;
                insight_data.map((insightsval) => {

                    if (insightsval.name === "engagement") {
                        engagement_count = engagement_count + insightsval.values[0].value;
                        engag_val = insightsval.values[0].value;
                        console.log('engag_val---in', engag_val);
                        mediaval['sort_engagement'] = insightsval.values[0].value;
                    } else if (insightsval.name === "impressions") {
                        impression_count = impression_count + insightsval.values[0].value;
                        mediaval['sort_impression'] = insightsval.values[0].value;
                        imp_val = insightsval.values[0].value;
                    } else if (insightsval.name === "reach") {
                        reach_count = reach_count + insightsval.values[0].value;
                        reac_val = insightsval.values[0].value;
                    } else if (insightsval.name === "saves") {
                        saves_count = saves_count + insightsval.values[0].value;
                        saves_val = insightsval.values[0].value;
                    }

                    return true;
                })
                if (user_follower !== 0) {

                    //engagement_calculate = (engag_val + saves_val) /(imp_val)* 100;
                    engagement_calculate = engag_val / user_follower * 100;
                    mediaval['sort_engagement_rate'] = engagement_calculate;
                    avg_engagement_calculate = avg_engagement_calculate + engagement_calculate;
                    console.log('avg_engagement_calculate', avg_engagement_calculate);
                } else {
                    mediaval['sort_engagement_rate'] = 0;
                }
                post_count = post_count + 1;
                comment_count = comment_count + mediaval.comments_count;
                like_count = like_count + mediaval.like_count

                return true;
            });
            if (post_count !== 0) {
                avg_comment_count = comment_count / post_count;
                avg_like_count = like_count / post_count;
                avg_engagement_count = avg_engagement_calculate / post_count;
                avg_impression_count = impression_count / post_count;
                avg_reach_count = reach_count / post_count;

                setAvg_comment_count(avg_comment_count.toFixed(2));
                setAvg_like_count(avg_like_count.toFixed(2));
                setAvg_engagement_count(avg_engagement_count.toFixed(2));
                setAvg_impression_count(avg_impression_count.toFixed(2));
                setAvg_reach_count(avg_reach_count.toFixed(2));
            }

            InstaUserPost.sort(function (a, b) {
                return a["sort_engagement_rate"] - b["sort_engagement_rate"];
            });
            console.log('=============mediaval after================', InstaUserPost);
            setInstaPost(InstaUserPost);
        } else {
            setInstaPost([]);
            setAvg_comment_count(0);
            setAvg_like_count(0);
            setAvg_engagement_count(0);
            setAvg_impression_count(0);
            setAvg_reach_count(0);
        }
    }, [InstaUserPost, period]);
    console.log('graph====', TotalFollower);

    return (
        <div>
            {isLoader ? <Loader isLoader={true} /> : null}
            <div className="insights-head">
                <div className="row">
                    <div className="col-md-6">
                        {
                            TotalFollower !== 0 ?
                                (
                                    <div className="insights-head-left">

                                        <div className="ins-head-pro">
                                            {/* <FollowerChart dummyChart={false} followerData={FollowerRes} colourData={FollowerColour} /> */}
                                        </div>
                                        <div className="ins-head-inn">

                                            <div className="ins-user"><img src={userDetailsById?.avatarURL !== '' ? userDetailsById?.avatarURL : user_img} alt='' /></div>
                                            <div className="ins-label">Audience</div>
                                            <div className="ins-cont">{TotalFollower}</div>
                                            {
                                                FollowerGrowthRate !== 0 && (
                                                    <div className="ins-pr">Up {FollowerGrowthRate} %</div>
                                                )}

                                        </div>
                                    </div>
                                ) : <div className="insights-head-left">

                                    <div className="ins-head-pro">
                                        {/* <FollowerChart dummyChart={true} followerData={FollowerRes} colourData={FollowerColour} /> */}
                                    </div>
                                    <div className="ins-head-inn">

                                        <div className="ins-user"><img src={userDetailsById?.avatarURL !== '' ? userDetailsById?.avatarURL : user_img} alt='' /></div>
                                        <div className="ins-label">Audience</div>
                                        <div className="ins-cont">{TotalFollower}</div>
                                        {/* <div className="ins-pr">Up 224%</div> */}

                                    </div>
                                </div>
                        }
                    </div>
                    <div className="col-md-6">
                        <div className="insights-head-right">
                            <div className="ins-label">Insights</div>
                            <ul>
                                <li>
                                    <div className="ins-cont">{subscriberCount}</div>
                                    <div className="ins-pr">SUBSCRIBERS</div>
                                </li>
                                <li>
                                    <div className="ins-cont">${grossRevenue}</div>
                                    <div className="ins-pr">Monthly GROSS REVENUE</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="insights-view">
                <Tabs defaultActiveKey="instagram" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="facebook" title="Facebook">
                        Facebook
                    </Tab>
                    <Tab eventKey="youtube" title="Youtube">
                        Youtube
                    </Tab>
                    <Tab eventKey="instagram" title="Instagram">
                        <div className="insights-tabs-main">
                            <div className="insights-tab-head"><span>INSTAGRAM ANALYICS</span></div>
                            <div className="insights-tab-inn">
                                <div className="tab-select">

                                    <select onChange={getPeriod}>
                                        <option selected={period === "day_28" ? 'selected' : ''} value="day_28">This Month</option>
                                        <option selected={period === "week" ? 'selected' : ''} value="week">This Week</option>
                                        <option selected={period === "day" ? 'selected' : ''} value="day">Today</option>
                                    </select>
                                </div>

                                <div className="insights-tab-items">
                                    <div className="insights-tab-item">
                                        <div className='ins-item-head'>
                                            <h2>Best performing post {periodText}</h2>
                                            <div className="ins-item-info"><span>?</span></div>
                                        </div>
                                        <div className='ins-item-main'>
                                            <div className='performing-inner'>
                                                <ul>
                                                    {
                                                        instaPost.map((post_val) =>

                                                            post_val.media_type === "VIDEO" ? (
                                                                <li>
                                                                    <video width="220" height="165" poster={post_val.thumbnail_url} controls>
                                                                        <source src={post_val.media_url} type="video/mp4" />
                                                                    </video>
                                                                </li>
                                                                // <li><img src={post_val.media_url} alt='' /></li>
                                                            ) :
                                                                post_val.media_type === "IMAGE" ? (

                                                                    <li><img src={post_val.media_url} alt='' /></li>) : ''

                                                        )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="insights-tab-item">
                                        <div className='ins-item-head'>
                                            <h2>{periodText}</h2>
                                            <div className="ins-item-info"><span>?</span></div>
                                        </div>
                                        <div className='ins-item-main'>
                                            <div className='progr-inner'>
                                                <ul>

                                                    <li className='pro-up'>
                                                        <div className='pro-tbl'>IMpressions</div>
                                                        <div className='pro-ttl'>{avg_impression_count}</div>
                                                        {/* <div className='pro-ttl'>19,992,932</div> */}
                                                    </li>
                                                    <li className='pro-up'>
                                                        <div className='pro-tbl'>Engagement rate</div>
                                                        <div className='pro-ttl'>{avg_engagement_count}%</div>
                                                        {/* <div className='pro-ttl'>4.09%</div> */}
                                                    </li>
                                                    <li className='pro-dwn'>
                                                        <div className='pro-tbl'>Avg likes per post</div>
                                                        <div className='pro-ttl'>{avg_like_count}</div>
                                                        {/* <div className='pro-ttl'>332,147</div> */}
                                                    </li>
                                                    <li className='pro-dwn'>
                                                        <div className='pro-tbl'>Avg views per post</div>
                                                        <div className='pro-ttl'>{avg_reach_count}</div>
                                                        {/* <div className='pro-ttl'>1,136,261</div> */}
                                                    </li>
                                                    <li className='pro-up'>
                                                        <div className='pro-tbl'>Avg comments per post</div>
                                                        <div className='pro-ttl'>{avg_comment_count}</div>
                                                        {/* <div className='pro-ttl'>8,433</div> */}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="insights-tab-item">
                                        <div className='ins-item-head'>
                                            <h2>Top cities</h2>
                                            <div className="ins-item-info"><span>?</span></div>
                                        </div>
                                        <div className='ins-item-main'>
                                            <div className='cities-inner'>
                                                {
                                                    InstaAudience?.data ? (
                                                        InstaAudience.data.length > 0 ? (
                                                            CityWiseAudience.length > 0 ? (
                                                                <table className='table'>
                                                                    <tr>
                                                                        <th colSpan={2}>City</th>
                                                                        <th>FOLLOWERS</th>
                                                                    </tr>
                                                                    {
                                                                        CityWiseAudience.map((aud_val, index) =>
                                                                            index < 5 && (
                                                                                <tr>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>
                                                                                        <div className='cities-name'>
                                                                                            {/* <span className='cities-img'><img src={require('../../../assets/images/image-16.png').default} alt='' /></span> */}
                                                                                            <span className='cities-lbl'>{aud_val[0]}</span>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>{aud_val[1]}</td>
                                                                                </tr>
                                                                            )
                                                                        )}

                                                                </table>
                                                            ) : <span>Data not found.</span>
                                                        ) :
                                                            <span>Data not available with fewer than 100 followers.</span>
                                                    ) :
                                                        <span>Data not found.</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="twitter" title="Twitter">
                        Twitter
                    </Tab>
                    <Tab eventKey="tiktok" title="Tiktok">
                        Tiktok
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        userDetailsById: state.authReducer.userDetailsById,
        authuser: state.authReducer.authuser,
        subscriberCount: state.subscriberReducer.subscriberCount,
        InstaUserPost: state.insightsInstgramReducer.InstaUserPost,
        InstaAudience: state.insightsInstgramReducer.InstaAudience,
        InstaFollowerCount: state.insightsInstgramReducer.InstaFollowerCount,
        InstaFollowerGrowth: state.insightsInstgramReducer.InstaFollowerGrowth,
    }
}

const actionCreators = { getInstgramInsightsUser, getUserSubscriberCount, getFollowersGrowth, getInstaMediaPost, getInstaTopCityAudience, getInstaFollowers };
export default connect(mapStateToProps, actionCreators)(InsightsView);

