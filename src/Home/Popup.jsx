import { Link } from "react-router";


export function Popup(props) {


    return(
        <div className='absolute top-1/8 left-1/10 h-2/3 rounded-xl bg-white border-3 border-black z-100 text-black p-8 flex flex-row items-start'>
            <div className="overflow-y-auto w-1/2">
            <p className="font-bold text-2xl">{props.data.name + ' - ' + props.data.composer}</p>
            </div>
            <div className="overflow-y-auto ml-4 w-1/2">
                {props.data.description}

                <div className="underline bg-black mt-2 p-1 px-2 rounded-lg text-white cursor-pointer w-fit"><a className="appearance-none">Steve Weiss</a></div>
            </div>
        </div>
    );

}