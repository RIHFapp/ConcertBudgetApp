import './App.scss';
import firebase from './firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
// import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

// Componetns
// import HomePage from "./Components/HomePage"


function App() {
  //firebase config
  const [books, setBooks] = useState([]);
  // get useEffect fucntion to run side effects on component mounts
  
  // create a statful value thats bound to input
  const[userInput, setUserInput] = useState('');

  //add event listener that fires everytune there is a change in our input

  const handleInput = (event) => {
    setUserInput(event.target.value);
  }
  
  const handleSubmit = (event) => {
    //get the info from userinput STATE
    event.preventDefault();
    console.log(userInput);
    //send it off to firebase using push function
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    
    push(dbRef, userInput);

    setUserInput('');
    
  }
  
  const handleRemove = (bookId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${bookId}`);
    remove(dbRef);
  }
  
  useEffect( () => {
    // get a variable that holds our database details
    const database = getDatabase(firebase);
    // create a varible that makes a refernce to our database
    const dbRef = ref(database);
    // get database info on load or on change
    // use event listner built in firebase aka onValue
    
    onValue(dbRef, (reponse)=>{
      // use firebase's val() to prase our database info into the format we need
      const data = reponse.val();
      // set books stat to reflect database info
      const newState = [];

      for (let key in data) {
        newState.push(
          {key:key, name: data[key]}
        );
        
      }
      
      setBooks(newState);
    
    });
  
  
  },[]);
  
  
  // API call endpoints - events search, locations, 
useEffect (() => {
  axios({
    url: "https://app.ticketmaster.com/discovery/v2/events",
    params: {
      apikey: "15zZnInsCdU0ECUBEtwgFJsPOwjOlGWt",
      keyword: "beyonce",
      countryCode:"CA",
      city: "Toronto",
      classificationName:"music"
    }
  }).then((res) => {
    console.log(res.data._embedded.events);
  })
},[])


  

//return jsx
return (
  <div className="">
    <form action="submit">
      <label htmlFor="newBook">Add a book to your bookshelf</label>
      <input onChange={handleInput} type="text" id="newBook" value={userInput} />
      <button onClick={handleSubmit}>Add Book</button>
    </form>
    
    
    <ul>
      {books.map ( (book) => {
        return (
          <li key={book.key}>
            <p>{book.name}</p>
            <button onClick={() => {handleRemove(book.key)}}>
            remove!
            </button>
          </li>
        )

      })}
    </ul>
  </div>
);
}




export default App;
// API KEY: "15zZnInsCdU0ECUBEtwgFJsPOwjOlGWt"


// pseudo code - Dsktop First 

// Main Component - App.js
  // Home Page 
  // Concert Search Page 
  // Budget List Page 

// on component mount

  // all pages have icon button to go to list
  // Changing in between pages - display loading page for 2 seconds. 

  // client will see index starter page 
      // has 3 components, feature, form, collection of recommendations 

      // images interaction are stretch goals, specifically for component 1 and 3 for load up
        // Have placeholder images for the concert image containers. 

      // form component 
        // contains name and budget input sections, onSubmit -> goes to 2nd module/view


    // 2nd module/view
        // has 2 components , form and list component 

        // form component has two inputs - artist and location 
          // onSubmit generates list - that filters out with inputs 
          // If the API call does not have a return based on the input, display error page? 
          // When API call is happening - display loading page for 3 seconds. 

        // list component - shows filtered concert options with should display relevant information (e.g. Performer, dates, venue, ticket price range).
          // each list has a plus button to add to saved list
          // a button to continue on to next view/module
        // has back button


    // 3rd module/view 
        // contains summary of list, can edit list and budget
        // visual indication of under budget, at budget, over budget
        // back button
        // publish button ?????? maybe
        // budget decorator - top - color indication -> on total price and total budget


    // 4th module/view ????
        // client review ?








