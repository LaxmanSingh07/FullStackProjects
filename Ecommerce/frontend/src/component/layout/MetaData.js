import React from "react";
import Helmet from "react-helmet";

//Helmet is used to fill the title of the page
const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{title} </title>
        </Helmet>
    )
}

export default MetaData