export type GameStatus = "backlog" | "playing" | "completed"

export interface Game {
  id: string
  title: string
  genre: string
  platform: string
  rating: number
  status: GameStatus
}
