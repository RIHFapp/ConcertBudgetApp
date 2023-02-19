//importing hooks
import { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../firebase";
import { ref, getDatabase, push } from "firebase/database"; 
import { v4 as uuidv4 } from "uuid";
// import { /* Route, Routes */ useParams/* , Link */ } from "react-router-dom";
// import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const SearchPage = (props) => {
  // const [passShareId, setPassShareId] = useState("");
  // States for User Budget Information
  const [userListName, setUserListName] = useState('');
  const [userBudget, setBudgetInput] = useState('');
  // State for Concert Search
  const [artist, setArtist] = useState(null);
  const [city, setCity] = useState(null);
  const [checked, setChecked ] = useState(false);
  const [apiRes, setApiRes] = useState([]);
  const [addedList, setAddedList] = useState([]);

  const [link, setLink] = useState('#');

  // console.log(props);


  // Renders user budget information when user clicks 
  const handleListConfig = (event) => {
    event.preventDefault();

    setUserListName(event.target.form[0].value);
    setBudgetInput(event.target.form[1].value);

  }

  // Api submit button
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
          } else {
            return false; // return false if neither condition is true
          }
        });
        setApiRes(list); 
      })
    }  

  },[artist, city, checked])

  // user adds concert to their dynamic list 
  const handleAddConcert = (name, eventDate, venueCity, venueName, maxPrice, concertImg, key) => {
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
  }

  
  //When pressed Submit - the information gets sent to Firebase
  const handleFirebaseConnection = () => {
    if (userBudget === "" && userListName === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    } else if (addedList.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    } else {
      // Generate a random key for shearable and editable views
      const shareKey = uuidv4("budget");
      const editKey = uuidv4("edit");
      // Store child node information
      // const totalInfo = {
      //   listname: userListName,
      //   userBudget: userBudget,
      //   budgetConcertContent: addedList,
      // }
      // Connect to Firebase
      const database = getDatabase(firebase);
      const dbRef = ref(database)
      const keyRef = {
        shareKey,
        editKey,
        listname: userListName,
        userBudget: userBudget,
        budgetConcertContent: addedList,
      };
      props.shareIdRef(shareKey);
      props.editIdRef(editKey);
      push(dbRef, keyRef);

      setLink(`/listOfLists`)
    }
  };

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
                <button onClick={handleListConfig}>
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
              <h3>Up coming concerts...</h3>
                  {
                    apiRes.map((concertInfo)=>{
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
                        key = {key}
                        className="concertResponse wrapper">
                          { 
                            concertInfo.priceRanges !== undefined ? ( 
                              <button
                              onClick = {() => {handleAddConcert(name, eventDate, venueCity, venueName, maxPrice, concertImg, key)}}> + </button>
                             ) : null
                          }
                          <div className="concertListInfo">
                            <span><p> {name} </p></span>
                            <p> {eventDate} </p>
                            <p> {venueCity} </p>
                            <p> {venueName} </p>
                            <span><p>{maxPrice}</p></span>
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
              <h2 className="userInput"> List:{userListName} </h2>
              <h2 className="userInput"> Budget:{userBudget} </h2>
            </div>

                <ul className="myConcert wrapper">
                <h3>Selected Concerts</h3>
                  {addedList.map( (list, index) =>{
                    const { name, eventDate, venueCity, venueName, maxPrice, concertImg} = list;
                    return(
                      <li key={index}>
                        <div className="concertListInfo">
                          <span><p>{name}</p></span>
                          <p>{eventDate}</p>
                          <p>{venueCity}</p>
                          <p>{venueName}</p>
                          <span><p>{maxPrice}</p></span>
                        </div>
                        <div className="concertListImage">
                          <img src ={concertImg} alt={`Poster of ${name}`} />
                        </div>
                      </li>
                    )
                  })}

                  <Link to={`${link}`}>
                    <button onClick={handleFirebaseConnection}>
                      Submit
                    </button>
                  </Link>
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