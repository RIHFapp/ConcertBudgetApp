
//importing hooks
import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

//importing Firebase
import firebase from "../firebase";



const Homepage = ({name}) => {

  //states (controlled input)

  const [userListName, setUserListName] = useState('')
  const [userBudget, setBudgetInput] = useState('')
  
  //event handlers 
  
  //input list name
  const handleListName = (event) => {
    setUserListName(event.target.value);
  }

  //input budget 
  const handleBudget= (event) => {
    setBudgetInput(event.target.value);
  }

  //submit handler => connecting with the firebase 

  const handleSubmit = (event) => {
    // preventing the refreshing after submit
    event.preventDefault();

    //connecting to the firebase
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    //creating the data structure
    const list ={userListName:userListName, userBudget:userBudget}
    //pushing to the firebase
    push(dbRef,list);

    //clearing the state setters (empty input field after submitting )
    setUserListName('');
    setBudgetInput('');
  }
  
    return(
    <>
      <section className="homepage">
        <div className="featured wrapper">
          <h2> Featured concert</h2>
          <div className="featureImage">
          <img src="https://placedog.net/500" alt=""/>
          </div>
        </div>
      </section>
      <section className="inputSection">
        <div className="wrapper">
          <h2>Welcome! lets Start planning your concert list</h2>
          <form action="submit">
            {/* name of the list input */}
            <label htmlFor="newName"></label>
            <input 
              onChange={handleListName} 
              type="text" 
              id="newName" 
              value={userListName} 
              placeholder="name of your list" />
            {/* user's budget input */}
            <label htmlFor="newBudget"></label>
            <input 
              onChange={handleBudget} 
              type="text" 
              id="newBudget" 
              value={userBudget} 
              placeholder="your budget" />
            <button 
              onClick={handleSubmit} 
              disabled={!userListName}>Add List</button>
          </form>
        </div>
      </section>
      <section className = "suggested">
        <div className="wrapper">
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
      {/*testing displaying firebase data - to be removed later  
      <ul>
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
      </section>
      </>
    )
    
}

export default Homepage;