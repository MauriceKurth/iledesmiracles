import { Client } from "@/types/client";

// Pour récupérer les données depuis Google Sheets publié en CSV
export async function fetchClientsFromSheets(): Promise<Client[]> {
  try {
    // URL pour récupérer le Google Sheets en format CSV
    // Remplace SHEET_ID par l'ID de ton Google Sheets
    const SHEET_ID = "1R34HPr0Co5PmUyio6UA5fH6Ml86_t2zaAaaCLnqlAbc";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

    const response = await fetch(csvUrl);
    const csvText = await response.text();

    // Parse du CSV simple (on assume pas de virgules dans les données)
    const lines = csvText.split("\n");
    const clients: Client[] = [];

    // Ignore la première ligne (headers)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const columns = line.split(",");
        if (columns.length >= 4) {
          clients.push({
            client_id: columns[0].replace(/"/g, ""),
            client_name: columns[1].replace(/"/g, ""),
            client_imageurl: columns[2].replace(/"/g, ""),
            client_description: columns[3].replace(/"/g, ""),
          });
        }
      }
    }

    return clients;
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error);
    // Données de test en cas d'erreur
    return [
      {
        client_id: "1",
        client_name: "Alice la Collectionneuse",
        client_imageurl:
          "https://via.placeholder.com/200x200/ffb3d1/ffffff?text=Alice",
        client_description:
          "Adore les objets anciens et les curiosités. Toujours à la recherche de pièces uniques pour sa collection.",
      },
      {
        client_id: "2",
        client_name: "Bob le Gourmand",
        client_imageurl:
          "https://via.placeholder.com/200x200/d1ffb3/ffffff?text=Bob",
        client_description:
          "Passionné de gastronomie, il recherche des épices rares et des ingrédients exotiques.",
      },
      {
        client_id: "3",
        client_name: "Clara la Jardinière",
        client_imageurl:
          "https://via.placeholder.com/200x200/b3d1ff/ffffff?text=Clara",
        client_description:
          "Aime tout ce qui concerne le jardinage. Elle cherche des graines rares et des outils originaux.",
      },
    ];
  }
}

// Fonction pour sélectionner 3 clients aléatoires
export function selectRandomClients(
  clients: Client[],
  count: number = 3
): Client[] {
  const shuffled = [...clients].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, clients.length));
}
