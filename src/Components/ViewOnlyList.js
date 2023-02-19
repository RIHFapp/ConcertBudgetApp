//to do: fixing the styling after the removal of buttons
// using Link (?) for the "back" button
//pairing the shareID and the object from firebase-> check const keyToMyList

import firebase from "../firebase";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewOnlyList = () => {

//useParams for the view-only list 
const { shareID } = useParams();
console.log(shareID);

//temporary key to the firebase
const keyToMyList = "-NOeqhYOho6hRXNgky2j"

//states
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

//function summing up the prices of the tickets
const sumOfPrices = (arrayOfConcerts) => {
    let totalPrice = 0
        for (let price of arrayOfConcerts) {
        totalPrice += price.maxPrice
        console.log(totalPrice)
        }
        return totalPrice
}

//getting the data from Firebase
useEffect( () => {

    const database = getDatabase(firebase);
    const dbRef = ref(database);


    get(dbRef).then((snapshot) => {

        if(snapshot.exists()){
        // We call `.val()` on our snapshot to get the contents of our data. The returned data will be an object that we can  iterate through later
        // console.log(snapshot.val())
        
        //whole object from Firebase
        const allTheLists = snapshot.val();

        //specific data from firebase

        const nameFromList = allTheLists[keyToMyList].listname;
        const budget = allTheLists[keyToMyList].userBudget;
        const allChosenConcerts = allTheLists[keyToMyList].budgetConcertContent;
        
        //taking the data for states
        checkoutTheData(nameFromList, budget, allChosenConcerts);
        
        //taking the data for total price
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
                            <li className="listTags inView">
                                <div className="tagsInView">
                                    <p>Name</p>
                                    <p>Date</p>
                                    <p>City</p>
                                    <p>Location</p>
                                    <p>Price</p>
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
    )
}
export default ViewOnlyList;