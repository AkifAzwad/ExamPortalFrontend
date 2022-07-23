import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import ListTable from './components/ListTable';

const events = ["event1", "event1", "event1", "event1"];

function EventOfDay() {
    const { dayName } = useParams()
    return (
        <Container className='m-5'>
            <div>{dayName}</div>

            {events.map((event, i) => (
                <ListTable from="eventOfDay" key={i} attr={event} />
            ))}
        </Container>
    )
}

export default EventOfDay