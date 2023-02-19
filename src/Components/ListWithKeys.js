import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { useEffect, useState} from 'react';
const ListWithKeys = (props) => {
    
   const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    const loadPage = async() => {
      await new Promise ((event) => {
        console.log(event);
        setTimeout(()=> {setPageLoad(false)}, 2000); 
      });
    }
    setTimeout(()=> {
      loadPage();
      setPageLoad(true);
    }, 2000);
  }, []);
   
    const {editID} = useParams();
    console.log(editID);

    return(
        <>
              {pageLoad ? <Loading /> : (
                <>
            <section>
                <div className="wrapper">
                    <div className="detaliedList">
                        <h2>Rana but poor after joining bootcamp</h2>
                        
                        <div className="listHeading">
                        <h3>Concernt 6000 </h3>
                        <h3>vs</h3>
                        <h3>Budget 10</h3>
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
            )}
        </>
    )
}

export default ListWithKeys;