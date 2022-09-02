import { Global } from '@emotion/react'

export const GlobalStyles = () => (
    <Global 
        styles={`
        /* width */
        ::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey;
            border-radius: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #40394A;
            border-radius: 10px;
        }
        .icon {
            max-height: 2em;
            aspect-ratio: 1;
            cursor: pointer;
        }
        .tableCell {
            flex: 1;
            justify-content: center;
            align-items: center;
            border: 1px solid;
            position: relative;
            text-transform: uppercase;
            font-size: min(3vh, 3vw);
            margin: 4px;
            border-radius: 5px;
            // aspect-ratio: 1;
        }
    `}
/>
)