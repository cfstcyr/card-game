import { Theme } from "./models";

export const THEMES_LIST: Theme[] = [
    {
        name: 'Classic Black',
        id: 'black',
        palette: {
            primary: 'black',
            primaryContrast: 'white',
            button: 'rgb(17, 17, 17)',
            buttonContrast: 'white',

            specialFont: 'Changa',
        }
    },
    {
        name: 'Classic White',
        id: 'white',
        palette: {
            primary: 'rgb(252, 252, 252)',
            primaryContrast: 'black',
            button: 'rgb(245, 245, 245)',
            buttonContrast: 'black',

            specialFont: 'Changa',
        }
    },
    {
        name: 'Colorful Blue',
        id: 'blue',
        palette: {
            primary: 'rgb(16, 101, 250)',
            primaryContrast: 'white',
            button: 'white',
            buttonContrast: 'black',

            specialFont: 'nunito',
        },
    },
    {
        name: 'Colorful Green',
        id: 'green',
        palette: {
            primary: '#3bab62',
            primaryContrast: 'white',
            button: 'white',
            buttonContrast: 'black',

            specialFont: 'nunito',
        },
    },
    {
        name: 'Colorful Red',
        id: 'red',
        palette: {
            primary: '#dd5656',
            primaryContrast: 'white',
            button: 'white',
            buttonContrast: 'black',

            specialFont: 'nunito',
        },
    },
    {
        name: '8Bits',
        id: '8bits',
        palette: {
            primary: 'black',
            primaryContrast: 'rgb(38, 196, 38)',
            button: '#0d0d0d',
            buttonContrast: 'rgb(38, 196, 38)',

            specialFont: 'handjet',
        }
    },
    {
        name: 'Balloons',
        id: 'balloons',
        palette: {
            primary: '#5941B0',
            primaryContrast: 'white',
            button: 'white',
            buttonContrast: '#5941B0',

            specialFont: 'DynaPuff',
        }
    },
    {
        name: '3D',
        id: '3d',
        palette: {
            primary: 'black',
            primaryContrast: 'white',
            button: '#0f0f0c',
            buttonContrast: '#FAE26C',

            specialFont: 'nabla',
        }
    }, 
    {
        name: 'We\'re not really strangers',
        id: 'wnrs',
        palette: {
            primary: 'white',
            primaryContrast: '#B12423',
            button: '#B12423',
            buttonContrast: 'white',

            specialFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        }
    }
]