
import ButtonCta from "../components/ButtonCta";



const CallToBuy = ({data}) => {
  return (
    <section className=" md:max-w-7xl mx-auto px-4 py-20 flex flex-col-reverse justify-center items-center font-montserrat  md:flex md:flex-row"> 
    <img src={data.src} alt="" className=" md:max-w-150  object-cover"/>


    <div className="text-center relative  flex flex-col items-center md:flex md:items-start"> 

      <p className="font-bold text-base text-muted mb-8">{data.season}</p> 
      <h2 className="font-bold text-[40px] leading-12.5 text-logo-blue max-w-80 md:max-w-93.75 mb-8 text-left">{data.title}</h2>
      <p className="font-normal text-xl text-second-text mb-8 max-w-80 md:max-w-93.75 text-left">{data.description}</p>
      <div className="flex flex-col gap-4 md:flex md:flex-row">
      <ButtonCta className="absolute bottom-3 left-3">BUY NOW</ButtonCta>
      <ButtonCta className="absolute bottom-3 left-3 bg-white text-success">READ MORE</ButtonCta>
      </div>
    </div>
    
    </section>    )
    }


    export default CallToBuy;