import React, {useEffect,useState } from 'react'
//import useState from 'react-usestateref'
import { useSelector, connect } from "react-redux";
import { getUserProfileById, fetchUser } from "../../Redux/actions/auth-actions";
import { MediaMusicBookmark } from "../../Redux/actions/media-actions";
import {PostedTime} from './calendar_date';
import MediaLike from './mediaLike';
//import MediaShare from './mediaShare';
import { Button } from '@material-ui/core'
import MediaBookmark from './mediaBookmark';
import { Media, Player, controls } from 'react-media-player'
import {MediaDuration} from './mediaDuration';
import audio_img from '../../assets/images/upload-aud.png';
import dot_button from '../../assets/images/three-dots-vertical.svg';
import { confirm } from "react-confirm-box";
import ShareMediaMusic from './shareMediaMusic';
import CustomPlayPause from './customPlayPause';
import user_img from '../../assets/images/dummy_user.png';

const { PlayPause,CurrentTime,isPlaying } = controls;

function MusicComponent(props) {
    const options = {
        labels: {
            confirmable: "Confirm",
            cancellable: "Cancel"
        }
    }

    // To prevent multiple playing at same time
    useEffect(() => {
        document.addEventListener("play", function(evt)
        {
            
            if(window.$_currentlyPlaying && window.$_currentlyPlaying !== evt.target)
            {
                
                window.$_currentlyPlaying.pause();
            } 
            window.$_currentlyPlaying = evt.target;

        }, true);
      
        
    }, [props.mediaData]);

    const [showShareMediaContent, setShowShareMediaContent] = useState(false);
    
    const { userDetailsById, authuser } = useSelector((state) => state.authReducer);
   
    useEffect(() => {
      
        async function fetchdata(){
            if(props.uid)
                await  props.getUserProfileById(props.uid);
            }
            fetchdata(); 
    }, [props.mediaData]);
   
  
    const handleDialog = async (mediaId, uid) => {
        if(mediaId){
            var data ='';
            var result = {};
            
            const results = await confirm("Are you sure you want to remove ?",options);
            if (results) {
            
                for(var i in props.mediaData.user_bookmark)
                {
                    if(i !== uid){   
                        result[i] = props.mediaData.user_bookmark[i];
                    }
                }
               
                data = {
                    id: mediaId,
                    user_bookmark: result,
                    type: 'remove_bookmark',
                    by_id :uid,
                };

                await props.MediaMusicBookmark(data);
            }
        }
    };

    return (
       
        <div id={props.mediaId}>
           
            <div className='post-item-top'>
                <div className='post-item-user'>
                    <span className='item-user-img'><img src={props.mediaData.avatarurl_doc ? props.mediaData.avatarurl_doc : user_img} alt='' /></span>
                    <span className='item-user-name'>{props.mediaData.username_doc}</span>
                </div>
                { props.type === "home" &&
                    <div className='post-tr-bt'>
                    <span>Released a new</span>
                        <b>Track</b>
                    </div>
                }
                { props.type === "bookmark" &&
                    <div className='post-tr-bt'>
                        {/* <span onClick={() =>  handleDialog(props.mediaData.id,authuser.uid)}><img src={dot_button} alt='' /></span> */}
                        <Button  onClick={() =>  handleDialog(props.mediaData.id,authuser.uid)} type="button" class="btn-close btn" aria-label="Close"></Button>
                    {/* <span>Released a new</span>
                        <b>Track</b> */}
                    </div>
                }
            </div>
            <div className='post-item-main'>
                <div className='post-item-vid'>
              
                    {/* <div className='item-vid'><img src={props.bookmarkAvatarurl ? props.bookmarkAvatarurl: userDetailsById?.avatarURL} alt='' /></div> */}
                    <div className='item-vid'><img src={props.mediaData?.cover_art ? props.mediaData?.cover_art : audio_img} alt='' /></div>
                    <div className='item-vid-btn'><img src={require('../../assets/images/Play.svg').default} alt='' /></div>
                </div>
                <div className='post-item-cont'>
                    <div className='post-item-dtl'>
                        <div className='post-item-nm'>{props.mediaData.caption}</div>
                        <div className='post-item-txt'>{props.mediaData.caption} <br />
                        
                        <MediaDuration mediaURL={props.mediaData.media_url} />
                     
                        </div>
                        <div className='post-item-btn'>
                            <Media>
                           
                                <div className="media">
                                    <div className="media-player">
                                        <Player src={props.mediaData.media_url} />
                                    </div>
                                   
                                    <div className="media-controls">
                                       
                                        <CurrentTime/>
                                        <PlayPause/>
                                        
                                    </div>
                                </div>
                            </Media>
                        </div>
                    </div>
                    <ShareMediaMusic media_id={props.mediaData.id} history={props.history} url_id={userDetailsById.uid} show={showShareMediaContent} close={() => setShowShareMediaContent(false)} /> 
                    <div className='post-item-btns'>
                        <Button  className='btn'>
                            <MediaBookmark user_media_id={props.userProfileId ? props.userProfileId : authuser.uid} mediaBookmarkData={props.mediaData.user_bookmark} userid={authuser.uid} media_id={props.mediaData.id} />
                        </Button>
                        <Button onClick={() => setShowShareMediaContent(true)} className='btn'>
                            <img src={require('../../assets/images/icon.svg').default} alt='' />
                        </Button>
                    </div>
                </div>
            </div>
            { props.type === "home" &&
                (
                    <div className='post-item-btm'>
                       
                        {/* <ShareMediaMusic history={props.history} url_id={userDetailsById.uid} show={showShareMediaMusic} close={() => setShowShareMediaMusic(false)} user_media_id={props.userProfileId ? props.userProfileId : authuser.uid} mediaSharedata={props.mediaData.user_share} userid={authuser.uid} media_id={props.mediaData.id}/> */}
                        {/* <div className='post-item-tim'>Today</div> */}
                        <div className='post-item-tim'><PostedTime pageName="music" posted_time={props.mediaData.postedAt} /></div>
                        <div className='post-item-lik'>
                            <MediaLike user_media_id={props.userProfileId ? props.userProfileId : authuser.uid} postedById={props.mediaData.postedById} mediaLikedata={props.mediaData.user_likes} userid={authuser.uid} media_id={props.mediaData.id} />
                            <span><img src={require('../../assets/images/Shape-iic.svg').default} alt='' /> {props.mediaData.share_count} shares</span>

                        </div>
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
const actionCreators = {
    getUserProfileById: getUserProfileById,
    fetchUser: fetchUser,
    MediaMusicBookmark:MediaMusicBookmark,
};

export default connect(mapStateToProps, actionCreators)(MusicComponent);

