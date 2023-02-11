import './App.scss';
import firebase from './firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import { Route, Routes } from 'react-router-dom';


function App() {



  return (
    <div className="App">
      <p>Hello World!</p>
      <p>I love food</p>
    </div>
  );
}




export default App;

// pseudo code

// on load up

  // all pages have icon button to go to list
  
  // client will see index starter page
      // has 3 components, feature, form, collection of recommendations 

      // images interaction are stretch goals, specifically for component 1 and 3 for load up

      // form component 
        // contains name and budget input sections, onSubmit -> goes to 2nd module/view


    // 2nd module/view
        // has 2 components , form and list component 

        // form component has two inputs - artist and location 
          // onSubmit generates list - that filters out with inputs 

        // list component - shows filtered concert options with should display relevant information (e.g. Performer, dates, venue, ticket price range).
          // each list has a plus button to add to saved list
          // a button to continue on to next view/module
        // has back button


    // 3rd module/view
        // contains summary of list, can edit list and budget
        // visual indication of under budget, at budget, over budget
        // back button
        // publish button ?????? maybe


    // 4th module/view ????
        // client review ?








