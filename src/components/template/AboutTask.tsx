import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { RiCloseFill, RiDeleteBin2Line } from 'react-icons/ri'
import { db } from '../../firebase'

type prop = {
    taskId:string,
    taskData:{
        title:string,
        desc:string,
        people:string[]
    },
    status:string,
    view:boolean,
    setView:React.Dispatch<React.SetStateAction<boolean>>
}

const AboutTask = ({taskData,taskId, status, view, setView}:prop) => {

    const close =()=>{
        setView(!view);
    }

    const handleDelete = async () =>{
        console.log(taskId);
        
        await deleteDoc(doc(db, "tasks", taskId))
        close()
    }

    return (
        <div className="absolute w-screen h-screen bg-black/50 top-0 left-0 flex justify-center items-center">
            <div className="card w-1/2 rounded-xl p-4 bg-white flex flex-col items-start text-left">
                <div className="flex flex-row w-full">
                    <div className="text-2xl font-bold mb-2 grow">{taskData.title}</div>
                    <div className="actions text-2xl">
                        <button className="delete ml-4" onClick={()=>handleDelete()}><RiDeleteBin2Line/></button>
                        <button className="close ml-4" onClick={()=>close()}><RiCloseFill/></button>
                    </div>
                </div>
                <h3 className="text-sm mb-2">{status}</h3>
                <p className="mb-2">{taskData.desc}</p>
                <div className="flex flex-row justify-between flex-wrap">
                    {taskData.people?.map((people)=>(
                        <span className="bg-[#9B44A2] text-white text-sm p-1 rounded-md mr-2">{people}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutTask