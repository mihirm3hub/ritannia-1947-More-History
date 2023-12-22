// import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
// import {getAnalytics} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js'
// import {logEvent} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js'

const firebaseConfig = {
    apiKey: 'AIzaSyC8O7amKd4nENTWc-T8-ntBihmWRuMvJXE',
    authDomain: 'britannia1947freedom.firebaseapp.com',
    projectId: 'britannia1947freedom',
    storageBucket: 'britannia1947freedom.appspot.com',
    messagingSenderId: '11438325268',
    appId: '1:11438325268:web:32210b16dc20c9f40f3101',
    measurementId: 'G-YG78G7LZXW',
}
const firebase = window.firebase.initializeApp(firebaseConfig)
// const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics()

export const gaEvent = (eventName, category) => {
    analytics.logEvent(eventName, { name: category })
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
//
// export const analytics = getAnalytics(app)
//
// export const gaEvent = (eventName, category) => {
// logEvent(analytics, eventName, {name: category})
// }
//
