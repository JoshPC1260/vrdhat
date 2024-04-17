"use client"
import React from "react";
import Image from 'next/image'
import "./globals.css";
import Link from 'next/link'
import Pdf from 'react-to-pdf';
import { useRef, useState } from 'react';

export default function Home() {
  const ref = useRef();
  return (
    <main className="flex flex-col items-center justify-between p-20" style={{overflow: "hidden", height: "100vh", width: "100vw"}}>
      <div className = "img-logo" style={{overflow: "hidden"}}>
          <Image
          src={"Logo.svg"}
          alt="VR Logo"
          width={500}
          height={500}
          />
      </div>
      <div className="">
        <div style={{position: "absolute", right: "-300px", bottom:"-450px", overflow: "hidden"}}>
          <Image
                  className=""
                  src="Radial waves.svg"
                  alt="Picture of the author" 
                  width={1200}
                  height={1200}
                />
        </div>
        <div style={{position: "absolute", right: "0px", bottom:"0px", overflow: "hidden"}}>   
              <Image
                  className=""
                  src="page1_church.svg"
                  alt="Picture of the author" 
                  width={500}
                  height={500}
                />
         </div>     
      </div>  
      <div className="pt-40" style={{overflow: "hidden"}}>  
        <h1 className="m-0 md:text-7xl sm:text-6xl text-black	 text-left title-text">Discover your Church’s</h1> 
        <h1 className="mt-5 md:text-7xl sm:text-6xl text-blue-600	 text-left title-text">Digital Health Score</h1>

        <div className="flex flex-wrap justify-left content-left container mx-auto px-2">
          <div className="flex flex-wrap justify-left content-left">

            <div className="grid justify-left sm:px-3 w-full md:w-3/6">
              <p className="sm:text-xl lg:text-2xl md:text-xl md:text-left text-left sm:text-center xs:text-center mt-20  text-black">Can people in your community find your church? This tool was designed to help churches check their overall digital health and discoverability. Complete the form with your church’s information and receive a free Digital Health Assessment in your email.</p>    

              <div>
                <Link href="/form">
                  <button className="text-2xl font-medium text-white rounded-full hover:bg-white bg-gradient-to-br from-vr-button-first via-vr-button-second to-vr-button-third hover:text-vr-button-third mt-40 h-16 w-48">
                    
                      Get Started
                    
                    
                  </button>
                </Link>
              </div>
              
              
            </div>
            
            
            </div>
        </div>
      </div>
    </main>
  );
}

