export default function MovieDetailsItem({movie}) {
    return (
        <>
            <h3>{movie.title}</h3>
            <img className="detailsPoster" 
                src={movie.poster} 
                alt={movie.title}
            />
            <p>{movie.description}</p>
            <p>{(movie?.genres?.length > 1) ? 'Genres' : 'Genre'}</p>
            {movie?.genres?.map((genre, i) => {
                return (
                    <p key={i}>{genre}</p>
                );
            })}
        </>
    );

}