import React, {useState, useEffect} from 'react';
import {Col, Form, Row, ListGroup, Modal, Button, Alert} from "react-bootstrap";

const {
    Group,
    Control,
    Label,
    Check
} = Form;

const TaxForm = (props) => {
    const [taxData, setTaxData] = useState({
        "name": "",
        "occupation": "",
        "mobile_number": "",
        "age": undefined,
        "gender": "m",


        "year_basic": 0,
        "year_bonus": 0,
        "extra_income": 0,
        "year_house_rent": 0,
        "year_medical": 0,
        "attain_transport": false,
        "year_transport": 0,
        "total_invest": 0,

        "in_city": false,
        "ctg_or_dhaka": false,
        "is_freedom_fighter": false,
        "is_disabled": false,
        "has_disabled_child": false,
    });

    const [taxResponseData, setTaxResponseData] = useState({
        "totalTaxableIncome": 0,
        "payableIncomeAboveBar": 0,
        "taxOnPayableAmount": 0,
        "taxRebateAmount": 0,
        "finalIncomeTax": 0
    });

    const [openModal, setOpenModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleTaxData = (e) => {
        const propertyName = e.target.name
        const value = e.target.value

        console.log(`propertyName: ${propertyName}. Value: ${value}`);

        taxData[propertyName] = value;

        setTaxData({...taxData});
    }

    const onCloseModal = () => {
        console.log("in close modal");
        setOpenModal(false);
    }

    const switchTaxData = (e) => {
        const propertyName = e.target.name
        const value = e.target.value

        console.log(`propertyName: ${propertyName}. Value: ${value}`);

        taxData[propertyName] = !taxData[propertyName];

        setTaxData({...taxData});
        setErrorMessage(undefined);
    }

    useEffect(() => {
        console.log('in useEffect: taxData', taxData)
    }, [taxData]);

    const submit = (e) => {
        e.preventDefault();

        axios.post('api/tax-calculate', taxData).then(r => r.data).then(response => {
            if (response.code === 200) {
                setTaxResponseData(response.data);
                setOpenModal(true);
            } else {
                setErrorMessage(response.message);
                setOpenModal(false);
            }
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }
    return (
        <>
            <Modal show={openModal} {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered onHide={onCloseModal}>
                <Modal.Header closeButton className={'bg-info'}>
                    <Modal.Title>
                        <h5 className="modal-title" id="taxInfoModal">Tax Information Details</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup className={'font-weight-bold'}>
                        <ListGroup.Item>Total Taxable
                            Income: {taxResponseData?.totalTaxableIncome || 0} BDT</ListGroup.Item>
                        <ListGroup.Item>Tax on Payable
                            Amount: {taxResponseData?.taxOnPayableAmount || 0} BDT</ListGroup.Item>
                        <ListGroup.Item>Rebate: {taxResponseData?.taxRebateAmount || 0} BDT</ListGroup.Item>
                        <ListGroup.Item>Final Income Tax: {taxResponseData?.finalIncomeTax || 0} BDT</ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOpenModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="card">
                <div className="card-header text-center bg-info font-weight-bold">Calculate Income TAX</div>
                {errorMessage && <div style={{margin:'10px'}}>
                    <Alert variant={'danger'} dismissible onClose={() => setErrorMessage(undefined)}>
                        {errorMessage}
                    </Alert>
                </div>}
                <div className="card-body">
                    <Form onSubmit={submit}>
                        <h4>Personal Info</h4>
                        <hr/>
                        <Row>
                            <Col>
                                <Group controlId="name">
                                    <Label>Name</Label>
                                    <Control type="text" placeholder="Enter full name" name="name"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Group controlId="Occupation">
                                    <Label>Occupation</Label>
                                    <Control type="text" placeholder="Enter occupation" name="occupation"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Group controlId="mobile_number">
                                    <Label>Mobile Number</Label>
                                    <Control type="text" placeholder="Enter Mobile Number" name="mobile_number"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Group controlId="email">
                                    <Label>Email</Label>
                                    <Control type="text" placeholder="Enter email" name="email"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Group controlId="age">
                                    <Label>Age</Label>
                                    <Control type="text" placeholder="Enter age" name="age" onChange={handleTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Label>Gender</Label>
                                <br/>
                                <Form.Check inline label="Male" name="gender" type="radio" value="m"
                                            defaultChecked={true} onChange={handleTaxData}/>
                                <Form.Check inline label="Female" name="gender" type="radio" value="f"
                                            onChange={handleTaxData}/>
                            </Col>
                        </Row>

                        <br/>
                        <h4>Yearly Income & Investment</h4>
                        <hr/>
                        <Row>
                            <Col>
                                <Group controlId="year_basic">
                                    <Label>Yearly Basic Salary</Label>
                                    <Control type="text" placeholder="Yearly Basic Salary" name="year_basic"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Group controlId="year_transport">
                                    <Label>Yearly Transport Allowance</Label>
                                    <Control type="text" placeholder="Yearly Transport Allowance" name="year_transport"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Group controlId="year_medical">
                                    <Label>Yearly Medical Allowance</Label>
                                    <Control type="text" placeholder="Yearly Medical Allowance" name="year_medical"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Group controlId="year_house_rent">
                                    <Label>Yearly House Rent Allowance</Label>
                                    <Control type="text" placeholder="Yearly House Rent Allowance"
                                             name="year_house_rent" onChange={handleTaxData}/>
                                </Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Group controlId="year_bonus">
                                    <Label>Yearly Bonus</Label>
                                    <Control type="text" placeholder="Yearly Bonus" name="year_bonus"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Group controlId="extra_income">
                                    <Label>Other Income</Label>
                                    <Control type="text" placeholder="Other Income" name="extra_income"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Group controlId="total_invest">
                                    <Label>Tax Rebatable Investment</Label>
                                    <Control type="text" placeholder="Total Investment" name="total_invest"
                                             onChange={handleTaxData}/>
                                </Group>
                            </Col>
                        </Row>

                        <br/>
                        <h4>Other Eligibilities</h4>
                        <hr/>
                        <Row>
                            <Col>
                                <Group controlId="attain_transport">
                                    <Check type="switch" name="attain_transport" checked={taxData.attain_transport}
                                           label="Workplace Provides Transport" onChange={switchTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Group controlId="in_city">
                                    <Check type="switch" name="in_city" checked={taxData.in_city}
                                           label="Resides in City" onChange={switchTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Group controlId="ctg_or_dhaka">
                                    <Check type="switch" name="ctg_or_dhaka" checked={taxData.ctg_or_dhaka}
                                           label="Resides in CTG or Dhaka" onChange={switchTaxData}/>
                                </Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Group controlId="is_disabled">
                                    <Check type="switch" name="is_disabled" checked={taxData.is_disabled}
                                           label="Is Disabled" onChange={switchTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Group controlId="is_freedom_fighter">
                                    <Check type="switch" name="is_freedom_fighter" checked={taxData.is_freedom_fighter}
                                           label="Is Freedom Fighter" onChange={switchTaxData}/>
                                </Group>
                            </Col>
                            <Col>
                                <Group controlId="has_disabled_child">
                                    <Check type="switch" name="has_disabled_child" checked={taxData.has_disabled_child}
                                           label="Has Disabled Child & Facility not taken" onChange={switchTaxData}/>
                                </Group>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            {/*<Col className="badge badge-info" md={{span: 8}}>*/}
                            {/*    <div className="text-capitalize font-weight-bold pt-2">*/}
                            {/*        <span className="btn btn-sm align-items-center" onClick={() => {*/}
                            {/*            setOpenModal(true)*/}
                            {/*        }}>*/}
                            {/*            <strong>Tax Amount: {taxResponseData?.finalIncomeTax}</strong> (Click here to show details)*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
                            <Col md={{span: 4, offset: 4}}>
                                <Button type="submit" className="btn btn-info w-100 p-2"
                                        style={{color: 'black'}}><strong>Calculate</strong></Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="card-footer text-center bg-secondary font-weight-lighter text-white">
                    <small>2021 © TAX calculator - All rights reserved. It is Powered by TAX Calculator Ltd.</small>
                </div>
            </div>
        </>
    );
}

export default TaxForm;
