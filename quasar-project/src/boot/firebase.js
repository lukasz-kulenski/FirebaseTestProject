import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBnxikha8InVBwIUNNhO6LiOQLDgfhGQM8",
    authDomain: "testproject-181dd.firebaseapp.com",
    projectId: "testproject-181dd",
    storageBucket: "testproject-181dd.appspot.com",
    messagingSenderId: "124944275328",
    appId: "1:124944275328:web:1f37d9653a36599ab71365"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }