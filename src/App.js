import { Routes, Route} from "react-router-dom";
import Home from "./routes/home/home";
import Navigation from "./routes/navigation/navigation";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/shop";
import Checkout from "./routes/checkout/checkout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/userSlice";
import { onAuthStateChangedListener, createUserDocument } from "./utils/firebase/firebase";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocument(user);
        }
        dispatch(setCurrentUser(user));
    })
    // Cleanup subscription on unmount
    return unsubscribe;
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication/>}/>
        <Route path="shop/*" element={<Shop/>}/>
        <Route path="checkout" element={<Checkout />}/>
      </Route>
    </Routes>
  );
};

export default App;
