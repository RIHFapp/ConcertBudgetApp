import { Link } from "react-router-dom";
import firebase from "../firebase";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { useEffect, useState } from "react";

const ListWithKeys = (props) => {

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


    //to discuss:
     //adding the number of tickets to the firebase data structure? -> in the budgetConcertContent
     //displaying the number of tickets
      //event handler on a "+" and "-" buttons => the buttons are changing the total price
        //why console.logs above?

const keyToMyList = "-NOaq6mPoOGyMdREbJ5E"


const [myEditableList, setMyEditableList] = useState([]);
const [nameOfTheList, setNameOfTheList] = useState()

const checkoutTheData = (name)=> {
    setNameOfTheList(name)
}


useEffect( () => {
     
const database = getDatabase(firebase);
const dbRef = ref(database);

get(dbRef).then((snapshot) => {
    // One of the returned values is a method called ".exists()", which will return a boolean value for whether there is a returned value from our "get" function 
    if(snapshot.exists()){
      // We call `.val()` on our snapshot to get the contents of our data. The returned data will be an object that we can  iterate through later
    console.log(snapshot.val())
    const allTheLists = snapshot.val();
    // for (let property in allTheLists) {
    //     console.log(allTheLists[property])
    // }


if (allTheLists.hasOwnProperty("-NOaq6mPoOGyMdREbJ5E") === true) {
    console.log(allTheLists["-NOaq6mPoOGyMdREbJ5E"].listname)
    
    const nameFromList = allTheLists["-NOaq6mPoOGyMdREbJ5E"].listname;
    checkoutTheData(nameFromList)
    console.log(allTheLists["-NOaq6mPoOGyMdREbJ5E"].userBudget)
    console.log(allTheLists["-NOaq6mPoOGyMdREbJ5E"].budgetConcertContent)
}

    //   for (let key in allTheLists) {
    //     myListToDisplay.push(allTheLists[key]);
    //     console.log(myListToDisplay)
    //   }
    }else{
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
                        <p></p>
                    
                        <h2>{nameOfTheList} haha</h2>
                        
                        <div className="listHeading">
                        <h3>Concernt <span id="budgetValue">6000</span> </h3>
                        <h3>vs</h3>
                        <h3>Budget <span id="totalTicketPrice">10</span></h3>
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
                            <li className="one">
                                <p>BEYONCÉ - RENAISSANCE WORLD TOUR</p>
                                <p>2023-09-11</p>
                                <p>Vancouver</p>
                                <p>BC Place</p>
                                <p>581</p>
                                <button> + </button>
                                <button> - </button>
                                <button> Remove Ticket </button>
                            </li>
                        
                        
                            <li className="two">
                                <p>BEYONCÉ - RENAISSANCE WORLD TOUR</p>
                                <p>2023-09-11</p>
                                <p>Vancouver</p>
                                <p>BC Place</p>
                                <p>581</p>
                                <button> + </button>
                                <button> - </button>
                                <button> Remove Ticket </button>
                            </li>
                            
                        
                            <li className="three">
                                <p>BEYONCÉ - RENAISSANCE WORLD TOUR</p>
                                <p>2023-09-11</p>
                                <p>Vancouver</p>
                                <p>BC Place</p>
                                <p>581</p>
                                <button> + </button>
                                <button> - </button>
                                <button> Remove Ticket </button>
                            </li>
                            
                        
                            <li className="one">
                                <p>BEYONCÉ - RENAISSANCE WORLD TOUR</p>
                                <p>2023-09-11</p>
                                <p>Vancouver</p>
                                <p>BC Place</p>
                                <p>581</p>
                                <button> + </button>
                                <button> - </button>
                                <button> Remove Ticket </button>
                            </li>
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