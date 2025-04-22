// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
  const userId = characters[index].id;

  fetch(`http://localhost:8000/users/${userId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 204) {        
        const updated = characters.filter((_, i) => i !== index);        
        setCharacters(updated);
      } else if (res.status === 404) {
        console.error("User not found.");
      } else {
        console.error("Unexpected error.");
      }
    })
    .catch((err) => console.error("Delete failed:", err));
}
  // src/MyApp.js (a new inner function inside MyApp())

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  // src/MyApp.js (a new inner function inside MyApp())
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  // src/MyApp.js (a new inner function inside MyApp())
  function updateList(person) {
    postUser(person)
      .then(res => res.json())
      .then(newUser => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log(error);
      });
  }
  // src/MyApp.js (a new block inside MyApp())

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      <Table 
        characterData={characters}
        removeOneCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
    </div>
  );
}


export default MyApp;