import '@mantine/core/styles.layer.css';
import "./globals.css";

import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { Nunito } from 'next/font/google';
import AppContainer from '@/components/AppContainer';

export const metadata = {
  title: 'ProfITsoft POC',
};

const nunitoFont = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

const theme = createTheme({
  fontFamily: `${nunitoFont.style.fontFamily}, sans-serif`,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppContainer>
            {children}
          </AppContainer>
        </MantineProvider>
      </body>
    </html>
  );
}
