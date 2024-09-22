import { Container } from '@mantine/core';
import classes from '@/app/Page.module.css';

const App = () => {
  return (
    <Container fluid className={classes.container}>
      <div className={classes.content}>
        <p className={classes.mainText}> Welcome to ProfITsoft POC project</p>
      </div>
    </Container>
  );
};

export default App;
