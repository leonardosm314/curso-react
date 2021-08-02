import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Button, Container, ListGroup } from "react-bootstrap";
import { useState } from "react";


const ItemLista = ({ initNumber, onChange }) => {

    const [num, setNum] = useState(initNumber)

    const handleAumentar = () => {
        setNum(num + 1)
        onChange(1, "+")
    }
    const handleDisminuir = () => {
        if (num === 0) return;
        setNum(num - 1)
        onChange(1, "-")
    }

    return <ListGroup horizontal="lg">
        <ListGroup.Item><Badge bg={num === 0 ? "warning" : "success"}>{num === 0 ? "zero" : num}</Badge></ListGroup.Item>
        <ListGroup.Item><Button onClick={handleAumentar} variant="outline-info"> Aumentar</Button></ListGroup.Item>
        <ListGroup.Item><Button onClick={handleDisminuir} variant="outline-warning"> Disminuir</Button></ListGroup.Item>
    </ListGroup >
}


export default class App extends Component {

    state = {
        total: 0,
        lista: []
    };


    handleButton = () => {
        const newData = { initNumber: 0 }
        this.setState({ lista: [...this.state.lista, newData] })
    }

    handleChange = (numberItem, operador) => {
        if (operador === "+") {
            this.setState({ total: this.state.total + numberItem })
        } else {
            this.setState({ total: this.state.total - numberItem })
        }
    }

    render() {
        const { total, lista } = this.state
        return <Container>

            <ListGroup horizontal="xl">
                <ListGroup.Item>Agregar Item</ListGroup.Item>
                <ListGroup.Item><Button onClick={this.handleButton} variant="primary">ADD</Button></ListGroup.Item>
            </ListGroup>
            <ListGroup >
                {
                    lista.map((valor, idx) => <ItemLista key={idx} onChange={this.handleChange} {...valor} />)
                }
            </ListGroup>
            <ListGroup horizontal>
                <ListGroup.Item>Total :</ListGroup.Item>
                <ListGroup.Item>{total}</ListGroup.Item>
            </ListGroup>
        </Container>
    }


}
