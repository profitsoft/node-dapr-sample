'use client';
import { NextPage } from 'next';
import { AppShell } from '@mantine/core';
import NavBar from '@/components/NavBar';
import classes from '@/components/AppContainer.module.css';

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: NextPage<AppContainerProps> = ({ children }) => {
  return (
    <AppShell header={{ height: 64 }} className={classes.main}>
      <NavBar />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppContainer;
