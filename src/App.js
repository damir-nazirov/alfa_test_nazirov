import React from 'react';
import MyCard from './features/card/Card';
import Filter from './features/filter/Filter';
import 'bootstrap/dist/css/bootstrap.min.css';

    
function App() {
  return (
    <div className="App">
       <Filter/>
       <MyCard/>
    </div>
  );
}


export default App;
