import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from "react";

export default function useAnswers(videoID) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [answers, setAnswers] = useState([]);


    useEffect(() => {
        async function fetchAnswers() {
            // Database related works
            const db = getDatabase();
            const ansRef = ref(db, "answers/" + [videoID] + "/questions");
            const ansQuery = query(
                ansRef,
                orderByKey()

            );
            try {
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(ansQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setAnswers((prevAnswers) => {
                        return [...prevAnswers, ...Object.values(snapshot.val())]
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchAnswers();
    }, [videoID])

    return {
        answers,
        loading,
        error

    };
}