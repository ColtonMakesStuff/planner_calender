const Login = ({ handleChange, handleFormSubmit, formState }) => {
    return (
    <div className="mt-2 border-t-2 border-b-2 border-accent-2 ">
    <form onSubmit={handleFormSubmit} className="space-y-4 w-full h-full flex flex-col items-left justify-between p-4">
        <p>email</p>
        <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
        />
        <p>password</p>
        <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
        />
        <div className="flex pt-8 justify-center">
        <button
            className="bg-accent-1 text-content p-2 border-2 border-accent-1 rounded-md w-1/2 active:bg-accent-2 active:text-accent-3 active:border-transparent"
            style={{ cursor: 'pointer' }}
            type="submit"
        >
            Submit
        </button>
        </div>
    </form>
</div>

    );
   };
   
   export default Login;