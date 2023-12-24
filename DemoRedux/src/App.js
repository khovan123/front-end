import { Fragment } from "react";
import { useSelector } from "react-redux";
import Counter from "./components/Counter";
import Auth from "./components/Auth.js";
import Header from "./components/Header.js";
import UserProfile from "./components/UserProfile.js";
function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Header />
      {isAuth ? <UserProfile /> : <Auth />}
      <Counter />
    </Fragment>
  );
}

export default App;
