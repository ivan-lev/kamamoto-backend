export type Exhibit = {
  id: number;
  name: string;
  age?: string;
  potterName?: string;
  potterJapaneseName?: string;
  potterLifeDates?: string;
  category: string;
  style: string;
  description: string;

  potterPhoto?: string;
  potterInfo?: string;

  additionalDescription?: string;
  additionalPhotos: boolean;
  additionalPhotosCount?: number;

  price: number;
  height?: number;
  length?: number;
  width?: number;
  diameter?: number;
  footDiameter?: number;
  weigth?: number;
  volume?: number;
  weightOfSet?: number;
  complectation: string;
  preservation?: string;
};
