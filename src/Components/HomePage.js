//importplace holder images
import crowd from "../partials/asset/crowd.jpg";
import music from "../partials/asset/music.JPG";
import piggy from "../partials/asset/piggy.jpg";
import ticket from "../partials/asset/ticket.JPG"; 
import { Link} from "react-router-dom";

import { useState , useEffect} from "react";
import Loading from "./Loading";
// import SearchPage from "./SearchPage";
// import ListWithKeys from "./ListWithKeys";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";


const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

  

const Homepage = (props) => {
  // const [userInput, setUserInput] = useState('');

  // const handleChangeInputChange = (e) => {
  //   setUserInput(e.target.value)
  // }
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
    }, 0);
  }, [])
    return(
      <>
          {pageLoad ? <Loading /> : (
        <div
          className="header"
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{duration:2}}
          >
          <section className="home">
            <div className="featured wrapper">
              <h1> Concert Budget Master</h1>
              <p>Budget tight? Concerts too much?</p>
              <p>Let's get planning</p>
          </div>
          </section>
          <motion.ul
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
          >
          {[0, 1, 2, 3].map((index) => (
          <motion.li key={index} className="item" variants={item} >
          {index === 0 && <img src={ticket} alt="ticket"/>}
          {index === 1 && <img src={music} alt="music"/>}
          {index === 2 && <img src={piggy} alt="piggy"/>}
          {index === 3 && <img src={crowd} alt="crowd"/>}
          </motion.li>
          ))}
          </motion.ul>
                  {/* <ul
                    className="container layingShapes"
                    
                  >
                    {[0, 1, 2, 3].map((key) => (
                  <motion.li key={key} className="item" data-index={key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.5, delay: 2 }}

                  >
                    {key === 0 && <img src={ticket} alt="ticket"/>}
                    {key === 1 && <img src={music} alt="music"/>}
                    {key === 2 && <img src={piggy} alt="piggy"/>}
                    {key === 3 && <img src={crowd} alt="crowd"/>}
                  </motion.li>
                ))}
                  </ul> */}
          <section className="enterID">
          <motion.form action="submit" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          transition={{ duration: 0.5, delay: 2 }}
          >
          <div className="onLogin">
            <Link to={`/searchPage`}>
              <button>Create Your Budget List!</button>
            </Link>
          {/* commment up to prvent bugs */}
          {/* <div className="editList">
            
            <label htmlFor="yourID">Enter Your Key Here:</label>
            <input
                type="text"
                id="yourID"
                placeholder="UUID" 
                onChange={handleChangeInputChange}
                value={userInput}
            />             
            {
            userInput===""? null :
            <Link
               to={`/listWithKeys/:${userInput}`}
               onClick={()=> {pageLoad && <Loading />}}
            >
              <button>
                Edit your list
              </button>
            </Link>
            }
            </div>            */}

           </div>
          </motion.form>
         </section>

        </div>
    )}
    </>
    )
    
}

export default Homepage;


  //firebase testing
   //firebase config
  // const [name, setName] = useState('');
  // const[budget, setBudget] = useState('');
  

  // const handleRemove = (bookId) => {
  //   const database = getDatabase(firebase);
  //   const dbRef = ref(database, `${bookId}`);
  //   remove(dbRef);
  // }
  
  // useEffect( () => {
  //   const database = getDatabase(firebase);
  //   const dbRef = ref(database);
  //   onValue(dbRef, (reponse)=>{
  //     const data = reponse.val();
  //     const newName = [];
  //     for (let key in data) {
  //       newName.push(
  //         {key:key, 
  //           name: data[key]
  //         }
  //       );        
  //     }    
  //     setName(newName);    
  //   });
  
  // },[]); 