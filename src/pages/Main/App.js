import './styles.css';
import GlobalProvider from '../../context/index';
import Logo from '../../assets/logo.svg';
import Usuario from '../../components/Usuario/usuario';
import { MusicCard } from '../../components/MusicCard/musicCard';
import { AudioPlayer } from '../../components/Player/PlayerS';
import { musics } from '../../musics';



function App() {
  return (
    <GlobalProvider >
      <div className="container-main">
        <header>
          <img id='logo' src={Logo} alt='' />
          <Usuario nome="Luiz" />
        </header>
        <hr />
        <main>
          <div className='container-musicCards'>
            <h2>The best play list</h2>
            <hr />
            <div className='musicCards'>
              <ul>
                {musics.map(music =>
                  <section className='musicCard'>
                    <MusicCard
                      id={music.id}
                      cover={music.cover}
                      title={music.title}
                      description={music.description}
                      url={music.url}
                    />
                  </section>
                )}
              </ul>
            </div>
          </div>
        </main>
        <section className='player'>
          <AudioPlayer />
        </section>
      </div>
    </GlobalProvider>
  );
}

export default App;
