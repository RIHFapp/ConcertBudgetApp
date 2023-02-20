import firebase from "../firebase";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

const ListWithKeys = () => {


const {editID} = useParams();
console.log(editID);
let ID = editID;
ID = ID.replace(':', '');


const [nameOfTheList, setNameOfTheList] = useState("Your list");
const [budgetValue, setBudgetValue] = useState("0");
const [listOfConcerts, setListOfConcerts] = useState([]);
const [totalTicketPrice, setTotalTicketPrice] = useState();


 const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    const loadPage = async() => {
      await new Promise ((event) => {
        console.log(event);
        setTimeout(()=> {setPageLoad(false)}, 1500); 
      });
    }
    setTimeout(()=> {
      loadPage();
      setPageLoad(true);
    }, 500);
  }, []);


//function setting the states for displaying the data from the firebase
// const checkoutTheData = (name, budget, concerts, rowID)=> {
//   setNameOfTheList(name);
//   setBudgetValue(budget);
//   const concertsWithKeys = concerts.map((concert) => ({
//     ...concert,
//     key: concert.editKey, // add database key as "key" property
//     rowID: rowID,
//   }));
//   console.log(listOfConcerts);
//   setListOfConcerts(concertsWithKeys);
// }
const checkoutTheData = (entry)=> {
  setNameOfTheList(entry.listname);
  setBudgetValue(entry.userBudget);
  const concertsWithKeys = Object.entries(entry.budgetConcertContent).map((concert) => ({
    ...concert[1],
    key: concert[1].editKey, // add database key as "key" property
    rowID: entry.rowID,
    backendIndex: concert[0]
  }));
  console.log(listOfConcerts);
  setListOfConcerts(concertsWithKeys);
}



//function summing up the prices of tickets
const sumOfPrices = (arrayOfConcerts) => {
let totalPrice = 0
    for (let price of arrayOfConcerts) {
        totalPrice += price.maxPrice
        console.log(totalPrice)
        }
        return totalPrice.toFixed(2)
}


useEffect( () => {

    const database = getDatabase(firebase);
    const dbRef = ref(database);


    onValue(dbRef, (response) => {
        const allTheLists = response.val();   
        // const newState = [];
        // for (let key in allTheLists) {
        //     newState.push(allTheLists[key]);
        // }

        // const currentList = newState.filter((event)=>{
        //     if (event.editKey !== `${ID}`){
        //         return null;
        //     } else {
        //         const currentEditList = event;
        //         console.log(`event is ${JSON.stringify(event)}`)
        //         return currentEditList;
        //         //check it again!
        //     }
        // })
        const currentList = [];
        for (let key in allTheLists){
            let entry = allTheLists[key];
            if (entry.editKey === `${ID}`){
                entry["rowID"] = key;
                currentList.push(entry)
            }
        }
        console.log(`HERE ${JSON.stringify(currentList[0])}`)

        // const myArrayFromFirebase = currentList;
        // const nameFromList = myArrayFromFirebase[0].listname;
        // const budget = myArrayFromFirebase[0].userBudget;
        // const allChosenConcerts = myArrayFromFirebase[0].budgetConcertContent;
        // const rowID = myArrayFromFirebase[0].rowID;
        
        // checkoutTheData(nameFromList, budget, allChosenConcerts, rowID);
        checkoutTheData(currentList[0]);

        // setTotalTicketPrice(sumOfPrices(allChosenConcerts));
        setTotalTicketPrice(sumOfPrices(Object.values(currentList[0].budgetConcertContent)));
        console.log(`AAAAA ${JSON.stringify(listOfConcerts)}`)
    })  
}, [ID])

const handleRemoveTicket = (oneConcert,index) => {
    // console.log(`key is ${key}`);
    // console.log(`ID is ${ID}`);
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${oneConcert.rowID}/budgetConcertContent/${index}`);
    // console.log(`LOOK HERE!!! ${dbRef}`);
    remove(dbRef);
}

    return(
        <>  
            {pageLoad ? <Loading /> : ( 
            <>
                <section>
                    <div className="wrapper">
                        <div className="detaliedList">
                            <h2>{nameOfTheList}</h2>
                            <div className="listHeading">
                                <h3>Concert <span id="budgetValue">{totalTicketPrice}</span> </h3>
                                <h3>vs</h3>
                                <h3>Budget <span id="totalTicketPrice">{budgetValue}</span></h3>
                            </div>
                            <ul> 
                                <li className="listTags inKeys">
                                    <div className="listConcertTags">
                                        <p>Name</p>
                                        <p>Date</p>
                                        <p>City</p>
                                        <p>Location</p>
                                        <p>Price</p>
                                    </div>
                                    <div className="listButtonTags">
                                        <p>adjusting concerts</p>
                                    </div>         
                                </li>
                                {
                                    listOfConcerts.map( (oneConcert, index) => {

                                        console.log(`oneConcert is ${JSON.stringify(oneConcert)}`)
                                        console.log(index)
                                        // const newArray = [];
                                        return (
                                            <li className="one" key={index}>
                                                <p>{oneConcert.name}</p>
                                                <p>{oneConcert.eventDate}</p>
                                                <p>{oneConcert.venueCity}</p>
                                                <p>{oneConcert.venueName}</p>
                                                <p>{`${oneConcert.maxPrice} CAD`}</p>
                                                <button> + </button>
                                                <button> - </button>
                                                <button onClick={()=> {handleRemoveTicket(oneConcert,oneConcert.backendIndex)}} > Remove Ticket </button>
                                            </li>
                                        )
                                    })    
                                } 
                            </ul>
                        </div>

                    </div>
                    <Link to={`/listOfLists`}>
                        <button id="LOLButton">back</button>
                    </Link>
                </section>
            </> 
            )}
        </>
    )
}
export default ListWithKeys;