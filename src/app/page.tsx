'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShrimp, faSignOut } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '@/components/SearchBar';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { recipeService } from '@/services/api';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';

export default function Home() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    router.push('/login');
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        console.log('Starting to fetch recipes...');
        const data = await recipeService.getAllRecipes();
        console.log('Recipes received:', data);
        setRecipes(data);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Erreur lors du chargement des recettes'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-6">
            <Link
              href="/"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <FontAwesomeIcon
                icon={faShrimp}
                className="text-2xl text-amber-400"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                Saveurs & Secrets
              </h1>
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <FontAwesomeIcon icon={faUser} className="text-amber-400" />
                  <span className="font-bold text-md text-gray-800">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-amber-400 text-white px-4 py-2 rounded-full hover:bg-amber-500 transition-colors flex items-center gap-2">
                  <FontAwesomeIcon icon={faSignOut} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-amber-400 text-white px-4 py-2 rounded-full hover:bg-amber-500 transition-colors flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} />
                  Connexion
                </button>
              </Link>
            )}
          </div>
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
