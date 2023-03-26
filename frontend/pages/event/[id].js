import { useRouter } from "next/router";
import { Airplay, Ticket } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Qr from "./qr-code";
import Link from "next/link";



export default function Event() {
  
    const router = useRouter()
    const [text, setText] = useState("Pay")
    const { id } = router.query

    useEffect(() => {
        // download all tickets, which are static for the moment

    }, [])

    const handlePay = async (e) => {
        e.preventDefault()
        setText("Paying...")
        let address = e.target.address.value
        let email = e.target.email.value

        let url = "http://127.0.0.1:5000/event/payed"
        
        const requestOptions = {
            method: 'POST',
            headers: { "accept": "application/json", 'Content-Type': 'application/json' },
            body: JSON.stringify({  address: address, email: email, id_web: "event_1" })
        };
        console.log(url)
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        
        router.push("/status")
    }
  
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

        <div className="h-[80%] flex items-center justify-between">
            <div className="flex flex-col ml-40">
                <Qr url="http://localhost:3000/create" size={300}/>
                <p className="text-white mx-auto mt-5">Create an account</p>
            </div>
            
            
            <div className="mr-40">
                <form className=" flex flex-col" onSubmit={handlePay}>
                    <p className="text-yellow-500 text-xl font-semibold mx-auto mt-5">Buy your ticket</p>
                    <input className="text-white w-[300px] bg-[#95c93a6e] mt-5 h-9 focus:outline-none 
                                            text-center font-semibold hover:border hover:border-yellow-500"
                                placeholder="Private-Key" required name="address"></input>
                    <input className="text-white w-[300px] bg-[#95c93a6e] mt-5 h-9 focus:outline-none 
                                        text-center font-semibold hover:border hover:border-yellow-500"
                            placeholder="Email address" required name="email"></input>

                    <button className="text-white w-[300px] bg-yellow-500 mt-16 h-9 focus:outline-none 
                                                            text-center font-semibold "
                                                >{text}</button>
                    
                </form>
                <form method="POST">
                    <button className="w-[300px] text-yellow-500 mt-5 h-9 border border-yellow-500 
                                                                text-center font-semibold "
                                
                                                >Refund</button>
                </form>
            </div>
          

        </div>

        <div className="justify-center absolute bottom-0 w-full h-[12%]">
          <div className="h-5 w-[80%] border-t-2 border-[#003A84] rounded-full mx-auto">

          </div>
          <div className="flex justify-center items-center gap-2">
            <Ticket size={40} weight="fill" color="#95c93a"/>
            <p className="flex text-[#E3E0F5] text-lg font-medium ">event {" "+id}</p>
          </div>
        </div>
      </div>
   </div>
  )
}
