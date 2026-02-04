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
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import { logout } from "../redux/actions/clientActions";

export default function Header() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.client.user);
  const dispatch = useDispatch();
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const hasToken = Boolean(user?.token || localStorage.getItem("token"));

  const categories = useSelector((s) => s.product.categories);
  const women = categories.filter((c) => c.gender === "k");
  const men = categories.filter((c) => c.gender === "e");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="hidden md:flex bg-dark-bg h-16  text-white justify-between items-center px-6 font-bold font-montserrat">
        <div className="flex items-center">
          <Phone size={16} /> <p className="ml-3">(225) 555-0118</p>
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
            <button className="relative text-header-turkuaz">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-success text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </button>

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
