import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import useVideoList from '../hooks/useVideoList';
import classes from '../styles/Videos.module.css';
import Video from './Video';

export default function Videos() {
    const [page, setPage] = useState(1);


    const { videos, error, loading, hasMore } = useVideoList(page);
    return (
        <div  >

            {videos.length > 0 && (<InfiniteScroll className={classes.videos} dataLength={videos.length}
                next={() => setPage(page + 6)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }>
                {videos.map((video) =>
                    video.noq > 0 ? (


                        <Link to={`/quiz/${video.youtubeID}`} state={video.title} key={video.youtubeID}>
                            <Video title={video.title} id={video.youtubeID} noq={video.noq} />
                        </Link>

                    ) : (
                        <Video key={video.youtubeID} title={video.title} id={video.youtubeID} noq={video.noq} />
                    )

                )}
            </InfiniteScroll>)}

            {!loading && videos.length === 0 && (<div>no data found!</div>)}
            {error && (<div>There was an error!</div>)}
            {loading && <div>Loading...</div>}

        </div>
    );
}
