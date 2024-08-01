"use client";
import React, { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
   TiWeatherCloudy,
   TiWeatherDownpour,
   TiWeatherNight,
   TiWeatherPartlySunny,
   TiWeatherShower,
   TiWeatherSnow,
   TiWeatherStormy,
   TiWeatherSunny,
   TiWeatherWindy,
   TiWeatherWindyCloudy,
} from "react-icons/ti";

const icons = [TiWeatherCloudy, TiWeatherDownpour, TiWeatherNight, TiWeatherPartlySunny, TiWeatherShower, TiWeatherSnow, TiWeatherStormy, TiWeatherSunny, TiWeatherWindy, TiWeatherWindyCloudy];

function NavBar() {
   const [currentIcon, setCurrentIcon] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIcon((prev) => (prev + 1) % icons.length);
      }, 3000);

      return () => clearInterval(interval);
   }, []);

   const IconComponent = icons[currentIcon];

   return (
      <div className="h-[60px] flex items-center justify-center p-5 border-b w-full mx-auto">
         <div className="flex items-center space-x-3 relative">
            <IconComponent className="w-8 h-8 animate-logoIcons absolute -left-6" />
            <h1 className="font-bold text-3xl">Weather App</h1>
         </div>
         <div className="absolute right-5 ">
            <ThemeSwitcher />
         </div>
      </div>
   );
}

export default NavBar;
