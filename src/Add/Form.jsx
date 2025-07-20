import { useState, useRef } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, getDocs, addDoc, collection, query, updateDoc} from "firebase/firestore";

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
const db = getFirestore(app);

const solosRef = collection(db, "solos");
const solosQuery = query(solosRef);
const querySnapshot = await getDocs(solosQuery);
const data = querySnapshot.docs.map((doc) => doc.data());


function Home() {

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [composer, setComposer] = useState("");
    const [youtube, setYoutube] = useState("");
    const [difficulty, setDifficulty] = useState(-1000);
    const [length, setLength] = useState("");
    const [description, setDescription] = useState("");
    const form = useRef();


    const handleSubmit = async (event) => {
        event.preventDefault();
        let valid = true;

        if(title.length==0 || composer.length==0 || youtube.length==0 || difficulty==-1000 || length.length==0 || description.length==0) {
            setMessage("Please fill out all fields");
            setError(true);
            valid=false;
        } else if(title.length > 60) {
            setMessage("Piece title too long");
            setError(true);
            valid=false;
        } else if(composer.length > 60) {
            setMessage("Composer name too long");
            setError(true);
            valid=false;
        } else if (!youtube_parser(youtube)) {
            setMessage("Invalid Youtube Link");
            setError(true);
            valid=false;
        } else if (difficulty > 10 || difficulty < 1) {
            setMessage("Diffculty must be between 1 and 10");
            setError(true);
            valid=false;
        } else if (difficulty % 1 != 0) {
            setMessage("Diffculty must be a whole number");
            setError(true);
            valid=false;
        } else if ( !(/^\d+:\d{2}$/.test(length))) {
            setMessage("Length must follow the format mm:ss");
            setError(true);
            valid=false;
        }

        if(valid) {
            for(var i = 0; i < data.length; i++) {
                if(data[i].name.toLowerCase() == title.toLowerCase() && data[i].composer.toLowerCase() == composer.toLowerCase()) {
                    valid=false;
                    setMessage("Solo already in list");
                    setError(true);
                }
            }
        }
        if(valid) {
            form.current.reset();

            //submit form
            const docRef = await addDoc(collection(db, "solos"), {
                composer: composer,
                description: description,
                difficulty: difficulty,
                duration: length,
                embed: youtube_parser(youtube),
                name: title,
                stars: 0,
            });
        }
    }

    return (
        <div className='px-10 h-7/10 min-h-[90vh] max-w-250 text-black w-full relative'>
            <div className=' bg-white border-2 border-black rounded-lg p-5 mt-10 '>

                {error ? (
                    <div className='float-right relative'>
                        <div className=' p-2 text-black bg-red-100 white border-2 border-black rounded-lg'>
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

                <form ref={form} className=' mt-5' onSubmit={(event) => handleSubmit(event)}>
                    <div className='grid grid-cols-2 gap-5'>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className='border-2 border-black rounded-lg p-2' />
                        <input onChange={(e) => setComposer(e.target.value)} type="text" placeholder="Composer" className='border-2 border-black rounded-lg p-2' />
                        <input onChange={(e) => setYoutube(e.target.value)} type="text" placeholder="Youtube Link" className='border-2 border-black rounded-lg p-2' />
                        <input onChange={(e) => setDifficulty(e.target.value)} type="number" placeholder="Difficulty (1-10)" className='border-2 border-black rounded-lg p-2' />
                        <input onChange={(e) => setLength(e.target.value)} type="text" placeholder="Length (mm:ss)" className='border-2 border-black rounded-lg p-2' />
                        <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description (from Steve Weiss/other store)" className='border-2 border-black rounded-lg p-2' />
                    </div>
                    <button type="submit" className='w-full mt-5 bg-blue-500 text-white rounded-lg p-2'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Home
