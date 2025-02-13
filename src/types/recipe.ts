export interface Recipe {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  preparationTime: number;
  cookingTime: number;
  servings: number;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  category: 'Entrée' | 'Plat' | 'Dessert' | 'Boisson';
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  steps: {
    stepNumber: number;
    description: string;
  }[];
  ratings: {
    score: number;
    comment?: string;
  }[];
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}
