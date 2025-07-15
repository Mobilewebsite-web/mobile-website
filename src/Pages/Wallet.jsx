import WalletCard from "../components/WalletComponents/WalletCard";
import WalletHistory from "../components/WalletComponents/WalletHistory";

const Wallet = ()=> {
          return (
                    <div className="pt-10 mx-4 lg:flex justify-start gap-10">
                              <WalletCard/>
                              <WalletHistory/>
                    </div>
          )
}

export default Wallet;