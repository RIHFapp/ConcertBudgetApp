
//importing hooks
import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
//import motion library
import { motion } from "framer-motion";
//importing Firebase
import firebase from "../firebase";
//importplace holder images
import beyonce from "../partials/asset/placeholder-bey.webp";
import taylor from "../partials/asset/placeholder-tay.webp";
import pink from "../partials/asset/placeholder-pink.webp";
import john from "../partials/asset/placeholder-john.webp";
import sha from "../partials/asset/placeholder-sha.webp";




const Homepage = () => {

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
  
  //firebase testing
   //firebase config
  // const [name, setName] = useState('');
  // const[budget, setBudget] = useState('');
  

  // const handleRemove = (bookId) => {
  //   const database = getDatabase(firebase);
  //   const dbRef = ref(database, `${bookId}`);
  //   remove(dbRef);
  // }
  
  // useEffect( () => {
  //   const database = getDatabase(firebase);
  //   const dbRef = ref(database);
  //   onValue(dbRef, (reponse)=>{
  //     const data = reponse.val();
  //     const newName = [];
  //     for (let key in data) {
  //       newName.push(
  //         {key:key, 
  //           name: data[key]
  //         }
  //       );        
  //     }    
  //     setName(newName);    
  //   });
  
  
  // },[]); 
    return(
    <motion.div
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <section>
        <div className="featured wrapper">
          <h2> Featured concert</h2>
          <div className="featureImage">
          <img src={beyonce} alt=""/>
          </div>
        </div>
      </section>
      <section >
        <div className="wrapper inputSection">
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
      <section >
        <div className="wrapper suggested">
          <h2>discover!</h2>
          <div className="concertImage">
            <div className="smallImage">
              <img src={taylor} alt=""/>
            </div>
            <div className="smallImage">
              <img src={pink} alt=""/>
            </div>
            <div className="smallImage">
              <img src={john} alt=""/>
            </div>
            <div className="smallImage">
              <img src={sha} alt=""/>
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
      </motion.div>
    )
    
}

export default Homepage;