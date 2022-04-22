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
        });

    }

    const [currentUser, setCurrentUser] = React.useState();

    React.useEffect(() => {
        api.getProfile().then((res) => {
            setCurrentUser(res);
        })
    }, [])

    function handleUpdateAvatar({avatar}) {
        api.updateAvatar(avatar).then((res) => {
            console.log('res', res)
            setCurrentUser(res);
            closeAllPopups()
        })
    }


  return (
    
    <>   
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header/>
        <Main 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}/>
        <Footer/>
    </div>

    <EditProfilePopup opened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

    <PopupWithForm buttonText={'Сохранить'} name='add-element' title='Новое место' opened={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_title" type="text" name="name" placeholder="Название" required minLength="2" maxLength="30" id="input_title" />
        <span id="input_title-error" className="popup__error"></span>
        <input className="popup__input popup__input_type_link" type="url" name="description" placeholder="Ссылка на картинку" required id="input_link" />
        <span id="input_link-error" className="popup__error"></span>
    </PopupWithForm>

    <PopupWithForm buttonText={'Да'} name='delete-confirm' title='Вы уверены?'>
        <button className="popup__button popup__button_delete">Да</button>
    </PopupWithForm>
    
    <EditAvatarPopup opened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

    <ImagePopup 
        opened={!!selectedCard}
        card={selectedCard}
        onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
    </>

);
}

export default App;
