import axios from "axios";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";


const MovieDetails = () => {
    const id = useParams().id

    const [movie, setMovie] = useState()

    useEffect(() => {
        axios.get(`http://localhost:3001/api/movies/${id}`).then(response => {
            setMovie(response.data)  
        })
    }, [id])

    if (!movie) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const year = movie.release_date?.slice(0, 4)

    return (
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px]">
            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-main-background" />
            <div className="relative h-full px-16 pt-28 lg:px-30 lg:pt-40 flex gap-8 items-start">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="relative w-54 lg:w-76 rounded-xl shadow-xl"
                />

                <div className="flex flex-col justify-start [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
                    <h1 className="text-5xl font-bold">
                        {movie.title}
                        <span className="ml-3 text-3xl font-normal text-gray-400">
                            ({year})
                        </span>
                    </h1>

                    {movie.tagline && (
                        <p className="mt-2 text-xl italic text-gray-300">
                            {movie.tagline}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}


export default MovieDetails