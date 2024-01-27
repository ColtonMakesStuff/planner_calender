// i need to make a card that is a component that i can use to wrap around everything, 
import classes from './index.module.css';

const MainCard = ({children}) => {
  return (
    <div className="flex items-center justify-center h-screen">
    <div className={`bg-bkg-2  text-content p-4 rounded-xl aspect-[14/9]  w-4/5 md:w-4/5 ${classes.drop_Shadow}`}
    >
      {children}
    </div>
    </div>
  )
}

export default MainCard;