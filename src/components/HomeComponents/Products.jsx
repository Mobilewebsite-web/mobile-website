import React from "react";
import { useNavigate } from "react-router-dom";
import {games} from "../../assets/files/games"

const Products = () => {

  const navigate = useNavigate();

  return (
    <div className="mt-10">
      <div className="grid grid-cols-4 gap-4">
        {games.map((item, i) => (
          <div
            key={i}
            onClick={()=>navigate(item.path)}
            className="bg-sky-50 p-1 border-1 border-gray-200 rounded-md flex flex-col items-center shadow-md "
          >
            <div className="rounded-xl overflow-hidden border-2 border-white shadow">
              <img
                src={item.img}
                className="w-full h-full object-cover"
                alt={item.name}
              />
            </div>
            <p className="text-[9px] font-semibold text-center mt-2">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
