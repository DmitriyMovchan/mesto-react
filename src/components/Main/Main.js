import React from "react";
import {api} from '../../utils/Api';
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";



function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);  
    const[cards, setCards] = React.useState([]);    

      React.useEffect(() => {
        api.getInitialCards().then((res) => {
            const data = res.map(item => {
                return {
                likes: item.likes ? item.likes : 0,
                link: item.link,
                name: item.name,
                owner: item.owner,
                _id: item._id
                }
            });
            setCards(data)
        });
        
    }, []);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleCardDelete(card) {
        console.log(card.owner._id)
        const isMyCard = card.owner._id === currentUser._id;
        if (isMyCard) api.deleteCard(card._id).then(() => {
            setCards(cards.filter((x) => x._id !== card._id))
        }).catch((err) => {
            console.log(err);
        })
    }
    
    return <main className="content">
    <section className="profile">
        <button className="profile__avatar-button" onClick={props.onEditAvatar}>
        <img className="profile__avatar" src={currentUser && currentUser.avatar} /* style={{ backgroundImage: `url(${userAvatar})` }}*/ alt="аватар" />
        <div className="profile__avatar profile__avatar_hover"></div>
    </button>
        <div className="profile__info">
            <h1 className="profile__name">{currentUser && currentUser.name/*userProfile.name*/}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать"></button>
            <p className="profile__profession">{currentUser && currentUser.about/*userProfile.about*/}</p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace}  type="button"></button>
    </section>
    <section className="elements">

        {
            cards.map(item => {
                return(
                <Card
                key={item._id}
                card={item}
                onClick={props.onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                ></Card>)
            })
        }
    </section>

</main>
}

export default Main