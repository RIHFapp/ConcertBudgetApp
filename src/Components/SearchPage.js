//importing hooks
import { useState, useEffect } from "react";
import axios from 'axios';
import firebase from "../firebase";
import {ref, getDatabase, push, set} from "firebase/database"; 

// import { motion } from "framer-motion";

const SearchPage = () => {

  // States
  const [userListName, setUserListName] = useState('');
  const [userBudget, setBudgetInput] = useState('');
  const [artist, setArtist] = useState(null);
  const [city, setCity] = useState(null);
  const [checked, setChecked ] = useState(false);
  const [apiRes, setApiRes] = useState([]);




  //submit handler => connecting with the firebase 
  const handleSubmitUser = (event) => {
    // preventing the refreshing after submit
    event.preventDefault();

    console.log(event.target.form);
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
      //console.log("hello world");
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
          // console.log(event);

          if (checked === false) {
            return event
          } else if (checked === true && event.priceRanges !== undefined) {
            return event
          }
        
        })
        console.log(list);
        setApiRes(list); 
      })
    }  

  },[artist, city, checked])


  const handleAddConcert = (name, eventDate, venueCity, venueName, maxPrice, key) => {

    //event handler on the + button
    //grab the details of the concert
    //slap in into the firebase (details + key)
    //next step: event handler on the tickets' number
    // next step: decreasing the number of ticket
    //useState to store the information about the number of tickets
    // next step: removing event from the firebase

    const concertDetails = {name, eventDate, venueCity, venueName, maxPrice};
    const database = getDatabase(firebase);
    const userList = `${key}`
    const userId = 'Iza';
    const childRef = ref(database, `/${userId}/${userList}`)
    
    set(childRef, concertDetails);
  }

    return(
      <>
        <section >
          <div className="wrapper inputSection">
            <h2>Welcome! lets Start planning your concert list</h2>
            <form action="submit">
              {/* name of the list input */}
              <label htmlFor="newName"></label>
              <input
                type="text"
                id="newName"
                placeholder="name of your list" />

              {/* user's budget input */}
              <label htmlFor="newBudget"></label>
              <input
                type="text"
                id="newBudget"
                placeholder="your budget" />

              <button onClick={handleSubmitUser}>
                Add List
              </button>

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
                  // onChange= {handleArtistInput}
              />
         

              <label htmlFor="city"></label>
              <input 
                  className="citySearch"
                  id="city"
                  placeholder="City..."
                  // onChange={handleCityInput}
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
                              onClick = {() => {handleAddConcert(name, eventDate, venueCity, venueName, maxPrice, key)}}> + </button>
                             ) : null
                          }
                          <div className="concertListInfo">
                            <p> {name} </p>
                            <p> {eventDate} </p>
                            <p> {venueCity} </p>
                            <p> {venueName} </p>
                            <p> {maxPrice} </p>
                          </div>
                          <div>
                            <p>1</p>
                          </div>
                          <div className="concertListImage">
                            <img src ={concertImg} alt=""></img>
                          </div>
                        </li>
                      )
                    })
                  }
              </ul>
          </div>
        </section>

        <section>
          <button></button>
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