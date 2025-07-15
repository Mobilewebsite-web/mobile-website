import { useUser } from "../../context/UserContext"

const UserStats = ()=>{
          const {userData} = useUser()
          return (
                    <div className="grid p-4 grid-cols-2 gap-7 mt-10">
                               <div
                                        className="flex shadow-md flex-col items-center justify-center aspect-square bg-blue-50  rounded-xl text-xl font-semibold shadow"
                                        >
                                        <p className="text-4xl font-bold">{userData?.orderCount || 0}</p>
                                        <p className="text-sm mt-3">Completed</p>
                              </div> 
                              <div
                                        className="flex shadow-md flex-col items-center justify-center aspect-square bg-blue-50  rounded-xl text-xl font-semibold shadow"
                                        >
                                        <p className="text-4xl font-bold">{userData?.orderCount || 0}</p>
                                        <p className="text-sm mt-3">Pending</p>
                              </div>
                                <div
                                        className="flex shadow-md flex-col items-center justify-center aspect-square bg-blue-50  rounded-xl text-xl font-semibold shadow"
                                        >
                                        <p className="text-4xl font-bold">{userData?.orderCount || 0}</p>
                                        <p className="text-sm mt-3">Refunded</p>
                              </div> 
                                <div
                                        className="flex shadow-md flex-col items-center justify-center aspect-square bg-blue-50  rounded-xl text-xl font-semibold shadow"
                                        >
                                        <p className="text-4xl font-bold">{userData?.orderCount || 0}</p>
                                        <p className="text-sm mt-3">Failed</p>
                              </div>                        
                        
                    </div>
          )
}
export default UserStats;