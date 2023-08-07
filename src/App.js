import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

// Local imports
import Events from "./Pages/EventsPage/Events";
import Search from "./Pages/SearchPage/Search";
import { AppContext } from "./Contexts/AppContext";

function App() {
  // This state will be availabe across the entire application
  // This state will be used to search for artist events on the events page
  const [searchedArtistName, setSearchedArtistName] = React.useState(""); // State to track artist name that was searched for previously

  return (
    <AppContext.Provider value={{ searchedArtistName, setSearchedArtistName }}>
      <AppWrapper>
        <Router>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/events" component={Events} />
          </Switch>
        </Router>
      </AppWrapper>
    </AppContext.Provider>
  );
}

export default App;

const AppWrapper = styled.div`
  padding: 2em;
  font-family: "Roboto";
  // Extra small devices (phones, 600px and down)
  @media only screen and (max-width: 600px) {
    margin: 0 2%;
  }
  // Small devices (portrait tablets and large phones, 600px and up)
  @media only screen and (min-width: 600px) {
    margin: 0 2%;
  }
  // Medium devices (landscape tablets, 768px and up)
  @media only screen and (min-width: 768px) {
    margin: 0 7%;
  }
  // Large devices (laptops/desktops, 992px and up)
  @media only screen and (min-width: 992px) {
    margin: 0 10%;
  }
  // Extra large devices (large laptops and desktops, 1200px and up)
  @media only screen and (min-width: 1200px) {
    margin: 0 15%;
  }
`;
