export interface IMetadata {
  id: number;
  creator: string;
  createdAt: Date;
  tokenPrice: number;
  tokenSupply: number;

  metadata: {
    description: string;
    external_url: string;
    image: string;
    name: string;
    attributes: IAttribute[];
  };
}

interface IAttribute {
  trait_type: string;
  value: string;
}
