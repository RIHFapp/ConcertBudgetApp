//importing hooks
import { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../firebase";
import {ref, getDatabase, push, child, set} from "firebase/database"; 
import uuid from "uuid"

// import { motion } from "framer-motion";

const SearchPage = () => {

  // States
  const [userListName, setUserListName] = useState('');
  const [userBudget, setBudgetInput] = useState('');
  const [artist, setArtist] = useState(null);
  const [city, setCity] = useState(null);
  const [checked, setChecked ] = useState(false);
  const [apiRes, setApiRes] = useState([]);
  // name, eventDate, venueCity, venueName, maxPrice, key)
  // const [name, setName] = useState("");
  // const [eventDate, setEventDate] = useState("");
  // const [venueCity, setVenueCity] = useState(""); 
  // const [venueName, setVenueName] = useState("");
  // const [maxPrice, setMaxPrice] = useState(0);
  // const [key, setKey] = useState("");
  const [addedList, setAddedList] = useState([]);




  //submit handler => connecting with the firebase 
  const handleSubmitUser = (event) => {
    // preventing the refreshing after submit
    event.preventDefault();

    setUserListName(event.target.form[0].value);
    setBudgetInput(event.target.form[1].value);
    // //connecting to the firebase
    // const database = getDatabase(firebase);
    // // const dbRef = ref(database);

    // //creating the data structure
    // const listUser = `${userListName}`;
    // const listBudget = { userBudget: `${userBudget}` };
    // const parentRef = ref(database, `/${listUser}`)
    // // {userListName:userListName, userBudget:userBudget}
    // //pushing to the firebase
    // set(parentRef, listBudget);

    //clearing the state setters (empty input field after submitting )
    // setUserListName('');
    // setBudgetInput('');
  }

  // api submit button
  const handleSubmitConcert = (e) => {
    e.preventDefault();
    setArtist(e.target.form[0].value);
    setCity(e.target.form[1].value);
    setChecked(e.target.form[3].checked);

  }
  // On Search Page mount - trigger an API call based on input content availability.
  useEffect (() => {
    if (artist === null && city === null) {
    } else {
      axios({
        url: "https://app.ticketmaster.com/discovery/v2/events",
        params: {
          apikey: "15zZnInsCdU0ECUBEtwgFJsPOwjOlGWt",
          keyword: `${artist}`,
          countryCode:"CA",
          city: `${city}`,
          classificationName:"music"
        }
      }).then((res) => {
        const list = res.data._embedded.events.filter((event) => {
          if (checked === false) {
            return event;
          } else if (checked === true && event.priceRanges !== undefined) {
            return event;
          }
        
        })
        setApiRes(list); 
      })
    }  

  },[artist, city, checked])


  const handleFirebaseConnection = () => {
    const shareKey = 'ukshiseisf';
    const editKey = 'jdskdhakhdes';
    const totalInfo = {
        listname: userListName,
        userBudget: userBudget,
        budgetConcertContent: addedList, 
    }

    const database = getDatabase(firebase);
    const dbRef = push(ref(database));
    const shareKeyRef = child(dbRef, shareKey);
    const editKeyRef = child(dbRef, editKey);

    set((shareKeyRef,editKeyRef), totalInfo);

    // `/${shareKey}` 
    // const database = getDatabase(firebase);
    // const dbRef = ref(database);
    // push(dbRef)

  };

    




    
    // event handler on the + button
    // grab the details of the concert
    // slap in into the firebase (details + key)
    // next step: event handler on the tickets' number
    // next step: decreasing the number of ticket
    // useState to store the information about the number of tickets
    // next step: removing event from the firebase

  //   const concertDetails = {name, eventDate, venueCity, venueName, maxPrice};
  //   const database = getDatabase(firebase);
  //   const userList = `${key}`
  //   const userId = 'Iza';
  //   const childRef = ref(database, `/${userId}/${userList}`)
    
  //   set(childRef, concertDetails);



 
  const handleAddConcert = (name, eventDate, venueCity, venueName, maxPrice, concertImg, key) => {
    // setName(name);
    // setEventDate(eventDate);
    // setVenueCity(venueCity);
    // setVenueName(venueName);
    // setMaxPrice(maxPrice);
    // setKey(key);
    const concertData = {
      name: name,
      eventDate: eventDate,
      venueCity: venueCity,
      venueName: venueName,
      maxPrice: maxPrice,
      image: concertImg,
      key: key
    }
    setAddedList([...addedList, concertData]);
    console.log(addedList);
  }

    return(
      <>
        <section >
          <div className="inputSection wrapper">
            <h2>Welcome! lets Start planning your concert list</h2>
            <form action="submit">
              {/* name of the list input */}
              <label htmlFor="newName"></label>
              <input
                type="text"
                id="newName"
                placeholder="Name Of Your List" />

              {/* user's budget input */}
              <label htmlFor="newBudget"></label>
              <input
                type="text"
                id="newBudget"
                placeholder="Your Budget" />
              <div>
                <button onClick={handleSubmitUser}>
                  Add List
                </button>
              </div>

            </form>
          </div>
        </section>

        <section>
          <form className="searchForm wrapper">
            <p>Search for concerts by artist and your preffered city</p>
              <label htmlFor="artist"></label>
              <input 
                  className="artistSearch"
                  id="artist"
                  placeholder="Artist..."
              />
         

              <label htmlFor="city"></label>
              <input 
                  className="citySearch"
                  id="city"
                  placeholder="City..."
              />


              <fieldset>
                {/* <legend> With or Without Price</legend> */}
                <label htmlFor="displayPricedConcerts">
                  Click to show only priced concerts
                </label>
                
                <input
                  id="displayPricedConcerts"
                  className="displayPricedConcerts"
                  name="priceChoice"
                  type ="checkbox"
                  value="priced"
                /> 

              </fieldset>

              <button
                onClick={handleSubmitConcert}
              > Search </button>
          </form>
          <div className="searchResultContainer">
              <ul className="searchResultList wrapper">
                  {
                    apiRes.map((concertInfo)=>{
                      // const { name, dates.start.localDate } = concertInfo
                      
                      const name = concertInfo.name; 
                      const eventDate = concertInfo.dates.start.localDate;
                      const venueCity = concertInfo._embedded.venues[0].city.name;
                      const venueName = concertInfo._embedded.venues[0].name;
                      const maxPrice = concertInfo.priceRanges !== undefined
                        ? concertInfo.priceRanges[0].max
                        : 'To be announced';
                    
                      const concertImg = concertInfo.images[3].url;
                      const key = concertInfo.id;
                      return (
                        <li 
                        // initial={{ opacity: 0 }}
                        // animate={{ opacity: 1 }}
                        // transition={{duration:2}}
                        key = {key}
                        className="concertResponse wrapper">
                          { 
                            concertInfo.priceRanges !== undefined ? ( 
                              <button
                              onClick = {() => {handleAddConcert(name, eventDate, venueCity, venueName, maxPrice, concertImg, key)}}> + </button>
                             ) : null
                          }
                          <div className="concertListInfo">
                            <p> {name} </p>
                            <p> {eventDate} </p>
                            <p> {venueCity} </p>
                            <p> {venueName} </p>
                            <p> {maxPrice} </p>
                          </div>
                          <div className="ticketNumber">
                            <p>-</p>
                            <p>1</p>
                            <p>+</p>
                          </div>
                          <div className="concertListImage">
                            <img src ={concertImg} alt="concert poster information"></img>
                          </div>
                        </li>
                      )
                    })
                  }
              </ul>
          </div>
        </section>

        <section>
          <div className="myList wrapper">
            <div className="userBudgetInfo">
              <p className="userInput"> {userListName} </p>
              <p className="userInput"> {userBudget} </p>
            </div>

                <ul className="myList wrapper">
                  {addedList.map( (list, index) =>{
                    const { name, eventDate, venueCity, venueName, maxPrice, concertImg} = list;
                    return(
                      <li key={index}>
                        <div className="concertListInfo">
                          <p>{name}</p>
                          <p>{eventDate}</p>
                          <p>{venueCity}</p>
                          <p>{venueName}</p>
                          <p>{maxPrice}</p>
                        </div>
                        <div className="concertListImage">
                          <img src ={concertImg} alt="concert poster information"></img>
                        </div>
                      </li>
                    )
                  })}
                  <button onClick={handleFirebaseConnection}>
                    Submit
                  </button>
                </ul>
            </div>
        </section>
      </>
    )
}

export default SearchPage;




    // Grab Artist Input
    // const handleArtistInput = (e) => {
    //     e.preventDefault();
    //     setArtist(e.target.value);
    // }
    // // Grab City Input
    // const handleCityInput = (e) => {
    //     e.preventDefault();
    //     setCity(e.target.value);
    // }