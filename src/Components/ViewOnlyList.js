import firebase from "../firebase";
import { getDatabase, ref, get} from "firebase/database";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewOnlyList = () => {

//useParams for the view-only list 
const { shareID } = useParams();

let ID = shareID;
ID = ID.replace(':', '');

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

        }
        return totalPrice.toFixed(2)
}



useEffect(() => {

    const database = getDatabase(firebase);
    const dbRef = ref(database);


    get(dbRef).then((snapshot) => {

        if (snapshot.exists()) {

            const allTheLists = snapshot.val();
            const newState = [];

            for (let key in allTheLists) {
                newState.push(allTheLists[key]);
            }


            const currentList = newState.filter((event)=>{
                if (event.shareKey !== `${ID}`){
                    return null;
                } else {
                    const currentShareList = event;
                    return currentShareList;
                }
            })

            console.log(currentList)
            // setShareList(currentList);
            const myArrayFromFirebase = currentList;
            console.log(currentList);

             //specific data from firebase

        const nameFromList = myArrayFromFirebase[0].listname;
        const budget = myArrayFromFirebase[0].userBudget;
        const allChosenConcerts = myArrayFromFirebase[0].budgetConcertContent;

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
}, [ID]) 



    return(
        <>
            <section>
                <div className="wrapper">
                    <div className="detaliedList">
                        <h2>{nameOfTheList}</h2>
                        <div className="listHeading">
                            <h3>Concert <span id="budgetValue">{`${totalTicketPrice} CAD`}</span> </h3>
                            <h3>vs</h3>
                            <h3>Budget <span id="totalTicketPrice">{`${budgetValue} CAD`}</span></h3>
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
                                            <p>{`${oneConcert.maxPrice} CAD`}</p>
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
