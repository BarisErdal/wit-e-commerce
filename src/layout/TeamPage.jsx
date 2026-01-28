import TeamCard from "../components/TeamCard";
import { teamMembers } from "../data/team";

const TeamPage = () => {
  return (
    <div className=" md:mt-15">
      <div className="p-20 ">
        <h2 className="font-montserrat text-[40px] font-bold text-dark-bg text-center mb-2.5">
          Meet Our Team
        </h2>
        <p className="text-sm font-normal font-montserrat text-second-text text-center">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics{" "}
        </p>
      </div>

      <div className="px-20 flex flex-col gap-y-10 md:grid md:grid-cols-4 md:gap-5" >
        {teamMembers.map((t, i) => (
          <TeamCard key={i} src={t.src} name={t.name} title={t.title} />
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
