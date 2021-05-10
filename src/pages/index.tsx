import { GetStaticProps } from 'next';
import { format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}
type HomeProps = {
  episodes: Array<Episode>
}

export default function Home(props: HomeProps) {

 return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  const {data} = await api.get('episodes', {
    params: {
      _limit: 12, 
      _sort: 'published_at',
      _order: 'desc'
    }
  });
  //formatação de dados

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      titulo: episode.title, 
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description, 
      url: episode.file.url
    }
  })
  return {
    props: {
      episodes: episodes,
    }, 
    revalidate: 60 * 60 * 8, //segundos, minutos, horas - a cada 8 horas 
  }
}