import { useState } from "react";
import RechargeCheckout from "../components/RechargeComponents/RechargeCheckout";
import RechargeDisplay from "../components/RechargeComponents/RechargeDisplay";
import RechargeForm from "../components/RechargeComponents/RechargeForm";
import RechargeProductList from "../components/RechargeComponents/RechargeProductList";

const Recharge = ()=>{
          const [selectedProduct, setSelectedProduct] = useState(null)
          return (
                    <div className="mx-4  mb-14">
                              <div>
                                        <RechargeDisplay/> 
                                        <RechargeForm/> 
                                        <RechargeProductList selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
                                        <RechargeCheckout selectedProduct={selectedProduct}/>
                              </div>
                    </div>
          )
}

export default Recharge;