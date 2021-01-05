import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Voting from "./components/Voting/Voting";
import Bollywood from "./components/Bollywood/Bollywood";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [awards, setAwards] = useState([]);
  const [openBolly, setOpenBolly] = useState(false);
  const [openTele, setOpenTele] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);
  const [openDigital, setOpenDigital] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://13.235.90.125:8000/show/fetchCategories?showId=5ff351bcd2d84274b06e2783"
      )
      .then((res) => setAwards(res.data.payload));
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/voting">
            <Voting awards={awards} />
          </Route>
          <Route path="/bollywood/:award" component={Bollywood} />
          <Route path="/">
            <Home awards={awards} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
