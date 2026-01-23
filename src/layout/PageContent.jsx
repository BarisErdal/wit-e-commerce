import Carousel from "../components/Carousel";
import Bestsellers from "./Bestsellers";
import EditorsPick from "./EditorsPick";
import { slides, slides2, callToBuy, featuredProducts } from "../data/data";
import CallToBuy from "./CallToBuy";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";
import Slider from "../components/Slider";

const PageContent = () => {
  return (
    <>
      <Carousel slides={slides} />
      <EditorsPick />
      <Bestsellers />
 
      <Slider slides={slides2}/>
      <CallToBuy data={callToBuy} />
      <FeaturedProducts data={featuredProducts} />
      <Footer/>
    </>
  );
};

export default PageContent;
