import { useState } from "react"
import { useGames } from "./hooks/useGames"
import { SearchBar } from "./components/SearchBar"
import { GameForm } from "./components/GameForm"
import { GameList } from "./components/GameList"
import type { Game, GameStatus } from "./types"
import styles from "./App.module.css"

function App() {
  const { games, addGame, updateGame, deleteGame } = useGames()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<GameStatus | "">("")
  const [editingGame, setEditingGame] = useState<Game | null>(null)

  const filtered = games.filter((game) => {
    const bySearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
    const byStatus = statusFilter === "" || game.status === statusFilter
    return bySearch && byStatus
  })

  return (
    <div className={styles.app}>
      <h1 className={styles.heading}>My Games</h1>
      <SearchBar
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
      />
      <GameForm
        editingGame={editingGame}
        onSubmit={addGame}
        onUpdate={(id, game) => {
          updateGame(id, game)
          setEditingGame(null)
        }}
        onCancel={() => setEditingGame(null)}
      />
      <GameList
        games={filtered}
        onEdit={(game) => setEditingGame(game)}
        onDelete={deleteGame}
      />
    </div>
  )
}

export default App
