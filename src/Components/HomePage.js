//importplace holder images
import beyonce from "../partials/asset/placeholder-bey.webp";
import taylor from "../partials/asset/placeholder-tay.webp";
import pink from "../partials/asset/placeholder-pink.webp";
import john from "../partials/asset/placeholder-john.webp";
import sha from "../partials/asset/placeholder-sha.webp";
import { Link } from "react-router-dom";



const Homepage = () => {

    return(
    <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{duration:2}}
      >
      <section>
        <div className="featured wrapper">
          <h2> Budget <span>Vs</span> Concert</h2>
          <div className="featureImage">
          <img src={beyonce} alt=""/>
          </div>
        </div>
      </section>
      <section className="enterID">
        <form action="submit" >
          <div className="onLogin">
            <Link to={`/searchPage`}>
              <button>Create new List</button>
            </Link>
          <div className="editList">
            {/* name of the list input */}
            <label htmlFor="yourID"></label>
            <input
                type="text"
                id="yourID"
                placeholder="UUID" />             
            <Link to={`/searchPage`}>
              <button>Edit your list</button>
            </Link>
            </div>           
          </div>
        </form>
      </section>

      <section >
        <div className="wrapper suggested">
          <h2>discover!</h2>
          <div className="concertImage">
            <div className="smallImage">
              <img src={taylor} alt=""/>
            </div>
            <div className="smallImage">
              <img src={pink} alt=""/>
            </div>
            <div className="smallImage">
              <img src={john} alt=""/>
            </div>
            <div className="smallImage">
              <img src={sha} alt=""/>
            </div>
          </div>
        </div>
      {/*testing displaying firebase data - to be removed later  
      <ul>
        {name.map ( (name) => {
          return (
            <li key={name.key}>
              <p>{name.name}</p>
              <button >
              remove!
              </button>
            </li>
          )

        })}
      </ul> */}
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