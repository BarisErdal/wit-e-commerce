const Button =({ children,onClick })=> {



    return <button onClick={onClick} className="absolute bottom-6 left-6  bg-white hover:bg-amber-200 px-6 py-2 text-sm font-bold">{children}</button>
}

export default Button;