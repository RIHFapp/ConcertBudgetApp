import { useState } from "react";
const Homepage = (name) => {
  const [userInput, setUserInput] = useState('')
  const handleInput = (event) => {
    setUserInput(event.target.value);
  }
  console.log(userInput);
    return(
      <div>
        <h1>testing</h1>
        <form action="submit">
      <label htmlFor="newName">Name of your list</label>
      <input 
      onChange={handleInput}
      type="text" 
      id="newName" 
      value={userInput}  
      />
      <button >Add List</button>
    </form>
      </div>
    )
    
}

export default Homepage;