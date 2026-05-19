export default function PokemonCard({ pokemon }) {
  const mainType = pokemon.types[0].type.name;

  // Pewarnaan kartu otomatis berdasarkan elemen Pokémon
  const typeColors = {
    fire: 'bg-gradient-to-br from-red-50 to-orange-100 border-red-200 text-red-800',
    water: 'bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 text-blue-800',
    grass: 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 text-green-800',
    electric: 'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200 text-yellow-800',
    bug: 'bg-gradient-to-br from-lime-50 to-green-100 border-lime-200 text-lime-800',
    normal: 'bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200 text-slate-800',
    poison: 'bg-gradient-to-br from-purple-50 to-fuchsia-100 border-purple-200 text-purple-800',
    ground: 'bg-gradient-to-br from-amber-50 to-yellow-200 border-amber-200 text-amber-950',
    fairy: 'bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200 text-pink-800',
  };

  const colorClass = typeColors[mainType] || 'bg-white border-gray-200 text-gray-800';

  return (
    <div className={`border p-5 rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center bg-white relative overflow-hidden group ${colorClass}`}>
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-300"></div>

      {/* Frame Foto Pokémon */}
      <div className="w-28 h-28 flex items-center justify-center bg-white/80 rounded-full p-2 shadow-inner backdrop-blur-md">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300 animate-float"
        />
      </div>
      
      <span className="text-[10px] font-black tracking-wider opacity-40 mt-4 bg-black/5 px-2 py-0.5 rounded-md">
        #{String(pokemon.id).padStart(3, '0')}
      </span>
      
      <h3 className="text-xl font-black capitalize mt-1 tracking-wide text-gray-800">
        {pokemon.name}
      </h3>
      
      <div className="flex gap-1.5 mt-3">
        {pokemon.types.map((t) => (
          <span key={t.type.name} className="px-3 py-0.5 bg-white/90 border border-black/5 rounded-full text-[11px] font-bold capitalize">
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}