import emailjs from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
function Contact() {

    const [showAlert,setShowAlert] = useState(false);

    const sendEmailSchema = z.object({
        full_name : z.string().nonempty("full_name is required"),
        email : z.string().email("invalid email").nonempty("email is required"),
        message : z.string().nonempty("message is required"),
    })

    const {register,handleSubmit,formState:{errors},setValue} = useForm({
        mode : "onSubmit",
        resolver : zodResolver(sendEmailSchema),
    })


    const sendemail = (data) => {
        emailjs
        .send('service_tc845cm', 'template_day1fn9', {...data}, {
            publicKey: 'qUgXRySma0K4QssGW',
        })
        .then(
            () => {
            setValue("full_name","");
            setValue("email","");
            setValue("message","");
            setShowAlert(true);
            setTimeout(()=> {
                setShowAlert(false);
            },2000)
        },
        (error) => {
            console.log('FAILED...', error.text);
        },
        );
    }

    return (
        <>
            <h2 className="title-style text-[30px] font-bold">Contact Us</h2>
            <div className="flex flex-col-reverse md:flex-row items-center  px-[20px] mt-[40px] gap-[60px] lg:gap-[100px]">
                <div className="flex-1 flex flex-col gap-[20px]">
                    <div className="bg-lightwhite border-[2px] border-primary shadow-sm p-[20px] text-center rounded-[10px] text-gray-500">
                        <div className="text-[25px] text-primary">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <h3 className="my-[10px] font-bold">Our address</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
                    </div>
                    <div className="flex gap-[20px]">
                        <div className="bg-lightwhite border-[2px] border-primary shadow-sm p-[20px]   text-center flex-1 rounded-[10px] text-gray-500">
                            <div className="text-[25px] text-primary">
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <h3 className="my-[10px] font-bold">Send us an email</h3>
                            <p>test@gmail.com</p>
                        </div>
                        <div className="bg-lightwhite border-[2px] border-primary shadow-sm p-[20px] text-center flex-1 rounded-[10px] text-gray-500">
                            <div className="text-[25px] text-primary">
                                <i className="fa-solid fa-phone-volume"></i>
                            </div>
                            <h3 className="my-[10px] font-bold">Call us</h3>
                            <p>(+212) 0606060606</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:flex-1 rounded-[4px]">
                    <form action="" className="flex flex-col gap-[15px]" onSubmit={handleSubmit(sendemail)}>
                        <input type="text"  className="w-full min-h-[40px] outline-none px-[20px] rounded-[30px] bg-lightwhite border-[2px] border-primary shadow-sm
                        font-bold"
                        placeholder="Entrer le nom" {...register("full_name")} />
                        {errors.full_name && <span className='text-red-500 font-bold'>{errors.full_name.message}</span> }
                        <input type="email" className="w-full  outline-none px-[20px] rounded-[30px] min-h-[40px] bg-lightwhite border-[2px] border-primary shadow-sm font-bold"
                        placeholder="Entrer l'email" {...register("email")}/>
                        {errors.email && <span className='text-red-500 font-bold'>{errors.email.message}</span> }
                        <textarea className="w-full outline-none resize-none p-[20px] h-[180px] rounded-[10px] bg-lightwhite border-[2px] border-primary shadow-sm font-bold" placeholder="Message" {...register("message")}></textarea>
                        {errors.message && <span className='text-red-500 font-bold'>{errors.message.message}</span> }
                        <div>
                            <input type="submit" value={"Send"} className="min-h-[40px] block bg-primary text-white  cursor-pointer w-full rounded-[30px] shadow-sm"/>
                        </div>
                    </form>
                </div>
            </div>
            <div className={`${showAlert ? "bottom-[30px]" : "bottom-[-100px]"} fixed right-[10%] bg-white border-green-500 border-[2px] p-[10px] rounded-[6px] text-[10px] sm:text-[13px]  transition-[0.3s]`}>
                <p className='text-green-600 font-semibold mb-[5px]'>Your message has been sent successfully</p>
                <span className='text-gray-500 flex justify-center'>Thank you for reaching out</span>
            </div>
        </>
    )
}

export default Contact
