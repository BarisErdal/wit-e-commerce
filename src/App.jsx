import "./App.css";

import { ToastContainer } from "react-toastify";
import PageContent from "./layout/PageContent";
import Header from "./layout/Header";
import ShopPage from "./layout/ShopPage";
import { Switch, Route } from 'react-router-dom';
import Footer from "./layout/Footer";

function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route path="/" exact>
          <PageContent />
        </Route>

        <Route path="/shop">
          <ShopPage />
        </Route>
      </Switch>
      <Footer/>
      <ToastContainer />
    </>
  );
}

export default App;
