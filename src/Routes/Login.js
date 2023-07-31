import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, InputGroup, Alert} from "react-bootstrap";
import { PersonCircle, PersonFill, LockFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import useFetch from "../useFetch";

const Login = ({ login, loggedUser}) => {

    const {data:users} = useFetch('http://localhost:5000/users');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('username')){
            navigate('/');
        }
    }, [])

    const handleLogin = (e) =>{
        
        e.preventDefault();
        let userDetected = false;
        users.forEach((item) => {
            if(item.user == username && item.pwd === password){
                userDetected = true;
                return;
            }
        });

        if(userDetected){
            localStorage.setItem('username', username)
            navigate("/");
        } else {
            setErrorMessage("Your account is not recognized and cannot login at this time!");
        }

    };

    return (
        <div className="login">
            <Container className="border border-3 border-white rounded m-5 p-5">
                <Container className="mt-1" >
                    <PersonCircle size={100}/>
                    <h1>Login</h1>
                </Container>                
                <Form className="mx-5 mxt-5" onSubmit={handleLogin}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><PersonFill/></InputGroup.Text>
                        <Form.Control 
                            placeholder="Username"
                            aria-label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><LockFill/></InputGroup.Text>
                        <Form.Control type="password"
                            aria-label="Password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                    </InputGroup>
                    { errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Button className="btn btn-light mb-1" type="Submit">
                        Login
                    </Button>
                </Form>
                <Link style={{color: 'white'}} to='/register'>
                    Don't have account? Register here.
                </Link>
            </Container>
        </div>
    );
}
 
export default Login;