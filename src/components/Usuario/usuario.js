import FotoUsuario from '../../assets/profile.jpg';
import './styles.css';


function AreaUsuario({nome}){
    return(
        <div className='container-user'>
            <img src={FotoUsuario} alt='Foto do usuário atual'/>
            <h4>Bem vindo, {nome}</h4>
        </div>
    )
}

export default AreaUsuario