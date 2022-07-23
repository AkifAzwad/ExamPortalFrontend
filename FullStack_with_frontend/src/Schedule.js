import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap';
import DayTable from './components/DayTable';
import ListTable from './components/ListTable';


const week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
const events = ["event1", "event1", "event1", "event1"];


function Schedule() {

    const [isactive, setIsActive] = useState(false);

    return (


        // <Container className='m-5'>
        //     {!isactive && <Button onClick={() => setIsActive(true)}>Create table</Button>}
        //     {isactive && week.map((day, i) => (
        //         <DayTable key={i} dayName={day} events={["event1","event1","event1"]} />
        //     ))}
        // </Container>
        <Container className='m-5'>
            {!isactive && <Button onClick={() => setIsActive(true)}>Create table</Button>}
            {isactive && week.map((day, i) => (
                // <DayTable key={i} dayName={day} events={["event1","event1","event1"]} />
                <ListTable from="schedule" key={i} attr={day} value={events} />
            ))}
        </Container>

    )
}

export default Schedule