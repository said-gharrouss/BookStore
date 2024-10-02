import { useEffect, useState } from "react"
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";

function Profile() {
    const [up,setUp] = useState(false);
    const [currentSection,setCurrentSection] = useState("Personal Information");

    const handleUp = () => {
        setUp(prevState => !prevState);
    }
    const handleCurrentSection = () => {
        setCurrentSection(prevState => prevState === "Personal Information" ? "Contact Information" : "Personal Information")
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);




    return (
        <div className="container mx-auto  min-h-[100vh] pt-[90px] px-[20px]">
            <div className="flex flex-col gap-[25px] sm:flex-row sm:gap-[0px] sm:justify-between sm:items-center">
                <h2 className="font-bold text-[30px] title-style">Profile Details</h2>
                <div className="relative py-[5px] w-[180px] border-[1px] border-gray-400 rounded-[6px]
                flex justify-center gap-[10px] items-center text-[15px] hover:border-black transition-[0.3s] cursor-pointer
                self-end md:self-auto"
                onClick={() => handleUp()}>
                    <span>{currentSection}</span>
                    <span className={`${up && "filters_icon_clicked"} transition-[0.3s]`}>
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                    {
                        up &&
                        <div className="absolute bottom-[-40px] left-0 w-full border-[1px] border-gray-400 hover:bg-gray-100
                        py-[5px] px-[10px] rounded-[6px]"
                        onClick={() => handleCurrentSection()}>
                            {currentSection === "Personal Information" ? "Contact Information" : "Personal Information"}
                        </div>
                    }
                </div>
            </div>
            {
                currentSection === "Personal Information" ? <PersonalInfo/> : <ContactInfo/>
            }
        </div>
    )
}

export default Profile
