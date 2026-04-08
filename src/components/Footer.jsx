import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--light-gray)] bg-white pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24 flex flex-col items-center ">
        
        {/* Grille principale */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4 ">
          
          {/* Colonne 1: Logo et Description */}
          <div className="col-span-1 lg:col-span-1 w-full">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="w-40 mb-4 object-contain" 
            />
            <p className="text-[var(--slate-gray-)] text-sm leading-relaxed">
              Votre destination privilégiée pour découvrir les meilleures catégories et articles sélectionnés avec soin.
            </p>
          </div>

          {/* Colonne 2: Navigation Rapide */}
          <div >
            <h3 className="text-[var(--dark-gray)] font-bold mb-4 uppercase text-xs tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="link-gray transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="link-gray transition-colors text-sm">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-gray transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Catégories (Dynamique) */}
          <div>
            <h3 className="text-[var(--dark-gray)] font-bold mb-4 uppercase text-xs tracking-wider">
              Catégories
            </h3>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link 
                    href={`/categories/${cat.id}`} 
                    className="link-gray  transition-colors text-sm"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4: Newsletter ou Contact */}
          <div>
            <h3 className="text-[var(--dark-gray)] font-bold mb-4 uppercase text-xs tracking-wider">
              Restez connecté
            </h3>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[var(--slate-gray-)]">Inscrivez-vous pour ne rien manquer.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="w-full rounded-l-md border border-[var(--light-gray)] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
                <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-r-md text-sm font-medium hover:opacity-90 transition-opacity">
                  OK
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Barre de copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--light-gray)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--slate-gray-)] text-xs">
            © {currentYear} VotreMarque. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[var(--slate-gray-)] hover:text-[var(--dark-gray)] text-xs transition-colors">Politique de confidentialité</a>
            <a href="#" className="text-[var(--slate-gray-)] hover:text-[var(--dark-gray)] text-xs transition-colors">Mentions légales</a>
          </div>
        </div>

      </div>
    </footer>
  );
}