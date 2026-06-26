interface Props {
    onchange: (content: string) => void,
    value: string,
    onclick: () => void,
    onclose: () => void
}

export default function ReviewModal({ onchange, onclick, value, onclose }: Props) {

    return (
        <div className="modal-container">
            <div className="review-modal">
                <h3>Ajouter une review</h3>
                <div className="input-container">
                    <label htmlFor="review">Review</label>
                    <textarea name="review" id="review" placeholder="Écrire votre review" value={value} onChange={(e) => onchange(e.target.value)}></textarea>
                </div>
                <div className="btn-container">
                    <button className={`btn small-btn red-btn ${value.length === 0 ? 'disabled': ''}`} onClick={onclick} disabled={value.length === 0}>Ajouter</button>
                    <button className={`small-btn grey-btn`} onClick={() => onclose()}>Fermer</button>
                </div>
            </div>
        </div>
    )
}