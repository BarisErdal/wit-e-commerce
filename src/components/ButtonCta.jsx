const ButtonCta =({ children,onClick })=> {



    return (
   <button onClick={onClick} className="border border-transparent rounded-[5px] px-6 py-3 bg-success text-white font-semibold hover:bg-white hover:text-success transition hover:border">
              {children}
            </button>

    )
}

export default ButtonCta;