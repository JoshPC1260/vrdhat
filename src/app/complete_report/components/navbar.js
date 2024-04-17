import { useState } from 'react';
import Image from "next/image";
import Link from "next/link"


export default function NavBar() {


  return (
    <div className=''>
        <div className='round-full w-full relative top-[262px]'>
            <Link href={"#cr_page3"}>
                <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Digital Voice Score</button>
                <div className="relative left-10 -top-10 w-[30px]">
                    <Image
                        src={"/digital_voice_icon.svg"}
                        height={400}
                        width={400}
                    />
                </div>
            </Link>
        </div>
        <div className='round-full w-full relative top-[262px] '>
            <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Digital Maps Score</button>
            <div className="relative left-10 -top-10 w-[30px]">
                <Image
                    src={"/digital_maps_icon.svg"}
                    height={400}
                    width={400}
                />
            </div>
            
        </div>
        <div className='round-full w-full relative top-[262px] '>
            <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Social Clarity Score</button>
            <div className="relative left-10 -top-10 w-[30px]">
                <Image
                    src={"/social_icon.svg"}
                    height={400}
                    width={400}
                />
            </div>
            
        </div>
        <div className='round-full w-full relative top-[262px] '>
            <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 text rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Website Authority Score</button>
            <div className="relative left-10 -top-10 w-[30px]">
                <Image
                    src={"/authority_icon.svg"}
                    height={400}
                    width={400}
                />
            </div>
            
        </div>
        <div className='round-full w-full relative top-[262px] '>
            <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 text rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Digital Health Score</button>
            <div className="relative left-10 -top-10 w-[30px]">
                <Image
                    src={"/digital_health_icon.svg"}
                    height={400}
                    width={400}
                />
            </div>
            
        </div>
        <div className='w-full relative top-[262px] '>
            <Link href={"#cr_page1"}>
                <button className='text-gray-500 text-[20px] bg-white h-12 w-80 relative left-8 text rounded-xl hover:bg-[#E6F2FF] hover:text-[#0179FF]'>Visitor Reach Process</button>
                    <div className="relative left-12 -top-10 w-[25px]">
                    <Image
                        src={"/visitor_reach_process.svg"}
                        height={400}
                        width={400}
                    />
                </div>
            </Link>
        </div>
    </div>
  );
}
