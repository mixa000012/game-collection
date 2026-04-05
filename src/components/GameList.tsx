import type { Game } from "../types"
import { GameCard } from "./GameCard"
import styles from "./GameList.module.css"

interface Props {
  games: Game[]
  onEdit: (game: Game) => void
  onDelete: (id: string) => void
}

export function GameList({ games, onEdit, onDelete }: Props) {
  if (games.length === 0) {
    return <p className={styles.empty}>Список пуст. Добавьте первую игру!</p>
  }

  return (
    <div className={styles.list}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
