console.log("hello world");

let coursesAPI = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);
  handleForm();
}
start();

// function
function getCourses(cb) {
  fetch(coursesAPI)
    .then(function (response) {
      return response.json();
    })
    .then(cb);
}
function renderCourses(courses) {
  let listCourses = document.getElementById("list-course-js");
  let htmls = courses.map(function (course) {
    return `<li>
    <h4>${course.name}</h4>
    <p>${course.description}</p>
    <button onclick="deleteCourse(${course.id})">Delete</button>
    </li>
    `;
  });
  listCourses.innerHTML = htmls.join("");
}
function handleForm() {
  let createbtn = document.getElementById("btn-js");
  createbtn.addEventListener("click", function () {
    let name = document.querySelector('input[name="Name"]').value;
    let description = document.querySelector('input[name="Description"]').value;
    let form = {
      name: name,
      description: description,
    };
    createCrouse(form);
  });
}
function createCrouse(data, cb) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(coursesAPI, options)
    .then(function (response) {
      response.json();
    })
    .then(cb);
}
function deleteCourse(id, cb) {
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(coursesAPI + "/" + id, options)
    .then(function (response) {
      response.json();
    })
    .then(cb);
}
