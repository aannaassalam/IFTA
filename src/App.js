import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Voting from "./components/Voting/Voting";
import Bollywood from "./components/Vote/Vote";
import { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";
import './components/Home/particles.scss';
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
          type: actionTypes.SET_EXPIREDandTOTALVOTE,
          expired: res.data.payload.isExpired,
          totalVotes: res.data.payload.voteCount,
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
        <div class="animation-wrapper">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
          <div class="particle particle-4"></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
