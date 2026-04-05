import { useState, useEffect } from "react"
import type { Game, GameStatus } from "../types"
import styles from "./GameForm.module.css"

interface Props {
  editingGame: Game | null
  onSubmit: (game: Game) => void
  onUpdate: (id: string, game: Game) => void
  onCancel: () => void
}

export function GameForm({ editingGame, onSubmit, onUpdate, onCancel }: Props) {
  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [platform, setPlatform] = useState("")
  const [rating, setRating] = useState("")
  const [status, setStatus] = useState<GameStatus>("backlog")

  useEffect(() => {
    if (editingGame) {
      setTitle(editingGame.title)
      setGenre(editingGame.genre)
      setPlatform(editingGame.platform)
      setRating(String(editingGame.rating))
      setStatus(editingGame.status)
    } else {
      setTitle("")
      setGenre("")
      setPlatform("")
      setRating("")
      setStatus("backlog")
    }
  }, [editingGame])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    const game = {
      id: "",
      title: title.trim(),
      genre: genre.trim(),
      platform: platform.trim(),
      rating: Number(rating) || 0,
      status,
    }

    if (editingGame) {
      onUpdate(editingGame.id, game)
    } else {
      onSubmit(game)
    }

    setTitle("")
    setGenre("")
    setPlatform("")
    setRating("")
    setStatus("backlog")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.inputWide}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название"
      />
      <input
        className={styles.input}
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Жанр"
      />
      <input
        className={styles.input}
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        placeholder="Платформа"
      />
      <select
        className={styles.input}
        value={status}
        onChange={(e) => setStatus(e.target.value as GameStatus)}
      >
        <option value="backlog">Хочу поиграть</option>
        <option value="playing">Прохожу</option>
        <option value="completed">Пройдена</option>
      </select>
      <input
        className={styles.input}
        type="number"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Оценка (1-10)"
      />
      <div className={styles.buttons}>
        <button className={styles.submitBtn} type="submit">
          {editingGame ? "Обновить" : "Сохранить"}
        </button>
        {editingGame && (
          <button className={styles.cancelBtn} type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  )
}
