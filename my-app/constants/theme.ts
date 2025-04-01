export interface Theme {
    colors: {
        primary: string;
        primaryDark: string;
        dark: string;
        darkLight: string;
        gray: string;
        text: string;
        textLight: string;
        textDark: string;
        rose: string;
        error: string;
    };
    fonts: {
        medium: string;
        semibold: string;
        bold: string;
        extraBold: string;
    };
    radius: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
}

export const theme: Theme = {
    colors: {
        // primary: '#00C26F',
        primary: '#00AC62',
        primaryDark: '#00AC62',
        dark: '#3E3E3E',
        darkLight: '#E1E1E1',
        gray: '#e3e3e3',
        text: '#494949',
        textLight: '#7C7C7C',
        textDark: '#1D1D1D',
        rose: '#ef4444',
        error: '#dc2626'
    },
    fonts: {
        medium: '500',
        semibold: '600',
        bold: '700',
        extraBold: '800',
    },
    radius: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
        xxl: 22,
    }
} 