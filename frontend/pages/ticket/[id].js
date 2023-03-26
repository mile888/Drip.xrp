import { useRouter } from "next/router";
import { Airplay, Ticket, CheckFat } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQRCode } from 'next-qrcode';




export default function TicketEvent(props) {
  
    const router = useRouter()
    const { id } = router.query
    const [verified, setVerified] = useState(false)
    const { Image } = useQRCode();

    

    useEffect(() => {
        // download all tickets, which are static for the moment
        if(id !== "ae7k4hvbKdtcKkwt"){
          setVerified(false)
        }else{
          setVerified(true)
        }
          
    }, [id])
  
  return (
   <div className="w-full h-screen bg-gradient-to-b from-[#749DF0]  to-[#F8C8F2] flex justify-center items-center">
      <div className="w-[80vw] h-[80vh] bg-gradient-to-r from-[#000052] via-[#310f75]
                     to-[#5900B5] shadow-2xl shadow-[#7501a7bc] rounded-lg relative
                     ">

        <div className="h-[10%] flex items-center justify-between">
          <div className="flex items-center gap-2 ml-4">
            <Airplay size={32} weight="fill" color="#E3E0F5"/>
            <p className="flex text-[#E3E0F5] text-xl font-medium "><Link href={"/"}>drip</Link></p>
          </div>
        </div>

        {
          verified ?
          <div className="h-[80%] flex justify-center">
            <div className="h-[94%] w-[27%] rounded-3xl bg-gradient-to-b from-[#33373D] to-[#191A21] shadow-2xl shadow-[#191A21] background-animate">
              {/* phone */} 
              <div className="flex justify-center mt-10">
              <Image
                  text={props.url || "ae7k4hvbKdtcKkwt"}
                  alt="qr"
                  options={{
                    type: 'image/jpeg',
                    quality: 0.3,
                    level: 'M',
                    margin: 3,
                    scale: 4,
                    width: 200,
                    color: {
                      dark: '#010599FF',
                      light: '#FFBF60FF',
                    },
                  }}
                />
              </div>
              
              <p className="flex justify-center text-white text-xl mt-20">
                Scan Me
              </p>
            </div>
          </div>
          :
          <div className="h-[80%] flex justify-center text-[#95c93a]">
            {id} non verified
          </div>
        }
        
    

        <div className="justify-center absolute bottom-0 w-full h-[12%]">
          <div className="h-5 w-[80%] border-t-2 border-[#003A84] rounded-full mx-auto">

          </div>
          <div className="flex justify-center items-center gap-2">
            <Ticket size={40} weight="fill" color="#95c93a"/>
            <p className="flex text-[#E3E0F5] text-lg font-medium ">T I C K E T</p>
          </div>
        </div>
      </div>
   </div>
  )
}
