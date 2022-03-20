
const getGames = async (searchQuery = "") => {
    try{
        const response = await fetch('https://cs-steam-api.herokuapp.com/games?q=${searchQuery}');
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
};


const renderList = async () => {
    const games = await getGames();
    ul.textContent = "";
    games.forEach((game) => {
        const li = document.createElement("list")
        li.textContent = game.name;
        ul.appendChild(li);
    });
}

renderGameList();




