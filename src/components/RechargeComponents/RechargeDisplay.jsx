import React from "react";
import { useParams } from "react-router-dom";
import { games } from "../../assets/files/games";
import { useUser } from "../../context/UserContext";

const RechargeDisplay = () => {
  const { gamename } = useParams();
  const { isDarkMode } = useUser();

  // Find game based on URL slug
  const selectedGame = games.find(
    (game) => game.slug.toLowerCase() === gamename.toLowerCase()
  );

  const textColor = isDarkMode ? "text-white" : "text-white";
  const borderColor = isDarkMode ? "border-zinc-700" : "border-white";
  const bgOverlayBrightness = isDarkMode ? "brightness-[0.3]" : "brightness-[0.4]";

  return (
    <div className="relative w-full pt-10 min-h-[180px] flex items-center justify-center py-6">
      {/* Background image overlay */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${bgOverlayBrightness} z-0`}
        style={{
          backgroundImage: `url(${selectedGame?.bgUrl})`,
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10  rounded-2xl shadow-lg p-4 flex flex-col items-center">
        <div className={`w-20 h-20 rounded-xl overflow-hidden shadow-md border-2 ${borderColor}`}>
          <img
            src={selectedGame?.img}
            alt={selectedGame?.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className={`mt-4 text-xl font-bold text-center ${textColor}`}>
          {selectedGame?.name || "Unknown Game"}
        </h2>
      </div>
    </div>
  );
};

export default RechargeDisplay;
