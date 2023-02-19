import firebase from "../firebase";
import {ref, getDatabase, onValue} from "firebase/database"; 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListOfTheLists = (props) => {

   const [lists, setLists] = useState([]);
   const [concertSum, setConcertSum] = useState([])
   const [concertCount, setConcertCount ] = useState([]);


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
            <div className="wrapper listOfTheListsContainer">
               <h2> List of created list</h2> 
               <ul> {
                  lists.map((list, key) => {
                     const { listname, userBudget, shareKey, editKey, budgetConcertContent} = list;
                     //filter price under 300
                     const priceUnder500 = budgetConcertContent
                     .filter(concert => concert.maxPrice < 500)
                     .map(concert => ({ name: concert.name, maxPrice: concert.maxPrice }));

                     const priceUnder1000 = budgetConcertContent
                     .filter(concert => concert.maxPrice > 300 && concert.maxPrice < 1000)
                     .map(concert => ({ name: concert.name, maxPrice: concert.maxPrice }));
                     console.log(priceUnder500);

                     
                     return (
                        <li key={key}>
                           <p>Name of the list:{listname}</p>
                           <p>Budget:{userBudget}</p>
                           <p></p>
                           <p>Total price of the concerts:{concertSum[key]} CAD</p>
                           <p>Total concerts:{concertCount[key]}</p>
                           <p>Tickets under $500: {priceUnder500.map(concert => `${concert.name.substr(0, 10)}... ($${concert.maxPrice})`).join(', ')}</p>
                           <p>Tickets $300-$1000 : {priceUnder1000.map(concert => `${concert.name.substr(0, 10)}... ($${concert.maxPrice})`).join(', ')}</p>
                           <Link to={`/viewOnlyList/:${shareKey}`}>
                              <button>View the List</button>
                           </Link>

                           <Link to={`/listWithKeys/:${editKey}`}>
                              <button>Edit the List(with ID)</button>
                           </Link>
                        </li>
                     )
                  })
                  }               
               </ul>
                  
            </div>
            <Link to={`/listOfLists`}>
            <button id="LOLButton">back</button>
            </Link>
         </>
   )

}

export default ListOfTheLists;