import { Container } from '@mantine/core';
import classes from '@/styles/NomePage.module.css';

const App = () => {
  return (
   <Container fluid className={classes.container}>
     <div className={classes.content}>
       <p className='text-center text-[#434D5C] font-black text-4xl -mt-80'> Welcome to ProfITsoft POC project</p>
     </div>
   </Container>
  );
}

export default App;