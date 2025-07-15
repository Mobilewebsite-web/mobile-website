import { MdHistory, MdCreditCard  } from "react-icons/md";
import { FaQuestionCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeUtils = ()=> {
          const utilList = [
                    {name: "Add coin", link: "/", icon:<FaPlus/>},
                    {name: "Payments", link: "/", icon:<MdCreditCard/>},
                    {name: "Orders", link: "/orders", icon:<MdHistory/>},
                    {name: "Queries", link: "/", icon:<FaQuestionCircle/>},
          ]
          const navigate = useNavigate()
          return (
                    <div className="flex flex-row justify-evenly gap-5 items-center mt-10">
                              {utilList.map((item,i)=>(
                                        <div key={i} onClick={()=>navigate(item.link)} className="flex  flex-col items-center gap-2 cursor-pointer">
                                                  <div className="bg-white border-1 border-gray-100 p-4 shadow-md rounded-lg text-[40px]">
                                                            {item.icon}
                                                  </div>
                                                  <p className="text-xs font-md">{item.name}</p>
                                        </div>
                              ))}
                    </div>
          )
}

export default HomeUtils