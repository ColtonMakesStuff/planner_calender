// i need to make a card that is a component that i can use to wrap around everything, 
import classes from './index.module.css';
import HandleIncrement from '../HandleIncrement';

const MainCard = ({children}) => {
  return (
    <div className="flex flex-col items-center text-content h-screen ">
            <div className="flex flex-col w-4/5 md:w-2/5 h-18 relative">
        
        <div className="overflow-auto p-4 border border-bkg-1 rounded-xl shadow-md" style={{aspectRatio: '3 / 5', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
  
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainCard;