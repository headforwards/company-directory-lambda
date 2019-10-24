
const getAccessToken = (app, config) => {
    const request = {
        scopes: config.scopes
    }

    return app.acquireTokenSilent(request).catch((error) => {
        // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure
        // due to consent or interaction required ONLY
        if (requiresInteraction(error.errorCode)) {
            return app.acquireTokenPopup(request)
            // return redirect
            //   ? msalApp.acquireTokenRedirect(request)
            //   : msalApp.acquireTokenPopup(request);
        }
    });

}

const requiresInteraction = (errorMessage) => {
    if (!errorMessage || !errorMessage.length) {
        return false;
    }

    return (
        errorMessage.indexOf("consent_required") > -1 ||
        errorMessage.indexOf("interaction_required") > -1 ||
        errorMessage.indexOf("login_required") > -1
    );
}

export default getAccessToken
