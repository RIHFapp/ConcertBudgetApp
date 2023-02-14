
import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
//
import firebase from "../firebase";



const Homepage = ({name}) => {
  const [userListName, setUserListName] = useState('')
  const [userBudget, setBudgetInput] = useState('')
  const handleListName = (event) => {
    setUserListName(event.target.value);
  }
  const handleBudget= (event) => {
    setBudgetInput(event.target.value);
    console.log(userBudget);
  }

  const handleSubmit = (event) => {
    //get the info from userinput STATE
    event.preventDefault();
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const list ={userListName:userListName, userBudget:userBudget}
    push(dbRef,list);
    setUserListName('');
    setBudgetInput('');
  }
  
  
    return(
      <div className="homepage">
        <div className="featured">
          <h1>Budget vs Concert</h1>
          <div className="featureImage">
          <img src="https://placedog.net/500" alt=""/>
          </div>
        </div>
      <div className="inputSection">
        <h2>Welcome! lets Start planning your conecert list</h2>
        <form action="submit">
          {/* name of the list input */}
          <label htmlFor="newName"></label>
          <input 
          onChange={handleListName} type="text" id="newName" value={userListName} placeholder="name of your list" />
          {/* user's budget input */}
          <label htmlFor="newBudget"></label>
          <input 
          onChange={handleBudget} type="text" id="newBudget" value={userBudget} placeholder="your budget" />
          <button onClick={handleSubmit} disabled={!userListName}>Add List</button>
        </form>
      </div>
      <div className="suggested">
        <h2>discover!</h2>
        <div className="concertImage">
          <div className="smallImage">
            <img src="https://placedog.net/500" alt=""/>
          </div>
          <div className="smallImage">
            <img src="https://placedog.net/500" alt=""/>
          </div>
          <div className="smallImage">
            <img src="https://placedog.net/500" alt=""/>
          </div>
          <div className="smallImage">
            <img src="https://placedog.net/500" alt=""/>
          </div>
        </div>
      </div>
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