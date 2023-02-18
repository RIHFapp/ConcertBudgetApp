const ListOfTheLists = (props) => {
   console.log(props.passEditId)
   console.log(props.passShareId)
      return (
         <>
            <div className="wrapper listOfTheListsContainer">
               <h2> List of created list</h2> 
                  <div className="listContainer">
                     <h3>First Web Developers' paycheck concert list</h3>
                     <p>budget: 1000 CAD </p>
                  </div>
                  <div className="listContainer">
                     <h3>Second Web Developers' paycheck concert list</h3>
                     <p>budget: 1000 CAD </p>
                  </div>
            </div>
            <button id="LOLButton">back</button>
       
         </>
   )

}

export default ListOfTheLists;