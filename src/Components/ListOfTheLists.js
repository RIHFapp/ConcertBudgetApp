import firebase from "../firebase";
import {ref, getDatabase, onValue} from "firebase/database"; 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const ListOfTheLists = (props) => {

   const [lists, setLists] = useState([]);
   const [concertSum, setConcertSum] = useState([])
   const [concertCount, setConcertCount ] = useState([]);

   const [pageLoad, setPageLoad] = useState(true);

   // Page Loads on Component Mounts 
  useEffect(() => {
    const loadPage = async() => {
      await new Promise ((event) => {
        console.log(event);
        setTimeout(()=> {setPageLoad(false)}, 2000); 
      });
    }
    setTimeout(()=> {
      loadPage();
      setPageLoad(true);
    }, 2000);
  }, [])

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

      console.log(newState)

      //getting total cost amount for each budget
      let totalListPrice = 0;
      const maxPriceArray = [];

      for (let i = 0; i  < newState.length; i++) {
         for (let a = 0; a < newState[i].budgetConcertContent.length; a++){

            totalListPrice = newState[i].budgetConcertContent[a].maxPrice + totalListPrice
            totalListPrice = totalListPrice * 100;
            totalListPrice = Math.round(totalListPrice);
            totalListPrice = totalListPrice/100;
            totalListPrice.toFixed(2);

         }
         maxPriceArray.push(totalListPrice);
      }
      setConcertSum(maxPriceArray);

      // getting number of concerts for each budget
      let totalNumberOfConcerts = 0;
      const numberOfConcertsArray = [];

      for (let i = 0; i < newState.length; i++) {
         totalNumberOfConcerts = newState[i].budgetConcertContent.length;
         numberOfConcertsArray.push(totalNumberOfConcerts);
      }

      setConcertCount(numberOfConcertsArray);

   })

   }, [])

      return (
         <>
         {pageLoad ? <Loading /> : (
            <>
            <div className="wrapper listOfTheListsContainer">
               <h2> List of created list</h2> 
               <ul> {
                  lists.map((list, key) => {
                     

                     return (
                        <li key={key}>
                           <p>Name of the list:{list.listname}</p>
                           <p>Budget:{list.userBudget}</p>
                           <p></p>
                           <p>Total price of the concerts:{concertSum[key]} CAD</p>
                           <p>Total concerts:{concertCount[key]}</p>
                           <Link to={`/viewOnlyList/:${list.shareKey}`}>
                              <button>View the List</button>
                           </Link>

                           <Link to={`/listWithKeys/:${list.editKey}`}>
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
               )}
         </>
   )

}

export default ListOfTheLists;