import "./App.css";
import { BrowserRouter as Router, Route, Switch , HashRouter} from "react-router-dom";
import Home from "./components/Home/Home";
import Voting from "./components/Voting/Voting";
import Bollywood from "./components/Vote/Vote";
import { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";
import './components/Home/particles.scss';
import "./components/Vote/Vote.css";
import "./components/Voting/Voting.css";
import "../node_modules/video-react/dist/video-react.css";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    getAwards();
    checkIfExpired();
  }, []);

  const checkIfExpired = () => {
    axios
      .get("http://13.235.90.125:8000/show/?showId=602a7e3c14367b662559c85f")
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
        "http://13.235.90.125:8000/show/fetchCategories?showId=602a7e3c14367b662559c85f"
      )
      .then((res) => {
        dispatch({
          type: actionTypes.SET_AWARDS,
          awards: res.data.payload,
        });
      });
  };

  return (
    <HashRouter>
      <div className="app">
        
        <Switch>
          <Route path="/voting" component={Voting} />
          <Route path="/vote/:award" component={Bollywood} />
          <Route path="/" component={Home} />
        </Switch>
        <div class="animation-wrapper">
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
