import React from "react";
import { useParams } from "react-router-dom";
import { games } from "../../assets/files/games";

const RechargeDisplay = () => {
  const { gamename } = useParams();

  // Match by slug now
  const selectedGame = games.find(
    (game) => game.slug.toLowerCase() === gamename.toLowerCase()
  );

  return (
    <div className="relative w-full min-h-[200px] flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-cover bg-center  brightness-[0.4] z-0"
        style={{
          backgroundImage: `url(${selectedGame?.bgUrl})`,
        }}
      />

      <div className="relative z-10 rounded-md  backdrop-blur-sm rounded-2xl shadow-lg p-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md border-2 border-white">
          <img
            src={selectedGame?.img}
            alt={selectedGame?.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="mt-4 text-xl font-bold text-center text-zinc-100">
          {selectedGame?.name || "Unknown Game"}
        </h2>
        <p className="text-sm text-zinc-500">Top-up available</p>
      </div>
    </div>
  );
};

export default RechargeDisplay;
