import React from 'react';
import db from '../db.json';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import Widget from '../src/Components/Widget';
import QuizContainer from '../src/Components/QuizContainer';
import QuizBackground from '../src/Components/QuizBackground';
import GitHubCorner from '../src/Components/GitHubCorner';
import AnimationLoading from '../src/Components/AnimationLoading'
import AlternativesForm from '../src/Components/AlternativeForm'
import Input from '../src/Components/Input'
import Button from '../src/Components/Button'

function ResultWidget({ results }) {
    const router = useRouter();
    const [playAgain, setPlayAgain] = React.useState();
    React.useEffect(() => {
        setTimeout(() => {
            router.push(`/`);
        }, 1 * 10000)
    }, []);
    return (
        <Widget>
            <Widget.Header>
                Tela de Resultado
            </Widget.Header>

            <Widget.Content>
                <p>

                    Você acertou
          {' '}
                    {results.filter((x) => x).length}
                    {' '}
          pergunta(s)
        </p>
                <ul>
                    {results.map((result, index) => (
                        <li key={`result__${result}`}>
                            Pergunta
                            {' '}
                            {index + 1}
                            {result === true
                                ? ' Acertou'
                                : ' Errou'}
                        </li>
                    ))}
                </ul>
                
            </Widget.Content>
        </Widget>
    )
}

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Entrando na Matrix
            </Widget.Header>
            <Widget.Content>
                Lembre-se, Não há colher!
            </Widget.Content>
        </Widget>
    )
}

function QuestionWidget({ question, totalQuestions, questionIndex, onSubmit, addResult, }) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const questionId = `question__${questionIndex}`
    const isCorrect = selectedAlternative === question.answer
    const HasAlternativeSelected = selectedAlternative !== undefined;
    return (
        <>
            <Widget>
                <Widget.Header>
                    <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
                </Widget.Header>
                <img
                    alt="Descrição"
                    style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                    }}
                    src={question.image}
                />
                <Widget.Content>
                    <h2>
                        {question.title}
                    </h2>
                    <AlternativesForm onSubmit={(event) => {
                        event.preventDefault();
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                            onSubmit();
                            addResult(isCorrect);
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                        }, 1 * 5000);
                    }}>
                        {question.alternatives.map((alternative, alternativeIndex) => {
                            const alternativeId = `alternative __${alternativeIndex}`
                            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                            const isSelected = selectedAlternative === alternativeIndex;
                            return (
                                <Widget.Topic as='label' key={alternativeId} htmlFor={alternativeId}
                                    data-selected={isSelected}
                                    data-status={isQuestionSubmited && alternativeStatus}
                                >
                                    <input id={alternativeId} type='radio' name={questionId}
                                        onChange={() => setSelectedAlternative(alternativeIndex)} />
                                    {alternative}
                                </Widget.Topic>
                            )
                        })}

                        <Button type='submit' disabled={!HasAlternativeSelected}>
                            confirmar
                    </Button>
                    </AlternativesForm>

                    {isQuestionSubmited && isCorrect && <p>Você Acertou! <AnimationLoading /></p>}
                    {isQuestionSubmited && !isCorrect && <p>Você Errou! <AnimationLoading /></p>}

                </Widget.Content>
            </Widget>

        </>
    )
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
}

export default function QuizPage() {
    console.log('Perguntas criadas: ', db.questions)
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const totalQuestion = db.questions.length;
    const question = db.questions[questionIndex];

    function addResult(result) {
        setResults([
            ...results,
            result,
        ]);
    }

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1 * 5000)
    }, []);

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestion) {
            setCurrentQuestion(questionIndex + 1);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg3}>
            <QuizContainer>
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestion}
                        onSubmit={handleSubmitQuiz}
                        addResult={addResult}
                    />
                )}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <ResultWidget results={results} />}
            </QuizContainer>
            <GitHubCorner projectUrl='https://github.com/RicardoBaltazar/Quiz-Esportes' />
        </QuizBackground>

    )
};