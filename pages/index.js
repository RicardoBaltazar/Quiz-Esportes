import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/Components/Widget'
import QuizBackground from '../src/Components/QuizBackground'
import GitHubCorner from '../src/Components/GitHubCorner'
import Footer from '../src/Components/Footer'



export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;



export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Titulo</h1>
          </Widget.Header>
          <Widget.Content>
            <p>asdasdasdas</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>Titulo</h1>
          </Widget.Header>
          <Widget.Content>
            <p>asdasdasdas</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl=''/>
    </QuizBackground>

  )
}
