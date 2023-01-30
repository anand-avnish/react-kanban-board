import { useState } from 'react';
import './App.css';
import Login from './components/auth/Login';
import Board from './components/kanban-board/Board';

type states={
  name:string,
  loggedIn:boolean,
  userId:string
}

function App() {
  const [state, setState]= useState<states>({
    name:"",
    loggedIn:false,
    userId:""
  })

  return (
    <div className="App font-inter">
      {(state.loggedIn===true)?<Board state={state} setState={setState} />:<Login state={state} setState={setState} />}
    </div>
  );
}

export default App;
