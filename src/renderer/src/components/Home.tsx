import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Home(): ReactElement {

  return (
    <div className=" h-screen p-4 bg-teal-900">
      
      <div className=" mb-4">
      <h1 className=" text-teal-200 font-bold">Home</h1>
      <div className=" flex justify-center items-end w-12 h-11 rounded-md bg-black " ><Logo className=" w-10 h-10"/></div>
      </div>

      <div className=" flex flex-row gap-2 ">
      <div className=" text-center w-32 border-solid rounded-md p-2 bg-teal-300 text-black font-semibold"><Link to="/image-to-pdf">Image To PDF</Link></div>
      <div className=" text-center w-32 border-solid rounded-md p-2 bg-teal-300 text-black font-semibold"><Link to="/pdf-split">PDF Split</Link></div>
      </div>
    </div>
  )
}