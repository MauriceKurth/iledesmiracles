/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import ClientCard from "../components/ClientCard";
import { Client } from "../types/client";
import { fetchClientsFromSheets, selectRandomClients } from "../lib/sheets";

export default function Home() {
  const [boutiqueClients, setBoutiqueClients] = useState<{
    "Boutique de Lisa": Client | null;
    "Boutique de Mildred": Client | null;
    "Boutique de Morgane": Client | null;
  }>({
    "Boutique de Lisa": null,
    "Boutique de Mildred": null,
    "Boutique de Morgane": null,
  });
  const [loadingBoutique, setLoadingBoutique] = useState<string | null>(null);
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Charge tous les clients au démarrage
  useEffect(() => {
    if (!isClient) return;
    
    const loadClients = async () => {
      setIsDataLoading(true);
      const data = await fetchClientsFromSheets();
      setAllClients(data);
      setIsDataLoading(false);
    };
    loadClients();
  }, [isClient]);

  // Helper function to get the owner name from boutique name
  const getBoutiqueOwner = (boutiqueName: string): string => {
    if (boutiqueName === "Boutique de Lisa") return "Lisa";
    if (boutiqueName === "Boutique de Mildred") return "Mildred";
    if (boutiqueName === "Boutique de Morgane") return "Morgane";
    return "";
  };

  const handleDrawClientsForBoutique = async (boutiqueName: string) => {
    if (allClients.length === 0) return;

    setLoadingBoutique(boutiqueName);

    // Petit délai pour l'effet de suspens
    setTimeout(() => {
      const owner = getBoutiqueOwner(boutiqueName);
      
      // Get currently assigned clients to exclude them
      const assignedClients = Object.values(boutiqueClients).filter(client => client !== null);
      const assignedClientIds = assignedClients.map(client => client!.client_id);
      
      // First check if there are clients forced to this boutique
      const forcedClients = allClients.filter(client => 
        client.client_force === owner && 
        !assignedClientIds.includes(client.client_id)
      );
      
      let selectedClient: Client;
      
      if (forcedClients.length > 0) {
        // Always choose the first forced client (deterministic)
        // Sort by client_id to ensure consistency
        forcedClients.sort((a, b) => a.client_id.localeCompare(b.client_id));
        selectedClient = forcedClients[0];
      } else {
        // No forced clients, use normal selection logic
        // Exclude clients that are forced to other boutiques
        const availableClients = allClients.filter(client => 
          !assignedClientIds.includes(client.client_id) && 
          (!client.client_force || client.client_force === owner)
        );
        
        // If no available clients, use all clients (reset scenario)
        const clientPool = availableClients.length > 0 ? availableClients : allClients;
        
        const selected = selectRandomClients(clientPool, 1);
        selectedClient = selected[0];
      }
      
      const clientWithBoutique = {
        ...selectedClient,
        boutique: boutiqueName
      };
      
      setBoutiqueClients(prev => ({
        ...prev,
        [boutiqueName]: clientWithBoutique
      }));
      setLoadingBoutique(null);
    }, 2000);
  };

  // Prevent hydration issues by showing consistent initial state
  if (!isClient) {
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
              L&apos;Île des Miracles
            </h1>
            <div className="max-w-3xl mx-auto px-4">
              <p className="text-xl text-violet-200 leading-relaxed font-medium shadow-sm bg-black/20 backdrop-blur-sm rounded-2xl py-4 px-8 border border-violet-400/30 font-quicksand">
                Découvrez les charmants visiteurs qui viennent explorer vos
                boutiques magiques
              </p>
            </div>
          </motion.div>
        </header>
        
        {/* Loading state */}
        <div className="text-center mb-16 relative z-10 h-24 flex items-center justify-center">
          <div className="text-violet-200 bg-black/30 backdrop-blur-sm rounded-xl py-3 px-8 border border-violet-400/30">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌸</span>
              <span className="font-quicksand font-medium">
                Préparation de l'expérience magique...
              </span>
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            L&apos;Île des Miracles
          </h1>
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xl text-violet-200 leading-relaxed font-medium shadow-sm bg-black/20 backdrop-blur-sm rounded-2xl py-4 px-8 border border-violet-400/30 font-quicksand">
              Découvrez les charmants visiteurs qui viennent explorer vos
              boutiques magiques
            </p>
          </div>
        </motion.div>
      </header>

      {/* Zone des boutiques - Hauteur fixe pour éviter les décalages */}
      <div className="text-center mb-16 relative z-10">
        {isDataLoading ? (
          // Message de chargement initial
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-violet-200 bg-black/30 backdrop-blur-sm rounded-xl py-3 px-8 border border-violet-400/30 h-24 flex items-center justify-center"
          >
            <div className="flex items-center space-x-3">
              <motion.span
                className="text-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🌸
              </motion.span>
              <span className="font-quicksand font-medium">
                Chargement des clients magiques...
              </span>
              <motion.span
                className="text-2xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.span>
            </div>
          </motion.div>
        ) : (
          // Boutons des boutiques (apparaissent une fois les données chargées)
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            className="flex justify-center gap-6 flex-wrap"
          >
            {/* Boutique 1 - Orange pastel */}
            <motion.button
              onClick={() => handleDrawClientsForBoutique("Boutique de Lisa")}
              disabled={loadingBoutique !== null}
              className="px-8 py-4 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg border-2 border-orange-300/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">🍑</span>
                <span className="tracking-wide">Boutique de Lisa</span>
              </div>
            </motion.button>

            {/* Boutique de Mildred - Vert pastel */}
            <motion.button
              onClick={() => handleDrawClientsForBoutique("Boutique de Mildred")}
              disabled={loadingBoutique !== null}
              className="px-8 py-4 bg-gradient-to-r from-green-300 via-green-400 to-green-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg border-2 border-green-300/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">🌿</span>
                <span className="tracking-wide">Boutique de Mildred</span>
              </div>
            </motion.button>

            {/* Boutique de Morgane - Rose pastel */}
            <motion.button
              onClick={() => handleDrawClientsForBoutique("Boutique de Morgane")}
              disabled={loadingBoutique !== null}
              className="px-8 py-4 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg border-2 border-pink-300/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">🌸</span>
                <span className="tracking-wide">Boutique de Morgane</span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </div>


      {/* Sections des boutiques */}
      <div className="flex justify-center items-start flex-wrap gap-8 px-4 pb-12 relative z-10">
        {(["Boutique de Lisa", "Boutique de Mildred", "Boutique de Morgane"] as const).map((boutiqueName, index) => {
          const client = boutiqueClients[boutiqueName];
          const isLoading = loadingBoutique === boutiqueName;
          
          return (
            <motion.div 
              key={boutiqueName} 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Label de la boutique */}
              <div className={`mb-4 px-4 py-2 rounded-full text-white font-medium text-sm ${
                boutiqueName === "Boutique de Lisa" ? "bg-orange-400" :
                boutiqueName === "Boutique de Mildred" ? "bg-green-400" : "bg-pink-400"
              }`}>
                {boutiqueName}
              </div>
              
              {isLoading ? (
                /* Loading state - pulsing card */
                <div className="relative w-96 h-[520px] mx-4">
                  <motion.div 
                    className="absolute inset-0 w-full h-full rounded-3xl shadow-cottagecore bg-gradient-to-br from-violet-500 via-purple-600 to-violet-700 flex items-center justify-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                    <div className="text-center text-white relative z-10">
                      <motion.div
                        className="text-7xl mb-4 drop-shadow-lg"
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        ✨
                      </motion.div>
                      <motion.p 
                        className="text-lg font-medium opacity-90 font-quicksand tracking-wide"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Nouveau client en route...
                      </motion.p>
                      <div className="text-sm text-white/70 font-medium tracking-wider uppercase mt-2">
                        {boutiqueName}
                      </div>
                    </div>
                    {/* Ornements coins animés */}
                    <motion.div 
                      className="absolute top-4 left-4 text-2xl"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    >🌸</motion.div>
                    <motion.div 
                      className="absolute top-4 right-4 text-2xl"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >🌸</motion.div>
                    <motion.div 
                      className="absolute bottom-4 left-4 text-2xl"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >✨</motion.div>
                    <motion.div 
                      className="absolute bottom-4 right-4 text-2xl"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    >✨</motion.div>
                  </motion.div>
                </div>
              ) : client ? (
                <ClientCard
                  key={client.client_id}
                  client={client}
                />
              ) : (
                /* Carte placeholder (dos de carte) - Same size as ClientCard */
                <div className="relative w-96 h-[520px] mx-4">
                  <div className="absolute inset-0 w-full h-full rounded-3xl shadow-cottagecore border-ornate bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                    <div className="text-center text-white relative z-10">
                      <motion.div
                        className="text-7xl mb-4 drop-shadow-lg"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        🎴
                      </motion.div>
                      <p className="text-lg font-medium opacity-90 font-quicksand tracking-wide">
                        En attente d'un client...
                      </p>
                      <div className="text-sm text-white/70 font-medium tracking-wider uppercase mt-2">
                        Île des Miracles
                      </div>
                    </div>
                    {/* Ornements coins */}
                    <div className="absolute top-4 left-4 text-2xl opacity-60">🌸</div>
                    <div className="absolute top-4 right-4 text-2xl opacity-60">🌸</div>
                    <div className="absolute bottom-4 left-4 text-2xl opacity-60">✨</div>
                    <div className="absolute bottom-4 right-4 text-2xl opacity-60">✨</div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer décoratif */}
      <footer className="text-center py-8 relative z-10">
        <p className="text-violet-300 text-sm bg-black/20 backdrop-blur-sm rounded-xl py-2 px-4 inline-block border border-violet-400/30">
          Bonne aventure dans L&apos;Île des Miracles !
        </p>
      </footer>
    </div>
  );
}