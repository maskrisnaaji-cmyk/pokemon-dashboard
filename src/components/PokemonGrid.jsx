import PokemonCard from './PokemonCard';

export default function PokemonGrid({ pokemons }) {
  // Antisipasi jika hasil pencarian atau filter elemen kosong
  if (pokemons.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-gray-350 shadow-xs w-full">
        <p className="text-gray-500 font-bold text-lg">🔍 Pokémon tidak ditemukan...</p>
        <p className="text-gray-400 text-sm mt-1">Coba ketik kata kunci nama lain atau ubah kategori elemennya.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Kontainer Utama Multi-Row Slide Grid */}
      <div className="grid grid-rows-1 md:grid-rows-2 grid-flow-col gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth">
        {pokemons.map((pokemon) => (
          <div 
            key={pokemon.id} 
            className="w-[260px] sm:w-[280px] shrink-0 snap-center"
          >
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>
      
      {/* Keterangan navigasi bawah yang rapi tanpa tumpang tindih */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-3 pt-3 border-t border-gray-200/60 text-xs text-gray-400 font-medium gap-2">
        <p>📱 Navigasi: Usap layar kanan-kiri atau geser mouse scroll horizontal.</p>
        <p className="text-red-500/85 font-bold animate-pulse">Geser ke kanan untuk melihat lebih banyak →</p>
      </div>
    </div>
  );
}