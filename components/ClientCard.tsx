"use client";

import { motion } from "framer-motion";
import { ClientCardProps } from "../types/client";
import { useState } from "react";
import Image from "next/image";

export default function ClientCard({ client }: ClientCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-96 h-[520px] mx-4 cursor-pointer">
      {/* Face visible de la carte */}
      <div className="absolute inset-0 w-full h-full rounded-3xl shadow-cottagecore card-texture border border-violet-200/30 p-6">
        <div className="h-full flex flex-col items-center text-center relative">
          {/* Ornements coins avec émoji personnalisé */}
          <div className="absolute top-3 left-3 text-violet-400/60">
            {client.client_emoji || "✨"}
          </div>
          <div className="absolute top-3 right-3 text-violet-400/60">
            {client.client_emoji || "✨"}
          </div>

          {/* Image du client - RECTANGLE VERTICAL */}
          <div className="w-48 h-60 overflow-hidden mb-4 rounded-lg relative ">
            {client.client_imageurl && client.client_imageurl.trim() !== "" ? (
              <Image
                src={client.client_imageurl}
                alt={client.client_name || "Client"}
                width={192}
                height={240}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}
                unoptimized
                priority={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-200/30 to-violet-300/30">
                <div className="text-4xl text-violet-400/60">
                  {client.client_emoji || "✨"}
                </div>
              </div>
            )}
          </div>

          {/* Nom du client */}
          <h3 className="text-xl font-bold text-violet-800 mb-3 font-quicksand tracking-wide">
            {client.client_name}
          </h3>

          {/* Séparateur décoratif avec émoji personnalisé */}
          <div className="flex items-center justify-center mb-3 w-full">
            <div className="h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent flex-1"></div>
            <span className="mx-2 text-violet-400 text-xs">
              {client.client_emoji || "✨"}
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent flex-1"></div>
          </div>

          {/* Description */}
          <div className="flex-grow flex items-start justify-center w-full">
            <p className="text-sm text-violet-700 leading-relaxed font-quicksand font-medium text-center px-2">
              {client.client_description}
            </p>
          </div>

          {/* Footer décoratif avec émoji personnalisé */}
          <div className="mt-4 flex justify-center space-x-2">
            <span className="text-violet-400/70 text-sm twinkle-animation">
              {client.client_emoji || "✨"}
            </span>
            <span
              className="text-purple-400/70 text-sm twinkle-animation"
              style={{ animationDelay: "0.5s" }}
            >
              {client.client_emoji || "✨"}
            </span>
            <span
              className="text-violet-400/70 text-sm twinkle-animation"
              style={{ animationDelay: "1s" }}
            >
              {client.client_emoji || "✨"}
            </span>
          </div>

          {/* Ornements coins bas avec émoji personnalisé */}
          <div className="absolute bottom-3 left-3 text-violet-400/60">
            {client.client_emoji || "✨"}
          </div>
          <div className="absolute bottom-3 right-3 text-violet-400/60">
            {client.client_emoji || "✨"}
          </div>
        </div>
      </div>
    </div>
  );
}
