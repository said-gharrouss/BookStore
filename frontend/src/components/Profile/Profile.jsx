import { useSelector } from "react-redux"

function Profile() {
    const user = useSelector(state => state.user.infos);
    return (
        <div className=" container mx-auto  min-h-[100vh] pt-[90px] px-[20px]">
            <h1 className="font-bold text-[30px] title-style">Profile Details</h1>
            <div className="mt-[30px] w-[400px] mx-auto bg-[#f1f5f9] p-[20px] rounded-[4px]">
                <ul>
                    <li className="py-[10px] flex gap-[40px]">
                        <span className="font-bold">
                            Name :
                        </span>
                        <span>
                            {user?.name}
                        </span>
                    </li>
                    <li className="py-[10px]  flex gap-[40px]">
                        <span className="font-bold">
                            Email :
                        </span>
                        <span>
                            {user?.email}
                        </span>
                    </li>
                </ul>
                <button className="text-white font-bold bg-green-500 px-[15px] py-[5px] rounded-[4px]
                mt-[20px] text-end">Update</button>
            </div>
        </div>
    )
}

export default Profile
