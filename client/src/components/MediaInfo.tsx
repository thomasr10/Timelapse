import { formatCurrency } from "../utils/formatCurrency";
import { localFormatDate } from "../utils/formatDate";
import { formatStatus } from "../utils/formatStatus";

interface Props {
    director?: string | undefined,
    release_date: string | undefined,
    budget: number | undefined,
    revenue: number | undefined,
    type: string | undefined,
    status?: string,
    number_of_seasons?: number | undefined
}

export default function MediaInfo({ director, release_date, budget, revenue, type, status, number_of_seasons }: Props) {


    return (
        <div className="media-infos-container">
            <h2 className="media-detail-h2">Infos générales</h2>
            <dl>
                <div className="media-info-row">
                    <dt>Réalisateur</dt>
                    <dd>{director ? director : 'N/A'}</dd>
                </div>
                <div className="row"></div>
                <div className="media-info-row">
                    <dt>Date de sortie</dt>
                    <dd>{localFormatDate(release_date)}</dd>
                </div>
                <div className="row"></div>
                {
                    type === 'movie' ?
                        <>
                            <div className="media-info-row">
                                <dt>Budget</dt>
                                <dd>{formatCurrency(budget)}</dd>
                            </div>
                            <div className="row"></div>
                            <div className="media-info-row">
                                <dt>Recette</dt>
                                <dd className="revenue">{formatCurrency(revenue)}</dd>
                            </div>
                        </>
                        :
                        <>
                            <div className="media-info-row">
                                <dt>Saisons</dt>
                                <dd>{number_of_seasons}</dd>
                            </div>
                            <div className="row"></div>
                            <div className="media-info-row">
                                <dt>Status</dt>
                                <dd className={
                                    status === "Returning Series" ? "returning" : status === "Canceled" ? "canceled" : "ended"}
                                >
                                    {formatStatus(status)}
                                </dd>
                            </div>
                        </>
                }
            </dl>
        </div>
    )
}