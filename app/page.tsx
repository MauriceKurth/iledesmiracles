"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import ClientCard from "../components/ClientCard";
import { Client } from "../types/client";
import { fetchClientsFromSheets, selectRandomClients } from "../lib/sheets";

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [allClients, setAllClients] = useState<Client[]>([]);

  // Charge tous les clients au démarrage
  useEffect(() => {
    const loadClients = async () => {
      const data = await fetchClientsFromSheets();
      setAllClients(data);
    };
    loadClients();
  }, []);

  const handleDrawClients = async () => {
    if (allClients.length === 0) return;

    setIsLoading(true);
    setIsRevealed(false);

    // Petit délai pour l'effet de suspens
    setTimeout(() => {
      const selected = selectRandomClients(allClients, 3);
      setSelectedClients(selected);
      setIsLoading(false);

      // Révèle les cartes après un petit délai
      setTimeout(() => {
        setIsRevealed(true);
      }, 300);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="text-center py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-flavors text-violet-100 mb-6 tracking-wide drop-shadow-lg">
            L'Île des Miracles
          </h1>
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xl text-violet-200 leading-relaxed font-medium shadow-sm bg-black/20 backdrop-blur-sm rounded-2xl py-4 px-8 border border-violet-400/30 font-quicksand">
              Découvrez les charmants visiteurs qui viennent explorer vos
              boutiques magiques
            </p>
          </div>
        </motion.div>
      </header>

      {/* Bouton principal */}
      <div className="text-center mb-16 relative z-10">
        <motion.button
          onClick={handleDrawClients}
          disabled={isLoading || allClients.length === 0}
          className="px-12 py-5 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 text-white font-bold rounded-full shadow-cottagecore hover:shadow-cottagecore-hover transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-xl shine-effect border-2 border-violet-400/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-4">
            <Shuffle className={`w-7 h-7 ${isLoading ? "animate-spin" : ""}`} />
            <span className="tracking-wide">
              {isLoading
                ? "Mélange des cartes..."
                : selectedClients.length > 0
                ? "Nouveau tirage"
                : "Tirer 3 clients"}
            </span>
            <span className="text-2xl">{isLoading ? "🎴" : ""}</span>
          </div>
        </motion.button>

        {allClients.length === 0 && (
          <motion.p
            className="text-violet-200 mt-6 bg-black/30 backdrop-blur-sm rounded-xl py-2 px-6 inline-block border border-violet-400/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="animate-pulse">🌸</span> Chargement des clients...{" "}
            <span className="animate-pulse">🌸</span>
          </motion.p>
        )}
      </div>

      {/* Animation de mélange */}
      {isLoading && (
        <div className="text-center mb-8 relative z-10">
          <div className="flex justify-center space-x-4 mb-4">
            <motion.div
              className="bg-white/90 rounded-xl px-3 py-2 backdrop-blur-sm"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
            >
              <span className="text-3xl">👣</span>
            </motion.div>
            <motion.div
              className="bg-white/90 rounded-xl px-3 py-2 backdrop-blur-sm"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
            >
              <span className="text-3xl">👣</span>
            </motion.div>
            <motion.div
              className="bg-white/90 rounded-xl px-3 py-2 backdrop-blur-sm"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }}
            >
              <span className="text-3xl">👣</span>
            </motion.div>
          </div>
          <p className="text-violet-200 mt-4 font-medium bg-black/30 backdrop-blur-sm rounded-xl py-2 px-6 inline-block border border-violet-400/30 font-quicksand">
            Les clients se préparent à visiter vos boutiques...
          </p>
        </div>
      )}

      {/* Cartes des clients */}
      {selectedClients.length > 0 && !isLoading && (
        <motion.div
          className="flex justify-center items-start flex-wrap gap-8 px-4 pb-12 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {selectedClients.map((client, index) => (
            <ClientCard
              key={`${client.client_id}-${Date.now()}`}
              client={client}
              index={index}
              isRevealed={isRevealed}
            />
          ))}
        </motion.div>
      )}

      {/* Footer décoratif */}
      <footer className="text-center py-8 relative z-10">
        <p className="text-violet-300 text-sm bg-black/20 backdrop-blur-sm rounded-xl py-2 px-4 inline-block border border-violet-400/30">
          Bonne aventure dans L'Île des Miracles !
        </p>
      </footer>
    </div>
  );
}
