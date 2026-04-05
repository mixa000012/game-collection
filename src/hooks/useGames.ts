import { useState } from "react"
import type { Game } from "../types"

export function useGames() {
  const [games, setGames] = useState<Game[]>([])

  const addGame = (data: Omit<Game, "id">) => {
    const newGame: Game = { ...data, id: crypto.randomUUID() }
    setGames((prev) => [...prev, newGame])
  }

  const updateGame = (id: string, data: Partial<Game>) => {
    setGames((prev) =>
      prev.map((game) => (game.id === id ? { ...game, ...data } : game))
    )
  }

  const deleteGame = (id: string) => {
    setGames((prev) => prev.filter((game) => game.id !== id))
  }

  return { games, addGame, updateGame, deleteGame }
}
