import  ProductCard from "../components/ProductCard";

const Bestsellers = () => {

    const products = [
        {
            id: 1, 
            name: "Product 1",
            detail: "This is the detail of product 1",
            price: "$29.99",
            reducedPrice: "$19.99",
            image: "/product1.jpg" },
         {
            id: 2, 
            name: "Product 2",
            detail: "This is the detail of product 2",
            price: "$39.99",
            reducedPrice: "$19.99",
            image: "/product2.jpg" },
         {
            id: 3, 
            name: "Product 3",
            detail: "This is the detail of product 3",
            price: "$29.99",
            reducedPrice: "$19.99",
            image: "/product3.jpg" },
         {
            id: 4, 
            name: "Product 4",
            detail: "This is the detail of product 4",
            price: "$29.99",
            reducedPrice: "$19.99",
            image: "/product4.jpg" },
         {
            id: 5, 
            name: "Product 5",
            detail: "This is the detail of product 5",
            price: "$29.99",
            reducedPrice: "$19.99",
            image: "/product5.jpg" },
         {
            id: 6, 
            name: "Product 6",
            detail: "This is the detail of product 6",
            price: "$29.99",
            reducedPrice: "$19.99",
            image: "/product6.jpg" },
         {
            id: 7, 
            name: "Product 7",
            detail: "This is the detail of product 7",
            price: "$29.99",
            reducedPrice: "$19.99",
            image: "/product7.jpg" },
         {
            id: 8, 
            name: "Product 8",
            detail: "This is the detail of product 8",
            price: "$29.99",
            reducedPrice: "$19.99",
            image: "/product8.jpg" }]    
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">  
    
       <div className="text-center mb-12">
        <h2 className="text-2xl font-bold tracking-wide">
          BESTSELLER PRODUCTS
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <div className="md:max-w-5xl md:grid md:grid-cols-4 gap-4 flex flex-col items-center">
    {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
     </section>                       
    );

    }
    
    
export default Bestsellers;