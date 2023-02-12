import { useState } from "react";
const Homepage = ({name}) => {
  const [userListName, setUserListName] = useState('')
  const handleInput = (event) => {
    setUserListName(event.target.value);
  }
  
  
    return(
      <div>
        <h1>testing</h1>
      <form action="submit">
        <label htmlFor="newName">Name of your list</label>
        <input 
        onChange={handleInput}
        type="text" 
        id="newName" 
        value={userListName}  
        />
        <button >Add List</button>
      </form>
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
      </ul>
      </div>
    )
    
}

export default Homepage;