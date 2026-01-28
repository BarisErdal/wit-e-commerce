import ButtonCta from "../components/ButtonCta";

const logos = [
  "/contact/twitter.png",
  "/contact/facebook.png",
  "/contact/instagram.png",
  "/contact/linkedin.png",
];

const ContactPage = () => {
  return (
    <div className="mt-20 md:mt-40 mx-18.5 flex flex-col justify-center items-center gap-y-7.5 text-center md:max-w-150 md:mx-auto">
      <h2 className="font-bold font-montserrat text-[40px] text-dark-bg ">
        Get answers to all your questions.
      </h2>

      <p className="text-xl font-normal font-montserrat text-second-text tracking-wide text-center">
        Problems trying to resolve the conflict between the two major realms of
        Classical physics:{" "}
      </p>

      <ButtonCta variant="primary" className="w-full md:max-w-68">CONTACT OUR COMPANY</ButtonCta>

      <div className="flex gap-8">
        {logos.map((l, i) => (
          <img key={i} src={l} />
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
