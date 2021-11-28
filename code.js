// const hash = require('object-hash');

// var pass = hash.MD5("asdfghwasfe")
console.log(Date.now());

let movies_div = document.getElementById("movies");

var timerId;

let cross = document.getElementById("close");

cross.addEventListener("click", () => {
  movies_div.innerHTML = null;
  document.getElementById("query").value = null;
  console.log("hi");
});

async function searchMovies() {
  let seachX = document.querySelector("input").value;

  if (seachX.length <= 2) {
    return false;
  }

  let res = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?ts=1637692024646&apikey=800b598c913a2894ad2b5e82dac797d0&hash=cdd09bc0040563c247e69e664d03345a&nameStartsWith=${seachX}`
  );

  let data = await res.json();
  console.log("data:", data);

  appendMovies(data.data.results);

  // return data.results
}

function throttle() {
  if (timerId) {
    // console.log("hi");
    return;
  }

  timerId = setTimeout(() => {
    // main();
    searchMovies();
    timerId = undefined;
  }, 2000);

  // console.log(timerId);
}

function appendMovies(d) {
  movies_div.innerHTML = null;

  if (d.length == 0) {
    let p = document.createElement("p");
    p.innerHTML = "No Result Found !!";
    p.style.fontSize = "15px";

    let i = document.createElement("img");
    i.src =
      "https://cdn0.iconfinder.com/data/icons/files-34/128/25_file_types_set_5-04-512.png";
    i.style.width = "150px";
    i.style.marginLeft = "20%";
    movies_div.style.background = "rgb(45, 3, 4)";
    movies_div.append(p, i);
    return;
  }

  d.forEach(({ name, id, modified }) => {
    (gender = id), (birth_year = modified);
    let p_div = document.createElement("div");

    let p = document.createElement("p");
    p.innerHTML = name;
    // d.style.fontSize = "20px"
    p.style.fontWeight = "550";
    // p.addEventListener("mouseover", () => {
    //   p.style.color = "black";
    // });
    // p.addEventListener("mouseout", () => {
    //   p.style.color = "white";
    // });

    let q = document.createElement("div");
    let d = document.createElement("p");
    d.innerHTML = gender + " ";
    d.style.fontSize = "14px";

    let b = document.createElement("p");
    b.innerHTML = birth_year;
    b.style.fontSize = "14px";
    q.append(b, d);
    p_div.append(p, q);
    p_div.style.display = "grid";
    p_div.style.gridGap = "5";
    p_div.style.padding = "0 10px";
    p_div.addEventListener("mouseover", () => {
      p_div.style.background = "white";
      p_div.style.color = "black";
    });
    p_div.addEventListener("mouseout", () => {
      p_div.style.background = "rgb(45, 3, 4)";
      p_div.style.color = "white";
    });
    p_div.style.gridTemplateColumns = "45% 45%";
    p_div.style.justifyContent = "space-between";
    // justify-content: space-between;

    movies_div.append(p_div);
    movies_div.style.background = "rgb(45, 3, 4)";
  });
}

// async function main() {
//     let movies = await searchMovies();

// }
