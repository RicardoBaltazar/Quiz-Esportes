import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/Components/Widget';
import QuizContainer from '../src/Components/QuizContainer';
import QuizBackground from '../src/Components/QuizBackground';
import GitHubCorner from '../src/Components/GitHubCorner';
import AluraLink from '../src/Components/Footer';
import Input from '../src/Components/Input'
import Button from '../src/Components/Button'

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [bgAction, setBgAction] = React.useState(db.bg2);

  React.useEffect(() => {
    setTimeout(() => {
      setBgAction(db.bg3);
    }, 1 * 5000)
  }, []);

  return (
    <QuizBackground backgroundImage={bgAction}>
      <Head>
        <title>
          Quiz Matrix
        </title>
      </Head>
      <QuizContainer>
        <Widget
          as={motion.section}
          transition={{ delay: 5, duration: 1 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial='hidden'
          animate='show'
        >
          <Widget.Header>
            <img
              alt="Descrição"
              style={{
                width: '100%',
                border: '1px solid #008f11',
                objectFit: 'cover',
              }}

              src={db.bg2}
            />
            <h1>quiz Matrix....</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <Input
                name='nomeDoUsuario'
                onChange={function (event) {
                  setName(event.target.value);
                }}
                placeholder='Digite seu nome'
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar`}
              </Button>
              <AluraLink />
            </form>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <GitHubCorner projectUrl='https://github.com/RicardoBaltazar/Quiz-Esportes' />
    </QuizBackground>
  )
}
