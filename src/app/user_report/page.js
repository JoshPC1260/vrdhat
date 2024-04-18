"use client";
import React, { useState, useEffect } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Circularbar from "../components/Circularbar";
import Image from 'next/image'
import ScoreSummary from '../components/ScoreSummary';
import Link from 'next/link'

export default function SimpleResult() {
  const [isLoading, setIsLoading] = useState(true);
  const [church_name, set_church_name] = useState('');
  const [digitalVoice, setDigitalVoice] = useState(0);
  const [digitalMaps, setDigitalMaps] = useState(0);
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
        const response = await fetch('http://3.86.166.124:8080/api/fetch-data'); 
        const data = await response.json();
  
        set_church_name(data.church_name);
        setDigitalVoice(data.digitalVoice);
        setDigitalMaps(data.digitalMaps);
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
        setWebpage(data.website)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div id='loading_page' className="m-auto justify-center min-h-screen flex flex-col mt-20">
      {isLoading ? (
        <div className="pt loading flex-grow flex flex-col justify-center items-center">
          <div className='flex flex-col items-center w-2/12'>
            <Image
              src="message 1.svg"
              alt="Picture of the author"
              width={400}
              height={400}
            />
            
          </div>

          <div className="mb-20  text-center  pt-40 w-5/6">
            <p className='text-2xl text-vr-body-color font-medium'>
              Visitor Reach helps churches like yours make <a className='text-2xl text-vr-title-second font-medium block'>10 - 30 connections per week</a> with people looking for a church to attend.
            </p>
          </div>

          <div className='relative'>
              <Player
                autoplay
                loop
                src="https://lottie.host/e0da974d-e53a-490f-89fa-0e9f8f16c209/Je1BihubMQ.json"
                style={{ width: '400px', height: '200px' }}
              >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
              </Player>
            </div>
        </div>
      ) : (
        
        <div
          id="church_result"
          className="pt-40 flex-grow flex flex-col justify-center items-center w-full"
        >
          <br />
          <section id="intro" className="-mt-52">
            <div>
              <p className="text-5xl text-center font-medium">
                <span className="text-vr-form-title bg-transparent">Your church's</span>
              </p>
              <p className="text-5xl text-center font-medium">
                <span className="bg-gradient-to-r from-vr-button-first from-0% via-vr-button-second to-vr-button-third bg-clip-text text-transparent">
                  Digital Health Assessment
                </span>
              </p>
            </div>
            <div className="m-auto mb-20  text-center  pt-10  w-3/4">
              <p className='text-xl text-vr-body-color font-medium block'>
                Did you know there are <a className='text-xl text-vr-title-second font-medium block'>{last_month_searches} </a> Google searches for "churches near me" in <a className='text-xl text-vr-title-second font-medium block'>{loc_city} ,  {loc_state} </a>
              </p>
          </div>

          <div className="relative -top-12" style={{zoom : "0.9"}}>
            <ScoreSummary
            digitalVoiceScore={digitalVoice}
            digitalMapsScore={digitalMaps}
            socialClarityScore={socialClarity}
            websiteAuthorityScore={websiteAuthority}
            avgDigitalVoiceScore={vrVoice}
            avgDigitalMapsScore={vrMaps}
            avgSocialClarityScore={vrSocial}
            avgWebsiteAuthorityScore={vrWebsite}
          />

          </div>
          
          </section>
          <Link href="https://www.visitorreach.com/get-started">
            <button className="text-2xl font-medium text-white rounded-full hover:bg-white bg-gradient-to-br from-vr-button-first via-vr-button-second to-vr-button-third hover:text-vr-button-third mt-40 h-16 w-[550px] relative -top-40" >
              schedule a 15 minute call to learn more
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}