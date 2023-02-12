import { useState } from "react";
const Homepage = (books) => {
    const [userInput, setUserInput] = useState('')
    
    const handleInput = (event) => {
        setUserInput(event.target.value);
      }
      
    //   const handleSubmit = (event) => {
    //     //get the info from userinput STATE
    //     event.preventDefault();
    //     console.log(userInput);
    //     //send it off to firebase using push function
    //     const database = getDatabase(firebase);
    //     const dbRef = ref(database);
        
    //     push(dbRef, userInput);
    
    //     setUserInput('');
        
    //   }
      
    //   const handleRemove = (bookId) => {
    //     const database = getDatabase(firebase);
    //     const dbRef = ref(database, `${bookId}`);
    //     remove(dbRef);
    //   }
    return(
        <div>
            <form action="submit">
      <label htmlFor="newBook">Add a book to your bookshelf</label>
      <input onChange={handleInput} type="text" id="newBook" value={userInput} />
      <button 
    //   onClick={handleSubmit}
      >Add Book</button>
    </form>
    
    
    <ul>
      {books.map ( (book) => {
        return (
          <li key={book.key}>
            <p>{book.name}</p>
            <button 
            // onClick={() => {handleRemove(book.key)}}
            >
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