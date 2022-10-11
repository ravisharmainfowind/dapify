importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config

// Client Server
const firebaseConfig = {
  apiKey: "AIzaSyAAMQOR6lqT1DnIXt8Z5gmUx6WiJrniuIo",
  authDomain: "dapify-c5ba4.firebaseapp.com",
  projectId: "dapify-c5ba4",
  storageBucket: "dapify-c5ba4.appspot.com",
  messagingSenderId: "824141673742",
  appId: "1:824141673742:web:e4f2b924dd6871812a535f",
};

// Local Server
// const firebaseConfig = {
//   apiKey: "AIzaSyA4qAi1iTrEFy0OzNHHZDO10PPs6MQnDG8",
//   authDomain: "pwa-app-2d6be.firebaseapp.com",
//   projectId: "pwa-app-2d6be",
//   storageBucket: "pwa-app-2d6be.appspot.com",
//   messagingSenderId: "155791405091",
//   appId: "1:155791405091:web:d371984ff3ce0ee42f4196",
// };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  window.registration.showNotification(notificationTitle,
    notificationOptions);
});


