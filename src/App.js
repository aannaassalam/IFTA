import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Voting from "./components/Voting/Voting";
import Bollywood from "./components/Vote/Vote";
import { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    getAwards();
    checkIfExpired();
  }, []);

  const checkIfExpired = () => {
    axios
      .get("http://13.235.90.125:8000/show/?showId=5ff351bcd2d84274b06e2783")
      .then((res) => {
        dispatch({
          type: actionTypes.SET_EXPIRED,
          expired: res.data.payload.isExpired,
        });
      });
  };

  const getAwards = () => {
    axios
      .get(
        "http://13.235.90.125:8000/show/fetchCategories?showId=5ff351bcd2d84274b06e2783"
      )
      .then((res) => {
        dispatch({
          type: actionTypes.SET_AWARDS,
          awards: res.data.payload,
        });
      });
  };

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/voting" component={Voting} />
          <Route path="/vote/:award" component={Bollywood} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
