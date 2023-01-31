import React, { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import {db} from '../../firebase';
import StatusBoard from './StatusBoard';

type appStates={
    name:string,
    loggedIn:boolean,
    userId:string
}

type prop ={
    state:appStates,
    setState:React.Dispatch<React.SetStateAction<appStates>>
}

const Board = (props:prop) => {

    const [status, setStatus] = useState<string[]>([]);

    const logout = () =>{
        props.setState({
            loggedIn:false,
            name:"",
            userId:""
        });
    }

    const onDragStart = (event:React.DragEvent<HTMLDivElement>, taskId:string) => {
        console.log('dragstart on div: ', taskId);
        event.dataTransfer.setData("taskId", taskId);
	}
	const onDragOver = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
	}

	const onDrop = async (event:React.DragEvent<HTMLDivElement>, cat:string) => {
        let taskId = event.dataTransfer.getData("taskId");

        await updateDoc(doc(db, "tasks", taskId), {
            status: cat
        });
	}

    useEffect(() => {
        const q = query(collection(db, 'columns'))
        onSnapshot(q, (querySnapshot) => {
            setStatus(querySnapshot.docs.map(doc => doc.data().status))
        })
    },[])

    return (
        <div className="board h-screen w-screen bg-[#F4F4F6] flex flex-col">
            <div className="header bg-[#1E1E20] text-white p-3 flex">
                <div className="header-content grow text-left">
                    {props.state.name}'s Board
                </div>
                <div className="header-action">
                    <button className="logout" onClick={()=>logout()}><FiLogOut className='text-white'/></button>
                    {/* <button className="logout" onClick={()=>logout()}><FcAddColumn className='text-white'/></button> */}
                </div>
            </div>
            <div className="content grow flex justify-around items-start min-w-screen p-3">
            {status.map((status) => (
                <div onDragOver={(event)=>onDragOver(event)} onDrop={(event)=>{onDrop(event, status)}}>
                    <StatusBoard
                        status={status}
                        userId={props.state.userId}
                        name={props.state.name}
                        // onDragOver = {onDragOver}
                        onDragStart = {onDragStart}
                        // onDrop = {onDrop}
                    />
                </div>
            ))}
            </div>
        </div>
    )
}

export default Board