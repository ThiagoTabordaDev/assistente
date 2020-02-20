import styled from 'styled-components';
// import { darken } from 'polished';

export const Wrapper = styled.div`
    height: 100%;
    background: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 400px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        margin: 30px;
        border: 1px solid;
        padding: 20px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.02);

        h2 {
            display: flex;
            text-align: left;
            margin: 10px 0 0 0;
        }
        input {
            background: #f8f9fa;
            border: 1px solid;
            border-color: #000;
            border-radius: 4px;
            height: 35px;
            padding: 0 10px;
            cursor: initial;

            margin: 10px 0 0;
            &::placeholder {
                color: #bbb;
            }
        }

        button {
            margin: 10px 0 0;
        }

        .separador {
            border-top: 1px solid;
            margin: 15px 0 0;
            color: #676565;
            border-color: #000;
            padding-top: 15px;
        }

        // span {
        //     margin: 15px 0 0;
        //     color: #ff0000;
        //     align-self: flex-start;
        // }

        a {
            color: #0071c2;
            margin-top: 15px;
            font-size: 16px;
            opacity: 0.8;

            &:houver {
                opacity: 1;
            }
        }
    }
`;
