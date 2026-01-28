import "./App.css";

import { ToastContainer } from "react-toastify";
import PageContent from "./layout/PageContent";
import Header from "./layout/Header";
import ShopPage from "./layout/ShopPage";
import { Switch, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import ProductDetailPage from "./layout/ProductDetailPage";
import ContactPage from "./layout/ContactPage";
import TeamPage from "./layout/TeamPage";

function App() {
  return (
    <>
      <Header />

      <Switch>

        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route path="/" exact>
          <PageContent />
        </Route>

        <Route path="/shop/:productId">
          <ProductDetailPage />
        </Route>

        <Route path="/shop">
          <ShopPage />
        </Route>

        <Route path="/team">
          <TeamPage />
        </Route>



      </Switch>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
