import React, {Fragment} from "react";

export default function ErrorPage(message) {
    return (
        <Fragment>
            <h1>"Uh-oh! Something went wrong!</h1>
            <div>{message}</div>
        </Fragment>
    );
}

