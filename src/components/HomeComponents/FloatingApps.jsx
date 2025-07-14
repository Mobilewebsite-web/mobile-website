import ml from "../../assets/images/mlbb-logo.webp"
import React from "react"
const FloatingApps = ()=>{
          const floatingList = [
                    {name:'Mobile Legends', path: "", img:ml, tag: 'Popular'}
          ]
          return (
                    <div className="flex flex-row gap-2 items-center mt-10">
                              {floatingList.map((item, i)=>(
                                        <div key={i} className="h-55 border-4 border-white w-1/3 flex items-end bg-center bg-cover bg-no-repeat rounded-xl shadow-lg" style={{backgroundImage: `url(${item.img})`}}>
                                                  <p className="text-white mb-10 backdrop-blur-sm  font-bold p-2 mx-2 w-fit">{item.name}</p>
                                        </div>
                              ))}
                    </div>
          )
}

export default FloatingApps;