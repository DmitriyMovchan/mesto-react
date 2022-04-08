import React from "react";
import {api} from '../../utils/Api';
import Card from "../Card/Card";



function Main(props) {

    const[userName, setUserName] = React.useState('');
    const[userDescription, setUserDescription] = React.useState('');
    const[userAvatar, setUserAvatar] = React.useState('');
    //const[userProfile, setUserProfile] = React.useState({})

    React.useEffect(() => {
        api.getProfile().then((res) => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
            //setUserProfile(res);
        });
      }, []); 

      const[cards, setCards] = React.useState([]);

      React.useEffect(() => {
        api.getInitialCards().then((res) => {
            const data = res.map(item => {
                return {
                likes: item.likes ? item.likes.length : 0,
                link: item.link,
                name: item.name,
                owner: item.owner,
                id: item._id
                }
            });
            setCards(data)
        });
        
    }, []);

      
    return <main className="content">
    <section className="profile">
        <button className="profile__avatar-button" onClick={props.onEditAvatar}>
        <img className="profile__avatar" src={userAvatar} /* style={{ backgroundImage: `url(${userAvatar})` }}*/ alt="аватар" />
        <div className="profile__avatar profile__avatar_hover"></div>
    </button>
        <div className="profile__info">
            <h1 className="profile__name">{userName/*userProfile.name*/}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать"></button>
            <p className="profile__profession">{userDescription/*userProfile.about*/}</p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace}  type="button"></button>
    </section>
    <section className="elements">

        {
            cards.map(item => {
                return(
                <Card
                key={item.id}
                card={item}
                onClick={props.onCardClick}
                ></Card>)
            })
        }
    </section>


  


</main>




}

export default Main