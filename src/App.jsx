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
import AboutUsPage from "./layout/AboutUsPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./redux/actions/clientActions";
import { fetchCategories } from "./redux/actions/productActions";


function App() {

 const dispatch = useDispatch();


  useEffect(() => {
    dispatch(restoreUser());
   
  }, [dispatch]);

    useEffect(() => {
   
    dispatch(fetchCategories());
  }, [dispatch]);


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

        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
          <ProductDetailPage />
        </Route>

        <Route path="/shop/product/:productId">
          <ProductDetailPage />
        </Route>

        <Route path="/shop/:gender/:categoryCode/:categoryId">
          <ShopPage />
        </Route>

        <Route path="/shop" exact>
          <ShopPage />
        </Route>

        <Route path="/team">
          <TeamPage />
        </Route>

        <Route path="/aboutus">
          <AboutUsPage />
        </Route>

        
        <Route path="/signup">
          <SignUp />
        </Route>

         <Route path="/login">
          <Login />
        </Route>




      </Switch>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
