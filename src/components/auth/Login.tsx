import React, { useState } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase';

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validPasswordRegex = RegExp(
    /^[A-Z0-9a-z]{8,12}$/i
);


type appStates={
    name:string,
    loggedIn:boolean,
    userId:string
}

type states = {
    email:string,
    password:string,
    emailError:string,
    passwordError:string,
    valid:boolean,
    loginError:string
}

type prop ={
    state:appStates,
    setState:React.Dispatch<React.SetStateAction<appStates>>
}

const Login = (props:prop) => {
    const [state,setState] = useState<states>({
        email:"",
        password:"",
        emailError:"",
        passwordError:"",
        valid:false,
        loginError:""
    })

    const handleChange = (input:string)=>(e:React.ChangeEvent<HTMLInputElement>)=>{
        let value = e.currentTarget.value;
        let emailError="";
        let passwordError="";
        // console.log(input);
        
        switch (input) {
            case 'email': 
                emailError = 
                    validEmailRegex.test(value)
                    ? ''
                    : 'Email is not valid!';
                break;
            case 'password': 
                passwordError = 
                    validPasswordRegex.test(value)
                    ?''
                    :'Password should be between 8 to 12 characters';
                break;
            default:
        }
        handleSubmit();
        setState({ ...state, [input]: value, emailError: emailError, passwordError: passwordError });
    }

    
    const handleSubmit = () => {
        if(state.emailError.length===0&&state.passwordError.length===0) {
            // console.info('Valid Form')
            state['valid']=true;
        }else{
            // console.error('Invalid Form')
            state['valid']=false;
        }
    }

    const login = () =>{
        const user = query(collection(db, 'users'), where("email", "==", state.email), where("password", "==", state.password))
        onSnapshot(user, (querySnapshot) => {
            if(querySnapshot.docs[0]?.data()!==undefined){
                let res = querySnapshot.docs[0].data();
                console.log(res);
                props.setState({name:res.name, loggedIn:true, userId:querySnapshot.docs[0].id})
                setState({...state, loginError:""})
            }else{
                setState({...state, loginError:"Invalid Credentials!!"})
            }
        })   
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center bg-[#F4F4F6]'>
            <div className="box h-1/2 w-1/2 bg-[#EBECF0] rounded-lg shadow-md shadow-black flex flex-col items-center justify-around">
                <div className="card-head p-2">
                    <h1 className='text-4xl p-2'>LOGIN</h1>
                </div>
                <div className='card-body p-2 w-3/4 text-left'>
                    <input className='w-full p-2 m-2 rounded-full' type="text" placeholder='Email' onChange={handleChange('email')} required/>
                    {state.emailError.length > 0 && <span className='text-red-500 w-full pl-2'>{state.emailError}</span>}
                    <input className='w-full p-2 m-2 rounded-full' type="text" placeholder='Password' onChange={handleChange('password')} required/>
                    {state.passwordError.length > 0 && <span className='text-red-500 w-full pl-2'>{state.passwordError}</span>}
                </div>
                <div className="card-actions p-3 flex flex-col">
                    <button className='bg-blue-500 py-2 px-4 text-white rounded-full' onClick={()=>login()} disabled={!state.valid}>Login</button>
                    {state.loginError.length > 0 && <span className='text-red-500 w-full'>{state.loginError}</span>}
                </div>
            </div>
        </div>
    )
}

export default Login