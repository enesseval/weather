"use client";

import { useCity } from "@/app/context/CityContext";
import { CurrentWeather } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

function Weather() {
   const { city } = useCity();
   const [weather, setWeather] = useState<CurrentWeather>();

   useEffect(() => {
      const lat = city?.value.split(" ")[0];
      const lon = city?.value.split(" ")[1];

      const getWeather = async () => {
         await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_GEO_API_KEY}&units=metric`)
            .then((res) => {
               setWeather(res.data);
            })
            .catch((e) => console.log(e));
      };

      getWeather();
   }, [city]);

   if (!weather)
      return (
         <div className="max-w-[600px] w-11/12 mx-auto flex items-center justify-center mt-16">
            <div className="flex flex-col items-center space-y-5">
               <Skeleton className="h-28 w-28 rounded-full" />
               <div className="space-y-2 flex flex-col items-center justify-center">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-14 w-[150px]" />
                  <Skeleton className="h-6 w-[100px]" />
                  <Skeleton className="h-4 w-[130px]" />
               </div>
            </div>
         </div>
      );

   return (
      <>
         <div className="max-w-[600px] w-11/12 mx-auto p-3 flex flex-col items-center justify-center">
            <Image src={`/weatherIcons/${weather.weather[0].icon}.svg`} alt="clear" width={200} height={200} className="animate-dayIcon" />
            <h1 className="text-center text-2xl">{city?.label}</h1>
            <h1 className="text-center text-7xl relative">
               {Math.ceil(weather.main.feels_like)}
               <span className="absolute">°</span>
            </h1>
            <h1 className="text-center text-2xl">{weather.weather[0].main}</h1>
            <div className="flex space-x-5">
               <h1 className="text-center text_xl relative">
                  H:{Math.ceil(weather.main.temp_max)}
                  <span className="absolute">°</span>
               </h1>
               <h1 className="text-center text_xl relative">
                  L:{Math.floor(weather.main.temp_min)}
                  <span className="absolute">°</span>
               </h1>
            </div>
            <Separator className="mt-10" />
         </div>
      </>
   );
}

export default Weather;
