import { Recipe } from '@/types/recipe';

const API_URL = 'http://localhost:5000/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginData) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Erreur de connexion');
    }

    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    return result;
  },

  async register(data: RegisterData) {
    console.log('Données reçues dans register:', data); // Debug log

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Erreur serveur:', result); // Debug log
      throw new Error(result.message || "Erreur d'inscription");
    }

    localStorage.setItem('token', result.token);
    return result;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const recipeService = {
  async getAllRecipes(): Promise<Recipe[]> {
    console.log('Fetching recipes from API...');
    try {
      const response = await fetch(`${API_URL}/recipes`);
      console.log('API Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('API Error:', error);
        throw new Error(
          error.message || 'Erreur lors de la récupération des recettes'
        );
      }

      const data = await response.json();
      console.log('Recipes fetched:', data.length);
      return data;
    } catch (error) {
      console.error('Error in getAllRecipes:', error);
      throw error;
    }
  },

  async getRecipeById(id: string): Promise<Recipe> {
    const response = await fetch(`${API_URL}/recipes/${id}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de la recette');
    }
    return response.json();
  }
};
