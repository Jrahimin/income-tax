import React from 'react';
import ReactDOM from 'react-dom';
import TaxForm from "./tax-form";
import {Col, Container, Row} from "react-bootstrap";

function Index() {
    return (
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <TaxForm/>
                </Col>
            </Row>
        </Container>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
