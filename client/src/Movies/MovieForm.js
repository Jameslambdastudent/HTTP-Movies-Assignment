import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import MovieList from './MovieList';

const initialItem = {
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const MovieForm = (props) => {
    const [item, setItem] = useState(initialItem);
    const { id } = useParams();
    const {push} = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setItem(res.data);
            })
            .catch(err => { console.log("get error UMF:", err) })
    }, [id])

    const handleChanges = (e) => {
        e.persist();
        setItem({
            ...item,
            [e.target.name]: [e.target.value]
        });
    };

    const updateMovie = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                console.log(res.data)                
                props.setMovieList(res.data);
                
                push(`/movies/${id}`);
            })
            .catch(err => console.log("put error UMF:",err))
        console.log("movie updated");
    };

    return (
        <form onSubmit={updateMovie}>
            <label>
                Title
            <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="insert title"
                    onChange={handleChanges}
                    value={item.title}
                />
            </label>
            <label>
                Director
            <input
                    type="text"
                    id="director"
                    name="director"
                    placeholder="insert director"
                    onChange={handleChanges}
                    value={item.director}
                />
            </label>
            <label>
                Metascore
            <input
                    type="text"
                    id="metascore"
                    name="metascore"
                    placeholder="insert metascore"
                    onChange={handleChanges}
                    value={item.metascore}
                />
            </label>
            <label>
                Stars
            <input
                    type="text"
                    id="stars"
                    name="stars"
                    placeholder="insert stars"
                    onChange={handleChanges}
                    value={item.stars}
                />
            </label>
            <button>Update</button>
        </form>
    )
}
export default MovieForm;