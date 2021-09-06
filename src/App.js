import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Voting from "./components/Voting/Voting";
import Bollywood from "./components/Vote/Vote";
import { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";
import "./components/Vote/Vote.css";
import "./components/Voting/Voting.css";

function App() {
  const [{ userIdentification }, dispatch] = useStateValue();

  useEffect(() => {
    getAwards();
  }, [userIdentification]);

  const getAwards = () => {
    if (userIdentification) {
      const authToken = localStorage.getItem("authToken").split(" ")[1];
      axios
        .get(
          "/show/fetchCategories/logedIn?showId=602a7e3c14367b662559c85f",
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        .then((res) => {

          dispatch({
            type: actionTypes.SET_AWARDS,
            awards: res.data.payload.awards,
          });

          dispatch({
            type: actionTypes.SET_EXPIREDandTOTALVOTE,
            expired: res.data.payload.show.isExpired,
            totalVotes: res.data.payload.show.voteCount,
            expiryDate: res.data.payload.show.lifeSpan
          });


          dispatch({
            type: actionTypes.SET_STATE_VOTE_DATA,
            voteData: res.data.payload.voteData
          });

        })
        .catch((err) => alert(err));
    } else {
      axios
        .get(
          "/show/fetchCategories?showId=602a7e3c14367b662559c85f"
        )
        .then((res) => {
          dispatch({
            type: actionTypes.SET_AWARDS,
            awards: res.data.payload.awards,
          });

          dispatch({
            type: actionTypes.SET_EXPIREDandTOTALVOTE,
            expired: res.data.payload.show.isExpired,
            totalVotes: res.data.payload.show.voteCount,
            expiryDate: res.data.payload.show.lifeSpan
          });


          dispatch({
            type: actionTypes.SET_STATE_VOTE_DATA,
            voteData: res.data.payload.voteData
          });
        })
    }
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
