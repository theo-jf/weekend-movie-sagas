import { Typography } from "@mui/material";

export default function MovieDetailsItem({movie}) {

    return (
        <section className="details">  
            <h3>{movie.title}</h3>
            <img className="detailsPoster" 
                src={movie.poster} 
                alt={movie.title}
            />
            <Typography variant="body1">
                <p>–––––––––––––––––––––––––</p>
                <p>{movie.description}</p>
                <p>–––––––––––––––––––––––––</p>
                {/* Conditional rendering based on # of genres */}
                <h3>{(movie?.genres?.length > 1) ? 'Genres' : 'Genre'}</h3>
                {movie?.genres?.map((genre, i) => {
                    return (
                        <p key={i}>{genre}</p>
                    );
                })}
            </Typography>
        </section>
    );

}