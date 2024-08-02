"use client";
import { useCity } from "@/app/context/CityContext";
import { Forecast, ForecastDays } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { format } from "date-fns";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

function HourlyForecast() {
   const { city } = useCity();
   const [hourlyForecast, setHourlyForecast] = useState<Forecast>();

   useEffect(() => {
      const lat = city?.value.split(" ")[0];
      const lon = city?.value.split(" ")[1];
      const getHourlyForecast = async () => {
         await axios(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_GEO_API_KEY}&units=metric`)
            .then((res) => setHourlyForecast(res.data))
            .catch((e) => console.log(e));
      };

      getHourlyForecast();
   }, [city]);

   let timezone: number;

   const days: ForecastDays[] = [];
   const forecastDays: ForecastDays[] = [];

   if (hourlyForecast) {
      timezone = hourlyForecast.city.timezone | 0;
   }
   const nowDate = new Date().getDate();
   hourlyForecast?.list.map((forecast) => {
      const forecastDate = new Date((forecast.dt - timezone) * 1000).getDate();
      if (forecastDate > nowDate) days.push(forecast);
   });

   days.map((day) => {
      const forecastHour = new Date((day.dt - timezone) * 1000).getHours();
      if (forecastHour === 12 || forecastHour === 21) forecastDays.push(day);
   });

   console.log(forecastDays);

   if (!hourlyForecast)
      return (
         <div className="max-w-[600px] w-11/12 mx-auto mt-32 flex space-x-5 justify-center">
            <Skeleton className="w-44 h-52" />
            <Skeleton className="w-44 h-52" />
            <Skeleton className="w-44 h-52" />
            <Skeleton className="w-44 h-52 hidden md:block" />
            <Skeleton className="w-44 h-52 hidden md:block" />
         </div>
      );

   return (
      <div className="max-w-[600px] w-11/12 mx-auto p-3 mt-10">
         <Carousel className="w-full">
            <CarouselContent>
               {hourlyForecast?.list.map((forecast, index) => (
                  <CarouselItem className="basis-1/3  lg:basis-1/5 border-l" key={index}>
                     <div className="w-full flex flex-col items-center justify-center">
                        <h1>{format(new Date((forecast.dt - timezone) * 1000), "d/M")}</h1>
                        <h1>{format(new Date((forecast.dt - timezone) * 1000), "H:mm")}</h1>
                        <Image src={`/weatherIcons/${forecast.weather[0].icon}.svg`} alt={forecast.weather[0].main} width={100} height={100} />
                        <h1 className="relative">
                           {Math.ceil(forecast.main.temp)}
                           <span className="absolute">°</span>
                        </h1>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious className="invisible md:visible" />
            <CarouselNext className="invisible md:visible" />
         </Carousel>
      </div>
   );
}

export default HourlyForecast;
