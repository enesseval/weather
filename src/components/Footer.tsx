import React from "react";
import { FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

function Footer() {
   return (
      <div>
         <div className="flex w-6/12 mx-auto justify-evenly">
            <Link className="border flex justify-center p-2 rounded-lg items-center hover:bg-slate-200 duration-300 dark:hover:bg-zinc-700" target="_blank" href={"https://instagram.com/enesseval"}>
               <FaInstagram className="w-6 h-6" />
            </Link>
            <Link className="border flex justify-center p-2 rounded-lg items-center hover:bg-slate-200 duration-300 dark:hover:bg-zinc-700" target="_blank" href={"https://x.com/mosyocoder"}>
               <FaTwitter className="w-6 h-6" />
            </Link>
            <Link className="border flex justify-center p-2 rounded-lg items-center hover:bg-slate-200 duration-300 dark:hover:bg-zinc-700" target="_blank" href={"https://github.com/enesseval"}>
               <FaGithub className="w-6 h-6" />
            </Link>
            <Link
               className="border flex justify-center p-2 rounded-lg items-center hover:bg-slate-200 duration-300 dark:hover:bg-zinc-700"
               target="_blank"
               href={"https://www.linkedin.com/in/enesseval/"}
            >
               <FaLinkedin className="w-6 h-6" />
            </Link>
         </div>
         <div className="w-6/12 mx-auto text-center my-3">
            <p>© 2024 Enes Seval. All rights reserved.</p>
         </div>
      </div>
   );
}

export default Footer;
