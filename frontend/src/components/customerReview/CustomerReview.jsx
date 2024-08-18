import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react";
function CustomerReview() {
    const [width,setWidth] = useState();
    const containerRef = useRef();
    const reviews = [
    {
        name: "Emma Johnson",
        comment: "A fantastic selection of books! I found exactly what I was looking for."
    },
    {
        name: "Carlos Mendoza",
        comment: "Gran variedad de libros y excelente servicio. ¡Muy recomendable!"
    },
    {
        name: "Marie Dubois",
        comment: "Une sélection de livres impressionnante et un service client exceptionnel."
    },
    {
        name: "Ahmed Al-Farsi",
        comment: "اختيار رائع من الكتب وخدمة العملاء ممتازة."
    },
    {
        name: "Olivia Smith",
        comment: "Easy to navigate and great prices. I'll definitely be coming back."
    },
    {
        name: "Lucía Gómez",
        comment: "El sitio web es muy intuitivo y los precios son muy buenos. Volveré seguro."
    },
    {
        name: "Jean Dupont",
        comment: "Site très facile à utiliser avec de nombreux livres intéressants à des prix compétitifs."
    },
    {
        name: "Fatima Zahra",
        comment: "موقع سهل الاستخدام ويحتوي على كتب رائعة بأسعار تنافسية."
    },
    {
        name: "Liam Brown",
        comment: "I love the variety of genres available. A great place for book lovers."
    },
    {
        name: "Ana Rodríguez",
        comment: "Me encanta la variedad de géneros disponibles. Un gran lugar para los amantes de los libros."
    },
    {
        name: "Sophie Martin",
        comment: "J'adore la variété de genres disponibles. Un endroit idéal pour les passionnés de livres."
    },
    {
        name: "Mohammed Hassan",
        comment: "أحببت تنوع الأنواع المتاحة. مكان رائع لعشاق الكتب."
    },
    {
        name: "Noah Williams",
        comment: "Great experience from start to finish. The delivery was fast and the books were in perfect condition."
    },
    {
        name: "María Fernández",
        comment: "Una gran experiencia de principio a fin. La entrega fue rápida y los libros estaban en perfecto estado."
    },
    {
        name: "Claire Lefevre",
        comment: "Une expérience formidable du début à la fin. La livraison a été rapide et les livres étaient en parfait état."
    }
    ];

    useEffect(() => {
        const containerWidth = containerRef.current.scrollWidth;
        const sliderWidth = containerRef.current.offsetWidth;
        setWidth(containerWidth - sliderWidth);
    },[])

    return (
        <>
            <h2 className="title-style text-[30px]  font-bold">Reviews({reviews.length})</h2>
            <div ref={containerRef} className="overflow-hidden flex gap-[30px] mt-[40px] reviews-slide-animation">
                <motion.div className=" flex gap-[30px] relative z-[5] "
                style={{ cursor: "grab" }}
                drag="x"
                dragConstraints = {{
                    right : 0,
                    left : -width,
                }}
                whileDrag={{
                    cursor : "grabbing",
                }}
                >
                    {
                        reviews.map((item,key) =>(
                            <div key={key} className="bg-lightwhite min-w-[320px] sm:min-w-[380px]  max-h-[240px] overflow-auto p-[20px] rounded-[4px] text-gray-500 border-[2px] border-primary shadow-md">
                                <h2 className="text-[22px] font-bold mb-[10px]">{item.name}</h2>
                                <p className="">{item.comment}
                                </p>
                            </div>
                        ))
                    }
                </motion.div>
            </div>
        </>
    )
}

export default CustomerReview
