"use client";
import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";

interface City {
   latitude: number;
   longitude: number;
   name: string;
   countryCode: string;
}

interface GeoDBResponse {
   data: City[];
}

interface Option {
   value: string;
   label: string;
}

function Search() {
   const id = Date.now().toString();
   const [isMounted, setIsMounted] = useState(false);
   const [value, setValue] = useState<Option | null>(null);

   useEffect(() => setIsMounted(true), []);

   const option = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      headers: {
         "X-RapidAPI-Key": "4019612f98msh79acfaf515dd398p156a92jsnad89244c6d47",
         "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
   };

   const loadOptions = async (inputValue: string): Promise<{ options: Option[] }> => {
      const reqOptions = {
         ...option,
         params: { namePrefix: inputValue },
      };

      return axios
         .request<GeoDBResponse>(reqOptions)
         .then((res) => {
            return {
               options: res.data.data.map((city) => ({
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
               })),
            };
         })
         .catch((error) => {
            return { options: [] };
         });
   };

   if (!isMounted) return null;

   return (
      <div className="max-w-[500px] w-11/12 mx-auto mt-5">
         <AsyncPaginate debounceTimeout={600} className="text-zinc-800" id={id} loadOptions={loadOptions} value={value} onChange={setValue} placeholder="Please select a city.." />
      </div>
   );
}

export default Search;
