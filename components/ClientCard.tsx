"use client";

import { motion } from "framer-motion";
import { ClientCardProps } from "../types/client";
import { useState } from "react";
import Image from "next/image";

export default function ClientCard({
  client,
  index,
  isRevealed,
}: ClientCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="relative w-80 h-96 mx-4 cursor-pointer"
      initial={{ rotateY: 180, scale: 0.8 }}
      animate={{
        rotateY: isRevealed ? 0 : 180,
        scale: isRevealed ? 1 : 0.8,
      }}
      transition={{
        duration: 0.8,
        delay: isRevealed ? index * 0.3 : 0,
        type: "spring",
        stiffness: 100,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Face cachée de la carte */}
      <div
        className="absolute inset-0 w-full h-full backface-hidden rounded-3xl shadow-cottagecore border-ornate"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background:
            "linear-gradient(135deg, #374151 0%, #4b5563 50%, #6b7280 100%)",
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="text-7xl text-white/90 mb-2 drop-shadow-lg">🎴</div>
          <div className="text-sm text-white/80 font-medium tracking-wider uppercase">
            Île des Miracles
          </div>
          <div className="absolute top-4 left-4 text-2xl opacity-60">🌸</div>
          <div className="absolute top-4 right-4 text-2xl opacity-60">🌸</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-60">✨</div>
          <div className="absolute bottom-4 right-4 text-2xl opacity-60">
            ✨
          </div>
        </div>
      </div>

      {/* Face visible de la carte */}
      <div
        className="absolute inset-0 w-full h-full backface-hidden rounded-3xl shadow-cottagecore card-texture border border-violet-200/30 p-6"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="h-full flex flex-col items-center text-center relative">
          {/* Ornements coins */}
          <div className="absolute top-3 left-3 text-violet-400/60">✨</div>
          <div className="absolute top-3 right-3 text-violet-400/60">🌸</div>

          {/* Image du client */}
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-violet-300/50 shadow-lg bg-gradient-to-br from-violet-100 to-purple-200 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            {!imageLoaded && (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-200 to-purple-300 relative z-10">
                <span className="text-4xl">👤</span>
              </div>
            )}
            <Image
              src={client.client_imageurl}
              alt={client.client_name}
              width={112}
              height={112}
              className={`w-full h-full object-cover transition-opacity duration-300 relative z-10 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              unoptimized
            />
          </div>

          {/* Nom du client */}
          <h3 className="text-xl font-bold text-violet-800 mb-3 font-quicksand tracking-wide">
            {client.client_name}
          </h3>

          {/* Séparateur décoratif */}
          <div className="flex items-center justify-center mb-3 w-full">
            <div className="h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent flex-1"></div>
            <span className="mx-2 text-violet-400 text-xs">✨</span>
            <div className="h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent flex-1"></div>
          </div>

          {/* Description */}
          <div className="flex-grow flex items-start justify-center w-full">
            <p className="text-sm text-violet-700 leading-relaxed font-quicksand font-medium text-center px-2">
              {client.client_description}
            </p>
          </div>

          {/* Footer décoratif */}
          <div className="mt-4 flex justify-center space-x-2">
            <span className="text-violet-400/70 text-sm twinkle-animation">
              🌸
            </span>
            <span
              className="text-purple-400/70 text-sm twinkle-animation"
              style={{ animationDelay: "0.5s" }}
            >
              ✨
            </span>
            <span
              className="text-violet-400/70 text-sm twinkle-animation"
              style={{ animationDelay: "1s" }}
            >
              🌸
            </span>
          </div>

          {/* Ornements coins bas */}
          <div className="absolute bottom-3 left-3 text-violet-400/60">✨</div>
          <div className="absolute bottom-3 right-3 text-violet-400/60">🌸</div>
        </div>
      </div>
    </motion.div>
  );
}
