
function Footer() {
    const sMediaIcons = [
        "fa-brands fa-facebook-f",
        "fa-brands fa-x-twitter",
        "fa-brands fa-instagram",
        "fa-brands fa-linkedin-in"
    ]
    return (
        <div className="bg-primary h-[230px] md:h-[200px] mt-[50px]">
            <div className="pt-[50px] pb-[20px] flex justify-center gap-[20px] border-b-[1px] mx-[100px]">
                {
                    sMediaIcons.map((icon,key)=>(
                        <span key={key} className="bg-gray-100 min-w-[40px] min-h-[40px] rounded-[50%]
                        flex justify-center items-center cursor-pointer hover:bg-primary
                        hover:text-white shadow-md transition-[all_0.3s]">
                            <i className={`${icon}`}></i>
                        </span>
                    ))
                }
            </div>
            <p className="text-white pt-[20px] text-center">&copy; 2024 H books. All rights reserved.</p>
        </div>
    )
}

export default Footer
