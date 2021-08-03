import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Button, Container, ListGroup } from "react-bootstrap";
import { useState } from "react";


const ItemLista = ({ onChange, onDelete, valor }) => {

    const [num, setNum] = useState(valor.initNumber)

    const handleAumentar = () => {
        setNum(num + 1)
        onChange("+", { ...valor, initNumber: num + 1 })
    }
    const handleDisminuir = () => {
        if (num === 0) return;
        setNum(num - 1)
        onChange("-", { ...valor, initNumber: num + 1 })
    }

    return <ListGroup horizontal="lg">
        <ListGroup.Item><Badge bg={num === 0 ? "warning" : "success"}>{num === 0 ? "zero" : num}</Badge></ListGroup.Item>
        <ListGroup.Item><Button onClick={handleAumentar} variant="outline-info">+</Button></ListGroup.Item>
        <ListGroup.Item><Button onClick={handleDisminuir} variant="outline-warning">-</Button></ListGroup.Item>
        <ListGroup.Item><Button onClick={() => { onDelete(valor.id, { ...valor, initNumber: num }) }} variant="outline-danger">delete</Button></ListGroup.Item>
    </ListGroup >
}


export default class App extends Component {

    state = {
        total: 0,
        lista: []
    };


    handleButton = () => {
        const newData = { initNumber: 0, id: this.state.lista.length }
        this.setState({ lista: [...this.state.lista, newData] })
    }

    handleChange = (operador, newva) => {
        if (operador === "+") {
            this.setState({ total: this.state.total + 1, lista: [...this.state.lista.filter(li => li.id !== newva.id), newva] })
        } else {
            this.setState({ total: this.state.total - 1, lista: [...this.state.lista.filter(li => li.id !== newva.id), newva] })
        }
    }

    handleDelete = (idDelete, rValue) => {
        this.setState({ lista: this.state.lista.filter(li => li.id !== idDelete), total: this.state.total - rValue.initNumber })
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
                    lista.map((valor, idx) => <ItemLista key={idx} onChange={this.handleChange} valor={valor} onDelete={this.handleDelete} />)
                }
            </ListGroup>
            <ListGroup horizontal>
                <ListGroup.Item>Total :</ListGroup.Item>
                <ListGroup.Item>{total}</ListGroup.Item>
            </ListGroup>
        </Container>
    }


}
