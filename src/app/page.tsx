import Footer from "@/components/Footer";
import HourlyForecast from "@/components/HourlyForecast";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Weather from "@/components/Weather";
import WeatherDetails from "@/components/WeatherDetails";

export default function Home() {
   return (
      <div>
         <Navbar />
         <Search />
         <Weather />
         <HourlyForecast />
         <WeatherDetails />
         <Footer />
      </div>
   );
}
