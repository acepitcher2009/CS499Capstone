import "./App.css";
import { Route, Switch } from "react-router-dom";
import SideNav from "./components/Navigation/SideNav";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";
import Animals from "./components/Animals/Animals";
import Users from "./components/Users/Users";
import TopNav from "./components/Navigation/TopNav";

function App() {
  const { email, password } = useSelector((state) => state.auth);
  return (
    <div className="App">
      {/* checks if email and password have values then renders the side navbar */}
      {email && password ? <SideNav /> : <></>}
      {email && password ? <TopNav /> : <></>}
      {/* switch statement to allow for the application to navigate between screens  */}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/animals" component={Animals} />
        <Route exact path="/users" component={Users} />
      </Switch>
    </div>
  );
}

export default App;
