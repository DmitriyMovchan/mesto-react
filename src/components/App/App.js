import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import {api} from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';


function App() {
    const[isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const[isAddPlacePopupOpen, setisAddPlacePopupOpen] =React.useState(false);
    const[isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
    const[selectedCard, setSelectedCard] = React.useState(null);


    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setisAddPlacePopupOpen(false);
        setisEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    function handleEditAvatarClick() {
        setisEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }
        
    function handleEditProfileClick() {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    
    function handleAddPlaceClick() {
        setisAddPlacePopupOpen(!isAddPlacePopupOpen)
    }

    function handleCardClick(item) {
        setSelectedCard(item)
    }

    function handleUpdateUser({name, about}) {
        api.editProfile(name, about).then((res) => {
            setCurrentUser(res);
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleAddPlaceSubmit({name, link}) {
        api.addCard({name, link}).then((res) => {
            console.log(res)
            setCards([res, ...cards]); 
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    const [currentUser, setCurrentUser] = React.useState();

    React.useEffect(() => {
        api.getProfile().then((res) => {
            setCurrentUser(res);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    function handleUpdateAvatar({avatar}) {
        api.updateAvatar(avatar).then((res) => {
            console.log('res', res)
            setCurrentUser(res);
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        });
    }

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
        }).catch((err) => {
            console.log(err);
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
        const isMyCard = card.owner._id === currentUser._id;
        if (isMyCard) api.deleteCard(card._id).then(() => {
            setCards(cards.filter((x) => x._id !== card._id))
        }).catch((err) => {
            console.log(err);
        })
    }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header/>
        <Main 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            />
        <Footer/>
    </div>

    <EditProfilePopup opened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

    <AddPlacePopup opened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit}/>

    <PopupWithForm buttonText={'Да'} name='delete-confirm' title='Вы уверены?'>
        <button className="popup__button popup__button_delete">Да</button>
    </PopupWithForm>
    
    <EditAvatarPopup opened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

    <ImagePopup 
        opened={!!selectedCard}
        card={selectedCard}
        onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
);
}

export default App;
