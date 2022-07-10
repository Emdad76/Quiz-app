import { useLocation, useParams } from 'react-router-dom';
import Analysis from "../components/Analysis";
import Summary from "../components/Summary";
import useAnswers from '../hooks/useAnswers';


export default function Result() {

    const { id } = useParams();
    const location = useLocation();
    const { state } = location;
    const { qna } = state;


    const { loading, error, answers } = useAnswers(id);

    function Calculate() {
        let score = 0;
        answers.forEach((question, index1) => {
            let currectIndexes = [],
                checkedIndexes = [];

            question.options.forEach((option, index2) => {
                if (option.correct) currectIndexes.push(index2)
                if (qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true
                }
            })

            // eslint-disable-next-line no-undef
            if (_.isEqual(currectIndexes, checkedIndexes)) {
                score += 5;
            }


        });

        return score;
    }

    const userScore = Calculate();


    return (
        <>
            {loading && <div>loding...</div>}
            {error && <div>there was an error!</div>}
            {answers && answers.length > 0 && (
                <>
                    <Summary score={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}
        </>


    );
}