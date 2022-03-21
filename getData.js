const BASE_URL = "https://cs-steam-api.herokuapp.com/";
let loading = false;

const getData = async (endpoint, queryParams = "") => {
  if (loading) return;
  display.innerHTML = `<div class="loader"><img src="./image/loading.gif" alt="loading"/></div>`;
  try {
    const url = `${BASE_URL}${endpoint}${queryParams}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
const getAllGames = async ({q, page, limit, genres, steamspy_tags }) => {
  try {
    const endpoint = "games";
          q = q ? "&q=" + q : "";
          steamspy_tags = steamspy_tags ? "&steamspy_tags=" + steamspy_tags : "";
          genres = genres ? "&genres=" + genres : "";
    const queryParams = `?page=${page}&limit=${limit}${genres}${steamspy_tags}${q}`;

    const result = await getData(endpoint, queryParams);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
const getGenresList = async (objParams) => {
  try {
    const endpoint = "genres";
    const page = objParams?.page ? objParams.page : 1;
    const limit = objParams?.limit ? objParams.limit : 12;
    const queryParams = `?page=${page}&limit=${limit}`;
    const result = await getData(endpoint, queryParams);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
const getTagsList = async (objParams) => {
  try {
    const endpoint = "steamspy-tags";
    const page = objParams?.page ? objParams.page : 1;
    const limit = objParams?.limit ? objParams.limit : 12;
    const queryParams = `?page=${page}&limit=${limit}`;
    const result = await getData(endpoint, queryParams);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
const getGameDetail = async (appid) => {
  try {
    const endpoint = `single-game/${appid}`;
    const result = await getData(endpoint);
    console.log("detail", result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
const getGamesFeatured = async () => {
  try {
    const endpoint = "features";
    const result = await getData(endpoint);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};