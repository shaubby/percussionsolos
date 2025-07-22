import { Link } from "react-router";
import {Store} from './Store.jsx'
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

export function Popup(props) {


    return(
        <div className='absolute top-1/8 left-1/10 h-2/3 rounded-xl bg-white border-3 border-black z-100 text-black p-8 flex flex-row items-start'>
            <div className="overflow-y-auto w-1/2">
            <p className="font-bold text-2xl">{props.data.name + ' - ' + props.data.composer}</p>
            <iframe
                style={{ width: "320px", height: "180px", border: "3px solid #000000" }}
                src={'https://www.youtube.com/embed/' + props.data.embed}
                allowFullScreen
                />
            </div>
            <div className="overflow-y-auto ml-4 w-1/2">
                {props.data.description}
                <div className="flex flex-row gap-5 mt-4">
                    <div className="underline bg-black p-1 px-3 rounded-lg text-white cursor-pointer w-fit"><a target='_blank' href={parseSteveWeiss(props.data.name, props.data.composer)} className="appearance-none">Steve Weiss</a></div>
                    <div className="underline bg-black p-1 px-3 rounded-lg text-white cursor-pointer w-fit"><a target='_blank' href={parseAmazon(props.data.name, props.data.composer)} className="appearance-none">Amazon</a></div>
                    <div className="border-2 flex items-center justify-center border-black w-fit px-3 rounded-lg cursor-pointer select-none">+</div>
                </div>
                <Store />
            </div>
            
        </div>
    );

}