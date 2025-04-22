import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });
  
  const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
  
  app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; 
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });
  const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
  

  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const id = Math.floor(Math.random() * 1000000).toString();
    console.log(typeof id);    
    const newUser = {
      id: id,
      name: userToAdd.name,
      job: userToAdd.job,
    };
  
    addUser(newUser);
    res.status(201).send(newUser);
  });

  const deleteUser = (id) => {
    const initialLength = users["users_list"].length;
    users["users_list"] = users["users_list"].filter((user) => user.id !== id);
    return users["users_list"].length < initialLength; 
  };
  
  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const wasDeleted = deleteUser(id);
  
    if (wasDeleted) {
      res.status(204).send(); 
    } else {
      res.status(404).send("User not found.");
    }
  });
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
  };
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  }); 