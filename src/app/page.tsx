import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import axios from "axios";

export default function Home() {
   return (
      <div>
         <Navbar />
         <Search />
      </div>
   );
}
