import { Airplay, Ticket, MapPin, Pizza } from "@phosphor-icons/react";
import Head from "next/head";
import Link from 'next/link'
import { useEffect, useState } from "react";
import Detail from "../cards/eventCard";
import Detail2 from "../cards/eventCard2";
import Detail3 from "../cards/eventCard3";

export default function Home() {
  
  useEffect(() => {
    // download all tickets, which are static for the moment

  }, [])
  
  return (
   <div className="w-full h-screen bg-gradient-to-b from-[#749DF0]  to-[#F8C8F2] flex justify-center items-center">
    <Head>
      <title>drip</title>
    </Head>
      <div className="w-[80vw] h-[80vh] bg-gradient-to-r from-[#000052] via-[#310f75]
                     to-[#5900B5] shadow-2xl shadow-[#7501a7bc] rounded-lg relative
                     ">

        <div className="h-[10%] flex items-center justify-between">
          <div className="flex items-center gap-2 ml-4">
            <Airplay size={32} weight="fill" color="#E3E0F5"/>
            <p className="flex text-[#E3E0F5] text-xl font-medium "><Link href={"/"}>drip</Link></p>
          </div>

        </div>

        <div className="h-[80%] flex items-center justify-center gap-8">

          <Detail public_key="key"
            />
          <Detail2 
            />
          <Detail3 
            />

        </div>

        <div className="justify-center absolute bottom-0 w-full h-[12%]">
          <div className="h-5 w-[80%] border-t-2 border-[#003A84] rounded-full mx-auto">

          </div>
          <div className="flex justify-center items-center gap-2">
            <Ticket size={32} weight="fill" color="#E3E0F5"/>
            <p className="flex text-[#E3E0F5] text-lg font-medium ">Events</p>
          </div>
        </div>
      </div>
   </div>
  )
}
