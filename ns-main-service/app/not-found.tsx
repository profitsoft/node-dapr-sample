import { Title, Text, Button, Container, Group } from '@mantine/core';
import Link from 'next/link';
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <Container className={classes.container}>
      <div className={classes.errorHeader}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <div className={classes.textContainer}>
        <Text className={classes.text}>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
      </div>
      <Group justify="center">
        <Button
          component={Link}
          className={classes.button}
          href="/"
          variant="default"
          size="lg"
        >
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};

export default NotFound;
