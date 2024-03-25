import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Pokemon } from './Pokemon.interface';

interface PokemonModalProps {
    open: boolean,
    handleClose: () => void,
    pokemon: Pokemon | undefined,
    loading: boolean,
}
  
export function PokemonModal(props: PokemonModalProps) {
  const { open, handleClose, pokemon, loading } = props;
  
  return loading ? ( 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="pokemon-modal">
          <div className="spinner-wrapper">
            <CircularProgress className='spinner' color="inherit" />            
          </div>
        </Box>
      </Modal>
    ) : (
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box className="pokemon-modal">
          <div className='pokemon-modal-main-wrapper'>
            <div  className='pokemon-modal-main'>
              <div className='pokemon-modal-main-title'>name</div>    
              <div>{pokemon?.name}</div>
            </div>
            <div className='pokemon-modal-main'>
              <div className='pokemon-modal-main-title'>height</div>    
              <div>{pokemon?.height}</div>
            </div>
          </div>
          <hr className='pokemon-modal-devider' />
          <div className='pokemon-modal-main-wrapper'>
            <div className='pokemon-modal-main'>
              <div className='pokemon-modal-main-title'>Abilities</div>
              <div className='pokemon-modal-main-list'>
                {pokemon?.abilities.map((data) => {
                  return (
                    <div>ability: {data.ability.name}</div>
                  )
                })}
              </div>
            </div>
            <div className='pokemon-modal-main'>
              <div className='pokemon-modal-main-title'>Types</div>
              <div className='pokemon-modal-main-list'>
                {pokemon?.types.map((data) => {
                  return (
                    <div>type: {data.type.name}</div>
                  )
                })}
              </div>
            </div>
            <div className='pokemon-modal-main'>
            <div className='pokemon-modal-main-title'>Forms</div>
              <div className='pokemon-modal-main-list'>
                {pokemon?.forms.map((data) => {
                  return (
                    <div>from: {data.name}</div>
                  )
                })}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
  );
}