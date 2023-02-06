const express = require("express");
const dbConnection = require("./config/dbConnection");
const Person = require("./models/Person");

const createPerson = async (req) => {
  try {
    const person = new Person({
      name: req.name,
      age: req.age,
      favoriteFoods: req.food,
    });
    await person.save();
    console.log("Person added successfully");
  } catch (error) {
    console.log(error);
  }
};
//createPerson()
const arrayOfPeople = [
  { name: "John", age: 25, favoriteFoods: ["pizza", "burgers"] },
  { name: "Jane", age: 28, favoriteFoods: ["salad", "sushi"] },
  { name: "Jim", age: 30, favoriteFoods: ["steak", "potatoes"] },
];

const createPeople = async (array) => {
  try {
    const people = await Person.create(array);
    console.log("People created and saved");
  } catch (error) {
    console.error(error);
  }
};
//createPeople()
const findPeopleByName = async () => {
  try {
    const people = await Person.find({ name: "John" });
    console.log(people);
  } catch (error) {
    console.error(error);
  }
};
//findPeopleByName()
const findPersonByFavoriteFood = async () => {
  try {
    const person = await Person.findOne({ favoriteFoods: "pizza" });
    console.log(person);
  } catch (error) {
    console.error(error);
  }
};
//findPersonByFavoriteFood()
const findPersonById = async (id) => {
  try {
    const person = await Person.findById(id);
    console.log(person);
  } catch (error) {
    console.error(error);
  }
};
// findPersonById()
const updatePersonById = async (id,food) => {
  try {
    const person = await Person.findById(id);
    person.favoriteFoods.push(food);
    person.markModified("favoriteFoods");
    await person.save();
  } catch (error) {
    console.error(error);
  }
};
//updatePersonById()
const updatePersonByName = async (name) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: name },
      { age: 20 },
      { new: true }
    );
    return updatedPerson;
  } catch (error) {
    console.error(error);
  }
};
// updatePersonByName()
const deletePersonById = async (id) => {
  try {
    await Person.findByIdAndRemove(id);
  } catch (error) {
    console.error(error);
  }
};
//deletePersonById()
const deletePeopleByName = async (name) => {
  try {
    const result = await Person.remove({ name:name });
    return result;
  } catch (error) {
    console.error(error);
  }
};
//deletePeopleByName()
const findPeopleWhoLikeBurritos = async (food) => {
  try {
    const people = await Person.find({ favoriteFoods: food })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec();
    return people;
  } catch (error) {
    console.error(error);
  }
};
//findPeopleWhoLikeBurritos()
const app = express();
require("dotenv").config();
console.log(process.env.MONGO_URI);

dbConnection();
const port = 5000;

app.listen(port, (err) =>
  err ? console.log(err) : console.log(`app listening on port ${port}!`)
);
