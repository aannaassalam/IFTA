import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Voting from "./components/Voting/Voting";
import Bollywood from "./components/Bollywood/Bollywood";
import { useState } from "react";

function App() {
  const [openBolly, setOpenBolly] = useState(false);
  const [openTele, setOpenTele] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);
  const [openDigital, setOpenDigital] = useState(false);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/voting">
            <Voting
              openBolly={openBolly}
              openTele={openTele}
              openMusic={openMusic}
              openDigital={openDigital}
              setOpenBolly={setOpenBolly}
              setOpenTele={setOpenTele}
              setOpenMusic={setOpenMusic}
              setOpenDigital={setOpenDigital}
            />
          </Route>
          <Route path="/bollywood">
            <Bollywood
              openBolly={openBolly}
              openTele={openTele}
              openMusic={openMusic}
              openDigital={openDigital}
              setOpenBolly={setOpenBolly}
              setOpenTele={setOpenTele}
              setOpenMusic={setOpenMusic}
              setOpenDigital={setOpenDigital}
            />
          </Route>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
