import { Theme } from "./models";

export const THEMES_LIST: Theme[] = [
    {
        name: 'Black',
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
        name: 'White',
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
        name: 'Blue',
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
        name: 'Green',
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
        name: 'Purple',
        id: 'purple',
        palette: {
            primary: '#9F4DB6',
            primaryContrast: 'white',
            button: 'white',
            buttonContrast: 'black',

            specialFont: 'nunito',
        },
    },
    {
        name: 'Red',
        id: 'red',
        palette: {
            primary: '#dd5656',
            primaryContrast: 'white',
            button: 'white',
            buttonContrast: 'black',

            specialFont: 'nunito',
        },
    },
]