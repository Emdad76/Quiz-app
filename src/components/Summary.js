import image from '../assets/images/success.png';
import useFetch from '../hooks/useFetch';
import classes from '../styles/Summary.module.css';

export default function Summary({ score, noq }) {

  const getKeyWord = () => {
    if (score / (noq * 5) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 70) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 90) {
      return "very good"
    } else {
      return "excellent";
    }
  }


  const url = `https://api.pexels.com/v1/search?query=${getKeyWord()}&per_page=1`;
  const headers = {
    Authorization: process.env.REACT_APP_PIXELS_API_KEY
  }
  const { loading, error, result } = useFetch(url, "GET", headers)
  const pexelImage = result ? result?.photos[0].src.medium : image;

  return (

    <div className={classes.summary}>
      <div className={classes.point}>
        {/*   progress bar will be placed here */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={classes.badge} > loading... </div>}
      {error && <div className={classes.badge} > There was an error! </div>}


      {!loading && !error && (< div className={classes.badge}>
        <img src={pexelImage} alt="Success" />
      </div>)}
    </div>
  );
}