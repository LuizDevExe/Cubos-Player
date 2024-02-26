import { useContext } from "react";
import { SiteContext } from "../../context/site/context";
import { musics } from "../../musics";
import './styles.css';


export function MusicCard({ id, title, description, cover, url }) {

    const { setSiteState, siteState } = useContext(SiteContext);
    const { audioPlayer } = useContext(SiteContext);
    const { tocando } = siteState;


    async function PlayPause() {

        setInterval(() => {
            const duration = audioPlayer.current.duration / 60;

            const currentProgress = ((audioPlayer.current.currentTime / 60) * 100) / duration;

            setSiteState((prev) => ({
                ...prev,
                progress: currentProgress,
            }))


            if (currentProgress > 99.98) {
                next()
            }

        }, 1000);



        let indexMusic = musics.findIndex(i => i.url === url);
        let tittleMusic = musics[indexMusic].title;
        let artistMusic = musics[indexMusic].artist;

        await setSiteState((prev) => ({
            ...prev,
            url,
            tocando: true,
            idIndex: indexMusic,
            tittle: tittleMusic,
            artist: artistMusic,
        }))

        audioPlayer.current.play();

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
        <div id={id} className="musicCard">
            <li>
                <div onClick={() => PlayPause()} alt="album cover button">
                    <img src={cover} alt="Imagem do album" />

                </div>
                <h3>{title}</h3>

                <p>{description}</p>
            </li>
        </div>
    )
}

