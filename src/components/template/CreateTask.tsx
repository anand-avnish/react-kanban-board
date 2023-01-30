import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActionMeta, default as ReactSelect, MultiValue } from "react-select";
import { db } from '../../firebase';
// import { ValueType } from "react-select/src/types";
import Option from "./Option"

type prop ={
    add:boolean,
    setAdd:React.Dispatch<React.SetStateAction<boolean>>,
    status:string
}

type states = {
    optionSelected:MultiValue<member>,
    title:string,
    desc:string
}

type member = {
    readonly label:string,
    readonly value:string
}

const memberOptions:readonly member[] = [
    {value:"Avnish", label:"Avnish"}, 
    {value:"Atul", label:"Atul"}, 
    {value:"Aman", label:"Aman"}, 
    {value:"Kumar", label:"Kumar"}, 
    {value:"Ramesh", label:"Ramesh"},
    {value:"Gaurav", label:"Gaurav"}
]

const CreateTask = (props:prop) => {

    const [state, setState] = useState<states>({
        optionSelected:[],
        title:"",
        desc:""
    })

    const handleCancel = () => {
        props.setAdd(false);
    }

    const handleAdd = async () => {
        let membersList = state.optionSelected.map(item=>{
            return item.value
        })
        // console.log(membersList);
        const task={
            title:state.title,
            desc:state.desc,
            people:membersList,
            status:props.status
        }
        // console.log(task);
        await setDoc(doc(db, "tasks", state.title), task);
        props.setAdd(false);
    }

    const handleChange = (selected: any) => {
        setState({
            ...state,
            optionSelected: selected
        });
        // console.log(selected);
    };

    const handleValueChange = (input:string)=>(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>)=>{
        let value = e.currentTarget.value;
        setState({...state, [input]:value})
    }

    return (
        <div className="add absolute w-screen h-screen bg-black/50 top-0 left-0 flex justify-center">
            <div className="card w-1/3 h-fit bg-white rounded-lg mt-5">
                <h1 className=' text-lg font-bold p-2 mx-3 border-b border-black mb-2'>Add Task</h1>
                <div className='card-body p-3 text-left'>
                    <input className='w-full p-2 my-2 rounded-md border border-black' type="text" placeholder='Task Name' onChange={handleValueChange("title")} required/>
                    <textarea className='w-full p-2 my-2 rounded-md border border-black' rows={3} placeholder='Task Desc' onChange={handleValueChange("desc")}/>
                    {/*  onChange={handleChange('email')} */}
                    <div
                        data-content="Please select member(s)"
                    >
                        <ReactSelect
                            className="active:ring-black"
                            options={memberOptions}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{
                                Option
                            }}
                            onChange={handleChange}
                            // allowSelectAll={true}
                            value={state.optionSelected}
                        />
                    </div>
                </div>
                <div className="card-actions p-3 flex flex-row justify-center">
                    {/* <button className='bg-gray-400 py-2 px-4 text-white rounded-full' onClick={()=>login()} disabled={!state.valid}>Login</button> */}
                    <button className='bg-gray-400 py-2 px-4 text-white rounded-xl mx-2 bg-red-500' onClick={()=>handleCancel()}>Cancel</button>
                    <button className='bg-gray-400 py-2 px-4 text-white rounded-xl mx-2 bg-blue-500' onClick={()=>handleAdd()}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default CreateTask