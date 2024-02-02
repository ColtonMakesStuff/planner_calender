const Login = ({ handleChange, handleFormSubmit, formState }) => {
    return (
       <div className="flex flex-col items-center text-content h-screen ">
         <form onSubmit={handleFormSubmit}>
           <input
             className="form-input"
             placeholder="Your email"
             name="email"
             type="email"
             value={formState.email}
             onChange={handleChange}
           />
           <input
             className="form-input"
             placeholder="******"
             name="password"
             type="password"
             value={formState.password}
             onChange={handleChange}
           />
           <button
             className="btn btn-block btn-primary"
             style={{ cursor: 'pointer' }}
             type="submit"
           >
             Submit
           </button>
         </form>
       </div>
    );
   };
   
   export default Login;