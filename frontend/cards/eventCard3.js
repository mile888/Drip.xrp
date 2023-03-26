import { Airplay, Barbell, MapPin, Pizza } from "@phosphor-icons/react";
import {useRouter} from "next/router";

export default function Detail3(props){
    const router = useRouter()

    const goEvent3 = () => {
        router.push("/event")
    }
    return (
        
            <div onClick={goEvent3} className="h-[60%] w-[25%] rounded-xl shadow-xl relative border-b-2 border-[#ffffff00] hover:border-b-2 hover:border-white
                        bg-gradient-to-br from-[#0057C4] to-[#28A2BA] background-animate hover:cursor-pointer">
                
                <div className="flex items-center py-2 px-1">
                    <div className="">
                        <MapPin size={32} weight="fill" color="#E3E0F5"/>
                    </div>
                    <div className="text-[#E3E0F5]">
                        <p>Berlin, Germany</p>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Barbell size={120} weight="fill" color="#E3E0F5"/>
                </div>
                <div className="mt-10">
                    <p className="flex justify-center text-[#ffd641] text-2xl font-bold ">Enterpreneur tour...</p>
                </div>
                <div className=" ">

                </div>
                <div className="flex justify-between items-center absolute bottom-0 h-[15%] w-full
                                border-t-2 border-t-[#1f79da] ">
                    <div className="ml-5 text-[#acabb4]">
                    21/04/2023
                    </div>
                    <div className="mr-5 text-[#3cbe93] font-bold">
                    XRP 155
                    </div>
                </div>
            </div>
       
    )
}