import Card from './Card.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, getDocs, collection, query } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Popup } from './Popup.jsx';
import { POSSIBLE_ROLES } from 'firebase/ai';
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
function compareStars(a, b) {
    if (a.stars < b.stars) {
        return 1;
    }
    if (a.stars > b.stars) {
        return -1;
    }
    return 0;
}

function compareDuration(a, b) {


    const [min1, sec1] = a.duration.split(':').map(Number);
    let duration1 = min1 * 60 + sec1;
    const [min2, sec2] = b.duration.split(':').map(Number);
    let duration2 = min2 * 60 + sec2;
    console.log(duration1 + " " + duration2)
    if (duration1 < duration2) {
        return 1;
    }
    if (duration1 > duration2) {
        return -1;
    }
    return 0;
}

function compareDifficulty(a, b) {
    if (parseInt(a.difficulty) < parseInt(b.difficulty)) {
        
        return 1;
        
        
    }
    if (parseInt(a.difficulty) > parseInt(b.difficulty)) {

        return -1;
        
    }
    return 0;
}

function Cards() {
    const [sort, setSort] = useState("stars");
    const [order, setOrder] = useState("descending");
    const [data, setData] = useState(querySnapshot.docs.map((doc) => doc.data()));
    const [popup, setPopup] = useState();
    const [popupData, setPopupData] = useState(data[0]);

    
    const openPopup = (tData) => {
        setPopup(true);
        setPopupData(tData);
    }

    const closePopup = () => {
        setPopup(false);
    }

    

    const handleClick = (button) => {
        if (button == 'difficulty') {
            if (sort === 'difficulty') {
                setOrder(order === 'ascending' ? 'descending' : 'ascending');
                setData([...data].reverse());
            } else {
                setData([...data].sort(compareDifficulty));
                setOrder('descending');
                setSort('difficulty');
            }
        } else if (button == 'stars') {

            if (sort === 'stars') {
                setOrder(order === 'ascending' ? 'descending' : 'ascending');
                setData([...data].reverse());
            } else {
                setData([...data].sort(compareStars));
                setOrder('descending');
                setSort('stars');
            }
        } else if (button == 'duration') {
            if (sort === 'duration') {
                setOrder(order === 'ascending' ? 'descending' : 'ascending');
                setData([...data].reverse());
            } else {
                setData([...data].sort(compareDuration));
                setOrder('descending');
                setSort('duration');
            }

        }
    }

    useEffect(() => {
        setData([...data].sort(compareStars));
        setOrder('descending');
        setSort('stars');
    }, []);

    return (
        <div className='relative w-full h-full flex justify-center'>
            {popup && <div className='left-0 absolute h-full w-full z-50 bg-black opacity-50 '></div>}
            {popup ? <Popup closePopup={closePopup} data={popupData} /> : ''}
            <div className='px-10 h-7/10 min-h-[90vh]  max-w-300 relative'>


                

                <div className='w-full items-center xl:py-5 py-3 flex flex-row justify-around'>
                    <div className=''>
                        <p className='text-black xl:text-2xl text-lg relative'>
                            {data.length + " results found"}
                        </p>
                    </div>
                    <div className=' flex ' >
                        <div onClick={() => handleClick('difficulty')} className={'mx-3 xl:w-40 w-30 xl:h-10 h-8 border-2 rounded-full border-black flex items-center justify-center cursor-pointer text-black xl:text-sm text-xs ' + (sort === 'difficulty' ? 'bg-blue-200' : 'bg-white')}>
                            {'difficulty ' + (sort == 'difficulty' ? (order == 'ascending' ? '↓' : '↑') : '-')}
                        </div>
                        <div onClick={() => handleClick('duration')} className={'mx-3 xl:w-40 w-30 xl:h-10 h-8 border-2 rounded-full border-black flex items-center justify-center cursor-pointer text-black xl:text-sm text-xs ' + (sort === 'duration' ? 'bg-blue-200' : 'bg-white')}>
                            {'duration ' + (sort == 'duration' ? (order == 'ascending' ? '↓' : '↑') : '-')}
                        </div>
                        <div onClick={() => handleClick('stars')} className={'mx-3 xl:w-40 w-30 xl:h-10 h-8 border-2 rounded-full border-black flex items-center justify-center cursor-pointer text-black xl:text-sm text-xs ' + (sort === 'stars' ? 'bg-blue-200' : 'bg-white')}>
                            {'stars ' + (sort == 'stars' ? (order == 'ascending' ? '↓' : '↑') : '-')}
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 h-full">

                    {data.map((solo) => (<Card openPopup={openPopup} db={db} key={solo.name} data={solo} />))}


                </div>
            </div>
        </div>
    )
}


export default Cards