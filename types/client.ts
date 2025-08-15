export interface Client {
  client_id: string;
  client_name: string;
  client_imageurl: string;
  client_description: string;
}

export interface ClientCardProps {
  client: Client;
  index: number;
  isRevealed: boolean;
}
