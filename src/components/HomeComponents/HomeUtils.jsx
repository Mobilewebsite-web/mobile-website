import { FaCartShopping } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { IoMdTrophy } from "react-icons/io";
import { BsPlusCircleDotted } from "react-icons/bs";

const HomeUtils = ()=> {
          const utilList = [
                    {name: "Add money", link: "/", icon:<BsPlusCircleDotted/>},
                    {name: "Leaderboard", link: "/", icon:<IoMdTrophy/>},
                    {name: "Orders", link: "/", icon:<FaCartShopping/>},
                    {name: "Support", link: "/", icon:<BiSupport/>},
          ]
          return (
                    <div className="flex flex-row justify-between items-center mt-10">
                              {utilList.map((item,i)=>(
                                        <div key={i} className="flex  flex-col items-center gap-2 cursor-pointer">
                                                  <div className="bg-white p-6 text-blue-600 shadow-md rounded-lg text-[50px]">
                                                            {item.icon}
                                                  </div>
                                                  <p className="text-xs font-semibold">{item.name}</p>
                                        </div>
                              ))}
                    </div>
          )
}

export default HomeUtils