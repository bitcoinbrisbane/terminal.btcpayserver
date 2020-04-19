import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TerminalButton = ({ number }) => {
    return <Button variant="primary" block>{ number }</Button>
}

export default TerminalButton;