import { useState } from "react";
import RechargeCheckout from "../components/RechargeComponents/RechargeCheckout";
import RechargeDisplay from "../components/RechargeComponents/RechargeDisplay";
import RechargeForm from "../components/RechargeComponents/RechargeForm";
import RechargeProductList from "../components/RechargeComponents/RechargeProductList";

const Recharge = ()=>{
          const [userId, setUserId] = useState('')
          const [zoneId, setZoneId] = useState('')
          const [mlUsername, setMlUsername] = useState('')
          const [orderId, setOrderId] = useState('')
          const [selectedProduct, setSelectedProduct] = useState(null)
          const resetAll = () => {
                    setUserId('');
                    setZoneId('');
                    setMlUsername('');
                    setOrderId('');
                    setSelectedProduct(null);
                    };

          return (
                    <div className="  pt-25 sm:pt-5 py-16">
                              <div>
                                        <RechargeDisplay/> 
                                        <RechargeForm userId={userId} setUserId={setUserId} zoneId={zoneId} setZoneId={setZoneId} mlUsername={mlUsername} setMlUsername={setMlUsername}/> 
                                        <RechargeProductList selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
                                        <RechargeCheckout selectedProduct={selectedProduct} mlUsername={mlUsername} orderId={orderId} setOrderId={setOrderId} userId={userId} zoneId={zoneId} resetAll={resetAll}/>
                              </div>
                    </div>
          )
}

export default Recharge;