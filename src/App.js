import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import MBANavbar from "./components/MBANavbar";
import Login from "./components/Login";

const App = () => {
  return (
    <div className="App">
      <div>
        <MBANavbar />
        <Login />
      </div>
    </div>
  );
};

export default App;
