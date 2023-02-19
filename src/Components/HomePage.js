//importplace holder images
import beyonce from "../partials/asset/placeholder-bey.webp";
import taylor from "../partials/asset/placeholder-tay.webp";
import pink from "../partials/asset/placeholder-pink.webp";
import john from "../partials/asset/placeholder-john.webp";
import sha from "../partials/asset/placeholder-sha.webp";
import crowd from "../partials/asset/crowd.jpg";
import music from "../partials/asset/music.JPG";
import piggy from "../partials/asset/piggy.jpg";
import ticket from "../partials/asset/ticket.JPG"; 
import { Link} from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
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

  

const Homepage = () => {

  const [userInput, setUserInput] = useState('');


  const handleChangeInputChange = (e) => {
    setUserInput(e.target.value)
  }

    return(
    <div
      className="header"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{duration:2}}
      >
      <section>
        <div className="featured wrapper">
          <h1> Concert Budget Master</h1>
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
              <button>Create new List</button>
            </Link>
            <div className='editList'>
      <label htmlFor="yourID">Enter Your Key Here:</label>
      <input
        type="text"
        id="yourID"
        placeholder="UUID"
        onChange={handleChangeInputChange}
        value={userInput}
      />
      {userInput ? (
        <Link to={`/listWithKeys/:${userInput}`}>
          <button>Edit your list</button>
        </Link>
      ) : null}
    </div>   
          </div>
        </motion.form>
      </section>

      </div>
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