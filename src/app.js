const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepository(request, response, next) {
  const {id} = request.params;
  if(!isUuid(id)){
    return response.status(400).send('id invalid');
  }
  next();
}

app.use("/repositories/:id", validateRepository);

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const repository = { id: uuid(),  url, title, techs, likes: 0 };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const { url, title,  techs } = request.body;
  repositoryIndex = repositories.findIndex(repository => repository.id === id);
  const likes = repositories[repositoryIndex].likes
  repository = { id, url, title, techs, likes }; 
  repositories[repositoryIndex] = repository; 
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  repositoryIndex = repositories.findIndex(repository => repository.id === id);
  repositories.splice(repositoryIndex , 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const {  url, title, techs } = request.body;
  repositoryIndex = repositories.findIndex(repository => repository.id === id);
  const likes = repositories[repositoryIndex].likes + 1;
  repository = { id, url, title, techs, likes }; 
  repositories[repositoryIndex] = repository; 
  return response.json(repository);
});

module.exports = app;
