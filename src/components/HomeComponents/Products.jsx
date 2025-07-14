import logoMl from "../../assets/images/logo-ml.webp"
import logoMl2 from "../../assets/images/logo-ml.jpg"
const Products = ()=>{
          const productUl = [
                    {name:"Mobile Legends", path: '', img:logoMl2},
                    {name:"Moba Legends", path: '', img:logoMl},

          ]
          return(
                    <div className="flex items-center mt-10 ">
                              <div className="grid grid-cols-4 gap-10">
                                        {productUl.map((item, i)=>(
                                                  <div key={i} className="items-center justify-center flex flex-col gap-2">
                                                            <div className="flex items-center overflow-hidden rounded-[14px] border-2 border-white shadow-lg">
                                                                      <img src={item.img} className="object-cover" alt="" />
                                                            </div>
                                                            <p className="text-xs font-bold">{item.name}</p>
                                                  </div>
                                        ))}
                              </div>
                    </div>
          )
}

export default Products;