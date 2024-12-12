import { useState } from "react";
import "./App.css";

const friendsList = [{ name: "Pierre Rolens" }, { name: "Vicky Dede" }];

export default function App() {
  const [friends, setFriends] = useState(friendsList);
  const [toggleForm, setForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function toggleAddFriend(e) {
    e.preventDefault();
    setForm((i) => !i);
    setSelectedFriend(null);
  }
  return (
    <div className="App">
      <header className="header">
        <h1 className="header__heading-main">Friends List</h1>
        <p>Keep track of your friends list</p>
      </header>
      <div className="friend">
        <div className="friend__menu">
          <div className="friend__form">
            {toggleForm ? (
              <AddFriendForm friendList={friends} setFriendList={setFriends} />
            ) : null}
            {toggleForm ? (
              <Button btnClass={"btn"} func={toggleAddFriend}>
                Close Form
              </Button>
            ) : (
              <Button btnClass={"btn"} func={toggleAddFriend}>
                Add Friend
              </Button>
            )}
          </div>

          <div className="friend__list">
            <ul>
              {friends.map((f, k) => (
                <Friend
                  friend={f}
                  key={k}
                  friendsList={friends}
                  setfriendsList={setFriends}
                  setSelectedFriend={setSelectedFriend}
                  selectedFriend={selectedFriend}
                  setForm={setForm}
                  toggleForm={toggleForm}
                />
              ))}
            </ul>
          </div>
        </div>

        {selectedFriend && !toggleForm ? (
          <FriendInfo friend={selectedFriend} />
        ) : null}
      </div>
    </div>
  );
}

function Button({ children, btnClass, func }) {
  return (
    <>
      <button className={btnClass} onClick={func}>
        {children}
      </button>
    </>
  );
}

function Friend({
  friend,
  friendsList,
  setfriendsList,
  setSelectedFriend,
  selectedFriend,
  toggleForm,
  setForm,
}) {
  function deleteFriend(friend) {
    let list2 = friendsList.filter((f) => f.name !== friend.name);
    if (toggleForm) {
      setForm(!toggleForm);
      handleSelectedFriend();
    }
    setfriendsList(list2);
  }

  function handleSelectedFriend() {
    if (toggleForm) setForm(!toggleForm);
    if (friend === selectedFriend) {
      setSelectedFriend(null);
      return;
    }
    setSelectedFriend(friend);
  }

  return (
    <>
      <div className="friend__main" onClick={() => handleSelectedFriend()}>
        <h3>{friend.name}</h3>
        <Button btnClass={"btn__text"} func={() => deleteFriend(friend)}>
          &#88;
        </Button>
      </div>
    </>
  );
}

function AddFriendForm({ friendList, setFriendList }) {
  const [name, setName] = useState(null);
  const [birthday, setBirthday] = useState(null);

  function sendFormSubmition(e) {
    e.preventDefault();
    console.log(name);
    if (!name) return;
    let newFriend = {
      name,
      birthday,
      id: crypto.randomUUID(),
    };
    setName("");
    setBirthday("");

    setFriendList([...friendList, newFriend]);
  }

  return (
    <>
      <form className="form__addFriend">
        <label>Name</label>
        <input
          value={name}
          placeholder="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label>Birthday</label>
        <input
          value={birthday}
          name="birthday"
          placeholder="Birthday"
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
        ></input>
      </form>

      <Button btnClass="btn btn-secondary" func={sendFormSubmition}>
        Submit
      </Button>
    </>
  );
}

function FriendInfo({ friend }) {
  return (
    <>
      <div className="friend__info">
        <h2>{friend?.name}</h2>
        {friend?.birthday ? (
          <p>Your friend birthday is on {friend?.birthday}</p>
        ) : null}
      </div>
    </>
  );
}
