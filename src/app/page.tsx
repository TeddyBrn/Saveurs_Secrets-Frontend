'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShrimp, faSignOut } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '@/components/SearchBar';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    router.push('/login');
  };

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
                  <span className="font-bold text-md text-gray-800">{user.username}</span>
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
      <main className=""></main>
    </div>
  );
}
