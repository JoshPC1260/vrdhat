
"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import NavBar from "./components/navbar.js"
import Circularbar from "../../app/components/Circularbar1.js";
import Link from 'next/link.js';

export default function FullReport() {
   
    const [isLoading, setIsLoading] = useState(true);
    const [church_name, set_church_name] = useState('');
    const [digitalVoice, setDigitalVoice] = useState(0);
    const [digitalMaps, setDigitalMaps] = useState(0);
    const [appleMaps, setAppleMaps] = useState(0);
    const [googleMaps, setGooglelMaps] = useState(0);
    const [socialClarity, setsocialClarity] = useState(0);
    const [websiteAuthority, setwebsiteAuthority] = useState(0);
    const [vrVoice, setvrVoice] = useState(0);
    const [vrMaps, setvrMaps] = useState(0);
    const [vrSocial, setvrSocial] = useState(0);
    const [vrWebsite, setvrWebsite] = useState(0);
    const [last_month_searches, set_last_month_searches] = useState(0);
    const [loc_city, setLoc_city] = useState("");
    const [loc_zipcode, setLoc_zipcode] = useState("");
    const [loc_address, setLoc_address] = useState("");
    const [loc_state, setLoc_state] = useState("");
    const [webpage, setWebpage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('<http://localhost:8080>/api/fetch-data');
            const data = await response.json();
      
            set_church_name(data.church_name);
            setDigitalVoice(data.digitalVoice);
            setDigitalMaps(data.digitalMaps);
            setAppleMaps(data.appleMaps);
            setGooglelMaps(data.googleMaps);
            setsocialClarity(data.socialClarity);
            setwebsiteAuthority(data.websiteAuthority);
            setvrVoice(data.vrVoice);
            setvrMaps(data.vrMaps);
            setvrSocial(data.vrSocial);
            setvrWebsite(data.vrWebsite);
            set_last_month_searches(data.last_month_searches);
            setLoc_city(data.loc_city);
            setLoc_address(data.loc_address);
            setLoc_zipcode(data.loc_zipcodesetLoc_ziploc_zipcode);
            setLoc_state(data.loc_state);
            setWebpage(data.website);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <div className="">
            <div id="cr_page1" className="relative w-full h-[100vh] bg-white border-2 boder-red-600">
                <div className="">
                    <div className="absolute left-[71px] top-[93px]">
                        <Image
                            src={"/full_report_logo.svg"}
                            height={400}
                            width={400}
                        />
                    </div>
                    <div className="absolute right-[0px] top-[426px] w-1/2 bg-clip-content">
                        <Image
                            src={"/Omnichannel.png"}
                            height={700}
                            width={1000}
                        />
                    </div>
                    
                    <h2 className="absolute left-[78px] top-[303px] text-[60px] font-medium bg-gradient-to-br from-[#6ECAF8] via-[#0179FF] via-50% to-[#2246E2] inline-block text-transparent bg-clip-text">Digital Health Assessment</h2>
                    <h1 className="absolute left-[71px] top-[381px] text-black text-[140px] font-medium">{church_name}</h1>
                    <div className="">
                        <div className="">
                            <div className="absolute left-[89px] top-[574px] w-[21.8px]">
                                <Image
                                    src={"/location_icon.svg"}
                                    height={400}
                                    width={400}
                                />
                            </div>
                            <p  className="absolute left-[129px] top-[570px] text-[#75778B] text-[30px] font-medium">{loc_address}, {loc_city}, {loc_state} {loc_zipcode}</p>
                        </div>
                        <div className="absolute left-[89px] top-[635px] w-[23.8px] text-[#75778B] text-[30px] font-medium">
                            <Image
                                src={"/website_icon.svg"}
                                height={400}
                                width={400}
                            />
                        </div>
                        <p className="absolute left-[129.5px] top-[625px] text-[#75778B] text-[30px] font-medium">{webpage}</p>
                        
                    </div>
                    <p className="block w-full absolute left-[89px] bottom-[100px] text-[#75778B] text-[20px] font-medium"> Assessment performed on <a className="font-semibold">March 23, 2024</a> </p>
                </div>
            </div>
            <div id="cr_page2" className="relative w-full h-[100vh] bg-[url('/img-bg-page1.png')] bg-cover">
                <div className="relative w-full h-[100vh] bg-gradient-to-br from-white from-10% to-white/30">
                    <h1 className="absolute left-[107px] top-[110px] text-[#050938] text-[75px] font-medium w-4/6">Did you know there are <span className="text-[#0179FF]">{last_month_searches} monthly</span> Google searches for “churches near me” in <span className="text-[#0179FF]">{loc_city}, {loc_state}</span>?</h1>
                    <h2 className="absolute left-[107px] bottom-60 text-[#292A36] text-[40px] font-regular w-4/6">How many of those seekers find your church?</h2>
                </div>
                <div className="absolute right-[100px] bottom-[70px] w-[239px]">
                    <Image
                        src={"/full_report_logo.svg"}
                        height={400}
                        width={400}
                    />
                </div>
            </div>
            <div id="cr_page3" className="relative w-full h-[100vh] grid grid-cols-9 justify-center bg-white" >
                <div className="absolute left-[40px] top-[77px] w-[200px]">
                    <Image
                        src={"/full_report_logo.svg"}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="relative col-span-2">
                    <div style={{zoom: 0.9}}>
                        <NavBar></NavBar>
                    </div>
                    
                    
                </div>
                <div className='col-span-4 flex flex-col justify-center justify-items-center'>
                    <div className="bg-white w-5/6 h-3/6 rounded-3xl m-auto shadow-2xl">
                        <div className="relative m-auto w-[120px] top-10">
                            <Image
                                src={"/homepod.svg"}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='font-medium text-[25px] text-[#050938] w-10/12 text-center m-auto relative top-20'>What Is <a className="text-[#0179FF]">Voice Search</a> & Why It’s Important</h1>
                        <h2 className='font-medium text-[15px] text-[#75778B] w-10/12 text-center m-auto relative top-24'>
                            Voice technology allows people to perform a hands-free search by asking questions to their smart devices such as smartphones, smart speakers, and in-car systems. Your church’s Digital Voice Score shows how optimized your digital presence is when it comes to showing up in voice search results.
                        </h2>
                    </div>
                    <div className="bg-white w-5/6 h-2/6 rounded-3xl m-auto shadow-2xl bg-[url('/woman-background.png')] bg-cover">
                        <h1 className='relative text-white w-2/3 ml-10 text-[80px]'>57%</h1>
                        <h2 className='relative text-white w-2/3 ml-10 text-[20px]'>of American adults use voice assistants on their devices to find out information on a daily basis.</h2>
                        <h3 className='relative text-white w-2/3 ml-10 mt-10 text-[14px]'>Source: NPR</h3>
                    </div>

                    
                </div>
                <div className='col-span-3 flex flex-col justify-center justify-items-center'>
                    <div className="bg-white w-5/6 h-11/12 rounded-3xl ml-[0px] shadow-2xl">
                        <h1 className='relative text-[#050938] w-2/3 m-auto text-center font-bold text-[32px] justify-center justify-items-center'>Your Digital Voice Score</h1>
                        <div className='relative m-auto grid justify-center mt-10'>
                            <Circularbar value={digitalVoice} title={undefined} max_value={250}/>
                        </div>
                        <div className="relative m-auto grid justify-center mt-0 w-[130px]">
                            <Image
                                src={"/2p_church.svg"}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='text-[#050938] text-[20px] font-medium relative m-auto grid justify-center mt-5'>Only 2% of churches</h1>
                        <h2 className='text-[#75778B] text-[15px] font-regular relative m-auto grid justify-center w-4/6 mt-5'>
                            are optimized for voice search. If your church’s digital presence isn’t optimized for voice search, people won’t be able to find and visit your church!
                        </h2>
                        
                        <Link href={"https://www.visitorreach.com/"}>
                            <h3 className='text-[#0179FF] text-[12px] font-regular relative m-auto grid justify-center w-4/6 mt-5 pb-10'>
                                Source: VisitorReach
                            </h3>
                        </Link>
                        

                    </div>
                </div>
            </div>

            <div id="cr_page4" className="relative w-full h-[100vh] grid grid-cols-9 grid-rows-2 justify-center bg-white" >
                <div className="absolute left-[40px] top-[77px] w-[200px] border-2 border-red-500">
                    <Image
                        src={"/full_report_logo.svg"}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="relative col-span-2 row-span-2 border-2 border-red-500">
                    <div style={{zoom: 0.9}}>
                        <NavBar></NavBar>
                    </div>
                    
                    
                </div>
                <div className="relative col-span-2">
                    <div className="w-full h-full bg-[url('/Bounds.png')] bg-cover rounded-3xl shadow-2xl">
                        <h1 className='relative top-48 text-white w-2/3 ml-10 text-[28px] font-medium'>
                            People in the U.S. search for “churches near me” over <a className='text-[#0179FF]'>1 million </a>times each month
                        </h1>
                    </div>
                </div>
                <div className="relative  col-span-2 ">
                    <div className="w-full h-full bg-[url('/sample_map.png')] bg-cover rounded-3xl shadow-2xl">
                        <h1 className='relative top-14 text-[#050938] w-2/3 ml-10 text-[28px] font-medium'>
                            Nearly <a className='text-[#0179FF]'>2 billion </a>people use Google Maps every month
                        </h1>
                    </div>
                </div>
                <div className="relative col-span-2 h-5/6 w-11/12 border-2 border-white rounded-3xl shadow-2xl">
                    <div className='flex'>
                        <div className="relative top-10 left-5 w-[50px]">
                            <Image
                                src={"/google_maps.svg"}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='relative top-8 left-12 text-[27px] font-medium text-[#050938] w-4/6'>
                            Your Google Maps Search Score
                        </h1>
                    </div>
                    <div className='relative m-auto grid justify-center top-10'>
                        <Circularbar value={googleMaps} title={undefined} max_value={250}/>
                    </div>
                </div>
                <div className="relative  border-2">
                    5
                </div>
                <div className="relative col-span-4 justify-center justify-items-center">
                    <div className="relative top-5 w-[180px] m-auto">
                        <Image
                            src={"/pin_map.svg"}
                            height={400}
                            width={400}
                        />
                    </div>
                    <h1 className='relative top-14 text-[#050938] w-2/3 left-0 text-[28px] font-medium text-center m-auto'>
                        What is your <a className='text-[#0179FF]'>Digital Maps </a>Score & Why it’s Important
                    </h1>
                    <h2 className='relative top-14 text-[#75778B] w-2/3 left-0 text-[18px] font-medium text-center m-auto'>
                        From where we eat to where we visit, digital maps are more important in our lives than ever before. The Digital Maps Score reflects how likely your church is to show up on these digital navigation apps when someone searches for “churches near me,” If your church information isn’t listed correctly, they won’t find you.
                    </h2>
                </div>
                <div className="relative col-span-2 h-5/6 w-11/12 border-2 border-white rounded-3xl shadow-2xl">
                    <div className='flex'>
                        <div className="relative top-10 left-5 w-[50px]">
                            <Image
                                src={"/google_maps.svg"}
                                height={400}
                                width={400}
                            />
                        </div>
                        <h1 className='relative top-8 left-12 text-[27px] font-medium text-[#050938] w-4/6'>
                            Your Apple Maps Search Score
                        </h1>
                    </div>
                    <div className='relative m-auto grid justify-center top-10'>
                        <Circularbar value={appleMaps} title={undefined} max_value={250}/>
                    </div>
                </div>


            </div>

            <div id="cr_page5" className="relative w-full h-[100vh] grid grid-cols-9 grid-rows-2 justify-center bg-white" >
                <div className="absolute left-[40px] top-[77px] w-[200px] border-2 border-red-500">
                    <Image
                        src={"/full_report_logo.svg"}
                        height={400}
                        width={400}
                    />
                </div>
                <div className="relative col-span-2 row-span-2 border-2 border-red-500">
                    <div style={{zoom: 0.9}}>
                        <NavBar></NavBar>
                    </div>
                    
                    
                </div>

                <div className='col-span-4 border-2 border-red-500 rounded-3xl justify-center justify-items-center'>1
                    <div className="absolute w-[200px] border-2 border-blue-500 m-auto">
                        <Image
                            src={"/authority_im.svg"}
                            height={400}
                            width={400}
                        />
                    </div>

                </div>

                <div className='col-span-2 border-2 border-red-500 rounded-3xl'>2

                </div>
                <div className='border-2 border-red-500 rounded-3xl'>3

                </div>

                <div className='col-span-2 border-2 border-red-500 rounded-3xl'>4

                </div>
                <div className='col-span-4 border-2 border-red-500 rounded-3xl'>5

                </div>

                <div className='border-2 border-red-500 rounded-3xl'>6

                </div>
                <div className='border-2 border-red-500 rounded-3xl'>7

                </div>

                <div className='border-2 border-red-500 rounded-3xl'>8

                </div>
                <div className='border-2 border-red-500 rounded-3xl'>9

                </div>

                <div className='border-2 border-red-500 rounded-3xl'>10

                </div>
                <div className='border-2 border-red-500 rounded-3xl'>

                </div>

                <div className='border-2 border-red-500 rounded-3xl'>

                </div>
                <div className='border-2 border-red-500 rounded-3xl'>

                </div>

                <div className='border-2 border-red-500 rounded-3xl'>

                </div>

            </div>
          
           
        </div>
    )
}