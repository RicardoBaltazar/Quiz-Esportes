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

function QuestionWidget({ question, totalQuestion, questionIndex, onSubmit }) {
    const [ selectedAlternative, setSelectedAlternative ] = React.useState(undefined);
    const [ isQuestionSubmited, setIsQuestionSubmted ] = React.useState(false);
    const questionId = `question__${questionIndex}`
    const isCorrect = selectedAlternative === question.answer
    const HasAlternativeSelected = selectedAlternative !== undefined;
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

                    <form onSubmit={(event) => {
                        event.preventDefault();
                        setIsQuestionSubmted(true);
                        setTimeout(() => {
                            onSubmit();
                            setIsQuestionSubmted(false);
                            selectedAlternative(undefined);
                        }, 1 * 3000);
                    }}>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative __${alternativeIndex}`
                        return (
                            <Widget.Topic as='label' key={alternativeId} htmlFor={alternativeId}>
                                <input id={alternativeId} type='radio' name={questionId} 
                                onChange={() => setSelectedAlternative(alternativeIndex)}/>
                                {alternative}
                            </Widget.Topic>
                        )
                    })}

                    <Button type='submit' disabled={!HasAlternativeSelected}>
                        confirmar
                    </Button>
                    </form>

                    {/*<p>Alternativa selecionada: {`${selectedAlternative + 1}`}</p>*/}
                    {isQuestionSubmited && isCorrect && <p>Você Acertou!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você Errou!</p>}
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
    const [ screenState, setScreenState ] = React.useState(screenStates.LOADING);
    const [ currentQuestion, setCurrentQuestion ] = React.useState(0);
    const questionIndex = currentQuestion;
    const totalQuestion = db.questions.length;
    const question = db.questions[questionIndex];

    React.useEffect(() => {
        setInterval(() =>{
            setScreenState(screenStates.QUIZ);
        }, 1 * 500)
    }, [])

    function handleSubmitQuiz(){
        const nextQuestion = questionIndex + 1;
        if(nextQuestion < totalQuestion){
            setCurrentQuestion(questionIndex + 1);
        } else {
            setScreenState(screenState.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget 
                    question={ question }
                    questionIndex={questionIndex}
                    totalQuestion={totalQuestion}
                    onSubmit={handleSubmitQuiz}
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