import type { ReactElement } from "react"

interface Props {
  icon: ReactElement,
  name: string,
  content: string
}

export default function PromoCard({ icon, name, content}: Props) {

    return (
        <article className="promo-card">
            { icon }
            <p className="promo-title">{name}</p>
            <p className="promo-content">{content}</p>
        </article>
    )
}