import { useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import './filme-info.css'

import api from '../../services/api'
 
function Filme(){
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadFilmes(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"7047cd22efb4cde01b12a1b6bc17d0a7",
                    language:"pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("FILME NAO ENCONTRADO")
                navigate("/", {replace: true})
                return;
            })
        }

        loadFilmes();

        return()=>{
            console.log("componete desmontado")
        }
    },[navigate, id])

  

    if(loading){
        return(
            <div className="filme-info">
               <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("ESSE FILME JA ESTA NA LISTA");
            return;
        }

        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos));
        toast.success("FILME SALVO COM SUCESSO")
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
        
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avanliação:{filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;