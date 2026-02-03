import { ChevronRight, LayoutGrid, ListChecks } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { brandsData } from "../data/data";
import Cloth from "../components/Cloth";
import ButtonCta from "../components/ButtonCta";
import ProductCard from "../components/ProductCard";
import Dropdown from "../components/Dropdown";
import { fetchProducts } from "../redux/actions/productActions";
import Spinner from "../components/Spinner";

const sortOptions = [
  "price:asc",
  "price:desc",
  "rating:asc",
  "rating:desc",
];

const ShopPage = () => {
  const shopProducts = useSelector((s) => s.product.productList);
  const { categories, fetchState, total } = useSelector((s) => s.product);
  const { categoryId } = useParams();

  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const [pendingSort, setPendingSort] = useState(sortOptions[0]);
  const [filterText, setFilterText] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");

  const totalPages = Math.max(
    1,
    Math.ceil(shopProducts.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = shopProducts.slice(startIndex, endIndex);

  const shopCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  useEffect(() => {
    dispatch(fetchProducts({ categoryId, sort, filter: debouncedFilter }));
  }, [dispatch, categoryId, sort, debouncedFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, sort, debouncedFilter]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedFilter(filterText);
    }, 400);

    return () => clearTimeout(handle);
  }, [filterText]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (fetchState === "FETCHING") {
    return <Spinner />;
  }

  if (fetchState === "FAILED") {
    return (
      <p className="text-center text-red-500">
        Products could not be loaded
      </p>
    );
  }

  return (
    <section className="mt-15 md:mt-35  mx-auto font-montserrat ">
      <div className="bg-light-gray">
        <div className="flex justify-between py-7.5 px-8 mx-auto max-w-6xl">
          <h2 className="font-bold text-2xl text-logo-blue">Shop</h2>

          <div className="flex items-center">
            <h4 className="font-normal text-sm text-logo-blue">Home</h4>
            <ChevronRight color="#BDBDBD" />
            <h4 className="text-muted font-normal text-sm">Shop</h4>
          </div>
        </div>

        <div
          className="
  flex flex-col md:flex-row
  gap-5
  max-w-7xl
  mx-auto
  px-4
"
        >
          {shopCategories.map((cat) => (
            <Cloth key={cat.id} data={cat} />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-y-6 max-w-7xl mx-auto items-center mt-12 md:flex md:flex-row md:max-w-262.5 md:mx-20">
        <h3 className="text-second-text text-sm font-bold">
          Showing all {total} Results
        </h3>
        <div className="flex items-center gap-4">
          <h4 className="text-second-text text-sm font-bold">Views: </h4>
          <div className="border rounded-[5px] p-4 border-light2-gray">
            <LayoutGrid className="text-dark-bg " size={16} />
          </div>
          <div className="border rounded-[5px] p-4 border-light2-gray">
            <ListChecks className="text-second-text" size={16} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter"
            className="h-12.5 px-4 py-2 text-sm font-medium text-second-text bg-gray-100 rounded-md focus:outline-none"
          />
          <Dropdown
            options={sortOptions}
            value={pendingSort}
            onChange={setPendingSort}
          />
          <ButtonCta onClick={() => setSort(pendingSort)}>Filter</ButtonCta>
        </div>
      </div>

      {/* shop products */}
      <div
        className="
  mx-auto
  mt-15
  w-full
  max-w-5xl
  px-4
  flex flex-col gap-y-6
  md:grid md:grid-cols-4 md:gap-4
"
      >
        {currentProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded text-sm disabled:opacity-40"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(
            Math.max(currentPage - 2, 0),
            Math.max(currentPage - 2, 0) + 3
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`
          px-3 py-2 border rounded text-sm
          ${
            currentPage === page
              ? "bg-header-turkuaz text-white border-[#E9E9E9]"
              : "hover:bg-gray-100 text-second-text"
          }
        `}
            >
              {page}
            </button>
          ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border rounded text-sm disabled:opacity-40"
        >
          Next
        </button>
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

export default ShopPage;
