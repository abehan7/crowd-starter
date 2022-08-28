export interface IMetadata {
  _id?: string;
  id: number;
  creator: string;
  createdAt?: Date;
  tokenSupply: number;
  walletAddress: string;
  imageId: string;

  metadata: {
    description: string;
    image: string;
    name: string;
    attributes: IAttribute[];
  };
}

interface IAttribute {
  trait_type: "influencer";
  value: string;
}
