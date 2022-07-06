import './App.css';
import './assets/css/page.css'
import LoadData from "./component/load-data/LoadData";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from "./page/home";
import LoginPage from "./page/login";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          {/*------LayOut ----------------*/}
          <LoadData>

          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
          </LoadData>

        </BrowserRouter>
    </div>
  );
}

export default App;
