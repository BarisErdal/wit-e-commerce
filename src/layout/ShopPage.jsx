
import { ChevronRight } from "lucide-react";
import { shopCategories } from "../data/data";
import Cloth from "../components/Cloth";

const ShopPage = () => {
  return (
    <section className="mt-15 md:mt-35  mx-auto font-montserrat ">
        <div className="bg-light-gray">
      <div className="flex justify-between py-7.5 px-8 mx-auto max-w-6xl">
        <h2 className="font-bold text-2xl text-logo-blue">Shop</h2>

        <div className="flex items-center">
            <h4 className="font-normal text-sm text-logo-blue">Home</h4>
            <ChevronRight color="#BDBDBD"/>
            <h4 className="text-muted font-normal text-sm">Shop</h4>

        </div>
      </div>

      <div className=" flex flex-col md:flex md:flex-row md:max-w-272 mx-auto  gap-5">

        {shopCategories.map((cat,i)=> <Cloth key={i}  data={cat} />)}
      </div>
      </div>


      <div>
        <h3>Showing all 12 Results</h3>
        <div>
            <h4>Views: </h4>
        </div>
        <div>


{/* DROPDOWN MENU */}




            <button>Filter</button>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
