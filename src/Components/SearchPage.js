import { useState, useEffect } from "react";
import axios from 'axios';

const SearchPage = () => {
    // States
    const [artist, setArtist] = useState(null);
    const [city, setCity] = useState(null);
    const [checked, setChecked ] = useState(false);
    const [apiRes, setApiRes] = useState([]);


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

    // On Submit Values
    const handleSubmit = (e) => {
      e.preventDefault();
      setArtist(e.target.form[0].value);
      setCity(e.target.form[1].value);
      setChecked(e.target.form[3].checked);
  
    }

  // On Search Page mount - trigger an API call based on input content availibility.  
useEffect (() => {
  if (artist === null && city === null) {
    console.log("hello world");
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



    return(
        <>
        <section>
          <form className="searchForm wrapper">
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
                onClick={handleSubmit}
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
                        ? 
                        concertInfo.priceRanges[0].max
                        : 
                        'To be announced';
                    

                      const concertImg = concertInfo.images[3].url;
                      const key = concertInfo.id;
                      return (
                        <li 
                        key = {key}
                        className="concertResponse wrapper">
                          { 
                            concertInfo.priceRanges !== undefined ? ( 
                              <button> + </button>
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
        </>
    )
}

export default SearchPage;