import { Routes, Route} from "react-router-dom";
import Home from "./routes/home/home";
import Navbar from "./components/Navbar/Navbar";


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
