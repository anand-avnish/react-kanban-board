import React, { useState } from 'react'
import AboutTask from '../template/AboutTask'

type prop = {
    id:string,
    data:{
        title:string,
        desc:string,
        people:string[]
    },
    status:string,
    // draggable:boolean
}

const Task = (props:prop) => {

    const [view, setView] = useState<boolean>(false);

    const handleView = () =>{
        setView(!view);
    }

    return (
        <div className='bg-white mt-2 rounded-md shadow-sm shadow-[#B2B8C4] p-2 flex flex-col cursor-pointer' onClick={()=>handleView()}>
            <div className="title font-bold text-left">
                {props.data.title}
            </div>
            <div className="desc text-xs text-left mt-1">
                {props.data.desc}
            </div>
            <div className="people-list flex justify-end">
                {props.data.people?.map((people) => (
                    <div className="people w-7 h-7 bg-[#9B44A2] rounded-full flex justify-center items-center text-white font-bold" key={people}>
                        {people[0]}
                    </div>  
                ))}
            </div>
            {view===true?<AboutTask taskId={props.id} taskData={props.data} status={props.status} view={view} setView={setView}/>:""}
        </div>
    )
}

export default Task