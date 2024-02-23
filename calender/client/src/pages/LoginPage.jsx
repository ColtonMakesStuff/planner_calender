import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Login from '../components/Login';
import { CalendarBlank } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

import Auth from '../utils/auth';

const LoginPage = (props) => {
const navigate = useNavigate();
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();

today =  yyyy + mm + dd; 
console.log(today); // Outputs the current date in the format mm/dd/yyyy

  
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);

    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex flex-col justify-center h-full">
      <div className='flex justify-center mt-2 '>

      <CalendarBlank size={64} color="#46372b" weight="duotone" className='border-2 border-accent-2 bg-accent-1 rounded-xl'/>
      </div>
      <div className='flex justify-center mt-2'>
           <h4 className=" flex align-center " style={{ fontSize: '2rem' }}>Login</h4>
           </div>

          

           <div className="h-full">
          
               <Login handleChange={handleChange} handleFormSubmit={handleFormSubmit} formState={formState} />
   
             {error && (
               <div className=" text-white">
                 {error.message}
               </div>
             )}
              <p className='flex justify-center hover:underline mt-4 active:text-white' onClick={()=> navigate(`/signup`)}>Create Account</p>
       </div>
    </main>
   );
   
};

export default LoginPage;
