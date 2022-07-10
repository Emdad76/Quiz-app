import classes from '../styles/Question.module.css';
import Questions from './Questions';

export default function Analysis({ answers }) {
    return (
        <div className={classes.analysis}>
            <h1>Question Analysis</h1>
            {/* <h4>You answerd {score} out of {noq * 5} questions correctly</h4> */}

            <Questions answers={answers} />

        </div>
    );
}