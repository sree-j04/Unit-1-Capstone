import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
import "./RecipeCard.css";

interface RecipeCardProps {
  id: string;
  title: string;
  image?: string;
  tags?: string[];
  createdAt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

function RecipeCard({
  id,
  title,
  image,
  tags,
  createdAt,
  onEdit,
  onDelete,
}: RecipeCardProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : null;

  return (
    <div className="recipe-card">
      <Link to={`/recipes/${id}`} className="recipe-card-link">
        {image && <img src={image} alt={title} className="recipe-card-image" />}
        <div className="recipe-card-body">
          <h3>{title}</h3>
          {formattedDate && (
            <p className="recipe-card-date">Created on {formattedDate}</p>
          )}
          <div className="recipe-card-tags">
            {tags?.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </Link>
      {(onEdit || onDelete) && (
        <div className="recipe-card-actions">
          {onDelete && (
            <button
              type="button"
              className="icon-button"
              onClick={onDelete}
              aria-label="Delete recipe"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              className="icon-button"
              onClick={onEdit}
              aria-label="Edit recipe"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
