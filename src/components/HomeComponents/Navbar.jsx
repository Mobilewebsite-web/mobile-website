import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import defaultProfile from "../../assets/images/default-profile.jpeg"
import { IoMdLogOut, IoMdTrophy } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdManageAccounts,MdPrivacyTip,MdKeyboardArrowRight } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoShieldCheckmarkSharp,IoDocumentTextOutline } from "react-icons/io5";


const Navbar = ()=> {
          const [showNav, setShowNav] = useState(false)
          const navRef = useRef(null)
          const ulList = [
                    {name:"Home", icon: <FaHome/>, path: '/'},
                    {name:"My Account", icon: <MdManageAccounts/>, path: '/profile'},
                    {name:"Help & Support", icon: <BiSupport/>,path: '/help&support'},
                    {name:"Leaderboard", icon: <IoMdTrophy/>,path: '/leaderboard'},
                    {name:"Privacy & Policy", icon: <MdPrivacyTip/>,path: '/privacy&policy'},
                    {name:"Terms & Conditoins", icon: <IoShieldCheckmarkSharp/>,path: '/terms&condition'},
                    {name:"Refund Policy", icon: <IoDocumentTextOutline/>,path: '/refund_policy'},
          ]

          useEffect(()=>{
                    const handleClickOutside = (e)=>{
                              if (navRef.current && !navRef.current.contains(e.target)){
                                        setShowNav(false)
                              }
                           
                    }
                    if(showNav) {
                              document.addEventListener("mousedown", handleClickOutside)
                    }
                    return ()=>{
                              document.removeEventListener("mousedown", handleClickOutside)
                              }
          },[showNav])

          const handleClick = ()=> {
                    setShowNav(!showNav)
          }

          return (
                    <div className="flex items-center justify-between">
                              <div>
                                        {showNav ? 
                                        <div ref={navRef} className="fixed top-3 bottom-3 bg-gray-50/90 w-[55%] py-7 rounded-l-[20px] p-3">
                                                  <div className="flex justify-between items-center">
                                                            <div>
                                                                      <p>Welcome Back</p>
                                                                      <h1>Username</h1>
                                                            </div>
                                                            <div className="w-fit p-2 bg-red-500 text-white rounded-xl shadow-lg">
                                                                      <IoMdLogOut size={30}/>
                                                            </div>
                                                  </div>
                                                  <hr />
                                                  <div className="">
                                                            <ul>
                                                                      {ulList.map((item, i)=>(
                                                                                <li key={i} className="flex items-center">
                                                                                          <div className="flex items-center justify-between">
                                                                                                    <p className="text-xl">{item.icon}</p>
                                                                                                    <p>{item.name}</p>
                                                                                          </div>
                                                                                          <MdKeyboardArrowRight />
                                                                                          
                                                                                         
                                                                                </li>
                                                                      ))}
                                                            </ul>
                                                  </div>
                                        </div>
                                        : 
                                        <div className=" items-center flex flex-col">
                                                  <BsThreeDots onClick={()=>setShowNav(true)} size={30}/>
                                                  <p className="text-xs">More</p>
                                        </div>}
                              </div>
                              <div className="size-12 flex items-center">
                                        <img className="w-full h-full object-cover rounded-md" src={defaultProfile} alt="" />
                              </div>
                    </div>
          )
}

export default Navbar;