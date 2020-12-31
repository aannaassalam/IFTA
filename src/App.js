import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Voting from "./components/Voting/Voting";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/voting" component={Voting} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
