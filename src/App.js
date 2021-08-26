import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LyricPage from "./pages/LyricPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/lyric/:id" component={LyricPage}></Route>
        <Route path="/search/:keyword" component={SearchPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
