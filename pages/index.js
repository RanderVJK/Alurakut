import { useEffect, useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


async function listarSeguidores(usuario) {
  const data = await fetch(`https://api.github.com/users/${usuario}/followers`);
  if (!data.ok) return [];
  const json = await data.json();
  const seguidores = json.map(({ login }) => login)
  return seguidores;
}

function ProfileSidebar(props) {
  return(
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} alt="VanderDev" />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'RanderVJK';
  const [seguidores, setSeguidores] = useState([])

  useEffect(async () => {
    setSeguidores(await listarSeguidores(githubUser));
  }, [])


  const [comunidades, setComunidades] = useState([
    {
      id: '23',
      title: 'Aura Stars',
      image: 'https://www.alura.com.br/assets/img/stars/logoIlustra.1622650220.svg',
    },
    {
      id: '24',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    },
    {
      id: '25',
      title: 'GitHub Mundo Dev',
      image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    }
  ]);


  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'professorguanabara',
    'felipefialho'
  ]
  

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo, {githubUser}
            </h1>

            <OrkutNostalgicIconSet confiavel={4} legal={3} sexy={3}/>
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateComunity(e){
              e.preventDefault();
              //console.log(e);
              const dadosDoForm = new FormData(e.target);

              //console.log('Campo: ', dadosDoForm.get('title'));
              //console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image') || `https://picsum.photos/200?${Date.now()}`,
              }

              //comunidades.push('Alura Stars');
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa?" 
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa?" 
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>     
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        
        {/* Busca os seguidores do GitHub */}
  {/*         <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores ({seguidores.length})
            </h2>

            <ul>
              {seguidores.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> */}

        </div>
      </MainGrid>
    </>
  )
}
