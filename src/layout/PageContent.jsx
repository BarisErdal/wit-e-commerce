import Carousel from "../components/Carousel";
import Bestsellers from "./Bestsellers";
import EditorsPick from "./EditorsPick";
import { slides, slides2, callToBuy, featuredProducts } from "../data/data";
import CallToBuy from "./CallToBuy";
import FeaturedProducts from "./FeaturedProducts";

const PageContent = () => {
  return (
    <>
      <Carousel slides={slides} />
      <EditorsPick />
      <Bestsellers />
      <Carousel
        slides={slides2}
        imgClasses="max-h-[1] w-auto"
        height="h-[200vh]"
      />
      <CallToBuy data={callToBuy} />
      <FeaturedProducts data={featuredProducts} />
    </>
  );
};

export default PageContent;
