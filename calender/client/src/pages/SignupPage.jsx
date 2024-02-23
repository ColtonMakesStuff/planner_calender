import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import Signup from '../components/Signup';
import { CalendarBlank } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {

  const navigate = useNavigate();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();
  
  today =  yyyy + mm + dd; 
  console.log(today); // Outputs the current date in the format mm/dd/yyyy


  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex flex-col justify-center h-full">
      <div className='flex justify-center mt-2 '>

<CalendarBlank size={64} color="#46372b" weight="duotone" className='border-2 border-accent-2 bg-accent-1 rounded-xl'/>
</div>
    <div className="flex justify-center mt-2">
       <h4 className="flex align-center" style={{ fontSize: '2rem' }}>Sign Up</h4>
    </div>
    <div className="h-full">
       <div className="col-12 col-lg-10">
         <div className="card">
           <div className="card-body">
             
               <Signup handleChange={handleChange} handleFormSubmit={handleFormSubmit} formState={formState} />
   
             {error && (
               <div className="text-white">
                 {error.message}
               </div>
             )}
           </div>
         </div>
       </div>
       <p className='flex justify-center hover:underline mt-4 active:text-white' onClick={()=> navigate(`/login`)}>Already have an account? Login</p>
    </div>
   </main>
   
  );
};

export default SignupPage;
