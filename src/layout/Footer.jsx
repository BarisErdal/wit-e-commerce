import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col p-11 mx-auto bg-light-gray md:flex md:flex-row md:justify-between md:px-30">
        <h3 className="font-bold font-montserrat text-2xl text-logo-blue mb-3">
          Bandage
        </h3>
        <div className="flex gap-5 md:max-h-7">
          <img src="./facebook.png" alt="facebook" />
          <img src="./instagram.png" alt="instagram" />
          <img src="./twitter.png" alt="twitter" />
        </div>
      </div>

      <div className="font-montserrat text-sm font-bold text-second-text p-11 mx-auto md:px-30 md:flex md:flex-row md:justify-between">
        <div className="flex flex-col gap-2.5 mb-8 ">
          <h5 className="text-base text-logo-blue mb-2.5">Company Info</h5>
          <p>About Us</p>
          <p>Carrier</p>
          <p>We are hiring</p>
          <p>Blog</p>
        </div>

        <div className="flex flex-col gap-2.5 mb-8">
          <h5 className="text-base text-logo-blue mb-2.5">Legal</h5>
          <Link to='/team'>Team Page</Link>
          <p>Carrier</p>
          <p>We are hiring</p>
          <p>Blog</p>
        </div>
        <div className="flex flex-col gap-2.5 mb-8">
          <h5 className="text-base text-logo-blue mb-2.5">Features</h5>

          <p>Business Marketing</p>
          <p>User Analytic</p>
          <p>Live Chat</p>
          <p>Unlimited Support</p>
        </div>
        <div className="flex flex-col gap-2.5 mb-8">
          <h5 className="text-base text-logo-blue mb-2.5">Resources</h5>
          <p>IOS & Android</p>
          <p>Watch a Demo</p>
          <p>Customers</p>
          <p>API</p>
        </div>

        {/*Get in touch */}
        <div className="font-montserrat">
          <h5 className="text-base text-logo-blue mb-4">Get In Touch</h5>
          <div className="flex mb-1">
            <input
              type="email"
              className="bg-button-gray text-second-text h-14.5 w-51  rounded-l-lg"
              placeholder="     Your Email"
            />
            <button className="bg-header-turkuaz text-white text-sm h-14.5 w-29.25  rounded-r-lg hover:bg-logo-blue">
              Subscribe
            </button>
          </div>
          <p className="font-normal text-xs text-second-text">
            Lore imp sum dolor Amit
          </p>
        </div>
      </div>
<div className="flex  p-7 mx-auto items-center justify-center bg-light-gray">

    <h6 className="text-center font-bold text-sm text-second-text max-w-48.25">Made With Love By 
Finland All Right Reserved </h6>
</div>

    </footer>
  );
};

export default Footer;
