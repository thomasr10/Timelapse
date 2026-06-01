import { formatCurrency } from "../utils/formatCurrency";
import { localFormatDate } from "../utils/formatDate";

interface Props {
    director: string | undefined,
    release_date: string | undefined,
    budget: number | undefined,
    revenue: number | undefined
}

export default function MediaInfo({ director, release_date, budget, revenue }: Props) {

    return (
        <div className="media-infos-container">
            <h2>Infos générales</h2>
            <dl>
                <div className="media-info-row">
                    <dt>Réalisateur</dt>
                    <dd>{ director }</dd>
                </div>
                <div className="row"></div>
                <div className="media-info-row">
                    <dt>Date de sortie</dt>
                    <dd>{ localFormatDate(release_date) }</dd>
                </div>
                <div className="row"></div>
                <div className="media-info-row">
                    <dt>Budget</dt>
                    <dd>{ formatCurrency(budget) }</dd>
                </div>
                <div className="row"></div>
                <div className="media-info-row">
                    <dt>Recette</dt>
                    <dd className="revenue">{ formatCurrency(revenue) }</dd>
                </div>
            </dl>
        </div>
    )
}