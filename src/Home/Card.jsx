import { doc, updateDoc } from "firebase/firestore";
import { useState } from 'react';

function getColor(difficulty) {
    if (difficulty <= 3) {
        return "bg-green-300";
    } else if (difficulty <= 7) {
        return "bg-yellow-200";
    } else {
        return "bg-red-300" ;
    }
}
function getTimeColor(time) {
    var minutes = parseInt(time.split(":")[0]);
    if (minutes <=3 ) {
        return "bg-green-300";
    } else if (minutes <= 6) {
        return "bg-yellow-200";
    } else {
        return "bg-red-300";
    }

}
function Card(props) {
    

    const [starred, setStarred] = useState(false);
    const [stars, setStars] = useState(props.data.stars);

    const handleClick = async () => {
        if (!starred) {
            setStarred(true);
            setStars(props.data.stars + 1);
            await updateDoc(docRef, {
                stars: props.data.stars + 1,
            });
        } else  {
            setStarred(false);
            setStars(props.data.stars);
            await updateDoc(docRef, {
                stars: props.data.stars,
            });
        }
        
    }

    const docRef = doc(props.db, "solos", props.data.name);

    return (
        <div className="w-full h-80 rounded-lg shadow-lg border-3 border-black flex flex-col cursor-pointer" onClick={() => {props.openPopup(props.data)}}>
            <div className="h-3/4 p-3 video-container">
            <iframe className="rounded-lg h-40 w-fit" src={'https://www.youtube.com/embed/' + props.data.embed} />
            </div>
            <div className="bg-black min-h-1/4 h-auto flex flex-col p-3 ">
                <div className="flex-1">
                <p className="text-white text- font-bold mb-2 ">{props.data.name  + " - " + props.data.composer}</p>
                </div>
                <div className="flex flex-row flex-1 gap-2 select-none mb-2">
                    <div className={"text-black w-full rounded-md text-center " + (getColor(props.data.difficulty))} >{props.data.difficulty + "/10"}</div>
                    <div className={"text-black w-full rounded-md text-center cursor-pointer "  + (starred ? "bg-green-300" : "bg-white")} onClick={(event) => {event.stopPropagation(); handleClick()}}>{"★: " + stars}</div>
                    <div className={"text-black w-full rounded-md text-center " + getTimeColor(props.data.duration) } >{props.data.duration}</div>
                </div>
            </div>
            
        </div>
    )
}

export default Card