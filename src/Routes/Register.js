import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, InputGroup, Alert} from "react-bootstrap";
import { PassFill, PersonFill, LockFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import useFetch from "../useFetch";

const Register = ({loggedUser}) => {
    
    const {data} = useFetch('http://localhost:5000/users');
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [isPending, setIsPending] = useState(false);    
    const [userErrorMessage, setUserErrorMessage] = useState(null);
    const [pwdErrorMessage, setPwdErrorMessage] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('username')){
            navigate('/');
        }
    }, [])

    const handleRegister = (e) =>{
        e.preventDefault();
        const newUser = { user, pwd }
        setIsPending(true);
        setUserErrorMessage(null);
        setPwdErrorMessage(null);
        let userDetected = false;
        let pwdDontMatch = false;

        data.forEach((item) => {
            if(item.user == user){
                setUserErrorMessage("Username already taken! ");
                userDetected = true;
                return;
            }
        });

        if(pwd !== confirmPwd){
            setPwdErrorMessage("Passwords don't match!");
            pwdDontMatch = true;
        }

        if(!userDetected && !pwdDontMatch){
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            }).then(() => {
                console.log('New User added')
                setIsPending(false);
                navigate('/login');
            })
        } else{
            setIsPending(false);
        }     
    };

    return (
        <div className="register">
            <Container className="border border-3 border-white rounded m-5 p-5">
                <Container className="mt-1">
                    <PassFill size={100}/>
                    <h1>Register</h1>
                </Container>                
                <Form className="mx-5 mxt-5" onSubmit={handleRegister}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><PersonFill/></InputGroup.Text>
                        <Form.Control 
                            placeholder="Username"
                            aria-label="Username"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </InputGroup>                    
                    { userErrorMessage && <Alert variant="danger">{userErrorMessage}</Alert>}
                    <InputGroup className="mb-3">
                        <InputGroup.Text><LockFill/></InputGroup.Text>
                        <Form.Control type="password"
                            aria-label="Password"
                            placeholder="Password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            />
                        <Form.Control type="password"
                            aria-label="Confirm Password"
                            placeholder="Confirm Password"
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                            required
                            />
                    </InputGroup>
                    { pwdErrorMessage && <Alert variant="danger">{pwdErrorMessage}</Alert>}
                    { !isPending && <Button className="btn btn-light mb-1" type="Submit">
                        Register
                    </Button>}
                    { isPending && <Button className="btn btn-light mb-1" type="Submit" disabled>
                        Adding new User...
                    </Button>}
                </Form>
                <Link style={{color: 'white'}} to='/login'>
                    Already have an account? Login here.
                </Link>
            </Container>   
        </div>
    );
}
 
export default Register;