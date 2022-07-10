import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database';
import { useEffect, useState } from "react";

export default function useVideoList(page) {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            // Database related works
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(6)
            );
            try {
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(videoQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setVideos((prevVideo) => {
                        return [...prevVideo, ...Object.values(snapshot.val())]
                    })
                } else {
                    setHasMore(false)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchVideos();
    }, [page])

    return {
        videos,
        loading,
        error,
        hasMore
    };
}