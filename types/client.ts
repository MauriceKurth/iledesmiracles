export interface Client {
  client_id: string;
  client_name: string;
  client_imageurl: string;
  client_description: string;
  client_emoji?: string;
  client_force?: string; // "Lisa", "Morgane", "Mildred" or empty
}

export interface ClientCardProps {
  client: Client;
}