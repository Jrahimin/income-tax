import React from 'react';
import ReactDOM from 'react-dom';
import TaxForm from "./tax-form";

function Index() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <TaxForm></TaxForm>
                </div>
            </div>
        </div>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
