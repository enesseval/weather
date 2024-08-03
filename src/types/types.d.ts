export interface Option {
   value: string;
   label: string;
}

export type CityContextType = {
   city: Option | undefined;
   updateCity: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
};
export interface City {
   latitude: number;
   longitude: number;
   name: string;
   countryCode: string;
}

export interface GeoDBResponse {
   data: City[];
}

export interface CurrentWeather {
   main: {
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_max: number;
      temp_min: number;
   };
   weather: [
      {
         description: string;
         icon: string;
         main: string;
      }
   ];
   wind: {
      speed: number;
      deg: number;
   };
}

export interface Forecast {
   city: {
      timezone: number;
   };
   list: [
      {
         dt: number;
         main: {
            temp: number;
         };
         weather: [
            {
               icon: string;
               main: string;
            }
         ];
      }
   ];
}

export interface ForecastDays {
   dt: number;
   main: {
      temp: number;
   };
   weather: [
      {
         icon: string;
         main: string;
      }
   ];
}

export interface Forecast4Day {
   day: string;
   highTemp: number | null;
   lowTemp: number | null;
   highIcon: string | null;
   lowIcon: string | null;
}
