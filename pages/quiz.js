import React from 'react';
import db from '../db.json';
import Widget from '../src/Components/Widget';
import QuizContainer from '../src/Components/QuizContainer';
import QuizBackground from '../src/Components/QuizBackground';
import GitHubCorner from '../src/Components/GitHubCorner';
import Footer from '../src/Components/Footer';
import AlternativesForm from '../src/Components/AlternativeForm'
import Input from '../src/Components/Input'
import Button from '../src/Components/Button'

function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>
                Tela de Resultado: 
            </Widget.Header>

            <Widget.Content>
            <p>
          Você acertou
          {' '}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
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
                Carregando...
            </Widget.Header>
            <Widget.Content>
                Carregando...
            </Widget.Content>
        </Widget>
    )
}


function QuestionWidget({ question, totalQuestions, questionIndex, onSubmit, addResult, }) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [ isQuestionSubmited, setIsQuestionSubmited ] = React.useState(false);
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
                    <p>
                        {question.description}
                    </p>

                    <AlternativesForm onSubmit={(event) => {
                        event.preventDefault();
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                            onSubmit();
                            addResult(isCorrect);
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                        }, 1 * 3000);
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
                                onChange={() => setSelectedAlternative(alternativeIndex)}/>
                                {alternative}
                            </Widget.Topic>
                        )
                    })}

                    <Button type='submit' disabled={!HasAlternativeSelected}>
                        confirmar
                    </Button>
                    </AlternativesForm>

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
    const [ screenState, setScreenState ] = React.useState(screenStates.QUIZ);
    const [ results, setResults ] = React.useState([]);
    const [ currentQuestion, setCurrentQuestion ] = React.useState(0);
    const questionIndex = currentQuestion;
    const totalQuestion = db.questions.length;
    const question = db.questions[questionIndex];

    function addResult(result) {
        // results.push(result);
        setResults([
          ...results,
          result,
        ]);
      }

    React.useEffect(() => {
        setTimeout(() =>{
            setScreenState(screenStates.QUIZ);
        }, 1 * 1000)
    }, []);

    function handleSubmitQuiz(){
        const nextQuestion = questionIndex + 1;
        if(nextQuestion < totalQuestion){
            setCurrentQuestion(questionIndex + 1);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget 
                    question={ question }
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestion}
                    onSubmit={handleSubmitQuiz}
                    addResult={addResult}
                    />
                )}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <ResultWidget results={results} />}
                <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl='https://github.com/RicardoBaltazar/Quiz-Esportes' />
        </QuizBackground>

    )
};