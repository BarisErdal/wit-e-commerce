import ButtonCta from "../components/ButtonCta";
import { teamMembers } from "../data/team";
import TeamCard from "../components/TeamCard";
import { brandsData } from "../data/data";

const numbersOfPartners = [
  {
    nums: "15K",
    text: "Happy Customers",
  },
  {
    nums: "150K",
    text: "Monthly Visitors",
  },
  {
    nums: "15",
    text: "Countries Worldwide",
  },
  {
    nums: "100+",
    text: "Top Partners",
  },
];
const AboutUsPage = () => {
  const firstThree = teamMembers.slice(0, 3);
  return (
    <div className="mt-25 md:mt-5">
      <div className="flex flex-col px-17.5 gap-y-10 md:flex md:flex-row md:justify-center md:items-center">
        <div className="md:max-w-110">
          <h2 className=" font-montserrat text-[40px] font-bold text-dark-bg text-center mb-2.5 md:mb-10">
            ABOUT US
          </h2>
          <p className="text-second-text font-montserrat text-[20px] font-normal tracking-wide md:mb-7">
            We know how large objects will act, but things on a small scale just
            do not act that way.
          </p>
          <ButtonCta variant="primary" className="mx-10">
            Get Quote Now
          </ButtonCta>
        </div>
        <img
          src="/aboutus/background.png"
          alt="bg"
          className="w-full md: max-w-170"
        />
      </div>

      <div className="font-montserrat p-18 md:max-w-254.5 md:mx-auto ">
        <p className="text-danger text-sm font-medium mb-6">Problems trying</p>
        <div className="md:flex md:flex-row md:gap-x-7">
          <h3 className="font-bold text-2xl text-dark-bg leading-8 mb-21">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h3>

          <p className="font-normal text-sm text-second-text">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-20 items-center md:flex md:flex-row md:gap-x-20 md:justify-center">
        {numbersOfPartners.map((p, i) => (
          <div key={i}>
            <h3 className="font-bold text-dark-bg text-[58px] leading-20">
              {p.nums}
            </h3>
            <p className="text-base font-bold text-second-text">{p.text}</p>
          </div>
        ))}
      </div>

      {/* media-video */}
      <div className="p-10 md:p-50">
        <img
          src="/aboutus/media.png"
          alt=""
          className="w-full object-cover rounded-3xl aspect-square md:aspect-video"
        />
      </div>

      {/*Meet OUR TEAM SECTION */}
      <div className="font-montserrat flex flex-col px-11 text-center md:max-w-150 md:mx-auto mb-15">
        <h3 className="font-bold text-[40px] text-dark-bg ">Meet Our Team</h3>
        <p className="text-second-text font-normal text-sm">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics{" "}
        </p>
      </div>

      <div className="px-20 flex flex-col gap-y-10 md:grid md:grid-cols-3 md:gap-5 md:max-w-258.5 md:mx-auto">
        {firstThree.map((t, i) => (
          <TeamCard key={i} src={t.src} name={t.name} title={t.title} />
        ))}
      </div>

      <div className="bg-light-gray my-15 pt-3 ">
        <div className="font-montserrat flex flex-col px-11 text-center md:max-w-150 md:mx-auto mb-15 mt-15">
          <h3 className="font-bold text-[40px] text-dark-bg ">
            Big Companies Are Here
          </h3>
          <p className="text-second-text font-normal text-sm">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
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
        pb-15
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
      </div>

      {/* bottom banner */}

      <div className="py-25 bg-banner-blue font-montserrat text-white md:flex md:py-0 md:flex-row md:justify-between">
        <div className="flex flex-col gap-y-6 items-center justify-center md:max-w-120 md:mx-auto">
        <h4 className="font-bold text-base text-center ">WORK WITH US</h4>
        <h3 className="font-bold text-[40px]  text-center ">Now Let’s grow Yours</h3>
        <p className="font-normal text-sm  text-center mb-">
          The gradual accumulation of information about atomic and small-scale
          behavior during the first quarter of the 20th{" "}
        </p>
        <ButtonCta variant="outline" className="max-w-50">Button</ButtonCta>
        </div>

        <img src="/aboutus/banner.jpg" alt="" className="hidden md:flex md:h-full" />
      </div>
    </div>
  );
};

export default AboutUsPage;
