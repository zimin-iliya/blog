export default function Register() {
    return (
        <>
        <form className="register" action="" >
            <h1>Register</h1>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Register</button>
        </form>
        </>
    )
}