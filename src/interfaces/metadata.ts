export interface IMetadata {
  id?: number;
  creator: string;
  createdAt?: Date;
  tokenSupply: number;
  walletAddress: string;

  metadata: {
    description: string;
    external_url?: string;
    image: string;
    name: string;
    attributes: IAttribute[];
  };
}

interface IAttribute {
  trait_type: "influencer";
  value: string;
}
