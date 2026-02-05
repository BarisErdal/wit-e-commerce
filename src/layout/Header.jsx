import { useState } from "react";
import {
  User,
  Search,
  ShoppingCart,
  Menu,
  X,
  Heart,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Phone, Mail
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import { logout } from "../redux/actions/clientActions";

export default function Header() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.client.user);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const hasToken = Boolean(user?.token || localStorage.getItem("token"));

  const categories = useSelector((s) => s.product.categories);
  const women = categories.filter((c) => c.gender === "k");
  const men = categories.filter((c) => c.gender === "e");
  const cartCount = cart.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="hidden md:flex bg-dark-bg h-16  text-white justify-between items-center px-6 font-semibold font-montserrat">
        <div className="flex items-center">
          <Phone size={16} /> <p className="ml-3">(225) 555-0118</p>
          <Mail  size={16} className='ml-4 font-normal mr-1'/><p>michelle.rivera@example.com</p>
        </div>
        <p>Follow Us and get a chance to win 80% off</p>
        <div className="flex items-center gap-4">
          <p>Follow Us : </p>
          <Instagram size={18} />
          <Youtube size={18} />
          <Facebook size={18} />
          <Twitter size={18} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold font-montserrat text-logo-blue"
          >
            Bandage
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-success">
              Home
            </Link>

            <div className="relative group">
              <Link to="/shop">Shop</Link>

              <div className="absolute hidden group-hover:flex bg-white shadow-lg p-6 gap-x-30">
                {/* Kadın */}
                <div className=" flex flex-col gap-y-4">
                  <h4 className="font-semibold mb-5">Kadın</h4>
                  {women.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop/kadin/${cat.code.split(":")[1]}/${cat.id}`}
                      className="block text-light3-gray  hover:text-dark-bg mb-1"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>

                {/* Erkek */}
                <div className=" flex flex-col gap-y-4">
                  <h4 className="font-semibold mb-5">Erkek</h4>
                  {men.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop/erkek/${cat.code.split(":")[1]}/${cat.id}`}
                      className="block text-light3-gray hover:text-dark-bg mb-1"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/aboutus" className="hover:text-success">
              About
            </Link>
            <a href="#" className="hover:text-success">
              Blog
            </a>
            <a href="#" className="hover:text-success">
              Pages
            </a>
            <Link to="/contact" className="hover:text-success">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              {user?.email ? (
                <div className="flex items-center gap-2">
                  <Gravatar
                    email={user.email}
                    size={40}
                    className="rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="text-header-turkuaz  items-center gap-1 hidden md:flex"
                >
                  Login/Register
                  <User size={20} />
                </Link>
              )}

              {hasToken && (
                <button
                  className="hover: cursor-pointer "
                  onClick={() => dispatch(logout())}
                >
                  Log Out
                </button>
              )}
            </div>

            {/* Search */}
            <button className="text-header-turkuaz ">
              <Search size={20} />
            </button>

            {/* Cart */}
            <div className="relative group">
              <button className="relative text-header-turkuaz">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-success text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="absolute right-0 mt-2 hidden group-hover:block z-20 w-72 rounded-md border border-dark-bg bg-white shadow-lg">
                <div className="px-4 py-3 border-b text-sm font-semibold text-logo-blue">
                  Shopping Cart
                </div>
                {cart.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-second-text">
                    Cart is empty
                  </div>
                ) : (
                  <>
                    <div className="max-h-80 overflow-auto">
                      {cart.map((item) => (
                        <div
                          key={item.product?.id}
                          className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0"
                        >
                          <img
                            src={item.product?.images?.[0]?.url || "/shop/p1.jpg"}
                            alt={item.product?.name || "Product"}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-dark-bg">
                              {item.product?.name || "Product"}
                            </p>
                            <p className="text-xs text-second-text">
                              {item.count} x {item.product?.price}₺
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 px-4 py-3 border-t">
                      <Link
                        to="/cart"
                        className="flex-1 text-center text-sm font-semibold border border-logo-blue text-logo-blue rounded-md py-2 hover:bg-logo-blue hover:text-white transition-colors"
                      >
                        Sepete Git
                      </Link>
                      <Link
                        to="/checkout"
                        className="flex-1 text-center text-sm font-semibold bg-logo-blue text-white rounded-md py-2 hover:opacity-90 transition-opacity"
                      >
                        Siparişi Tamamla
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button className="text-header-turkuaz">
              <Heart size={20} />
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setOpen(!open)} className="md:hidden">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-4 gap-4 text-sm">
            <Link
              to="/"
              onClick={() => {
                setOpen(false);
              }}
              className="hover:text-success"
            >
              Home
            </Link>

            <div>
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="flex w-full items-center justify-between hover:text-success"
              >
                <span>Shop</span>
                <span>{mobileShopOpen ? "−" : "+"}</span>
              </button>

              {mobileShopOpen && (
                <div className="mt-3 ml-4 flex flex-col gap-4">
                  {/* Kadın */}
                  <div>
                    <p className="font-semibold mb-2">Kadın</p>
                    {women.map((cat) => (
                      <Link
                        key={cat.id}
                      to={`/shop/kadin/${cat.code.split(":")[1]}/${cat.id}`}
                        onClick={() => {
                          setOpen(false);
                          setMobileShopOpen(false);
                        }}
                        className="block text-light3-gray hover:text-dark-bg mb-1"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>

                  {/* Erkek */}
                  <div>
                    <p className="font-semibold mb-2">Erkek</p>
                    {men.map((cat) => (
                      <Link
                        key={cat.id}
                      to={`/shop/erkek/${cat.code.split(":")[1]}/${cat.id}`}
                        onClick={() => {
                          setOpen(false);
                          setMobileShopOpen(false);
                        }}
                        className="block text-light3-gray hover:text-dark-bg mb-1"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/aboutus"
              onClick={() => {
                setOpen(false);
              }}
              className="hover:text-success"
            >
              About
            </Link>
            <a href="#" className="hover:text-success">
              Blog
            </a>
            <a href="#" className="hover:text-success">
              Pages
            </a>
            <Link
              to="/contact"
              onClick={() => {
                setOpen(false);
              }}
              className="hover:text-success"
            >
              Contact
            </Link>
            <div className="flex gap-4 pt-4 border-t">
              {user?.email ? (
                <div className="flex items-center gap-2">
                  <Gravatar
                    email={user.email}
                    size={40}
                    className="rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
              ) : (
                <Link
                  to="/signup"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <User size={18} /> Login/Register
                </Link>
              )}
              <button className="flex items-center gap-2">
                <ShoppingCart size={18} /> Cart
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
