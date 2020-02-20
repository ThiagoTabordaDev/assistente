import produce from 'immer';

const INITIAL_STATE = {
    token: null,
    signed: false,
    loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST': {
                draft.token = action.payload.token;
                draft.signed = true;
                draft.loading = true;
                break;
            }

            case '@auth/SIGN_IN_SUCCESS': {
                draft.token = action.payload.token;
                draft.signed = true;
                draft.loading = false;
                break;
            }

            case '@auth/SIGN_IN_FAILERE': {
                draft.loading = false;
                draft.signed = false;
                break;
            }

            case '@auth/SIGN_OUT': {
                draft.loading = false;
                draft.signed = false;
                break;
            }

            case '@auth/FORGOT_IN_PASSWORD': {
                draft.signed = false;
                draft.token = null;
                break;
            }

            default:
        }
    });
}
