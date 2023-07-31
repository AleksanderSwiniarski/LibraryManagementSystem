import { useState } from "react";
import { Container, InputGroup, Form, Button, Row, Col, Table } from "react-bootstrap";
import { ArrowDown, ArrowUp, } from "react-bootstrap-icons";

const BookList = ({books, reserve, deleteReservation, lend, returnBook }) => {

    //Filtering for given parameters
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('None');
    const username = localStorage.getItem('username');
    const isLibrarian = (username === 'librarian')
    let result;

    if(search !== ''){
        switch(category) {
            case "Title":
                result = books.filter(book => book.title.includes(search));
                break;
            case "Author":
                result = books.filter(book => book.author.includes(search));
                break;
            case "Publisher":
                result = books.filter(book => book.publisher.includes(search));
                break;
            case "Date":
                result = books.filter(book => String(book.date) === search);
                break;
            case "User":
                result = books.filter(book => book.user === username);
                break;
            case "Reserved":
                result = books.filter(book => book.reserved !== '');
                break;
            case "Leased":
                result = books.filter(book => book.leased !== '');
                break;
            case "None":
                result = books;
                break;

    }    
    } else {
        switch(category) {
            case "Reserved":
                result = books.filter(book => book.reserved !== '');
                break;
            case "Leased":
                result = books.filter(book => book.leased !== '');
                break;
            case "User":
                result = books.filter(book => book.user === username);
                break;
            case "None":
                result = books;
                break;
            default:
                result = books;
        }
    }

    return (
        <div className="book-list">
            <Container>
                <Form className="mx-5 mxt-5">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Filter:</InputGroup.Text>
                        <Form.Select onChange={(e) => setCategory(e.target.value)}>
                            <option value="None">None</option>
                            <option value="Title">Title</option>
                            <option value="Author">Author</option>
                            <option value="Publisher">Publisher</option>
                            <option value="Date">Date</option>
                            { !isLibrarian && <option value="User">Users books</option>}
                            { isLibrarian && <option value="Reserved">Reserved</option>}
                            { isLibrarian && <option value="Leased">Leased</option>}
                        </Form.Select>
                        <InputGroup.Text>Search:</InputGroup.Text>
                        { (category === "User" || category === "None" || category === "Leased" || category === "Reserved") && <Form.Control
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Input word to search"
                            required
                            disabled
                        />}
                        { (category !== "User" && category !== "None" && category !== "Leased" && category !== "Reserved") && <Form.Control
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Input word to search"
                            required
                        />}                        
                    </InputGroup>
                </Form>
            </Container>
            <Table>
                <thead>
                    <tr>
                        <th className="text-center">Title</th>
                        <th className="text-center">Author</th>
                        <th className="text-center">Publisher</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((book) => {                        
                        let userBook = false;
                        if(book.user === username){
                            userBook = true
                        }

                        return(
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.date}</td>
                                <td>
                                    { (book.reserved && userBook && !isLibrarian ) &&
                                        <InputGroup>
                                            <Button variant="secondary" disabled>
                                                Reserved by You till {book.reserved}
                                            </Button>
                                            <Button onClick={() => deleteReservation(book.id)} variant="danger">
                                                Cancel Reservation
                                            </Button>
                                        </InputGroup>                                    
                                    }
                                    { (book.reserved && !userBook && !isLibrarian ) &&
                                        <Button variant="secondary" disabled>
                                            Unavailable reserved
                                        </Button>
                                    }
                                    { (book.reserved && isLibrarian ) &&
                                        <InputGroup>
                                            <Button variant="secondary" disabled>
                                                Reserved by {book.user}
                                            </Button>
                                            <Button onClick={() => lend(book.id)} variant="primary">
                                                Lease
                                                <ArrowUp />
                                            </Button>
                                        </InputGroup>                                    
                                    }
                                    { (book.leased && userBook && !isLibrarian ) &&
                                        <Button disabled>
                                            Leased by You till {book.leased}
                                        </Button>
                                    }
                                    { (book.leased && !userBook && !isLibrarian ) &&
                                        <Button variant="secondary" disabled>
                                            Unavailable leased
                                        </Button>
                                    }
                                    { (book.leased && isLibrarian ) &&
                                        <InputGroup>
                                            <Button variant="secondary" disabled>
                                                Leased by {book.user} till {book.leased}
                                            </Button>
                                            <Button onClick={() => returnBook(book.id)} variant="primary">
                                                Return
                                                <ArrowDown />
                                            </Button>
                                        </InputGroup>                                    
                                    }
                                    { ( !book.user && !isLibrarian ) &&
                                        <Button onClick={() => reserve(book.id)} variant="success">
                                            Reserve                                
                                        </Button>
                                    }{ ( !book.user && isLibrarian ) &&
                                        <Button variant="success" disabled>
                                            Available                             
                                        </Button>
                                    }
                                </td>
                            </tr>
                        )                        
                    })}
                </tbody>
            </Table>
        </div>
    );
}
 
export default BookList;