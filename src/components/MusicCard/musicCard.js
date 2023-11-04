import { useContext } from "react"
import { SiteContext } from "../../context/site/context"
import { musics } from "../../musics";
import './styles.css'


export function MusicCard({ id, title, description, cover, url }) {

    const { setSiteState } = useContext(SiteContext);
    const { audioPlayer } = useContext(SiteContext);
    
    async function PlayPause() {
        let indexMusic = musics.findIndex(i => i.url === url);
        let tittleMusic = musics[indexMusic].title;
        let artistMusic = musics[indexMusic].artist;
        await setSiteState((prev) => ({
            ...prev,
            url,
            tocando: true,
            idIndex: indexMusic,
            tittle: tittleMusic,
            artist: artistMusic
        }))
        
        audioPlayer.current.play();

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

