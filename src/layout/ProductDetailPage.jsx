import ProductDetailCard from "../components/ProductDetailCard";
import Tabs from "../components/Tabs";
import { tabs } from "../data/tabsData";
import { productDetailBestseller } from "../data/productBestseller";
import ProductCard from "../components/ProductCard";
import { brandsData } from "../data/data";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductById } from "../redux/actions/productActions";
import Spinner from "../components/Spinner";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { product, productFetchState } = useSelector((s) => s.product);

  useEffect(() => {
    dispatch(fetchProductById(productId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, productId]);

  if (productFetchState === "FETCHING") {
    return <Spinner />;
  }

  if (productFetchState === "FAILED") {
    return (
      <p className="text-center text-red-500 mt-10">
        Product could not be loaded
      </p>
    );
  }

  return (
    <section className=" md:mt-15">
      <div className="max-w-6xl mx-auto px-5 pt-6 mt-15 md:mt-30">
        <button
          onClick={() => history.goBack()}
          className="text-sm font-semibold text-logo-blue hover:underline"
        >
          Back
        </button>
      </div>
      <ProductDetailCard product={product} />
      <Tabs tabs={tabs} />

      <div className="md:max-w-5xl md:grid md:grid-cols-4 gap-8 flex flex-col items-center mt-10 mx-auto">
        {productDetailBestseller.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div
        className="
  grid
  grid-cols-1
  sm:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-6
  gap-3
  place-items-center
  mt-20
  max-w-7xl
  mx-auto
  px-4
"
      >
        {brandsData.map((b, i) => (
          <img
            key={i}
            src={b.src}
            alt=""
            className="w-25 sm:w-12 md:w-14 lg:w-15 h-auto object-contain"
          />
        ))}
      </div>
    </section>
  );
};

export default ProductDetailPage;
