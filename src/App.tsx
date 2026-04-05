import { useGames } from "./hooks/useGames"

function App() {
  const { games, addGame, deleteGame } = useGames()

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
      <p>Games count: {games.length}</p>
      {games.map((game) => (
        <div key={game.id}>
          {game.title}{" "}
          <button onClick={() => deleteGame(game.id)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default App
