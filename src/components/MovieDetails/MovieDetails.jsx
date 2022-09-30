import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function MovieDetails() {

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {

        dispatch({
            type: 'SAGA_FETCH_DETAILS',
            payload: params.id
        });

        return () => {
            dispatch({type: 'CLEAR_DETAILS'});
        }

    }, [params.id])

    return (
        <>
        </>
    );
}