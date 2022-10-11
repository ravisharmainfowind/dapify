const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const axios = require("axios")
require('dotenv').config();
// const postCharge = require('./stripe')

const {postCharge,CreateAccount,AccountLink,UserAccountDetails,UserAccountLoginLink,RequestUserPayout} = require('./stripe')
var serviceAccount = require('../src/serviceAccount.json');

const admin = require("firebase-admin");
const bodyParser = require('body-parser');
app.use(bodyParser.json())
//const router = express.Router()
var fcm = require('fcm-notification');
var FCM = new fcm('../src/serviceAccount.json');

app.post('/stripe/charge', postCharge)
const InstagramapiBaseUrl = "https://graph.facebook.com/v13.0/";


app.post('/createStripeAccount', CreateAccount)

app.post('/createStripeAccountLink', AccountLink)

app.post('/getUserStripeAccountDetails', UserAccountDetails)

app.post('/getUserStripeAccountLoginLink', UserAccountLoginLink)

app.post('/requestUserPayout', RequestUserPayout)

// app.all('*', (_, res) =>
//   res.json({message: 'please make a POST request to /stripe/charge' })
// )

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dapify-c5ba4-default-rtdb.firebaseio.com",

});


app.get("/disable-user/:uid", async function (req, res) {
  if (req.params.uid) {
    admin.auth().updateUser(req.params.uid, { disabled: true }).then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      res.send(userRecord);
    })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.send('Invalid User');
  }

});


app.post("/user-push-notification", async function (req, res) {
  console.log('checkdata');
  if (req.body) {
    var Tokens = req.body.to;
    var message = {

      notification: {
        title: req.body.title,
        body: req.body.body,

      },

    };
    FCM.sendToMultipleToken(message, Tokens, function (err, response) {
      if (err) {
        console.log('err--', err);
      } else {
        console.log('response-----', response);
        res.send({ 'notificationresponse': response });
      }
    })

  } else {
    res.send('Invalid User');
  }

});

app.post("/getLongLiveAccessToken", async function (req, res) {
  console.log('instareq', req);
  if (req.body) {
  
    const client_id = process.env.APP_ID;
    const client_secret = process.env.APP_SECRET;
   
    const token = req.body.token;
  
    try {
      const resuult = await axios.get(InstagramapiBaseUrl + 'oauth/access_token?grant_type=fb_exchange_token&client_id=' +client_id + '&client_secret=' + client_secret + '&fb_exchange_token=' + token);
      res.send(resuult.data);
      console.log('notgettinglivetoken',resuult.data);
    } catch (err) {
      res.send(err)
    }

  } else {
    res.send('Invalid data');
  }

});

app.post("/getInstagramBusinessAccount", async function (req, res) {
  console.log('accreq', req);
  if (req.body) {

    const token = req.body.token;
    try {

      const resuult = await axios.get(InstagramapiBaseUrl + 'me/accounts?fields=name,id,access_token,instagram_business_account{id,username,profile_picture_url}&access_token=' + token);
      console.log('accres', resuult);
      res.send(resuult.data);
    } catch (err) {
      res.send(err)
    }

  } else {
    res.send('Invalid data');
  }

});

app.post("/getInstagramUserMediaPost", async function (req, res) {
  console.log('mediarequest', req);
  if (req.body) {

    const token = req.body.token;
    const acc_id = req.body.account_id;
    const since = req.body.since;
    const until = req.body.until;

    try {

      const resuult = await axios.get(InstagramapiBaseUrl + acc_id + '/media?fields=impressions,id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,like_count,comments_count&since=' + since + '&until=' + until + '&access_token=' + token);
      console.log('mediares', resuult);
      res.send(resuult.data);
    } catch (err) {
      res.send(err)
    }

  } else {
    res.send('Invalid data');
  }

});

app.post("/getInstaUserMediaInsights", async function (req, res) {
  console.log('mediarequest', req);
  if (req.body) {

    const token = req.body.token;
    const post_id = req.body.post_id;

    try {

      const resuult = await axios.get(InstagramapiBaseUrl + post_id + '/insights?metric=engagement,impressions,reach,saved&access_token=' + token);
      console.log('mediainsightsres', resuult);
      res.send(resuult.data);
    } catch (err) {
      res.send(err)
    }

  } else {
    res.send('Invalid data');
  }

});

app.post("/getInstaUserFollower", async function (req, res) {
  console.log('accreq', req);
  if (req.body) {
    const token = req.body.token;
    const acc_id = req.body.account_id;
    try {

      const resuult = await axios.get(InstagramapiBaseUrl+acc_id+'?fields=followers_count&access_token=' + token);
      console.log('accres', resuult);
      res.send(resuult.data);
    } catch (err) {
      res.send(err)
    }

  } else {
    res.send('Invalid data');
  }

});


app.post("/getInstaTopCityAudience", async function (req, res) {
  console.log('accreq', req);
  if (req.body) {
    const token = req.body.token;
    const acc_id = req.body.account_id;
    const period = req.body.period;
    try {

      const resuult = await axios.get(InstagramapiBaseUrl+acc_id+'/insights?metric=audience_city,audience_country,audience_gender_age&period='+period+'&access_token=' + token);
      console.log('audres', resuult);
      res.send(resuult.data);
    } catch (err) {
      res.send(err)
    }

  } else {
    res.send('Invalid data');
  }

});


app.post("/getInstaFollowerGrowth", async function (req, res) {
  console.log('accreq', req);
  if (req.body) {
    const token = req.body.token;
    const acc_id = req.body.account_id;
    const period = req.body.period;
    const since = req.body.since;
    const until = req.body.until;

    try {
     
      const resuult = await axios.get(InstagramapiBaseUrl+acc_id+'/insights?metric=follower_count&period='+period+'&since='+since+'&until='+until+'&access_token=' + token);
      console.log('followergrowth', resuult);
      res.send(resuult.data);
    } catch (err) {
      res.send(err)
    }

  } else {
    res.send('Invalid data');
  }

});


app.listen(8000, () => {
  console.log("app listening on port 8000")
})