import { Title, Text, Button, Container, Group } from '@mantine/core';
import Link from 'next/link';

const NotFound = () => {
  return (
      <Container className='pt-12'>
        <div className='text-center font-black text-4xl mb-6'>404</div>
        <Title className='text-center font-black text-4xl'>You have found a secret place.</Title>
        <div className='flex justify-center'>
          <Text  className='max-w-lg mb-8 mt-8' c='dimmed' size='lg' ta='center'>
            Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
            been moved to another URL.
          </Text>
        </div>
        <Group justify='center'>
          <Button
            component={Link}
            className='bg-[#E3EBFD] font-semibold'
            href="/"
            variant='default'
            size="lg"
          >
            Take me back to home page
          </Button>
        </Group>
      </Container>
    );
}

export default NotFound;