import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <Col>
                <Row>
                    <h2>Sorry</h2>
                </Row>
                <Row>
                    <p>That page cannot be found</p>
                </Row>
                <Row>
                    <Link style={{color: 'white'}} to="/">Back to the homepage...</Link>
                </Row>
            </Col>
        </div>
    );
}
 
export default NotFound;