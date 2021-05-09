import {useEffect} from 'react';

export default function Home(props) {

  //chamada no formato SPA
 /*  useEffect(() => {
    fetch('http://localhost:3333/episodes')
    .then(response => response.json())
    .then(data => console.log(data))
  }, []) */

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

//chamado no formato SSR - server side rendering (não desativa ao desabilitar JS no browser).
/* export async function getServerSideProps(){
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    }
  }
}
 */

//SSG
/* Server static generate - gera uma página estática para todos, uma vez que não existe
a necessidade da página estar em tempo real */
//apenas funciona em produção, precisa gerar uma build

export async function getStaticProps(){
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    }, 
    revalidate: 60 * 60 * 8, //segundos, minutos, horas - a cada 8 horas 
  }
}