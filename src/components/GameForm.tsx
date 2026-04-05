import { useState, useEffect } from "react"
import type { Game, GameStatus } from "../types"
import styles from "./GameForm.module.css"

interface GameFormProps {
  editingGame: Game | null
  onSubmit: (data: Omit<Game, "id">) => void
  onUpdate: (id: string, data: Partial<Game>) => void
  onCancel: () => void
}

const EMPTY_FORM = {
  title: "",
  genre: "",
  platform: "",
  rating: "",
  status: "backlog" as GameStatus,
}

export function GameForm({
  editingGame,
  onSubmit,
  onUpdate,
  onCancel,
}: GameFormProps) {
  const [formData, setFormData] = useState(EMPTY_FORM)

  useEffect(() => {
    if (editingGame) {
      setFormData({
        title: editingGame.title,
        genre: editingGame.genre,
        platform: editingGame.platform,
        rating: String(editingGame.rating),
        status: editingGame.status,
      })
    } else {
      setFormData(EMPTY_FORM)
    }
  }, [editingGame])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    const gameData = {
      title: formData.title.trim(),
      genre: formData.genre.trim(),
      platform: formData.platform.trim(),
      rating: Number(formData.rating) || 0,
      status: formData.status,
    }

    if (editingGame) {
      onUpdate(editingGame.id, gameData)
    } else {
      onSubmit(gameData)
    }

    setFormData(EMPTY_FORM)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.inputWide}
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Название"
      />
      <input
        className={styles.input}
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        placeholder="Жанр"
      />
      <input
        className={styles.input}
        name="platform"
        value={formData.platform}
        onChange={handleChange}
        placeholder="Платформа"
      />
      <select
        className={styles.input}
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="backlog">Хочу поиграть</option>
        <option value="playing">Прохожу</option>
        <option value="completed">Пройдена</option>
      </select>
      <input
        className={styles.input}
        name="rating"
        type="number"
        min="1"
        max="10"
        value={formData.rating}
        onChange={handleChange}
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
