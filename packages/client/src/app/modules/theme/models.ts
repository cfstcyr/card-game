export interface Palette {
    primary: string;
    primaryContrast: string;
    button: string;
    buttonContrast: string;
    buttonShadow?: string;
    buttonBorderRadius?: number;

    specialFont: string;
}

export interface Theme {
    name: string;
    id: string;
    palette: Palette;
}