import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap';
import ListTable from './ListTable';
function DayTable({ dayName, events }) {
    return (
        <ListTable attr={dayName} value={events} />
    )
}

export default DayTable