import { useState, useEffect } from "react";
import axios from 'axios';

const SearchPage = () => {
    // States
    const [artist, setArtist] = useState(null);
    const [city, setCity] = useState(null);
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
    }

  // API call endpoints - events search, locations, 
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

      const list = [...res.data._embedded.events]
      console.log(list);
      setApiRes(list); 

    })

  }  

},[artist, city])



    return(
        <>
        <p>
           ..................... 
        </p>
        <form className="searchForm">
            <label htmlFor="artist"></label>
            <input 
                className="artistSearch"
                id="artist"
                placeholder="Artist..."
                // onChange= {handleArtistInput}
            >
            </input>

            <label htmlFor="city"></label>
            <input 
                className="citySearch"
                id="city"
                placeholder="City..."
                // onChange={handleCityInput}
            ></input>

            <button
              onClick={handleSubmit}
            > Search </button>
        </form>
        <div className="searchResultContainer">
            <ul className="searchResultList">

              
              <li>
                {
                  apiRes.map((concertInfo)=>{
                    console.log(concertInfo.name)
                    console.log(concertInfo.dates.start.localDate)
                    console.log(concertInfo._embedded.venues[0].city.name)
                    console.log(concertInfo._embedded.venues[0].name)
                    console.log(concertInfo.priceRanges[0].min)
                    console.log(concertInfo.priceRanges[0].max)
                  })
                }
              </li>
            
            </ul>
        </div>
        </>
    )
}

export default SearchPage;