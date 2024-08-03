"use client";
import { CityContextType, CurrentWeather, Option } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { ActionMeta, SingleValue } from "react-select";

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const defaultCity = {
      value: "34.9403 37.0382",
      label: "Eskişehir, TR",
   };
   const [city, setCity] = useState<Option | undefined>(defaultCity);
   const [w, setW] = useState<CurrentWeather | undefined>();

   const updateCity = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
      setCity(newValue as Option);
   };

   return <CityContext.Provider value={{ city, updateCity, w, setW }}>{children}</CityContext.Provider>;
};

export const useCity = (): CityContextType => {
   const context = useContext(CityContext);
   if (context === undefined) throw new Error("Something went wrong");
   return context;
};
