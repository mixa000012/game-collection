import type { GameStatus } from "../types"
import styles from "./SearchBar.module.css"

interface Props {
  searchQuery: string
  statusFilter: GameStatus | ""
  onSearchChange: (value: string) => void
  onStatusChange: (value: GameStatus | "") => void
}

export function SearchBar({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className={styles.bar}>
      <input
        className={styles.search}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск..."
      />
      <select
        className={styles.filter}
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as GameStatus | "")}
      >
        <option value="">Все</option>
        <option value="backlog">Хочу поиграть</option>
        <option value="playing">Прохожу</option>
        <option value="completed">Пройдена</option>
      </select>
    </div>
  )
}
