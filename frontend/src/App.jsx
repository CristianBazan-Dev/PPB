import React from "react";

import {BrowserRouter as Router, Route} from 'react-router-dom'
import {DataProvider} from './GlobalState'

import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import Footer from './components/footers/Footer'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header className="header"/>
          <MainPages className= "mainpages"/>
          <Footer className= "footer" />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App; 
  