import { useState, useEffect } from "react";
import axios from 'axios';

const SearchPage = () => {
    // States
    const [artist, setArtist] = useState("")
    const [city, setCity] = useState("")


    // Grab Artist Input
    const handleArtistInput = (e) => {
        setArtist(e.target.value);
    }
    // Grab City Input
    const handleCityInput = (e) => {
        setCity(e.target.value);
    }

  // API call endpoints - events search, locations, 
useEffect (() => {
  axios({
    url: "https://app.ticketmaster.com/discovery/v2/events",
    params: {
      apikey: "15zZnInsCdU0ECUBEtwgFJsPOwjOlGWt",
      keyword: "beyonce",
      countryCode:"CA",
      city: "toronto",
      classificationName:"music"
    }
  }).then((res) => {
    console.log(res);
  })
},[])

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
                onChange= {handleArtistInput}
            >
            </input>

            <label htmlFor="city"></label>
            <input 
                className="citySearch"
                id="city"
                placeholder="City..."
                onChange={handleCityInput}
            ></input>
            <button> Search </button>
        </form>
        <div className="searchResultContainer">
            <ul className="searchResultList"></ul>
        </div>
        </>
    )
}

export default SearchPage;