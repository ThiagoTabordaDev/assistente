export function signInRequest(email, password) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: { email, password },
    };
}

export function signInSuccess(token, user) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: { token, user },
    };
}

export function forgotPassword(email) {
    //  console.log(email);
    return {
        type: '@auth/FORGOT_IN_PASSWORD',
        payload: email,
    };
}

export function signUpRequest(name, email, password, enterprise) {
    //  console.log(email);
    return {
        type: '@auth/FORGOT_UP_Request',
        payload: name,
        email,
        password,
        enterprise,
    };
}

export function signFailure() {
    return {
        type: '@auth/SIGN_IN_FAILERE',
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
    };
}
