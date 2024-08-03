"use client";
import { useCity } from "@/app/context/CityContext";
import { WiHumidity, WiBarometer, WiWindDeg } from "react-icons/wi";
import React from "react";

function WeatherDetails() {
   const { w } = useCity();

   return (
      <div className="max-w-[600px] w-11/12 mx-auto my-10 flex justify-evenly">
         <div className="min-w-[125px] min-h-[125px] flex flex-col items-center justify-center border rounded-lg duration-300 dark:bg-slate-900 dark:hover:bg-slate-700">
            <WiHumidity className="w-14 h-14" />
            <p className="text-2xl font-bold">%{w?.main.humidity}</p>
         </div>

         <div className="min-w-[125px] min-h-[125px] flex flex-col items-center justify-center border rounded-lg duration-300 dark:bg-slate-900 dark:hover:bg-slate-700">
            <WiWindDeg className={`w-14 h-14 rotate-[${w?.wind.deg}deg]`} />
            <p>Degree: {w?.wind.deg}</p>
            <p>Speed: {w?.wind.speed}</p>
         </div>
         <div className="min-w-[125px] min-h-[125px] flex flex-col items-center justify-center border rounded-lg duration-300 dark:bg-slate-900 dark:hover:bg-slate-700">
            <WiBarometer className="w-14 h-14" />
            <p>{w?.main.pressure} hPa</p>
         </div>
      </div>
   );
}

export default WeatherDetails;
