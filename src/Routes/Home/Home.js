import { useEffect, useState } from "react";
import { Container, InputGroup, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import useBookFetch from "../../useBookFetch";
import useFetch from "../../useFetch";
import BookList from "./BookList";
import NavBar from "./NavBar";

const Home = () => {

    const {data:books, isPending, error} = useBookFetch();
    const username = localStorage.getItem('username');
    const [errorMessage, setErrorMessage] = useState(localStorage.getItem('errorMessage'));
    const navigate = useNavigate();      

    useEffect(() => {
        if(!localStorage.getItem('username')){
            navigate('/login');
        }

        setTimeout(() => {
            localStorage.removeItem('errorMessage')
            setErrorMessage(null);
        }, 5000); //Delete alert after 5 seconds

    }, [])

    const handleReserve = (id) => {
        localStorage.removeItem('errorMessage');
        setErrorMessage(null);
        let reservationDate = new Date();
        reservationDate.setDate(reservationDate.getDate() + 1);
        const reserved = reservationDate.toJSON().slice(0, 10);
        const user = username;
        const patch = { user, reserved };
        fetch('http://localhost:5000/books/' + id)
        .then(res => {
            if(!res.ok){
                throw Error('Could not fetch data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            if((data.user === '') && (data.reserved === '')){
                fetch('http://localhost:5000/books/' + id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patch)
                }).then(() => {
                    window.location.reload(false);
                })
            } else {
                localStorage.setItem('errorMessage', "Book has been already reserved!");
                window.location.reload(false);
            }
        })        
    }

    const handleDeleteReservation = (id) => {
        localStorage.removeItem('errorMessage');
        setErrorMessage(null);
        const reserved = '';
        const user = '';
        const patch = { user, reserved };

        fetch('http://localhost:5000/books/' + id)
        .then(res => {
            if(!res.ok){
                throw Error('Could not fetch data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            if((data.user === username) && (data.reserved !== '') && (data.leased === '')){
                fetch('http://localhost:5000/books/' + id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patch)
                }).then(() => {
                    window.location.reload(false);
                })
            } else {
                localStorage.setItem('errorMessage', "Cannot delete reservation, book has been already lend!");
                window.location.reload(false);
            }
        })
    }

    const handleLend = (id) => {
        localStorage.removeItem('errorMessage');
        setErrorMessage(null);
        let leaseDate = new Date();
        leaseDate.setDate(leaseDate.getDate() + 90);
        const leased = leaseDate.toJSON().slice(0, 10);
        const reserved = '';
        const patch = { reserved, leased };

        fetch('http://localhost:5000/books/' + id)
        .then(res => {
            if(!res.ok){
                throw Error('Could not fetch data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            if((data.user !== '') && (data.reserved !== '')){
                fetch('http://localhost:5000/books/' + id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patch)
                }).then(() => {
                    window.location.reload(false);
                })
            } else {
                localStorage.setItem('errorMessage', "Cannot lend book as reservation was canceled!");
                window.location.reload(false);
            }
        })
    }

    const handleReturn = (id) => {
        localStorage.removeItem('errorMessage');
        setErrorMessage(null);
        const leased = '';
        const user = '';
        const patch = { user, leased };
        fetch('http://localhost:5000/books/' + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patch)
        }).then(() => {
            window.location.reload(false);
        })
    }

    return (
        <div className="home">
            <NavBar username={username}/>
            { errorMessage && <Alert variant="warning">{ errorMessage }</Alert>}
            <Container>
                { error && <div> { error } </div>}
                { isPending && <div>Loading...</div> }
                { books && <BookList books = {books}    reserve = {handleReserve} 
                                                        deleteReservation = {handleDeleteReservation}
                                                        lend = {handleLend}
                                                        returnBook = {handleReturn} />}    
            </Container>
        </div>
    );
}
 
export default Home;