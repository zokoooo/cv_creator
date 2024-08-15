

export default function Modal( { onClickNo, onClickYes } ) {
    return (
        <div className="modal">
            <div className="modal_block">
                <p className="text_modal">Clear form?<br/>All entered data will be lost</p>
                <div className="buttons_flex">
                    <button className="button_yes" onClick={onClickYes}>Yes</button>
                    <button className="button_no" onClick={onClickNo}>No</button>
                </div>
            </div>
        </div>
    )
}