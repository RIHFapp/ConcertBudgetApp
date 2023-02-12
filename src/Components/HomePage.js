import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import firebase from "../firebase";

const Homepage = ({name}) => {
  const [userListName, setUserListName] = useState('')
  const handleInput = (event) => {
    setUserListName(event.target.value);
  }
  const handleSubmit = (event) => {
    //get the info from userinput STATE
    event.preventDefault();
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, userListName);
    setUserListName('');  
  }
  
  
    return(
      <div>
        <h1>testing</h1>
      <form action="submit">
        <label htmlFor="newName">Name of your list</label>
        <input 
        onChange={handleInput}
        type="text" 
        id="newName" 
        value={userListName}  
        />
        <button onClick={handleSubmit}>Add List</button>
      </form>
      {/* <ul>
        {name.map ( (name) => {
          return (
            <li key={name.key}>
              <p>{name.name}</p>
              <button >
              remove!
              </button>
            </li>
          )

        })}
      </ul> */}
      </div>
    )
    
}

export default Homepage;