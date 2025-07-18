
function getColor(difficulty) {
    if (difficulty <= 3) {
        return "bg-green-300";
    } else if (difficulty <= 7) {
        return "bg-yellow-300";
    } else {
        return "bg-red-300" ;
    }
}
function getTimeColor(time) {
}
function Card(props) {
    console.log("Card component loaded with data:", props.data.name);

    return (
        <div className="w-full h-80 rounded-lg shadow-lg border-3 border-black flex flex-col">
            <div className="h-3/4 p-3 video-container">
            <iframe className="rounded-lg h-40 w-fit" src={props.data.embed} />
            </div>
            <div className="bg-black min-h-1/4 h-auto flex flex-col p-3">
                <div className="flex-1">
                <p className="text-white text- font-bold">{props.data.name  + " - " + props.data.composer}</p>
                </div>
                <div className="flex flex-row flex-1 gap-2">
                    <div className={"text-black w-full rounded-md text-center " + (getColor(props.data.difficulty))} >{props.data.difficulty + "/10"}</div>
                    <div className={"text-black w-full rounded-md text-center bg-white" } >{"★: " + props.data.stars}</div>
                    <div className={"text-black w-full rounded-md text-center bg-white" } >{props.data.duration}</div>
                </div>
            </div>
            
        </div>
    )
}

export default Card