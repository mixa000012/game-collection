import { useState } from "react"
import type { Game } from "../types"

export function useGames() {
  const [games, setGames] = useState<Game[]>([])

  function addGame(game: Game) {
    setGames([...games, { ...game, id: String(Date.now()) }])
  }

  function updateGame(id: string, updated: Game) {
    setGames(games.map((g) => (g.id === id ? updated : g)))
  }

  function deleteGame(id: string) {
    setGames(games.filter((g) => g.id !== id))
  }

  return { games, addGame, updateGame, deleteGame }
}
