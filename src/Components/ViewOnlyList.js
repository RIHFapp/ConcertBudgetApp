import { Link, useParams } from "react-router-dom";
const ViewOnlyList = (props) => {

    const { shareID } = useParams();
    console.log(shareID);
 
    return(
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
                            <li className="listTags">
                                <p>Name</p>
                                <p>Date</p>
                                <p>City</p>
                                <p>Location</p>
                                <p>Price</p>
                            </li>
                            <li className="one">
                                <p>BEYONCÉ - RENAISSANCE WORLD TOUR</p>
                                <p>2023-09-11</p>
                                <p>Vancouver</p>
                                <p>BC Place</p>
                                <p>581</p>
                                
                            </li>
                        
                        
                            <li className="two">
                                <p>Name: BEYONCÉ - RENAISSANCE WORLD TOUR</p>
                                <p>Date: 2023-09-11</p>
                                <p>City: Vancouver</p>
                                <p>Location: BC Place</p>
                                <p>Price: 581</p>
                                
                            </li>
                            
                        
                            <li className="three">
                                <p>Name: BEYONCÉ - RENAISSANCE WORLD TOUR</p>
                                <p>Date: 2023-09-11</p>
                                <p>City: Vancouver</p>
                                <p>Location: BC Place</p>
                                <p>Price: 581</p>
                            
                            </li>
                            
                        
                            <li className="one">
                            <p>Name: BEYONCÉ - RENAISSANCE WORLD TOUR</p>
                                <p>Date: 2023-09-11</p>
                                <p>City: Vancouver</p>
                                <p>Location: BC Place</p>
                                <p>Price: 581</p>
                            </li>
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