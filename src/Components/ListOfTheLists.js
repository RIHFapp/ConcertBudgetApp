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
                     const { listname, userBudget, shareKey, editKey ,ListCreated} = list;
                     //budgetConcertContent
                     //filter price under 300
                     // function filterConcertsByPrice(concerts, minPrice, maxPrice) {
                     //    return concerts.filter(concert => concert.maxPrice >= minPrice && concert.maxPrice <= maxPrice)
                     //                   .map(concert => ({ name: concert.name, maxPrice: concert.maxPrice }));
                     //  }
                      
                     //  const priceUnder500 = filterConcertsByPrice(budgetConcertContent, 0, 500);
                     //  const priceUnder1000 = filterConcertsByPrice(budgetConcertContent, 300, 1000);
                      const date = new Date(ListCreated)
                      const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const formattedDateTime = `${year}-${month}-${day}`;
                     return (
                        <li key={key} className={`listItem${key % 3 + 1}`}>
                           <div className="fairBaseList">
                           <p>List: {listname}</p>
                           <p>Budget: {userBudget}</p>
                           <p></p>
                           <p>Total Cost: {concertSum[key]} CAD</p>
                           <p>Total concerts: {concertCount[key]}</p>
                           <p>Created on: {formattedDateTime}</p>
                           </div>
                           <div className="listButtons">
                           <Link to={`/viewOnlyList/:${shareKey}`}>
                              <button>View List</button>
                           </Link>

                           <Link to={`/listWithKeys/:${editKey}`}>
                              <button>Edit List<span>(with ID)</span></button>
                           </Link>
                           </div>
                           {/* <p>Tickets under $500: {priceUnder500.map(concert => `${concert.name.substr(0, 10)}... ($${concert.maxPrice})`).join(', ')}</p>
                           <p>Tickets $300-$1000 : {priceUnder1000.map(concert => `${concert.name.substr(0, 10)}... ($${concert.maxPrice})`).join(', ')}</p> */}
                           
                           
                        </li>
                     )
                  })
                  }               
               </ul>
                  
            </div>
            <Link to={`/searchPage`}>
            <button id="LOLButton">back</button>
            </Link>
         </>
   )

}

export default ListOfTheLists;