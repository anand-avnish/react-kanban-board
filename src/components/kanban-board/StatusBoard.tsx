import React, { useEffect, useState } from 'react';
import { RiAddBoxFill } from 'react-icons/ri';
import { collection, query, where, onSnapshot} from "firebase/firestore";
import {db} from '../../firebase';
import Task from './Task';
import CreateTask from '../template/CreateTask';

type prop ={
    status: string,
    userId:string,
    name:string,
    // onDragOver:(event: Event) => void,
    // onDrop: (event: React.DragEvent<HTMLDivElement>, cat: string) => Promise<void>,
    onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: string) => void
}

type task = {
    id:string,
    data:{
        title:string,
        desc:string,
        people:string[]
    },
    // onDragStart:(event:React.DragEvent<HTMLDivElement>, taskId:string)=>void,
    // onDragOver:(event:Event)=>void,
    // onDrop:(event:React.DragEvent<HTMLDivElement>, cat:string)=>void
}

const StatusBoard = (props:prop) => {

    const [tasks, setTasks] = useState<task[]>();
    const [add, setAdd] = useState<boolean>(false);

    const handleAdd = () =>{
        setAdd(!add);
        console.log(add);
        
    }

    useEffect(() => {
        // const userRef = doc(db, "users", props.userId);
        const q = query(collection(db, 'tasks'), where("status", "==", props.status), where("people","array-contains",props.name))
        onSnapshot(q, (querySnapshot) => {
            let data =  querySnapshot.docs.map(doc => {
                let ele ={
                    id: doc.id,
                    data: {
                        title:doc.data().title,
                        desc:doc.data().desc,
                        people:doc.data().people
                    }
                }
                return ele;
            });
            setTasks(data);
        })
    },[props])

    return (
        <div className='bg-[#EBECF0] mx-2 p-4 rounded-lg border border-white flex flex-col'>
            <div className="head text-left text-lg font-bold pb-2 border-b-2 border-b-white flex justify-between">
                {props.status}
                <button onClick={()=>handleAdd()}><RiAddBoxFill className='text-2xl'/></button>
            </div>
            {tasks?.map((task) => (
                <div draggable onDragStart = {(event) => props.onDragStart(event, task.id)}>
                    <Task id={task.id} data={task.data} status={props.status} key={task.id}/>
                </div>
            ))}
            {add===true?<CreateTask add={add} setAdd={setAdd} status={props.status}/>:""}
        </div>
    )
}

export default StatusBoard