import React from 'react';
import db from '../db.json';
import Widget from '../src/Components/Widget';
import QuizContainer from '../src/Components/QuizContainer';
import QuizBackground from '../src/Components/QuizBackground';
import GitHubCorner from '../src/Components/GitHubCorner';
import Footer from '../src/Components/Footer';
import Input from '../src/Components/Input'
import Button from '../src/Components/Button'

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>
            <Widget.Content>
                Carregando...
            </Widget.Content>
        </Widget>
    )
}

function QuestionWidget({ question, totalQuestion, questionIndex }) {
    const questionId = `quastion__${questionIndex}`
    return (
        <>
            <Widget>
                <Widget.Header>
                    <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestion}`}</h3>
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
                    <p>
                        {question.description}
                    </p>

                    <form>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative __${alternativeIndex}`
                        return (
                            <Widget.Topic as='label' htmlFor={alternativeId}>
                                <input id={alternativeId} type='radio' name={questionId}/>
                                {alternative}
                            </Widget.Topic>
                        )
                    })}

                    <Button >
                        confirmar
                    </Button>
                    </form>

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
    const screenState = screenStates.LOADING;
    const questionIndex = 0;
    const totalQuestion = db.questions.length;
    const question = db.questions[questionIndex];
    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget 
                    question={ question }
                    questionIndex={questionIndex}
                    totalQuestion={totalQuestion}
                    />
                )}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <div>Você acertou X questões</div>}
                <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl='https://github.com/RicardoBaltazar/Quiz-Esportes' />
        </QuizBackground>

    )
};