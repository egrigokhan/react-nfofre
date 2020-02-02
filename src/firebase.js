import { initializeApp } from 'firebase/app';

export const initializeReactApp = () => {
    const config = {
        apiKey: "AIzaSyB1-l7M0hUHpMAsmSb0O1lH9Xe1PzLXogk",
	    authDomain: "pregotest-f2b81.firebaseapp.com",
	    databaseURL: "https://pregotest-f2b81.firebaseio.com",
	    projectId: "pregotest-f2b81",
	    storageBucket: "pregotest-f2b81.appspot.com",
	    messagingSenderId: "472911257841",
	    appId: "1:472911257841:web:6ce1359e129777e6570950"
    };

    initializeApp(config);
}