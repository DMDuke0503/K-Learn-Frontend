const Header = () => {
    return (
        <div className="h-[70px] flex flex-row items-end px-20" style={{boxShadow: "0px 4px 4px 0px #00000040"}}>
            <img src="/logo.png" alt="" style={{width: 70, height: "auto"}}/>
            <p className="font-montserrat text-4xl font-bold py-[5px]" style={{color: "#FCD24F"}}>K-LEARN</p>
        </div>
    )
}

export default Header;