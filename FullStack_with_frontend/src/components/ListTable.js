import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
function ListTable({ from, attr, value }) {
    const history = useHistory();

    return (
        <Container>
            <Row className='p-2' style={{ border: "1px solid #000" }}>
                <Col className='d-flex justify-content-center align-items-center'
                    style={{ borderRight: "1px solid #000" }}>
                    {attr}
                </Col>
                {
                    value && <Col className='d-flex justify-content-center align-items-center'
                        style={{ borderRight: "1px solid #000" }}>
                        {value}
                    </Col>
                }
                <Col className='d-flex justify-content-center align-items-center'>
                    {from === "schedule" ? <Link to={`/schedule/${attr}`}>
                        <Button>Details</Button>
                    </Link> :
                        <Link to={`${history.location.pathname}/${attr}`}>

                            <Button>Details</Button>
                        </Link>}
                </Col>
            </Row>
        </Container>
    )
}

export default ListTable