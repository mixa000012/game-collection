import { useGames } from "./hooks/useGames"
import { GameList } from "./components/GameList"
import type { Game } from "./types"

function App() {
  const { games, addGame, deleteGame } = useGames()

  const handleEdit = (game: Game) => {
    console.log("edit", game)
  }

  return (
    <div>
      <h1>Game Collection</h1>
      <button
        onClick={() =>
          addGame({
            title: "Test Game",
            genre: "RPG",
            platform: "PC",
            rating: 8,
            status: "playing",
          })
        }
      >
        Add test game
      </button>
      <GameList games={games} onEdit={handleEdit} onDelete={deleteGame} />
    </div>
  )
}

export default App
