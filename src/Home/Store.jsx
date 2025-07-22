import {useState} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc, getDocs, addDoc, collection, query, updateDoc} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBKuHm4UFshf0a6InTRcaoeHrHqUU9o9sA",
    authDomain: "percussion-solos-65cd7.firebaseapp.com",
    projectId: "percussion-solos-65cd7",
    storageBucket: "percussion-solos-65cd7.firebasestorage.app",
    messagingSenderId: "704650242040",
    appId: "1:704650242040:web:18a50b4bd0fd27e520180d",
    measurementId: "G-YZLRGQB487"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const solosRef = collection(db, "solos");
const solosQuery = query(solosRef);
const querySnapshot = await getDocs(solosQuery);
const data = querySnapshot.docs.map((doc) => doc.data());


export function Store(props) {

    const [store, setStore] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState(true);
    const [errorMessage, setErrorMessage] = useState('error');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(link.length < 8) {
            setError(true);
            setErrorMessage('Link is invalid');
        } else if (store.length < 1 || store.length > 30) {
            setError(true);
            setErrorMessage('Store is invalid');
        }
        let soloIndex = -1;
        for(var i = 0; i < data.length; i++) {
            if(data[i].name == props.data.name) {
                soloIndex=i;
            }
        }
        const docRef = doc(db, "solos", "yourDocumentId");
        let soloData = data[i];
        if(soloData.stores.indexOf(store)) {
            
        }
    }

    return(
        <div className="border-black border-3 p-2 rounded-lg mt-2">
            <p>Add Store/Change Store Link</p>
            <form>
                <div onSubmit={(event) => handleSubmit(event)} className="flex flex-row gap-4">
                    <input onChange={(e) => setStore(e.target.value)} className='border-2 border-black rounded-lg p-1 w-full' type='text' placeholder="Store Name"/>
                    <input onChange={(e) => setLink(e.target.value)} className='border-2 border-black rounded-lg p-1 w-full' type='text' placeholder="Store Link"/>
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white rounded-lg p-1 mt-2'>Submit</button>
                {error ? (<div className=' mt-2 border-2 rounded-lg w-full border-black text-center bg-red-100'>{errorMessage}</div>) : ''}
            </form>
        </div>
    )
}