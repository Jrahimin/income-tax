import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

const {
    Group,
    Control,
    Label,
    Text,
    Check
} = Form;

function TaxForm() {
    const submit = (e) => {
        e.defaultPrevented();
    }
    return (
        <div className="card">
            <div className="card-header text-center bg-info">Calculate Income TAX</div>
            <div className="card-body">
                <Form onSubmit={submit}>
                    <h4>Personal Info</h4>
                    <hr/>
                    <Row>
                        <Col>
                            <Group controlId="name">
                                <Label>Name</Label>
                                <Control type="text" placeholder="Enter full name" name="name"/>
                            </Group>
                        </Col>
                        <Col>
                            <Group controlId="Occupation">
                                <Label>Occupation</Label>
                                <Control type="text" placeholder="Enter occupation" name="occupation"/>
                            </Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Group controlId="mobile_number">
                                <Label>Mobile Number</Label>
                                <Control type="text" placeholder="Enter Mobile Number" name="mobile_number"/>
                            </Group>
                        </Col>
                        <Col>
                            <Group controlId="email">
                                <Label>Email</Label>
                                <Control type="text" placeholder="Enter email" name="email"/>
                            </Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Group controlId="age">
                                <Label>Age</Label>
                                <Control type="text" placeholder="Enter age" name="age"/>
                            </Group>
                        </Col>
                        <Col>
                            <Label>Gender</Label>
                            <br/>
                            <Form.Check inline label="Male" name="gender" type="radio" value="m" defaultChecked={true}/>
                            <Form.Check inline label="Female" name="gender" type="radio" value="f"/>
                        </Col>
                    </Row>

                    <br/>
                    <h4>Yearly Income & Investment</h4>
                    <hr/>
                    <Row>
                        <Col>
                            <Group controlId="year_basic">
                                <Label>Yearly Basic Salary</Label>
                                <Control type="text" placeholder="Year Basic" name="year_basic"/>
                            </Group>
                        </Col>
                        <Col>
                            <Group controlId="year_transport">
                                <Label>Yearly Transport Allowance</Label>
                                <Control type="text" placeholder="Year Transport" name="year_transport"/>
                            </Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Group controlId="year_medical">
                                <Label>Yearly Medical Allowance</Label>
                                <Control type="text" placeholder="Year Medical" name="year_medical"/>
                            </Group>
                        </Col>
                        <Col>
                            <Group controlId="year_house_rent">
                                <Label>Yearly House Rent Allowance</Label>
                                <Control type="text" placeholder="year_house_rent" name="year_house_rent"/>
                            </Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Group controlId="year_bonus">
                                <Label>Year Bonus</Label>
                                <Control type="text" placeholder="Year Bonus" name="year_bonus"/>
                            </Group>
                        </Col>
                        <Col>
                            <Group controlId="extra_income">
                                <Label>Extra Income</Label>
                                <Control type="text" placeholder="Extra Income" name="extra_income"/>
                            </Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Group controlId="total_invest">
                                <Label>Tax Rebatable Investment</Label>
                                <Control type="text" placeholder="Total Investment" name="total_invest"/>
                            </Group>
                        </Col>
                    </Row>

                    <br/>
                    <h4>Other Eligibility</h4>
                    <hr/>
                    <Row>
                        <Col>
                            <Group controlId="attain_transport">
                                <Check type="switch" label="Attain Transport"/>
                            </Group>
                        </Col>
                        <Col>
                            <Group controlId="in_city">
                                <Check type="switch" label="In City"/>
                            </Group>
                        </Col>
                        <Col>
                            <Group controlId="ctg_or_dhaka">
                                <Check type="switch" label="CTG or Dhaka"/>
                            </Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Group controlId="is_disabled">
                                <Check type="switch" label="Is Disabled"/>
                            </Group>
                        </Col>
                        <Col>
                            <Group controlId="is_freedom_fighter">
                                <Check type="switch" label="Is Freedom Fighter"/>
                            </Group>
                        </Col>
                        <Col>
                            <Group controlId="has_disabled_child">
                                <Check type="switch" label="Has Disabled Child & Facility not taken"/>
                            </Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="badge badge-info" md={{span: 8}}>
                            <div className="text-capitalize font-weight-bold pt-2">
                                    <span className="align-items-center">
                                        <strong>Tax Amount: 2545423</strong>
                                    </span>
                            </div>
                        </Col>
                        <Col md={{span: 2}}>
                            <Button variant="primary" type="submit" className="float-right">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className="card-footer text-center bg-secondary font-weight-lighter text-white">
                <small>2021 © TAX calculator - All rights reserved. It is Powered by TAX Calculator Ltd.</small>
            </div>
        </div>
    );
}

export default TaxForm;
