import React from "react";

const Errors = ({ errors }) => {

    const renderErrors = () => {
        return errors.map((error, i) => {
            return (
                <div className="alert alert-danger" role="alert" key={i}>
                    <h4>{error.message+' | '+error.config.url}</h4>
                </div>)
        })
    }

    return (
        <div id="errors">
            {renderErrors()}
        </div>
    );
}


export default Errors;