import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold font-montserrat text-logo-blue">Bandage</div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-success">Home</a>
            <a href="#" className="hover:text-success">Shop</a>
            <a href="#" className="hover:text-success">About</a>
             <a href="#" className="hover:text-success">Blog</a>
              <a href="#" className="hover:text-success">Pages</a>
            <a href="#" className="hover:text-success">Contact</a>
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1 items-end"
          >
            <span className="w-6 h-0.5 bg-black" />
            <span className="w-5 h-0.5 bg-black" />
            <span className="w-4 h-0.5 bg-black" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-4 gap-4 text-sm">
              <a href="#" className="hover:text-success">Home</a>
            <a href="#" className="hover:text-success">Shop</a>
            <a href="#" className="hover:text-success">About</a>
             <a href="#" className="hover:text-success">Blog</a>
              <a href="#" className="hover:text-success">Pages</a>
            <a href="#" className="hover:text-success">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}
