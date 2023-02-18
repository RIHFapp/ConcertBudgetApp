import firebase from "../firebase";
import {ref, getDatabase, onValue} from "firebase/database"; 
import { useState, useEffect } from "react";

const ListOfTheLists = () => {

   const [lists, setLists] = useState([]);


   useEffect( () => {

 const database = getDatabase(firebase);
   const dbRef = ref(database);
   onValue(dbRef, (response) => {
      const listsData = response.val();
      const newState = [];
      for (let key in listsData) {
         newState.push(listsData[key]);
      }
      // console.log(newState.object)
      setLists(newState)

   })



   }, [])
  
   
   // const newState = [];
   
   //   // here we store the response from our query to Firebase inside of a variable called data.
   //   // .val() is a Firebase method that gets us the information we want
   //   const data = response.val();
   // //   // data is an object, so we iterate through it using a for in loop to access each book name 
   
   //   for (let key in data) {
   //     // inside the loop, we push each book name to an array we already created inside the onValue() function called newState
   //     newState.push(data[key]);
   //   }
   
   //   // then, we call setBooks in order to update our component's state using the local array newState
   //   setBooks(newState);
   // });



      return (
         <>
            <div className="wrapper listOfTheListsContainer">
               <h2> List of created list</h2> 
               <ul> {
                  lists.map((list ,index) => {
                     console.log(list)
                     return (
                        <li key={index}>
                           <p>{list.data}</p>
                        </li>
                     )
                  })
                  }

                  <div className="listContainer">
                     <h3>First Web Developers' paycheck concert list</h3>
                     <p>budget: 1000 CAD </p>
                  </div>
               </ul>
                  <div className="listContainer">
                     <h3>Second Web Developers' paycheck concert list</h3>
                     <p>budget: 1000 CAD </p>
                  </div>
            </div>
            <button id="LOLButton">back</button>
         </>
   )

}

export default ListOfTheLists;