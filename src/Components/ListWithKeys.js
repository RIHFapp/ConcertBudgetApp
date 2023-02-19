import { Link } from "react-router-dom";
import firebase from "../firebase";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { useEffect, useState } from "react";

const ListWithKeys = () => {

const keyToMyList = "-NOeqhYOho6hRXNgky2j"
const [nameOfTheList, setNameOfTheList] = useState("Your list");
const [budgetValue, setBudgetValue] = useState("0");
const [listOfConcerts, setListOfConcerts] = useState([]);
const [totalTicketPrice, setTotalTicketPrice] = useState();


//function setting the states for displaying the data from the firebase
const checkoutTheData = (name, budget, concerts)=> {
    setNameOfTheList(name);
    setBudgetValue(budget);
    setListOfConcerts(concerts);
}


const sumOfPrices = (arrayOfConcerts) => {
let totalPrice = 0
    for (let price of arrayOfConcerts) {
        totalPrice += price.maxPrice
        console.log(totalPrice)
        }
        return totalPrice
}

useEffect( () => {

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    //Please keep in mind that I'm not sure if it's gonna be get, or rather onValue!

    get(dbRef).then((snapshot) => {
        // One of the returned values is a method called ".exists()", which will return a boolean value for whether there is a returned value from our "get" function 
        if(snapshot.exists()){
        // We call `.val()` on our snapshot to get the contents of our data. The returned data will be an object that we can  iterate through later
        console.log(snapshot.val())
        const allTheLists = snapshot.val();
        const nameFromList = allTheLists[keyToMyList].listname;
        const budget = allTheLists[keyToMyList].userBudget;
        const allChosenConcerts = allTheLists[keyToMyList].budgetConcertContent;
        checkoutTheData(nameFromList, budget, allChosenConcerts);
        
        setTotalTicketPrice(sumOfPrices(allChosenConcerts))


        } else {
        console.log("No data available")
        }
    }).catch((error) => {
        console.log(error)
    }) 
}, [])  



    return(
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
                                listOfConcerts.map( (oneConcert) => {
                                    return (
                                   
                                        <li className="one" key={oneConcert.key}>
                                            <p>{oneConcert.name}</p>
                                            <p>{oneConcert.eventDate}</p>
                                            <p>{oneConcert.venueCity}</p>
                                            <p>{oneConcert.venueName}</p>
                                            <p>{oneConcert.maxPrice}</p>
                                            <button> + </button>
                                            <button> - </button>
                                            <button> Remove Ticket </button>
                                        </li>
                                    )
                                })    
                            } 
                        </ul>
                    </div>

                </div>
                <Link to={`/`}>
            <button id="LOLButton">back</button>
            </Link>
            </section>
        </>
    )
}
export default ListWithKeys;

// onValue(dbRef, (response) => {
//         const listContent = response.val();
//         console.log(listContent)
//         const newListInfo = [];
        
//         for (let key in listContent) {
//             newListInfo.push(listContent[key]);
//             console.log(newListInfo)
//            }
//            setMyEditableList(newListInfo);
//         })

   // console.log(props.passEditId);
    // console.log(props.passShareId);
    //
//editKey must be send as a props from the List of the lists
    //connecting to the firebase data
    //pulling the information about the list 
        //h2 => changing the h2 to the Budget List
        //span.budgetValue => renders the budget list value 
     //displaying the budgetConcertContent list:
        //name, date, city, location, price, 
        //additionally number of tickets
    //event handler on the Remove Tickets button 
    //useState = to use in the span.totalTicketPrice? to check
   
    //adding the CAD to the price 

//to check: can I download only one item from val (does .val accepts any query)
    //to discuss:
     //adding the number of tickets to the firebase data structure? -> in the budgetConcertContent
     //displaying the number of tickets
      //event handler on a "+" and "-" buttons => the buttons are changing the total price
        //why console.logs above?