import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PersonDashFill, LockFill } from "react-bootstrap-icons";
import useFetch from "../useFetch";

const DeleteUser = ({loggedUser}) => {

    const {data:users} = useFetch('http://localhost:5000/users');
    const {data:books} = useFetch('http://localhost:5000/books');
    const navigate = useNavigate();    
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const username = localStorage.getItem('username');

    useEffect(() => {
        if(!localStorage.getItem('username')){
            navigate('/login');
        } else if ( username === 'librarian') { 
            navigate('/');
        }
    }, [])

    const userHasBooks = () => {
        let userHasBooks = false;
        books.forEach((book) => {
            if(book.user === username)
                userHasBooks = true;
        })
        return userHasBooks;
    };

    const handleDelete = (e) => {

        e.preventDefault();
        setErrorMessage(null);

        //Checking password

        let correctPassword = false;
        let id;

        users.forEach((user) => {
            if(user.pwd === password){
                correctPassword = true;
                id = user.id;
            }
        })        

        if(correctPassword){
            //Deleting user
            localStorage.removeItem('username');
            fetch('http://localhost:5000/users/' + id, {
                method: 'DELETE'
            }).then(() =>{
                navigate('/');
            });

        } else {
            setErrorMessage("Password is incorrect!");
        }
    };

    return (
        <div className="delete-user">
            <Container className="border border-3 border-white rounded m-5 p-5">
                <Container className="mt-1" >
                    <PersonDashFill size={100}/>
                    <h1>Delete User</h1>
                </Container>      
                { userHasBooks() && <Alert variant="danger">You cannot delete Your account as You still have reserved or leased books.</Alert>}          
                { !userHasBooks() && <Form className="mx-5 mxt-5" onSubmit={handleDelete}>
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
                    { errorMessage && <Alert variant="danger">{ errorMessage }</Alert>}
                    <Button className="btn mb-1" type="Submit" variant="danger">
                        Delete Account
                    </Button>
                </Form>}
                <Link style={{color: 'white'}} to='/'>
                    Return to main menu.
                </Link>
            </Container>    
        </div>
    );
}
 
export default DeleteUser;