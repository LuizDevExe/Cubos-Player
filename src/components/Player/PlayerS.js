import React, { useContext, useRef, useState } from "react";
import { SiteContext } from "../../context/site/context";
import Stop from '../../assets/stop.svg';
import Prev from '../../assets/previous.svg';
import Play from '../../assets/play.svg';
import Pause from '../../assets/pause.svg';
import Next from '../../assets/next.svg';
import { musics } from "../../musics";
import './styles.css'

function AudioPlayer() {

    const { siteState, setSiteState, audioPlayer } = useContext(SiteContext);
    const { url, tocando, tittle, artist, progress } = siteState;

    const [width, setWidth] = useState("80%");




    const PlayPause = () => {
        if (musics.findIndex(i => i.url === url) == -1) {

            setSiteState((prev) => ({
                ...prev,
                tittle: "Violão Acústico",
                artist: 'Mayer Bronkx',
            }))
        }



        setInterval(() => {
            const duration = audioPlayer.current.duration / 60;

            const currentProgress = ((audioPlayer.current.currentTime / 60) * 100) / duration;

            setSiteState((prev) => ({
                ...prev,
                progress: currentProgress,
            }))
        }, 1000);

        setSiteState((prev) => ({
            ...prev,
            tocando: !tocando,
        }));

        if (!tocando) {
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }

    }

    const stop = () => {
        if (tocando) {
            audioPlayer.current.pause()
            audioPlayer.current.currentTime = 0;
            setSiteState((prev) => ({
                ...prev,

                tocando: false,
            }));

        }
    }



    async function prev() {
        audioPlayer.current.pause();
        let music = musics.find(e => e.url === url);
        if (music.id !== 1) {
            let prevMusic = musics.find(e => e.id === music.id - 1);
            let indexMusic = musics.findIndex(i => i.url === url);
            let tittleMusic = musics[indexMusic - 1].title;
            let artistMusic = musics[indexMusic - 1].artist;

            await setSiteState((prev) => ({
                ...prev,
                url: prevMusic.url,
                tittle: tittleMusic,
                artist: artistMusic,
                tocando: true
            }))



            audioPlayer.current.currentTime = 0;
            audioPlayer.current.play();

        } else {
            await setSiteState((prev) => ({
                ...prev,
                tocando: false
            }))
        }

    }

    async function next() {
        audioPlayer.current.pause();
        let music = musics.find(e => e.url === url);

        if (music.id !== musics.length) {
            let nextMusic = musics.find(e => e.id === music.id + 1);
            let indexMusic = musics.findIndex(i => i.url === url);
            let tittleMusic = musics[indexMusic + 1].title;
            let artistMusic = musics[indexMusic + 1].artist;
            await setSiteState((prev) => ({
                ...prev,
                url: nextMusic.url,
                artist: artistMusic,
                tittle: tittleMusic,
                tocando: true
            }))
            audioPlayer.current.currentTime = 0;
            audioPlayer.current.play();

        } else {
            await setSiteState((prev) => ({
                ...prev,
                tocando: !tocando
            }))
        }
    }

    return (

        <div className="player" >
            <audio ref={audioPlayer} src={url ? url : 'https://storage.googleapis.com/pedagogico/frontend-files/aula-react-referencias-eventos/The%20Von%20Trapp%20Family%20Choir%20-%20Alge.mp3'} />

            <div className="player">
                <div className="artistTag">
                    <h2>{tittle}</h2>
                    <h3>{artist}</h3>
                </div>
                <div className="mediaControl">
                    <div className="botoes">
                        <div onClick={stop}>
                            <img src={Stop} alt="botão stop" />
                        </div>
                        <div onClick={prev}>
                            <img src={Prev} alt="botão previo" />
                        </div>
                        <div onClick={PlayPause}>
                            {tocando ? <img src={Pause} alt="botão pause" /> : <img src={Play} alt="botão play" />}
                        </div>
                        <div onClick={next}>
                            <img src={Next} alt="botão next" />
                        </div>
                    </div>
                    <div className="tempo_musica">
                        <strong className="comeco">0</strong>
                        <div className="container-barra-progresso">
                            <div className="barra-progresso"></div>
                            <div
                                className="cor-barra-progresso"
                                style={{ width: `${progress}%` }}
                            >
                            </div>
                        </div>
                        <strong className="final">3:45</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AudioPlayer }