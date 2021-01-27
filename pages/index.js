import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/Components/Widget';
import QuizContainer from '../src/Components/QuizContainer';
import QuizBackground from '../src/Components/QuizBackground';
import GitHubCorner from '../src/Components/GitHubCorner';
import Footer from '../src/Components/Footer';
import Input from '../src/Components/Input'
import Button from '../src/Components/Button'




export default function Home() {
  const router = useRouter();
  const [ name, setName ] = React.useState('');


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
            <h1>#QUIZ ESPORTES</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function(event){
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <Input 
              name='nomeDoUsuario'
              onChange={function(event){
                setName(event.target.value);
              }}
              placeholder='Digite seu nome' 
              value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        {/*
        <Widget>
          <Widget.Header>
            <h1>Titulo</h1>
          </Widget.Header>
          <Widget.Content>
            <p>asdasdasdas</p>
          </Widget.Content>
        </Widget>
        */}
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl='https://github.com/RicardoBaltazar/Quiz-Esportes' />
    </QuizBackground>

  )
}
