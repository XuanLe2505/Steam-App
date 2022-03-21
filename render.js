const display = document.querySelector(".display-items");
const genres = document.querySelector(".dropdown-content");
const genresTitle = document.querySelector(".genres");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const genresMenu = document.querySelector(".dropdown-content");

const gameItem = (item) => {
  return `
<div class="items-wrapper">
    <div class="card-item" onclick="itemDetail(${item.appid})">
       <img src="${item.header_image}" data-id="${item.appid}"/>
       <div class="item-info">
         <p>${item.name}</p>
         <p>${item.price}<span>$</span></p>
       </div>
    </div>
</div>
`;
};
const renderAllGame = async (params) => {
  try {
    const paramsObj = {
      page: params?.page ? params.page : 1,
      limit: params?.limit ? params.limit : 12,
      genres: params?.genres,
      steamspy_tags: params?.steamspy_tags,
      q: params?.q,
    };
    console.log("paramsObject", paramsObj);
    localStorage.setItem("queryParams", JSON.stringify(paramsObj));

    const data = await getAllGames(paramsObj);
    let contentItem = "";
    data.forEach((item) => {
        const newDiv = gameItem(item);
        contentItem += newDiv;
    });

    if (paramsObj.page > 1) {
      display.insertAdjacentHTML("beforeend", contentItem);
    } else {
      display.innerHTML = contentItem; 
    }
  } catch (error) {
    console.log(error);
  }
};
renderAllGame();
// $(".container display-items").on("scroll", function () {
//   let div = $(this).get(0);
//   if (div.scrollTop + div.clientHeight + 100 >= div.scrollHeight) {
//     let objParams = JSON.parse(localStorage.getItem("queryParams"));
//     objParams = { ...objParams, page: objParams.page + 1 };
//     renderCategory(objParams);
//   }
// });
// search by keyword
searchButton.addEventListener("click", () => {
    const value = searchInput.value;
    const paramsObject = {
      q: value
    };
    renderAllGame(paramsObject);
});

const genresItem = (item) => {
  return `<a id="genre-item" href="#" data-name=${item.name}">${item.name}</a>`;
};
const renderGenresList = async () => {
  try {
    let contentGenresList = `<a id="genre-item" href="#"">All game</a>`;
    const data = await getGenresList();

    data.forEach((genre) => {
      const genreEle = genresItem(genre);
      contentGenresList += genreEle;
    });
    genresMenu.innerHTML = contentGenresList;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
renderGenresList();

genres.addEventListener("click", (e) => {
    const value = e.target.innerText;
    genresTitle.textContent = value;
    if(value === "All game") {
        location.reload();;
    }
    const paramsObject = {
      genres: value
    };
    renderAllGame(paramsObject);
});

const renderDetail = (data) => {
  display.innerHTML = "";
  genresTitle.innerHTML = data.name;

  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
  <div class="showing_game show_detail">
    <div class="title_contain ">
        <div class="price">${data.price}$</div>
    </div>
    <div class="img_detail">
        <img src="${data.header_image}" alt="game-image"/>
        <div class="game_details">
            <div class="game_description">${data.description}</div>
            <div class="game_informations">
                <p>RECENT REVIEWS: ${data.positive_ratings + data.negative_ratings}</p>
                <p>RELEASE DATE:  ${data.release_date}</p>
                <p class="dev">DEVELOPER:</p>
                <p>PLATFORM:  ${data.platforms}</p>
            </div>
        </div>
    </div>
    <div class="tags_contain">
    Popular user-defined tags for this product:
        <div class="tags">
            
        </div>
    </div>
</div>
`;
  display.appendChild(newDiv);
};

const itemDetail = async (appid) => {
  const data = await getGameDetail(appid);
  renderDetail(data);
  const categoryTag = document.querySelector(".tags");
  data.categories.forEach((tag) => {
    const divElement = document.createElement("div");
    divElement.classList.add("tag");
    const aElement = document.createElement("a");
    aElement.textContent = tag;
    divElement.appendChild(aElement);
    categoryTag.appendChild(divElement);
  });
  const dev = document.querySelector(".dev");
  data.developer.forEach((tag) => {
    const aElement = document.createElement("a");
    aElement.textContent = tag;
    dev.appendChild(aElement);
  });
};

