import React from "react";

function Card({card, onClick}) {

    function handleClick() {
        if (onClick) onClick(card);
    }
    
    return (
        <article className="element">
        <button className="element__delete"></button>
        <button className="element__button-image" type="submit">
            <img className="element__image" src={card && card.link} alt="Картинка" onClick={handleClick}/>
        </button>
        <div className="mask-group"> 
            <h2 className="mask-group__description">{card && card.name}</h2>
            <div className="mask-group__group">
                <button className="mask-group__group_heard" type="submit"></button>
                <span className="mask-group__group_count">{card && card.likes}</span>
            </div>
        </div>
    </article>
    )
}

export default Card