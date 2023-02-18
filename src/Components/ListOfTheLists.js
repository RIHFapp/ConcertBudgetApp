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
      setLists(newState);
   })

   }, [])

      return (
         <>
            <div className="wrapper listOfTheListsContainer">
               <h2> List of created list</h2> 
               <ul> {
                  lists.map((list, key) => {
                     // console.log(list.budgetConcertContent[0].maxPrice);
                     // let totalMaxPrice = 0;
                     // for (let i = 0; i < list.budgetConcertContent.length; i++) {
                     // totalMaxPrice += list.budgetConcertContent[i].maxPrice;
                     // }
                     // const length = list.budgetConcertContent.length
                     return (
                        <li key={key}>
                           <p>Name of the list:{list.listname}</p>
                           <p>Budget:{list.userBudget}</p>
                           <p></p>
                           {/* <p>Total price of the concerts:{totalMaxPrice} CAD</p>
                           <p>Total concerts:{length}</p> */}
                           <Link to={`/viewOnlyList/:shareID`}>
                           <button>View the List</button>
                           </Link>
                           <Link to={`/listWithKeys/:editID`}>
                           <button>Edit the List(with ID)</button>
                           </Link>
                        </li>
                     )
                  })
                  }

                  
               </ul>
                  
            </div>
            <Link to={`/`}>
            <button id="LOLButton">back</button>
            </Link>
         </>
   )

}

export default ListOfTheLists;