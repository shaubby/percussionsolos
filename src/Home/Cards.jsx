import Card from './Card.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, getDocs, collection, query} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKuHm4UFshf0a6InTRcaoeHrHqUU9o9sA",
    authDomain: "percussion-solos-65cd7.firebaseapp.com",
    projectId: "percussion-solos-65cd7",
    storageBucket: "percussion-solos-65cd7.firebasestorage.app",
    messagingSenderId: "704650242040",
    appId: "1:704650242040:web:18a50b4bd0fd27e520180d",
    measurementId: "G-YZLRGQB487"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const solosRef = collection(db, "solos");
const solosQuery = query(solosRef);
const querySnapshot = await getDocs(solosQuery);



// if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
// } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
// }
// querySnapshot.forEach((doc) => {
//     console.log(doc.data().description);
// })
function Cards() {
    let data = [];
    querySnapshot.forEach((doc) => {
        if(doc.data().name != null) {
            data.push(doc.data());
        }
    });
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            
            {data.map((solo) => (<Card key={solo.name} data={solo} />))}
            
        </div>
    )
}


export default Cards