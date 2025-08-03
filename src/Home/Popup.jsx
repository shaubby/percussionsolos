import { Link } from "react-router";
import {Store} from './Store.jsx'
import {useState} from 'react'
function parseSteveWeiss(name, composer) {
    const nameList = name.split(' ');
    const composerList = composer.split(' ');

    let link = 'https://www.steveweissmusic.com/category/s?keyword=';
    for(var i = 0; i < nameList.length; i++) {
        link += nameList[i] + '+';
    }
    for(var i = 0; i < composerList.length; i++) {
        link += composerList[i];
        if(i != composerList.length-1) {
            link += '+';
        }
    }
    return link;
}

function parseAmazon(name, composer) {
    const nameList = name.split(' ');
    const composerList = composer.split(' ');

    let link = 'https://www.amazon.com/s?k=';
    for(var i = 0; i < nameList.length; i++) {
        link += nameList[i] + '+';
    }
    for(var i = 0; i < composerList.length; i++) {
        link += composerList[i];
        if(i != composerList.length-1) {
            link += '+';
        }
    }
    return link;
}

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

export function Popup(props) {

    const [showStore, setShowStore] = useState(false);
    return(
        <div className='absolute top-1/8 max-w-3/4 h-2/3 rounded-xl bg-white border-3 border-black z-100 text-black p-8 flex flex-row items-start'>
            <div onClick={props.closePopup} className="absolute w-10 h-10 bg-red-200 rounded-full flex justify-center items-center border-2 border-black font-bold top-[-20px] right-[-20px] select-none cursor-pointer">X</div>
            <div className="overflow-y-auto h-full w-1/2">
            <p className="font-bold text-2xl">{props.data.name + ' - ' + props.data.composer}</p>
            <iframe 
                style={{ width: "320px", height: "180px", border: "3px solid #000000" }}
                src={'https://www.youtube.com/embed/' + props.data.embed}
                className="mt-2"
                />
            </div>
            <div className="overflow-y-auto h-full ml-4 w-1/2 xl:text-xl text-sm px-2">
                {props.data.description}
                <div className="gap-5 mt-0">
                    {props.data.storeNames.map((store, i) => (
                        <div className="m-1 inline-block underline bg-black p-1 px-3 rounded-lg text-white cursor-pointer w-fit"><a target='_blank' rel="noopener noreferrer" href={props.data.storeLinks[i]} className="appearance-none">{store}</a></div>
                    ))}
                    
                    <div onClick={() => showStore ? setShowStore(false) : setShowStore(true)} className="m-2 inline-block border-2 flex items-center justify-center border-black w-fit px-3 rounded-lg cursor-pointer select-none">+</div>
                </div>
                {showStore && <Store data={props.data}/> }
                <div className="mt-2 flex flex-row gap-2">
                    <div className={"border-2 border-black text-black w-full rounded-md text-center " + (getColor(props.data.difficulty))} >
                        <div className="w-full text-white p-1 bg-black">Difficulty:</div>
                        <div className="w-full p-1">{props.data.difficulty + "/10"}</div>
                    </div>
                    <div className={"border-2 border-black text-black w-full rounded-md text-center "}>
                        <div className="w-full text-white p-1 bg-black">Stars:</div>
                        <div className="w-full p-1">{"★: " + props.data.stars}</div>
                    </div>
                    <div className={"border-2 border-black text-black w-full rounded-md text-center " + getTimeColor(props.data.duration) } >
                        <div className="w-full text-white p-1 bg-black">Duration:</div>
                        <div className="w-full p-1">{props.data.duration}</div>
                    </div>
                </div>
            </div>
            
        </div>
    );

}