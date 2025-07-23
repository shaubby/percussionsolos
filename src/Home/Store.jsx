import {useState} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc, getDocs, addDoc, collection, query} from "firebase/firestore";
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
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('error');

    const handleSubmit = async (event) => {
        //event.preventDefault();
        if(link.length < 8) {
            setError(true);
            setErrorMessage('Link is invalid');
        } else if (store.length < 1 || store.length > 30) {
            setError(true);
            setErrorMessage('Store is invalid');
        } else {
            let soloIndex = -1;
            for(var i = 0; i < data.length; i++) {
                console.log(data[i]);
                if(data[i].name == props.data.name) {
                    soloIndex=i;
                }
            }
            
            let soloData = data[soloIndex];
            const docRef = doc(db, "solos", soloData.name);
            let storeCopy = soloData.storeNames;
            let linkCopy = soloData.storeLinks;
            console.log(soloData.storeNames);
            if(soloData.storeNames.indexOf(store) == -1) {
                if(soloData.storeNames[0] == "") {
                    storeCopy[0] = store;
                    linkCopy[0] = link;
                } else {
                    storeCopy.push(store);
                    linkCopy.push(link);
                }

            } else {
                linkCopy[soloData.store.indexOf(storeName)] = link;
            }
            await updateDoc(docRef, {
                storeNames: storeCopy,
                storeLinks: linkCopy,
            });
        }
    }

    return(
        <div className="border-black border-3 p-2 rounded-lg mt-2">
            <p>Add Store/Change Store Link</p>
            <form onSubmit={(event) => {event.preventDefault(); handleSubmit(event)} }>
                <div  className="flex flex-row gap-4">
                    <input onChange={(e) => setStore(e.target.value)} className='border-2 border-black rounded-lg p-1 w-full' type='text' placeholder="Store Name"/>
                    <input onChange={(e) => setLink(e.target.value)} className='border-2 border-black rounded-lg p-1 w-full' type='text' placeholder="Store Link"/>
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white rounded-lg p-1 mt-2'>Submit</button>
                {error ? (<div className=' mt-2 border-2 rounded-lg w-full border-black text-center bg-red-100'>{errorMessage}</div>) : ''}
            </form>
        </div>
    )
}