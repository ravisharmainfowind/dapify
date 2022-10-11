import {
  POST_MEDIA_CONTENT_REQUEST, GET_MEDIA_CONTENT_SUCCESS, GET_MEDIA_CONTENT_FAILURE,
  POST_USER_MEDIA_REQUEST, GET_USER_MEDIA_SUCCESS, GET_USER_MEDIA_FAILURE,
  POST_USER_MEDIA_MUSIC_REQUEST, GET_USER_MEDIA_MUSIC_SUCCESS, GET_USER_MEDIA_MUSIC_FAILURE,
  POST_Like_MEDIA_MUSIC_REQUEST, GET_Like_MEDIA_MUSIC_SUCCESS, GET_Like_MEDIA_MUSIC_FAILURE,
  //POST_SHARE_MEDIA_MUSIC_REQUEST, GET_SHARE_MEDIA_MUSIC_SUCCESS, GET_SHARE_MEDIA_MUSIC_FAILURE,
  POST_BOOKMARK_MEDIA_MUSIC_REQUEST, GET_BOOKMARK_MEDIA_MUSIC_SUCCESS, GET_BOOKMARK_MEDIA_MUSIC_FAILURE,
  POST_USER_BOOKMARK_MUSIC_REQUEST, GET_USER_BOOKMARK_MUSIC_SUCCESS, GET_USER_BOOKMARK_MUSIC_FAILURE,
  POST_MEDIA_SHARE_COUNT_REQUEST,ADD_MEDIA_SHARE_COUNT_SUCCESS,ADD_MEDIA_SHARE_COUNT_FAILURE,
  LIKED_NOTIFICATION, POST_CONTENT,
} from './type';
import firebaseConfig from "../../firebase";
import { ERROR, Success } from './../../utils/errors';
import 'antd/dist/antd.css'
import * as moment from 'moment';
//import { keyboardControls } from 'react-media-player/lib/utils';
import {
  USER_NOTIFICATION

} from './api_url';
import axios from 'axios';


export const addMediaContent = (data, history) => async (dispatch) => {
  try {
    if (data.media_content !== '') {

      dispatch({ type: POST_MEDIA_CONTENT_REQUEST, payload: true });
      const docRef = firebaseConfig.firestore().collection('user_contents').doc()
      const doc_id = docRef.id;

      var filename = '';
      var cover_filename = '';
      var via = '';
      if (data.media_type === "image") {
        filename = data.uid + '_' + doc_id + '.png';
      }
      if (data.media_type === "video") {
        filename = data.uid + '_' + doc_id + '.mp4';
        via = data.via;
      }
      if (data.media_type === "audio") {
        filename = data.uid + '_' + doc_id + '.mp3';
        if (data.cover_art) {
          cover_filename = data.uid + '_' + doc_id + '.png';
        }
      }
      var progress = 0;
      var progress_res = 0;
      if (via === 'youtube') {

        firebaseConfig.firestore().collection('user_contents/').doc(doc_id).set({
          caption: data.title,
          id: doc_id,
          media_type: data.media_type,
          media_url: data.media_content,
          postedAt: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
          postedById: data.uid,
          postedByUserName: data.username,
          public: data.public,
          userAvatarUrl: data.userAvatarUrl,
          via: via,

        }).then(async function () {
          progress = 0;
          await sendNotificationAllSubscriber(data.uid);
          dispatch({ type: GET_MEDIA_CONTENT_SUCCESS, payload: progress });
          Success('Added Successfully');


        }).catch(function (error) {
          ERROR(error.message);
          dispatch({ type: GET_MEDIA_CONTENT_FAILURE, payload: error });

        })
      }
      else {
        if (data.media_type === "audio") {

          var audstorage = firebaseConfig.storage();
          var audstorageRef = audstorage.ref();
          var audiouploadTask = audstorageRef.child('media_contents/' + filename).put(data.media_content)
          audiouploadTask.on('state_changed', function (snapshot) {
            progress_res = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress = (Math.round(progress_res));
            dispatch({ type: GET_MEDIA_CONTENT_SUCCESS, payload: progress });
            console.log('progress1', progress);
          }, (err) => {
            ERROR(err.message);
            dispatch({ type: GET_MEDIA_CONTENT_FAILURE, payload: err });
          }, () => {
            audiouploadTask.snapshot.ref.getDownloadURL().then(async url => {

              //for audio cover image--------------
              imageUpload(data.cover_art, doc_id, 'audio_cover_image/', 'user_contents', 'cover_art', cover_filename);

              firebaseConfig.firestore().collection('user_contents/').doc(doc_id).set({
                caption: data.title,
                id: doc_id,
                media_type: data.media_type,
                media_url: url,
                postedAt: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
                postedById: data.uid,
                postedByUserName: data.username,
                public: data.public,
                userAvatarUrl: data.userAvatarUrl,
                via: via,
              })
              await sendNotificationAllSubscriber(data.uid);
              dispatch({ type: GET_MEDIA_CONTENT_SUCCESS, payload: 0 });
              Success('Added Successfully');

            }).catch(function (error) {
              ERROR(error.message);
              dispatch({ type: GET_MEDIA_CONTENT_FAILURE, payload: error });

            })
          })

        } else {

          var storage = firebaseConfig.storage();
          var storageRef = storage.ref();
          var uploadTask = storageRef.child('media_contents/' + filename).put(data.media_content)
          uploadTask.on('state_changed', function (snapshot) {
            progress_res = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress = (Math.round(progress_res));
            dispatch({ type: GET_MEDIA_CONTENT_SUCCESS, payload: progress });
            console.log('progress1', progress);
          }, (err) => {
            ERROR(err.message);
            dispatch({ type: GET_MEDIA_CONTENT_FAILURE, payload: err });
          }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async url => {

              firebaseConfig.firestore().collection('user_contents/').doc(doc_id).set({
                caption: data.title,
                id: doc_id,
                media_type: data.media_type,
                media_url: url,
                postedAt: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
                postedById: data.uid,
                postedByUserName: data.username,
                public: data.public,
                userAvatarUrl: data.userAvatarUrl,
                via: via,
              })
              await sendNotificationAllSubscriber(data.uid);
              dispatch({ type: GET_MEDIA_CONTENT_SUCCESS, payload: 0 });
              Success('Added Successfully');
            }).catch(function (error) {
              ERROR(error.message);
              dispatch({ type: GET_MEDIA_CONTENT_FAILURE, payload: error });

            })
          })
        }
      }
    }
    else {
      dispatch({ type: GET_MEDIA_CONTENT_FAILURE, payload: 'invalid file' });
      ERROR('invalid file');
    }

  } catch (error) {
    dispatch({ type: GET_MEDIA_CONTENT_FAILURE, payload: error.message });
    ERROR(error.message);
    // throw error;
  }
};


async function imageUpload(image, id, folder_name, collection_name, columnname, filename) {
  try {
    if (image !== null) {
      const imagename = filename;
      var storage = firebaseConfig.storage();
      var storageRef = storage.ref();
      storageRef.child(folder_name + imagename).put(image).then(data => {
        var fileurl = '';
        data.ref.getDownloadURL().then(url => {

          firebaseConfig.firestore().collection(collection_name).doc(id).update({
            [columnname]: url,
          })

        })
        return fileurl;
      })

    }
  } catch (e) {
    console.log(e)
    return false;
  }
}

// For get user media content 
export const getUserMediaContent = (user_id, limit) => async dispatch => {
  try {


    dispatch({ type: POST_USER_MEDIA_REQUEST, payload: true });
    if (user_id) {

      var mediaPost = [];
      let query = '';
      var totalrecord = [];

      // for total count----------------------------
      firebaseConfig.firestore().collection('user_contents').where('postedById', "==", user_id)
        .where('media_type', "in", ["image", "video"])
        .orderBy('postedAt','desc').get().then(function (querySnapshot) {
          totalrecord = querySnapshot.size;
        });

      // for load more data---------------------------
      query = firebaseConfig.firestore().collection('user_contents')
        .where('postedById', "==", user_id)
        .where('media_type', "in", ["image", "video"])
        .orderBy('postedAt','desc')
        .limit(limit);

      query.get().then(snapshot => {
        snapshot.forEach(doc => {

          mediaPost.push(doc.data());

        })
        dispatch({ type: GET_USER_MEDIA_SUCCESS, payload: mediaPost, MediaTotal: totalrecord });
      }).catch(function (error) {
        dispatch({ type: GET_USER_MEDIA_FAILURE, payload: false });
      })
    } else {
      dispatch({ type: GET_USER_MEDIA_FAILURE, payload: false });
    }
  } catch (error) {
    dispatch({ type: GET_USER_MEDIA_FAILURE, payload: error });
  }
};

export const MediaMusicLike = (data) => async dispatch => {
  try {
    dispatch({ type: POST_Like_MEDIA_MUSIC_REQUEST, payload: true });
    if (data.type === 'like') {
      console.log('likealldata', data);
      const resp = await firebaseConfig.firestore().collection('user_contents').doc(data.id).set({ user_likes: data.user_likes }, { merge: true })
        .then(async function (docres) {

          if(data.postedUserId !== data.by_id){
            await sendNotification(data.postedUserId, data.by_id);
          }

          Success("Liked Post Successfully");
          dispatch({ type: GET_Like_MEDIA_MUSIC_SUCCESS, payload: data.id + '_' + data.type });
        }).catch(function (error) {
          ERROR(error.message);
          dispatch({ type: GET_Like_MEDIA_MUSIC_FAILURE, payload: error });
        });
    }
    else {

      const resp = await firebaseConfig.firestore().collection('user_contents').doc(data.id).update({ user_likes: data.user_likes })
        .then(function (docres) {

          Success("Unliked Post Successfully");
          dispatch({ type: GET_Like_MEDIA_MUSIC_SUCCESS, payload: data.id + '_' + data.type });
        }).catch(function (error) {
          ERROR(error.message);
          dispatch({ type: GET_Like_MEDIA_MUSIC_FAILURE, payload: error });
        });
    }

  } catch (error) {
    ERROR(error.message);
    dispatch({ type: GET_Like_MEDIA_MUSIC_FAILURE, payload: error });
  }
};

export const MediaMusicBookmark = (data) => async dispatch => {
  try {
    dispatch({ type: POST_BOOKMARK_MEDIA_MUSIC_REQUEST, payload: true });
    if (data.type === 'bookmark') {
      const resp = await firebaseConfig.firestore().collection('user_contents').doc(data.id).set({ user_bookmark: data.user_bookmark }, { merge: true })
        .then(function (docres) {
          Success("Bookmark Successfully");
          dispatch({ type: GET_BOOKMARK_MEDIA_MUSIC_SUCCESS, payload: data.id + '_' + data.type });
        }).catch(function (error) {
          ERROR(error.message);
          dispatch({ type: GET_BOOKMARK_MEDIA_MUSIC_FAILURE, payload: error });
        });
    }
    else {

      const resp = await firebaseConfig.firestore().collection('user_contents').doc(data.id).update({ user_bookmark: data.user_bookmark })
        .then(function (docres) {
          Success("Remove from bookmark successfully");
          dispatch({ type: GET_BOOKMARK_MEDIA_MUSIC_SUCCESS, payload: data.id + '_' + data.type });
        }).catch(function (error) {
          ERROR(error.message);
          dispatch({ type: GET_BOOKMARK_MEDIA_MUSIC_FAILURE, payload: error });
        });
    }

  } catch (error) {
    ERROR(error.message);
    dispatch({ type: GET_BOOKMARK_MEDIA_MUSIC_FAILURE, payload: error });
  }
};

export const getUserBookmarkMusic_old = (user_id, limit) => async dispatch => {
  try {
    dispatch({ type: POST_USER_BOOKMARK_MUSIC_REQUEST, payload: true });
    if (user_id) {

      var bookmark_arr = [];
      var user_arr = [];
      // var bookmark_ttl_arr = [];

      var totalRecord = 0;

      var bookmarkTotalData = await firebaseConfig.firestore().collection('user_contents')
        .where("media_type", "==", "audio")
        .orderBy('postedAt','desc')
      bookmarkTotalData.get().then((snapshot) => {
        var totalcount = 0;
        snapshot.forEach((totalbookDoc) => {
          var totalDocData = totalbookDoc.data()
          if (totalDocData.user_bookmark !== undefined) {

            var mediares = Object.keys(totalDocData.user_bookmark)
            if (mediares.find(o => o === user_id)) {
              // bookmark_ttl_arr.push(totalDocData.id);
              totalcount = totalcount + 1;

            }
          }
        })
        totalRecord = totalcount;

        // for load more data---------------------------
        var bookmarkref = firebaseConfig.firestore().collection('user_contents')
          .where("media_type", "==", "audio")
          .orderBy('postedAt','desc')
        bookmarkref.get().then((snapshot) => {

          snapshot.forEach((bookDoc) => {
            if (Object.values(bookmark_arr).length < limit) {
              var bookmarkDocData = bookDoc.data()

              if (bookmarkDocData.user_bookmark !== undefined) {

                var mediares = Object.keys(bookmarkDocData.user_bookmark)
                if (mediares.find(o => o === user_id)) {
                  bookmark_arr[bookmarkDocData.id] = bookmarkDocData
                }
              }
            }
          })

          Object.values(bookmark_arr).forEach(async (usrContent, index) => {

            var userref = await firebaseConfig.firestore().collection("users").where('uid', "==", usrContent.postedById);
            userref.get().then(snapshot1 => {

              snapshot1.forEach(doc => {

                user_arr = doc.data()

                bookmark_arr[usrContent.id].username_doc = user_arr.username;
                bookmark_arr[usrContent.id].avatarurl_doc = user_arr.avatarURL;

              })

              dispatch({ type: GET_USER_BOOKMARK_MUSIC_SUCCESS, payload: bookmark_arr, MusicBookmarkTotal: totalRecord });
            })
          })

          // dispatch({ type: GET_USER_BOOKMARK_MUSIC_SUCCESS, payload: bookmark_arr});

        }).catch(function (error) {
          dispatch({ type: GET_USER_BOOKMARK_MUSIC_FAILURE, payload: false });
        })
      }).catch(function (error) {
        dispatch({ type: GET_USER_BOOKMARK_MUSIC_FAILURE, payload: false });
      })

    } else {
      dispatch({ type: GET_USER_BOOKMARK_MUSIC_FAILURE, payload: false });
    }
  } catch (error) {
    dispatch({ type: GET_USER_BOOKMARK_MUSIC_FAILURE, payload: error });
  }
};

export const getUserBookmarkMusic = (user_id, limit) => async dispatch => {
  try {
    dispatch({ type: POST_USER_BOOKMARK_MUSIC_REQUEST, payload: true });
    if (user_id) {
      var subscribeobj = [];
      const res = await firebaseConfig.firestore().collection("users").doc(user_id);
      res.get().then(async (doc) => {
        
        if (!doc.exists) {
        }
        else {
         
          var UserData = doc.data();
          subscribeobj = UserData.subscribed_list;
        }
      })

      var result_arr = [];
      var totalRecord = 0;

      var bookmarkTotalData = await firebaseConfig.firestore().collection('user_contents')
        .where("media_type", "==", "audio")
        .orderBy('postedAt','desc')

      bookmarkTotalData.get().then((snapshot) => {
        var totalcount = 0;

        snapshot.forEach((totalbookDoc) => {
          var totalDocData = totalbookDoc.data()
          if (totalDocData.user_bookmark !== undefined) {

            var mediares = Object.keys(totalDocData.user_bookmark)
            if (mediares.find(o => o === user_id)) {
              const userexist = firebaseConfig.firestore().collection('users').doc(totalDocData.postedById)
              userexist.get().then((doc) => {
                if (doc.data().user_active === true) {
                 
                  totalcount = totalcount + 1;
                  totalRecord = totalcount;
                }
              })
            }
          }
        })

        console.log('-----totalRecord',totalRecord);
        // for load more data---------------------------
        var bookmarkref = firebaseConfig.firestore().collection('user_contents')
          .where("media_type", "==", "audio")
          .orderBy('postedAt','desc')
        bookmarkref.get().then((snapshot1) => {
          var i = 0;
          var j = 0;

          var snapshot = [];
          snapshot1.forEach(async (bookDoc) => {
            snapshot.push(bookDoc);
          })

          getlimit(snapshot[i]);

          function getlimit(bookDoc) {

            
            if (totalRecord !== 0) {
              if (j < limit && snapshot.length > i) {
                var bookmarkDocData = bookDoc.data()
                if (bookmarkDocData.user_bookmark !== undefined) {
                  var mediares = Object.keys(bookmarkDocData.user_bookmark)

                  if (mediares.find(o => o === user_id)) {

                    getbookmarkuserdata(bookmarkDocData, myDisplayer);
                    function myDisplayer(obj) {

                      if (Object.keys(obj).length !== 0) {
                        i = i + 1;
                        j = j + 1;
                        result_arr.push(obj);
                        getlimit(snapshot[i]);
                      }
                     
                      dispatch({ type: GET_USER_BOOKMARK_MUSIC_SUCCESS, payload: result_arr, MusicBookmarkTotal: totalRecord });
                    }
                  }
                  else {
                    i = i + 1;
                    getlimit(snapshot[i]);
                  }
                } else {
                  i = i + 1;
                  getlimit(snapshot[i]);
                }
              }
            } else {

              dispatch({ type: GET_USER_BOOKMARK_MUSIC_SUCCESS, payload: result_arr, MusicBookmarkTotal: totalRecord });
              //dispatch({ type: GET_USER_BOOKMARK_MUSIC_FAILURE, payload: false });
            }

          }
        }).catch(function (error) {
          dispatch({ type: GET_USER_BOOKMARK_MUSIC_FAILURE, payload: false });
        })

        async function getbookmarkuserdata(bookmarkval, myCallback) {
          var bookmarkobj = {};
          const userbookmark = await firebaseConfig.firestore().collection('users').doc(bookmarkval.postedById);
          userbookmark.get().then(function (doc) {
            if (doc.exists) {
              var resData = '';
              var viewPermission = false;
              if (doc.data().user_active === true) {
                if (Object.keys(subscribeobj).length > 0) {
                  var subid = bookmarkval.postedById + '_SUBSCRIBER';
                  if (Object.keys(subscribeobj).includes(subid)) {
                    resData = subscribeobj[subid];
                    if(resData.subscribe_type === "one_time_support"){
                      viewPermission = true;
    
                    }else{
                      if (resData.date !== '') {
                        var subs_date = resData.date;
                        var checkDate = new Date();
      
                        const milliseconds = subs_date.seconds * 1000 // 1575909015000
                        var cloneDate = new Date(milliseconds)
      
                        //for monthly subscription
      
                        cloneDate.setDate(cloneDate.getDate() + 30);
                        if (cloneDate.getTime() > checkDate.getTime()) {
                          viewPermission = true;
                        }
                    }
                  } 
                }
                }
                bookmarkobj[bookmarkval.id] = bookmarkval
                bookmarkobj[bookmarkval.id].username_doc = doc.data().username;
                bookmarkobj[bookmarkval.id].avatarurl_doc = doc.data().avatarURL;
                bookmarkobj[bookmarkval.id].viewPermission = viewPermission;
                
                myCallback(bookmarkobj);
              }
            }
          })
        }
      }).catch(function (error) {
        dispatch({ type: GET_USER_BOOKMARK_MUSIC_FAILURE, payload: false });
      })

    } else {
      dispatch({ type: GET_USER_BOOKMARK_MUSIC_FAILURE, payload: false });
    }
  } catch (error) {
    dispatch({ type: GET_USER_BOOKMARK_MUSIC_FAILURE, payload: error });
  }
};

export const getUserMediaMusic = (user_id, limit) => async dispatch => {
  try {
    dispatch({ type: POST_USER_MEDIA_MUSIC_REQUEST, payload: true });
    if (user_id) {

      let query = '';
      var totalrecord = [];

      var mediaMusicPost = [];
      var res_arr = [];
      const res = await firebaseConfig.firestore().collection("users").doc(user_id);
      res.get().then((doc1) => {

        // for total count---------------------------
        firebaseConfig.firestore().collection('user_contents').where('postedById', "==", user_id)
          .where('media_type', "in", ["audio"])
          .orderBy('postedAt','desc')
          .get().then(function (querySnapshot) {
            totalrecord = querySnapshot.size;
          });

        // for load more data---------------------------
     
        query = firebaseConfig.firestore().collection('user_contents')
          .where('postedById', "==", user_id)
          .where('media_type', "in", ["audio"])
          .orderBy('postedAt','desc')
          .limit(limit);

        query.get().then(snapshot => {

          snapshot.forEach( doc => {
            
            res_arr = doc.data();
           
            getShareCount(res_arr);
             
            async function getShareCount(mediaid) {
              var totalCount =0;
              mediaid['share_count'] = totalCount;
              const res =  await firebaseConfig.firestore().collection('media_share_history').doc(user_id);
              res.get().then((docs) => {
                
                var mediaData = docs.data();
                if(mediaData !== undefined)
                {
                  if(mediaData[mediaid.id] !== undefined)
                  {
                    if(mediaData[mediaid.id]['watsapp_Count']){
                      totalCount += mediaData[mediaid.id]['watsapp_Count'];
                    }
                    if(mediaData[mediaid.id]['email_Count']){
                      totalCount += mediaData[mediaid.id]['email_Count'];
                    }
                    if(mediaData[mediaid.id]['facebook_Count']){
                      totalCount += mediaData[mediaid.id]['facebook_Count'];
                    }
                    mediaid['share_count'] = totalCount;
                  }
                }
              })
            }
 
            res_arr.username_doc = doc1.data().username;
            res_arr.avatarurl_doc = doc1.data().avatarURL;
            
            mediaMusicPost.push(res_arr);

          })

          console.log('musicccc dataaaa',mediaMusicPost);
          dispatch({ type: GET_USER_MEDIA_MUSIC_SUCCESS, payload: mediaMusicPost, MusicTotal: totalrecord });

        }).catch(function (error) {
          dispatch({ type: GET_USER_MEDIA_MUSIC_FAILURE, payload: false });
        })
      }).catch(function (error) {
        dispatch({ type: GET_USER_MEDIA_MUSIC_FAILURE, payload: false });
      })
    } else {
      dispatch({ type: GET_USER_MEDIA_MUSIC_FAILURE, payload: false });
    }
  } catch (error) {
    dispatch({ type: GET_USER_MEDIA_MUSIC_FAILURE, payload: error });
  }
};

async function sendNotification(to_id, from_id) {
  try {
    const res = await firebaseConfig.firestore().collection("users").doc(to_id);
    res.get().then(async (doc) => {

      if (!doc.exists) {

        //dispatch({ type: GET_OTHER_USER_PROFILE_BY_ID_FAILURE, payload: false });
      }
      else {
        var Unread_Notification_Count = 0;
        if (doc.data()?.Notification_tokens) {
          if (doc.data().Notification_tokens.length > 0) {

            var fromname = '';
            const fromres = await firebaseConfig.firestore().collection("users").doc(from_id);
            fromres.get().then(async (fromdoc) => {

              if (!fromdoc.exists) {

                fromname = "";
              }
              else {


                if (doc.data()?.Unread_Notification) {
                  Unread_Notification_Count = doc.data().Unread_Notification + 1;
                } else {
                  Unread_Notification_Count = 1;
                }

                fromname = fromdoc.data().username;
                console.log(doc.data().Notification_tokens);
                const notification_data = {

                  "title": "Post Liked",
                  "body": fromname + ' ' + LIKED_NOTIFICATION,
                  "to": doc.data().Notification_tokens,

                }

                const notification_response = await axios.post(USER_NOTIFICATION, notification_data);
                console.log('notification_response', notification_response);
                if (notification_response.status === 200) {
                  var notifypostdata = {};
                  var notification_id = '';
                  const notifydocRef = firebaseConfig.firestore().collection('notifications').doc()
                  console.log('datanotifyyyy', notifydocRef);
                  notification_id = notifydocRef.id;

                  notifypostdata[notification_id] = {

                    time: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
                    type: "LIKED_NOTIFICATION",
                    user_id: from_id,
                    status: 'unread',
                    flag: true,

                  }
                  firebaseConfig.firestore().collection('notifications/').doc(to_id).set(notifypostdata, { merge: true }).then(function () {
                    firebaseConfig.firestore().collection('users/').doc(to_id).update({
                      'Unread_Notification': Unread_Notification_Count,
                    }).then(function (docres) {

                    }).catch(function (error) {
                      ERROR(error.message);

                    });
                  }).catch(function (error) {
                    console.log(error.message);
                  })

                }
              }
            });

          }
        }
      }
    })
  } catch (e) {
    console.log(e)
    return false;
  }
}

async function sendNotificationAllSubscriber(uid) {
  try {
    var subscribeobj = [];
    const res = await firebaseConfig.firestore().collection("users").doc(uid);
    res.get().then(async (doc) => {

      if (!doc.exists) {

      }
      else {
        var fromname = '';
        fromname = doc.data().username;
        var UserData = doc.data();
        subscribeobj = UserData.subscribed_list;
        if (subscribeobj !== '') {

          let i = 0;
          Object.keys(subscribeobj).map(async function (subkeyid) {
            if (subkeyid.includes('_RECIEVER')) {
              var sub_id = subkeyid.replace('_RECIEVER', '');

              const subres = await firebaseConfig.firestore().collection("users").doc(sub_id);
              subres.get().then(async (subdoc) => {

                if (!subdoc.exists) {

                }
                else {
                  var Recsubiddata = subscribeobj[sub_id + '_RECIEVER'];
                  var Unread_Notification_Count = 0;
                  if (Recsubiddata.subscribe_type === "one_time_support") {
                   
                        if (subdoc.data()?.Notification_tokens) {
                          if (subdoc.data().Notification_tokens.length > 0) {

                            console.log(subdoc.data().Notification_tokens);
                            const notification_data = {

                              "title": "POST_CONTENT",
                              "body": fromname + ' ' + POST_CONTENT,
                              "to": subdoc.data().Notification_tokens,
                            }
                            if (subdoc.data()?.Unread_Notification) {
                              Unread_Notification_Count = subdoc.data().Unread_Notification + 1;
                            } else {
                              Unread_Notification_Count = 1;
                            }

                            const notification_response = await axios.post(USER_NOTIFICATION, notification_data);
                            console.log('notification_response', notification_response);
                            if (notification_response.status === 200) {

                              var notifypostdata = {};
                              var notification_id = '';
                              const notifydocRef = firebaseConfig.firestore().collection('notifications').doc()
                              console.log('datanotifyyyy', notifydocRef);
                              notification_id = notifydocRef.id;

                              notifypostdata[notification_id] = {

                                time: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
                                type: "POST_CONTENT",
                                user_id: uid,
                                status: 'unread',
                                flag: true,

                              }
                              firebaseConfig.firestore().collection('notifications/').doc(sub_id).set(notifypostdata, { merge: true }).then(function () {
                                firebaseConfig.firestore().collection('users/').doc(sub_id).update({
                                  'Unread_Notification': Unread_Notification_Count,
                                }).then(function (docres) {

                                }).catch(function (error) {
                                  ERROR(error.message);

                                });
                              }).catch(function (error) {
                                console.log(error.message);
                              })

                            }
                          }
                        }
                  } else {
                    if (Recsubiddata.date !== '') {
                      var Rec_subs_date = Recsubiddata.date;
                      var rec_checkDate = new Date();

                      const milliseconds = Rec_subs_date.seconds * 1000 // 1575909015000
                      var rec_cloneDate = new Date(milliseconds)

                      //for monthly subscription

                      rec_cloneDate.setDate(rec_cloneDate.getDate() + 30);
                      if (rec_cloneDate.getTime() > rec_checkDate.getTime()) {

                       
                        if (subdoc.data()?.Notification_tokens) {
                          if (subdoc.data().Notification_tokens.length > 0) {

                            console.log(subdoc.data().Notification_tokens);
                            const notification_data = {

                              "title": "POST_CONTENT",
                              "body": fromname + ' ' + POST_CONTENT,
                              "to": subdoc.data().Notification_tokens,
                            }
                            if (subdoc.data()?.Unread_Notification) {
                              Unread_Notification_Count = subdoc.data().Unread_Notification + 1;
                            } else {
                              Unread_Notification_Count = 1;
                            }

                            const notification_response = await axios.post(USER_NOTIFICATION, notification_data);
                            console.log('notification_response', notification_response);
                            if (notification_response.status === 200) {

                              var notifypostdata = {};
                              var notification_id = '';
                              const notifydocRef = firebaseConfig.firestore().collection('notifications').doc()
                              console.log('datanotifyyyy', notifydocRef);
                              notification_id = notifydocRef.id;

                              notifypostdata[notification_id] = {

                                time: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
                                type: "POST_CONTENT",
                                user_id: uid,
                                status: 'unread',
                                flag: true,

                              }
                              firebaseConfig.firestore().collection('notifications/').doc(sub_id).set(notifypostdata, { merge: true }).then(function () {
                                firebaseConfig.firestore().collection('users/').doc(sub_id).update({
                                  'Unread_Notification': Unread_Notification_Count,
                                }).then(function (docres) {

                                }).catch(function (error) {
                                  ERROR(error.message);

                                });
                              }).catch(function (error) {
                                console.log(error.message);
                              })

                            }
                          }
                        }
                      }

                    }
                  }
                }
              })
            }

            i = i + 1;
            return true;
          });
        }
      }
    })
  } catch (e) {
    console.log(e)
    return false;
  }
}


export const StoreMediaShareCount = (data, history) => async (dispatch) => {
  try {
    if (data.shareBy !== undefined) {
     
      dispatch({ type: POST_MEDIA_SHARE_COUNT_REQUEST, payload: true });
      var mediaSharePostData = {};
      var UpdatemediaSharePostData ={};
      var share_by = data.shareBy;

      if(data.type === "Watsapp"){
        mediaSharePostData[data.mediaId] = {
          mediaId:data.mediaId,
          time: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
          watsapp_Count: 1,
          watsapp_User: [share_by],
          
        }
      }

      if(data.type === "Email"){
        mediaSharePostData[data.mediaId] = {
          mediaId:data.mediaId,
          time: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
          email_Count: 1,
          email_User: [share_by],
          
  
        }
      }

      if(data.type === "Facebook"){
        mediaSharePostData[data.mediaId] = {
          mediaId:data.mediaId,
          time: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
          facebook_Count: 1,
          facebook_User: [share_by],
          
  
        }
      }
      const userdata = firebaseConfig.firestore().collection('media_share_history').doc(data.user_id)
        userdata.get().then(async(doc) => {
          if (!doc.exists) {
            firebaseConfig.firestore().collection('media_share_history/').doc(data.user_id).set(mediaSharePostData, { merge: true })
              .then(function () {
                dispatch({ type: ADD_MEDIA_SHARE_COUNT_SUCCESS, payload: true });
               
              }).catch(function (error) {
                console.log(error.message);
              })
         
          }else{
            console.log('docdata-----',doc.data());
            var sharedata = doc.data();
            var media_id = data.mediaId;

            console.log('checkout',sharedata[media_id]);
            if(sharedata[media_id] !== undefined){

              if(data.type === "Watsapp"){

                var WPshareUserId =[];
                var watsappCount = 0;
                if(sharedata[media_id]['watsapp_User'] !== undefined){
                  WPshareUserId = sharedata[media_id]['watsapp_User'];
                }
                if(sharedata[media_id]['watsapp_Count'] !== undefined){
                  watsappCount = sharedata[media_id]?.['watsapp_Count'];
                }
               
                if(!WPshareUserId.includes(share_by)){
                  WPshareUserId.push(share_by);
                  
                  
                  UpdatemediaSharePostData[media_id] = {
                   
                    time: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
                    watsapp_Count: watsappCount+1,
                    watsapp_User: WPshareUserId,
                    
                  }
                 
                  firebaseConfig.firestore().collection('media_share_history/').doc(data.user_id).set(UpdatemediaSharePostData, { merge: true })
                  .then(function () {
                    dispatch({ type: ADD_MEDIA_SHARE_COUNT_SUCCESS, payload: true });
               
                    }).catch(function (error) {
                      console.log('kkk',error.message);
                    })
                 
                }
              }

              if(data.type === "Facebook"){

                var FBshareUserId =[];
                var fbCount = 0;
                if(sharedata[media_id]['facebook_User'] !== undefined){
                  FBshareUserId = sharedata[media_id]['facebook_User'];
                }
                if(sharedata[media_id]['facebook_Count'] !== undefined){
                  fbCount = sharedata[media_id]?.['facebook_Count'];
                }
               
                if(!FBshareUserId.includes(share_by)){
                  FBshareUserId.push(share_by);
                  
                  
                  UpdatemediaSharePostData[media_id] = {
                   
                    time: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
                    facebook_Count: fbCount+1,
                    facebook_User: FBshareUserId,
                    
                  }
                 
                  firebaseConfig.firestore().collection('media_share_history/').doc(data.user_id).set(UpdatemediaSharePostData, { merge: true })
                  .then(function () {
                    dispatch({ type: ADD_MEDIA_SHARE_COUNT_SUCCESS, payload: true });
               
                    }).catch(function (error) {
                      console.log('kkk',error.message);
                    })
                 
                }
              }

              if(data.type === "Email"){
                var EmailshareUserId =[];
                var emailCount = 0;
                if(sharedata[media_id]['email_User'] !== undefined){
                  EmailshareUserId = sharedata[media_id]['email_User'];
                }
                if(sharedata[media_id]['email_Count'] !== undefined){
                  emailCount = sharedata[media_id]?.['email_Count'];
                }
                if(!EmailshareUserId.includes(share_by)){
                  EmailshareUserId.push(share_by);
               
                 
                  UpdatemediaSharePostData[media_id] = {
                   
                    time: moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
                    email_Count: emailCount+1,
                    email_User: EmailshareUserId,
                    
                  }
                 
                  firebaseConfig.firestore().collection('media_share_history/').doc(data.user_id).set(UpdatemediaSharePostData, { merge: true })
                  .then(function () {
                    dispatch({ type: ADD_MEDIA_SHARE_COUNT_SUCCESS, payload: true });
               
                    }).catch(function (error) {
                      console.log('kkk',error.message);
                    })
                }
              }
            }else{
              firebaseConfig.firestore().collection('media_share_history/').doc(data.user_id).set(mediaSharePostData, { merge: true })
              .then(function () {
                dispatch({ type: ADD_MEDIA_SHARE_COUNT_SUCCESS, payload: true });
              }).catch(function (error) {
                console.log(error.message);
              })
            }

          }
        }).catch(function (error){
          console.log('errr',error.message);
        })

    }
    else {
      dispatch({ type: ADD_MEDIA_SHARE_COUNT_FAILURE, payload: 'invalid file' });
      ERROR('invalid file');
    }

  } catch (error) {
    dispatch({ type: ADD_MEDIA_SHARE_COUNT_FAILURE, payload: error.message });
    ERROR(error.message);
    // throw error;
  }
};





