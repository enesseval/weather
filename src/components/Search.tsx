"use client";
import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";

type City = {
   name: string;
   country: string;
   lat: number;
   lon: number;
};

interface Option {
   value: string;
   label: string;
}

function Search() {
   const id = Date.now().toString();
   const [isMounted, setIsMounted] = useState(false);
   const [value, setValue] = useState<Option | null>(null);

   useEffect(() => setIsMounted(true), []);
   const loadOptions = async (search: string): Promise<{ options: Option[] }> => {
      return axios(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_GEO_API_KEY}`)
         .then((response) => {
            return {
               options: response.data.map((city: City) => ({
                  value: `${city.lat} ${city.lon}`,
                  label: `${city.name}, ${city.country}`,
               })),
            };
         })
         .catch((error) => {
            console.error(error);
            return { options: [] };
         });
   };

   if (!isMounted) return null;

   return (
      <div className="max-w-[500px] w-11/12 mx-auto mt-5">
         <AsyncPaginate className="text-zinc-800" id={id} loadOptions={loadOptions} value={value} onChange={setValue} placeholder="Please select a city.." />
      </div>
   );
}

export default Search;
