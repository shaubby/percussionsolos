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
        return -1;
    }
    if (a.stars > b.stars) {
        return 1;
    }
    return 0;
}

function compareDuration(a, b) {
  const isValid = str => /^\d+:\d{2}$/.test(str);
  const toSeconds = str => {
    if (!isValid(str)) return 0; // or throw error
    const [min, sec] = str.split(':').map(Number);
    return min * 60 + sec;
  };
  return  toSeconds(a.length) - toSeconds(b.length);
}

function compareDifficulty(a, b) {
    if (a.difficulty < b.difficulty) {
        return -1;
    }
    if (a.difficulty > b.difficulty) {
        return 1;
    }
    return 0;
}

function Cards() {
    const [sort, setSort] = useState("stars");
    const [order, setOrder] = useState("descending");
    const [data, setData] = useState(querySnapshot.docs.map((doc) => doc.data()));



    const handleClick = (button) => {
        if(button == 'difficulty') {
            if(sort === 'difficulty') {
                setOrder(order === 'ascending' ? 'descending' : 'ascending');
                data.reverse();
            } else {
                setData(data.sort(compareDifficulty))
                setOrder('descending');
                setSort('difficulty');
            }
        } else if(button == 'stars') {
            if(sort === 'stars') {
                setOrder(order === 'ascending' ? 'descending' : 'ascending');
                data.reverse();
            } else {
                data.sort(compareStars)
                setOrder('descending');
                setSort('stars');
            }
        }  else if(button == 'duration') {
            if(sort === 'duration') {
                setOrder(order === 'ascending' ? 'descending' : 'ascending');
                data.reverse();
            } else {
                data.sort(compareDuration)
                setOrder('descending');
                setSort('duration');
            }
        }
        console.log (data);
    }
    
    return (
        <div className='px-10 h-7/10 min-h-[90vh] max-w-300'>
            <div className='w-full h-20 items-center py-5 px-10 '>
                <div className='float-left'>
                <p className='text-black text-2xl relative'>
                    {data.length  + " results found"}
                </p>
                </div>
                <div className='float-right flex ' >
                    <div onClick={() => handleClick('difficulty')} className={'mx-3 w-40 h-10 border-2 rounded-full border-black flex items-center justify-center cursor-pointer text-black text-sm ' + (sort === 'difficulty' ? 'bg-blue-200' : 'bg-white')}>
                        {'difficulty ' + (sort == 'difficulty' ? (order == 'ascending' ? '↓' : '↑') : '-' )}
                    </div>
                    <div onClick={() => handleClick('duration')} className={'mx-3 w-40 h-10 border-2 rounded-full border-black flex items-center justify-center cursor-pointer text-black text-sm ' + (sort === 'duration' ? 'bg-blue-200' : 'bg-white')}>
                        {'duration ' + (sort == 'duration' ? (order == 'ascending' ? '↓' : '↑') : '-' )}
                    </div>
                    <div onClick={() => handleClick('stars')} className={'mx-3 w-40 h-10 border-2 rounded-full border-black flex items-center justify-center cursor-pointer text-black text-sm ' + (sort === 'stars' ? 'bg-blue-200' : 'bg-white')}>
                        {'stars ' + (sort == 'stars' ? (order == 'ascending' ? '↓' : '↑') : '-' )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 h-full">
                
                {data.map((solo) => (<Card db={db} key={solo.name} data={solo} />))}

                
            </div>
        </div>
    )
}


export default Cards