import Footer from "@/components/Footer";
import HourlyForecast from "@/components/HourlyForecast";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Weather from "@/components/Weather";

export default function Home() {
   return (
      <div>
         <Navbar />
         <Search />
         <Weather />
         <HourlyForecast />
         <Footer />
      </div>
   );
}
