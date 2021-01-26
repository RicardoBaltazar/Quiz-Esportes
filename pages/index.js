import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/Components/Widget';
import QuizBackground from '../src/Components/QuizBackground';
import GitHubCorner from '../src/Components/GitHubCorner';
import Footer from '../src/Components/Footer';




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
      <Head>
        <title>
          Quiz Esportes
        </title>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Titulo</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function(event){
              event.preventDefault();
              const name = 'Ricardo';
              router.push(`/quiz?name=${name}`);
            }}>
              <input placeholder='Digite seu nome' />
              <button type="submit">
                jogar {seuNome}
              </button>
            </form>
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
      <GitHubCorner projectUrl='https://github.com/RicardoBaltazar/Quiz-Esportes' />
    </QuizBackground>

  )
}
