// import firebase from "firebase/app";
// import "firebase/auth";
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import firebaseConfig from "../firebase";

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()
facebookProvider.addScope("instagram_basic");
facebookProvider.addScope("instagram_manage_insights");
facebookProvider.addScope("pages_show_list");
facebookProvider.addScope("pages_read_engagement");
facebookProvider.addScope("pages_read_user_content");

const getAuthenticationStatus = () => {
  return localStorage.getItem("isAuthenticated");
};

export { auth, googleProvider,facebookProvider, getAuthenticationStatus};