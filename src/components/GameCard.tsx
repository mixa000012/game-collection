import type { Game } from "../types"
import styles from "./GameCard.module.css"

const statusLabels = {
  backlog: "Хочу поиграть",
  playing: "Прохожу",
  completed: "Пройдена",
}

interface Props {
  game: Game
  onEdit: (game: Game) => void
  onDelete: (id: string) => void
}

export function GameCard({ game, onEdit, onDelete }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.title}>{game.title}</div>
        <div className={styles.meta}>
          {game.genre} · {game.platform} · {game.rating}/10
        </div>
      </div>
      <div className={styles.actions}>
        <span className={`${styles.badge} ${styles[game.status]}`}>
          {statusLabels[game.status]}
        </span>
        <button className={styles.editBtn} onClick={() => onEdit(game)}>
          ✎
        </button>
        <button className={styles.deleteBtn} onClick={() => onDelete(game.id)}>
          ×
        </button>
      </div>
    </div>
  )
}
