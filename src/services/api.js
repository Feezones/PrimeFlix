import axios from 'axios';
//base da api: https://api.themoviedb.org/3/
//key: movie/550?api_key=7047cd22efb4cde01b12a1b6bc17d0a7

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;