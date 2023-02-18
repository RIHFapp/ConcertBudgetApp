import firebase from "../firebase";
import {ref, getDatabase, onValue} from "firebase/database"; 
import { useState, useEffect } from "react";

const ListOfTheLists = () => {

   const [lists, setLists] = useState([]);


   useEffect( () => {

 const database = getDatabase(firebase);
   const dbRef = ref(database);
   
   onValue(dbRef, (response) => {
      const newState = [];
      const listsData = response.val();
      for (let key in listsData) {
         const newEntry = {key: key, data: []};
         const newEntryData = {...listsData[key]};
         for (let newEntryKey in newEntryData) {
            if (newEntryKey !== "key") {
               newEntry.data.push(newEntryData[newEntryKey]);
            }
         }

         newState.push(newEntry);
         // console.log(newState)
      }
      console.log("newstate")
      console.log(newState)
      setLists(newState)

   })



   }, [])
  
   
   


   
      return (
         <>
            <div className="wrapper listOfTheListsContainer">
               <h2> List of created list</h2> 
               <ul> {
                  
                  lists.map((list ,index) => {
                     return (
                        

                        <li key={list.key}>
                           <p>{list.data[0].listname}</p>
                        </li>
                     )
                  })
                  }
                  <div className="listContainer">
                     <h3>First Web Developers' paycheck concert list</h3>git 
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


     