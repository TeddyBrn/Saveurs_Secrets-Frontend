import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.preparationTime + recipe.cookingTime;

  return (
    <Link href={`/recipe/${recipe._id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-amber-400 text-white px-2 py-1 rounded-full text-sm z-10">
            {recipe.difficulty}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="text-amber-400" />
              <span>{(recipe.averageRating || 0).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
