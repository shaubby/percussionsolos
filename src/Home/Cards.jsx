import Card from './Card.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, getDocs, collection, query} from "firebase/firestore";
import { useState } from 'react';
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

let data = [];
querySnapshot.forEach((doc) => {
    if(doc.data().name != null) {
        data.push(doc.data());
    }
});

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
    const [sort, setSort] = useState("difficulty");

    
    return (
        <div className='px-10 h-7/10'>
            <div className='w-full h-20 items-center py-5 px-10 '>
                <div className='float-left'>
                <p className='text-black text-2xl relative'>
                    {data.length  + " results found"}
                </p>
                </div>
                <div className='float-right flex ' >
                    <div className='mx-3 w-30 h-10 bg-white border-2 rounded-full border-black flex items-center justify-center cursor-pointer text-black text-sm '>
                        {'difficulty' +(sort == 'difficulty' ? '' : '')}
                    </div>
                    <div className='mx-3 w-30 h-10 bg-white border-2 rounded-full border-black flex items-center justify-center cursor-pointer text-black text-sm'>
                        {'length' +(sort == 'difficulty' ? '' : '')}
                    </div>
                    <div className='mx-3 w-30 h-10 bg-white border-2 rounded-full border-black flex items-center justify-center cursor-pointer text-black text-sm'>
                        {'stars' +(sort == 'difficulty' ? '' : '')}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 h-full">
                
                {data.map((solo) => (<Card db={db} key={solo.name} data={solo} />))}
                {data.map((solo) => (<Card db={db} key={solo.name} data={solo} />))}
                {data.map((solo) => (<Card db={db} key={solo.name} data={solo} />))}
                {data.map((solo) => (<Card db={db} key={solo.name} data={solo} />))}
                {data.map((solo) => (<Card db={db} key={solo.name} data={solo} />))}
                {data.map((solo) => (<Card db={db} key={solo.name} data={solo} />))}
                {data.map((solo) => (<Card db={db} key={solo.name} data={solo} />))}
                {data.map((solo) => (<Card db={db} key={solo.name} data={solo} />))}

                
            </div>
        </div>
    )
}


export default Cards