import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Answers from '../components/Answers';
import MiniPlayer from '../components/MiniPlayer';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../contexts/AuthContext';
import useQuestions from '../hooks/useQuestions';

const initialState = null;
const reducer = (state, action) => {
    switch (action.type) {
        case "questions":
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                })
            });
            return action.value;

        case "answers":
            let questions = _.cloneDeep(state);
            console.log(action.value)
            questions[action.questionId].options[action.optionIndex].checked = action.value;
            return questions;

        default:
            return state;
    }



}


export default function Quiz() {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { questions, error, loading } = useQuestions(id);
    const [currentQuestions, setCurrentQuestions] = useState(0);
    const [qna, dispatch] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();


    const { state } = location;
    console.log(state)



    useEffect(() => {
        dispatch({
            type: "questions",
            value: questions
        })

    }, [questions])

    const handleAnswerChange = (e, index) => {
        dispatch({
            type: "answers",
            questionId: currentQuestions,
            optionIndex: index,
            value: e.target.checked

        })

    }


    // Handle when user clicks next button to the get next state
    const nextQuestion = () => {
        console.log("next")
        if (currentQuestions + 1 < questions.length) {
            setCurrentQuestions((prevCurrent) => prevCurrent + 1)
        }
    }


    // Handle when user clicks prev button to the get previous  state
    const prevQuestion = () => {
        console.log("prev")
        if (currentQuestions >= 1 && currentQuestions <= questions.length) {
            setCurrentQuestions((prevCurrent) => prevCurrent - 1)
        }
    }

    // calculate percentage of progress
    const percentage = questions.length > 0 ? ((currentQuestions + 1) / questions.length) * 100 : 0;

    //submit quiz
    async function submit() {
        console.log("submit")
        const { uid } = currentUser;
        //firebase related works
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);
        await set(resultRef, {
            [id]: qna
        })

        navigate(`/result/${id}`, { state: { qna } });

    }


    return (
        <>
            {loading && <div> loading... </div>}
            {error && <div> There was an errot! </div>}
            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <h1>{qna[currentQuestions].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers input options={qna[currentQuestions].options} handleChangeOne={handleAnswerChange} />
                    <ProgressBar prev={prevQuestion} next={nextQuestion} submit={submit} progress={percentage} />
                    <MiniPlayer id={id} videoTitle={state} />
                </>
            )}

        </>
    );
}