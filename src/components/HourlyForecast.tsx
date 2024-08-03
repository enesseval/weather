"use client";
import { useCity } from "@/app/context/CityContext";
import { Forecast, Forecast4Day, ForecastDays } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { format } from "date-fns";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

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
   const forecast4Day: Forecast4Day[] = [];

   if (hourlyForecast) {
      timezone = hourlyForecast.city.timezone | 0;
   }
   const nowDate = new Date().getDate();
   hourlyForecast?.list.map((forecast) => {
      const forecastDate = new Date((forecast.dt - timezone) * 1000).getDate();
      if (forecastDate > nowDate) days.push(forecast);
   });

   const daysMap: { [key: string]: Forecast4Day } = {};

   days.map((day) => {
      const forecastHour = new Date((day.dt - timezone) * 1000).getHours();
      if (forecastHour === 12 || forecastHour === 21) {
         const forecastDay = format(new Date((day.dt - timezone) * 1000), "cccc");
         if (!daysMap[forecastDay]) {
            daysMap[forecastDay] = {
               day: forecastDay,
               highTemp: null,
               highIcon: null,
               lowTemp: null,
               lowIcon: null,
            };
         }
         if (forecastHour === 12) {
            daysMap[forecastDay].highTemp = Math.ceil(day.main.temp);
            daysMap[forecastDay].highIcon = day.weather[0].icon;
         }
         if (forecastHour === 21) {
            daysMap[forecastDay].lowTemp = Math.floor(day.main.temp);
            daysMap[forecastDay].lowIcon = day.weather[0].icon;
         }
      }
   });

   for (const day in daysMap) forecast4Day.push(daysMap[day]);

   if (!hourlyForecast)
      return (
         <>
            <div className="max-w-[600px] w-11/12 mx-auto mt-32 flex space-x-5 justify-center">
               <Skeleton className="w-44 h-52" />
               <Skeleton className="w-44 h-52" />
               <Skeleton className="w-44 h-52" />
               <Skeleton className="w-44 h-52 hidden md:block" />
               <Skeleton className="w-44 h-52 hidden md:block" />
            </div>
            <div className="max-w-[600px] w-11/12 mx-auto mt-16 flex flex-col space-y-5 justify-center">
               <Skeleton className="w-full h-10" />
               <Skeleton className="w-full h-10" />
               <Skeleton className="w-full h-10" />
               <Skeleton className="w-full h-10" />
            </div>
         </>
      );

   return (
      <div className="max-w-[600px] w-11/12 mx-auto p-3 mt-10 space-y-10 mb-10">
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
         <div>
            <h1>Forecast for 4 days</h1>
            <Separator />
            <div className="flex flex-col items-center">
               {forecast4Day.map((day, index) => (
                  <div key={index} className={cn("flex items-center space-x-10", index !== 3 && "border-b")}>
                     {index < 4 && (
                        <>
                           <Image src={`/weatherIcons/${day.lowIcon}.svg`} alt={day.lowIcon || ""} width={50} height={50} />
                           <p className="relative">
                              {day.lowTemp}
                              <span className="absolute">°</span>
                           </p>
                           <p className="min-w-[100px] text-center">{day.day}</p>
                           <p className="relative">
                              {day.highTemp}
                              <span className="absolute">°</span>
                           </p>
                           <Image src={`/weatherIcons/${day.highIcon}.svg`} alt={day.highIcon || ""} width={50} height={50} />
                        </>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default HourlyForecast;
