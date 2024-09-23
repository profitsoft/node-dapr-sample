import { Container } from '@mantine/core';
import classes from './Page.module.css';

const About = () => {
  return (
    <Container className={classes.container}>
      <div>
        <div className={classes.header}>
          Greetings to all IT professionals and connoisseurs of Internet
          technologies!
        </div>
        <p>
          My name is OLEKSANDR PETRYCHENKO, CEO and founder at ProfITsoft, a
          leading software development company in Ukraine.
          <br />
          ProfITsoft was created more than 20 years ago, in 2002, in Kharkiv,
          Ukraine by IT technology enthusiasts. Since the first days, the main
          company goals were helping businesses, popularizing the IT sector and
          educating its own highly qualified personnel.
          <br />
          Our company was the first in Ukraine to set up a special laboratory
          for young IT professionals at the Kharkiv National University of Radio
          Electronics base. During the first few years of training, several
          hundred people passed the courses and became high-level specialists.
          <br />
          By the way, the current CTO of ProfITsoft is one of our first students
          20 years ago, ANDREY PETRENKO.
          <br />
          After 20 years the company hasnt changed its basic principles.
          <br />
          Our engineers created a unique full-cycle IT product for insurance
          companies which is used by many insurance companies in Ukraine.
          <br />
          ProfITsoft currently focuses on outsourcing and outstaffing services
          for companies all around the world. In recent years the company has
          participated in complex international projects in different fields.
          <br />
          We also continue educating our own future experts. The company
          cooperates with several universities to find talented students and
          organize internships. We believe that ProfITsoft is one big family.
          <br />
          Non-stop improving the skills of our engineers is extremely important
          for us. We are confident that our team can deal with projects of any
          complexity.
          <br />
          By choosing ProfITsoft you choose high-quality expertise and a
          well-coordinated team of qualified specialists.
          <br />
          Be the best with ProfITsoft.
        </p>
      </div>
    </Container>
  );
};

export default About;
