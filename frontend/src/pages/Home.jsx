import { useState } from 'react';
import landingImage from '../assets/images/main_imag.svg';
import Books from '../components/books/Books';
import CustomerReview from '../components/customerReview/CustomerReview';
import Contact from './Contact';
function Home() {
    const [up,setUp] = useState();

    window.onscroll = () =>{
        if(window.scrollY > 150){
            setUp(true);
        } else {
            setUp(false);
        }
    }

    const handleButtonUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <>
        <section className="py-[80px] sm:py-[120px] lg:py-[96px] sm:mt-0 bg-primary" id='home'>
            <div className="container mx-auto flex items-center" id='hero'>
                <div className="lg:flex-[1.5] lg:gap-[200px] mx-auto">
                    <p className='w-[250px] sm:w-[400px] lg:w-[600px] mx-auto sm:mx-0 text-center sm:text-left text-[20px] lg:text-[30px] font-bold text-white'>
                        Welcome to your online bookstore! Find your next favorite read with ease and convenience
                    </p>
                    <a href='#books'>
                        <button className='w-[180px] sm:w-[250px] h-[40px] lg:h-[50px] text-[12px] sm:text-[18px]
                        ml-[30px] sm:ml-0 bg-white text-primary mt-[20px]  rounded-[6px] font-semibold shadow-lg button-hover'>
                            Explore our collection now!
                        </button>
                    </a>
                </div>
                <div className="flex-1 hidden lg:block landing-image-animation">
                    <img src={landingImage} className='max-h-[400px] max-w-[400px]' alt="" />
                </div>
            </div>
        </section>

        <section className='container py-[150px] mx-auto' id="books">
            <Books/>
        </section>

        <section className='container pb-[150px] mx-auto' id='reviews'>
            <CustomerReview/>
        </section>
        <section className="container pb-[150px] mx-auto " id="contact">
            <Contact/>
        </section>
        {
            up &&
            <button onClick={() => handleButtonUp()} className="w-[38px] h-[38px] bg-primary text-white font-bold fixed bottom-[10px] right-[10px]
            rounded-[50%] text-[20px] shadow-lg hover:bg-white hover:text-primary transition-[0.3s] z-[500]">
                <i className="fa-solid fa-arrow-up"></i>
            </button>
        }
        </>
    )
}

export default Home
