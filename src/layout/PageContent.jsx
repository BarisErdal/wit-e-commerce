
import Carousel from '../components/Carousel';
import Bestsellers from './Bestsellers';
import EditorsPick from './EditorsPick';
import { slides ,slides2, callToBuy } from '../data/data';
import CallToBuy from './CallToBuy';
const PageContent = () => {


  
  return (
    <> 

    <Carousel slides={slides} />
    <EditorsPick />
    <Bestsellers/>
    <Carousel slides={slides2}/>
    <CallToBuy data={callToBuy}/>


    </>
    );
    }


export default PageContent;