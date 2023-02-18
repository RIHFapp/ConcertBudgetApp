import firebase from "../firebase";
import {ref, getDatabase, onValue} from "firebase/database"; 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListOfTheLists = (props) => {

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

      return (
         <>
            <div className="wrapper listOfTheListsContainer">
               <h2> List of created list</h2> 
               <ul> {
                  lists.map((list, key) => {
                     console.log(list)
                     return (
                        <li key={key}>
                           <p>Name of the list:{list.listname}</p>
                           <p>Budget:{list.userBudget}</p>
                           {/* <p>{list.budgetConcertContent}</p> */}
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
            <Link to={`/`}>
            <button id="LOLButton">back</button>
            </Link>
         </>
   )

}

export default ListOfTheLists;