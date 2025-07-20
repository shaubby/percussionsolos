import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, getDocs, collection, query, updateDoc} from "firebase/firestore";

function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

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

function Home() {

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [composer, setComposer] = useState("");
    const [youtube, setYoutube] = useState("");
    const [difficulty, setDifficulty] = useState(-1000);
    const [length, setLength] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        if(title.length==0 || composer.length==0 || youtube.length==0 || difficulty==-1000 || length.length==0) {
            setMessage("Please fill out all fields");
            setError(true);
        } else if(title.length > 60) {
            setMessage("Piece title too long");
            setError(true);
        } else if(composer.length > 60) {
            setMessage("Composer name too long");
            setError(true);
        } else if (!youtube_parser(youtube)) {
            setMessage("Invalid Youtube Link");
            setError(true);
        } else if (difficulty > 10 || difficulty < 1) {
            setMessage("Diffculty must be between 1 and 10");
            setError(true);
        } else if (difficulty % 1 != 0) {
            setMessage("Diffculty must be a whole number");
            setError(true);
        } else if ( !(/^\d+:\d{2}$/.test(length))) {
            setMessage("Length must follow the format mm:ss");
            setError(true);
        }

        //submit form

    }

    return (
        <div className='px-10 h-7/10 min-h-[90vh] max-w-250 text-black w-full relative'>
            <div className=' bg-white border-2 border-black rounded-lg p-5 mt-10 '>

                {error ? (
                    <div className='float-right relative'>
                        <div className=' p-2 text-white bg-red-900 rounded-lg'>
                            {message}
                        </div>
                        <div onClick={() => setError(false)} className='px-1 border-2 border-black absolute bg-white top-[-8px] right-[-8px] rounded-full text-xs cursor-pointer'>
                            x
                        </div>
                    </div>
                ) : ''}
                

                <p className='text-black text-xl font-bold'>
                    Add a solo to the datbase
                </p>

                <form className='grid grid-cols-2 gap-5 mt-5' onSubmit={(event) => handleSubmit(event)}>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className='border-2 border-black rounded-lg p-2' />
                    <input onChange={(e) => setComposer(e.target.value)} type="text" placeholder="Composer" className='border-2 border-black rounded-lg p-2' />
                    <input onChange={(e) => setYoutube(e.target.value)} type="text" placeholder="Youtube Link" className='border-2 border-black rounded-lg p-2' />
                    <input onChange={(e) => setDifficulty(e.target.value)} type="number" placeholder="Difficulty (1-10)" className='border-2 border-black rounded-lg p-2' />
                    <input onChange={(e) => setLength(e.target.value)} type="text" placeholder="Length (mm:ss)" className='border-2 border-black rounded-lg p-2' />
                    <button type="submit" className='bg-blue-500 text-white rounded-lg p-2'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Home
