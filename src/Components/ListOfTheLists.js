import firebase from "../firebase";
import {ref, getDatabase, onValue} from "firebase/database"; 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

import { AnimatePresence, motion } from "framer-motion";

const ListOfTheLists = (props) => {

   const [lists, setLists] = useState([]);
   const [concertSum, setConcertSum] = useState([])
   const [concertCount, setConcertCount ] = useState([]);
   const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    const loadPage = async() => {
      await new Promise ((event) => {
        setTimeout(()=> {setPageLoad(false)}, 500); 
      });
    }
    setTimeout(()=> {
      loadPage();
      setPageLoad(true);
    }, 500);
  }, []);


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
         <div className="all">
            {pageLoad ? <Loading /> : 
               (
                  <>
                  <AnimatePresence>
                  <motion.section className="wrapper listOfTheListsContainer"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{duration:0.5}}
                     exit={{ opacity: 0 }}
                  >
                     <h2> List of created list</h2> 
                     
                     <ul> {
                        lists.map((list, key) => {
                           const { listname, userBudget, shareKey, editKey ,ListCreated} = list;

                           const date = new Date(ListCreated)
                           const year = date.getFullYear();
                              const month = date.getMonth() + 1;
                              const day = date.getDate();
                              const formattedDateTime = `${year}-${month}-${day}`;
                           
                              return (
                              <motion.li 

                              key={key}
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 ,
                                       borderRadius: ["5%", "75%", "10%", "50%", "25px"],
                              }}
                              exit={{ opacity: 0, y: -50 }}
                              transition={{ duration: 0.5, delay: key * 0.1 }}
                              className={`listItem${key % 3 + 1}`}
                              >
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
                                    <button>Edit List
                                       {/* <span>(with ID)</span> */}
                                       </button>
                                 </Link>
                                 </div>
                                 {/* <p>Tickets under $500: {priceUnder500.map(concert => `${concert.name.substr(0, 10)}... ($${concert.maxPrice})`).join(', ')}</p>
                                 <p>Tickets $300-$1000 : {priceUnder1000.map(concert => `${concert.name.substr(0, 10)}... ($${concert.maxPrice})`).join(', ')}</p> */}
                                 
                                 

                              
                              </motion.li>
                              )
                           })
                           }               
                        <Link to={`/searchPage`}>
                        <motion.button id="LOLButton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{duration:0.5}}
                        exit={{ opacity: 0 }}
                        >
                           back
                           </motion.button>
                        </Link>
                     </ul>
                     
                  </motion.section>
                  
                  </AnimatePresence>
                  </>
               )
            }
         </div>
      )
}
export default ListOfTheLists;