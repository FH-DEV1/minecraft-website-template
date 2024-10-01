"use client";
import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import Image from 'next/image';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress"
import fs from 'fs';
import path from 'path';

interface server {
  statusPtero: null;
  state: string;
  cpu: {
    max: number;
    live: number;
  },
  mem: {
    max: number;
    live: number;
    pourcent: number;
  },
  disk: {
    max: number;
    live: number;
    pourcent: number;
  },
  server_data: {
    maxPlayers: number;
    onlinePlayers: number;
    version: string;
  }
}

const App: React.FC = () => {
  const [leverSate, setleverState] = useState(false)
  const [play] = useSound("/minecraft_click.mp3");
  const [serverStatus, setServerStatus] = useState("offline")
  const [ServerData, setServerData] = useState<server>()
  const token = process.env.NEXT_PUBLIC_SERVER_TOKEN
  const id = process.env.NEXT_PUBLIC_SERVER_ID
  const serverName = process.env.NEXT_PUBLIC_SERVER_NAME
  const [images, setImages] = useState<string[]>([]);

  const getStatus = () => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    
    fetch(`https://mine.sttr.io/server/${id}/live`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let status = JSON.parse(result).api.data.state
        setServerStatus(status);
        setServerData(JSON.parse(result).api.data);
        setleverState(status == "offline" || status == "stopping"? false : true);
      })
      .catch((error) => console.error(error));
  }

  const turnOn = () => {
    play()
    setleverState(true)
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: "action=start&msg=",
    };
    fetch(`https://mine.sttr.io/server/${id}/poweraction`, requestOptions)
    .then((response) => response.text())
    .then(res => {
      if (JSON.parse(res).error) {
        console.log(JSON.parse(res).error)
        turnOff
      }
    })
    .catch(turnOff)
  };

  const turnOff = () => {
    play()
    setleverState(false)
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: "action=stop&msg=",
    };
    fetch(`https://mine.sttr.io/server/${id}/poweraction`, requestOptions)
  };

  useEffect(() => {
    getStatus()
    const fetchImages = async () => {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImages(data.images);
    };
    fetchImages();
    document.title = `${serverStatus == "offline" ? "🔴 " : serverStatus == "running" ? "🟢 " : "🔵 "}${serverName}`
    const intervalId = setInterval(() => {
        getStatus()
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.title = `${serverStatus == "offline" ? "🔴 " : serverStatus == "running" ? "🟢 " : "🔵 "}${serverName}`
  }, [serverStatus]);

  return (
    <>
    <Drawer>
    <div className='flex flex-col justify-center'>
      <div className='flex justify-center items-center'>
        {!leverSate &&
          <div onClick={turnOn} className='cursor-pointer mt-16'>
            <Image 
              src="/lever-off.png"
              width={326}
              height={326}
              alt='lever-off image'
              className='-translate-x-6 lg:-translate-x-0 -translate-y-11 lg:-translate-y-[1.625rem] w-24 lg:w-32'
            />
          </div>
        }

        {leverSate &&
          <div onClick={turnOff} className='cursor-pointer mt-16'>
            <Image 
              src="/lever-on.png"
              width={326}
              height={326}
              alt='lever-on image'
              className='w-24 lg:w-32 -translate-x-6 lg:-translate-x-0 -translate-y-8 lg:-translate-y-3'
            />
          </div>
        }

        <div className='cursor-pointer relative group inline-block text-white'>
          <DrawerTrigger>
            <h1 className='font-minecraft text-6xl lg:text-8xl -translate-x-9 lg:-translate-x-6 lg:mr-[6.5rem] pb-2 lg:pb-4'>{serverName}</h1>
          </DrawerTrigger>
          
          <div className="absolute left-1/3 transform -translate-x-1/2 w-48 py-1 bg-stone-800 border border-stone-500 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 cursor-text">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-stone-800 rounded-sm border-l border-t border-stone-500 rotate-45"></div>
            <h2 className="text-base text-center font-bold opacity-50">{process.env.NEXT_PUBLIC_SERVER_IP}</h2>
          </div>
        </div>
      </div>

      <h2 className='text-center text-white/50 -mt-14 lg:-mt-12 text-base lg:text-xl lg:-ml-12'>{serverStatus == "offline" ? "🔴" : serverStatus == "running" ? "🟢" : "🔵"} Server is {serverStatus}</h2>
    </div>

    <div className='flex justify-center flex-wrap gap-4 px-10 lg:px-20 my-10'>
      {images.map((image, index) => (
        <a key={index} href={`/images/${image}`} rel="noopener" target="_blank">
          <Image 
            src={`/images/${image}`} 
            alt={`Image ${index + 1}`} 
            width={500} 
            height={500}
            className='object-cover w-96 aspect-square rounded-3xl'
          />
        </a>
      ))}
    </div>

    <DrawerContent>
      <DrawerHeader className='flex flex-col justify-center items-center'>
        <DrawerTitle>{serverName}</DrawerTitle>
        <DrawerDescription>{process.env.NEXT_PUBLIC_SERVER_IP}</DrawerDescription>
      </DrawerHeader>
      <div className='flex flex-col justify-center items-center'>
        <h2 className={` text-center text-white text-base rounded-full px-2 py-1 ${serverStatus == "offline" ? "bg-red-600" : serverStatus == "running" ? "bg-emerald-600" : "bg-blue-600"}`}>Server is {serverStatus}</h2>
        
        <div className='border-2 rounded-xl pb-4 px-4 pt-2 mt-4'>
          <h3 className='text-center'>Disk Usage</h3>
          <div className='flex justify-between'>
            <p>{ServerData?.disk.pourcent}%</p>
            <p>{ServerData && ServerData.disk.live/1000}/{ServerData && ServerData.disk.max/1000}Go</p>
          </div>
          <Progress value={ServerData?.disk.pourcent} className="w-[80svw] lg:w-[30svw]" />
        </div>

        {serverStatus == "running" &&
        <>
          <div className='flex flex-col lg:flex-row gap-4 w-[calc(80svw+2rem)] lg:w-[calc(30svw+2rem)]'>
            <div className='border-2 rounded-xl pb-4 px-4 pt-2 mt-4 w-full'>
              <h3 className='text-center'>CPU Usage</h3>
              <div className='flex justify-between'>
                <p>{ServerData && parseFloat((ServerData.cpu.live/ServerData.cpu.max*100).toFixed(2))}%</p>
                <p>{ServerData && ServerData.cpu.live}/{ServerData && ServerData.cpu.max}%</p>
              </div>
              <Progress value={ServerData && ServerData.cpu.live/ServerData.cpu.max*100} className="w-full" />
            </div>

            <div className='border-2 rounded-xl pb-4 px-4 pt-2 mt-4 w-full'>
              <h3 className='text-center'>Ram Usage</h3>
              <div className='flex justify-between'>
                <p>{ServerData?.mem.pourcent}%</p>
                <p>{ServerData && ServerData.mem.live}/{ServerData && ServerData.mem.max}Mb</p>
              </div>
              <Progress value={ServerData?.mem.pourcent} className="w-full" />
            </div>
          </div>

          <h2 className='mt-4'>{ServerData?.server_data.onlinePlayers}/{ServerData?.server_data.maxPlayers} Players online</h2>
        </>
        }
      </div>
      <DrawerFooter>
        <DrawerClose>
          <Button>Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
    </Drawer>
  </>
  );
};

export default App;