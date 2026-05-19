import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonGrid from './components/PokemonGrid';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  // State manajemen data API sesuai standar kriteria modul [cite: 35, 419]
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Mengambil data otomatis saat komponen pertama kali dimuat [cite: 157, 444]
  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    setLoading(true);
    setError(null);
    try {
      // KETENTUAN 1 (ENDPOINT 1): Mengambil list 40 nama & url dasar pokemon 
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
      const results = res.data.results;

      // KETENTUAN 1 (ENDPOINT 2): Mengambil detail gambar & tipe per individu pokemon 
      const detailRequests = results.map((pokemon) => axios.get(pokemon.url));
      const detailResponses = await Promise.all(detailRequests);
      
      const detailedData = detailResponses.map((response) => response.data);
      setPokemons(detailedData);
    } catch (err) {
      // KETENTUAN 5: Error Handling jika gagal load data 
      setError('Gagal memuat data dari PokeAPI. Periksa koneksi internet Anda!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // KETENTUAN 3 & 4: Logika pencarian (Search) dan filter kategori elemen 
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || pokemon.types.some(t => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 text-gray-850 font-sans antialiased">
      {/* Header Dashboard */}
      <header className="bg-red-600 text-white py-12 px-4 shadow-md text-center relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-black tracking-wider drop-shadow-sm">🔴 POKÉMON DASHBOARD</h1>
        <p className="text-red-100 mt-2 font-semibold tracking-wide text-sm md:text-base">Tugas Mandiri PjBL — Integrasi RESTful API Publik</p>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-6 md:p-8">
        
        {/* Panel Kontrol Atas: KETENTUAN 3 (Search) & KETENTUAN 4 (Filter)  */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-5 rounded-2xl shadow-xs border border-gray-150">
          {/* Kolom Input Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari nama Pokémon jagoanmu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-3 focus:ring-red-500/20 focus:border-red-500 font-semibold text-gray-700 bg-gray-50/50"
            />
          </div>

          {/* Dropdown Kategori Elemen */}
          <div className="min-w-[200px]">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-3 focus:ring-red-500/20 focus:border-red-500 bg-white font-bold text-gray-600 capitalize cursor-pointer"
            >
              <option value="all">✨ Semua Elemen</option>
              <option value="grass">Grass 🌿</option>
              <option value="fire">Fire 🔥</option>
              <option value="water">Water 💧</option>
              <option value="bug">Bug 🐛</option>
              <option value="normal">Normal 🔘</option>
              <option value="electric">Electric ⚡</option>
              <option value="poison">Poison ☠️</option>
              <option value="ground">Ground ⛰️</option>
              <option value="fairy">Fairy ✨</option>
            </select>
          </div>
        </div>

        {/* KETENTUAN 5: Conditional Rendering State Loading  */}
        {loading && <LoadingSpinner />}
        
        {/* KETENTUAN 5: Conditional Rendering State Error  */}
        {error && (
          <div className="text-center p-10 bg-red-50 border border-red-200 rounded-2xl max-w-md mx-auto">
            <p className="text-red-600 font-bold mb-4">{error}</p>
            <button 
              onClick={fetchPokemons} 
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-md cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* UI Sukses Terbuka */}
        {!loading && !error && (
          <>
            {/* Bagian teks informasi & tombol refresh yang sudah aman tidak ketumpuk */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500 font-bold tracking-wide uppercase">
                📊 HASIL FILTER GRID SLIDE: {filteredPokemons.length} POKÉMON
              </p>
              <button 
                onClick={fetchPokemons} 
                className="px-4 py-2 bg-gray-200/70 text-gray-700 hover:bg-gray-200 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                🔄 Refresh Data
              </button>
            </div>
            
            {/* KETENTUAN 2 & 6: Slide Grid Berbentuk Card Horizontal & Mobile Friendly  */}
            <PokemonGrid pokemons={filteredPokemons} />
          </>
        )}
      </main>
    </div>
  );
}

// FIX ERROR EXPORT NAMED DEFAULT: Memastikan modul di-export dengan benar agar tidak blank screen lagi!
export default App;