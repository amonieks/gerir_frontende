import React, { useState, useEffect } from 'react';
import {Container, Card, Form, Table, Button, InputGroup} from 'react-bootstrap'
import moment from moment;
const Tarefas = () => {
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [status, setStatus] = useState('');
    const [tarefas, setTarefas] = useState([]);


    useEffect(() => {
        listarTarefas();
    },[])

    const listarTarefas = () => {
        //Configuração do acesso fetch, Por padrão no fetch é o GET
        fetch('https://localhost:5001/api/tarefa',

        {
            method='Get',
            headers:{

                'authorization':'Bearer'+localStorage.getItem('token-gerir')
            }
        
        })      
        
        
            .then(response => response.json)
            .then(data => {
                setTarefas(data.data);
                console.log(data.data);
            })
    }

    const salvar = (event) =>{

        event.preventeDefautl();

        //cria o objeto tarefa
        const tarefa = {

            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            dataentrega: dataEntrega,
            status: status
        }

        const method =(id=== 0? 'Post':'Get');
        const urlRequest = (id===0? 'http://localhost:5000/api/tarefa':'http://locahost:5000/ape/tarefa'+id)

        fetch(urlRequest,{
            method:method,
            body:JSON.stringify(tarefa),
            headers: {
                'authorization':'Berer'*localStorage.getItem('tokem-gerir'),
                'content-type': 'application/jason'
            }
        
        })
        
        .then(dados=> {
            alert('tarefa salva');
            listarTarefas();

            limparCampos();

        } )
    }

    const editar = (event) =>{
        event.preventDefault();
        fetch('http://localhost:5000/api/tarefa/' + event.tarege.value,{
            method: 'Get',
            headers: {
                'authorization': 'bearer' + localStorage.getItem('token-gerir')

            }}
        )

        .then(response => response.json())
        .then(data =>
            {
                console.log(data);
          
                setId(data.id);
                setTitulo(data.titulo);
                setDescricao(data.setdescricao);
                setDataEntrega(moment(data.dataentrega.substring(0,10)));
                setStatus(data.status);
                
            })
        .catch(error=>{
            console.error(error);
        })
        
    }

    const limparCampos=() => {
        setId('');
        setTitulo('');
        setDescricao('');
        setDataEntrega('');
        setStatus(false);
    }

    const excluir = (event)=>{
        //impede atualização
        event.preventDefault();
        //parametros do fetch
        fetch('http://localhost:5000/api/tarefa',{
            //metodo(get,post,put,delet)
            method='Delete',
            //configurações  "headers"
            headers={
                'authorization':'Bearer'+localStorage.getItem('token-gerir')
            }

        } )
        //Exclusão do dados
            .then(response=> response.json())
            .them(data=>{
                alert('tarefaexluida!!!!!');

                listarTarefas();

            })


        
    }

    const alterarstatus= (event) =>{
        //impede atualização
        event.preventDefault();
        //parametros do fetch
        fetch('http://localhost:5000/api/tarefa/status',{
            //metodo(get,post,put,delet)
            method='Put',
            //configurações  "headers"
            headers={
                'authorization':'Bearer'+localStorage.getItem('token-gerir')
            }

        } )
        //Exclusão do dados
            .then(response=> response.json())
            .them(data=>{
                alert('tarefa alterada!!!!!');

                listarTarefas();

            })
    }

    return (
        <div>
            <Container>
                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Informe o título" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.value)}  placeholder="Informe a descrição" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control type="text" value={categoria} onChange={event => setCategoria(event.target.value)}  placeholder="Informe a categoria" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDataEntrega">
                                <Form.Label>Data Entrega</Form.Label>
                                <Form.Control type="date" value={dataEntrega} onChange={event => setDataEntrega(event.target.value)} placeholder="Informe a data de entrega" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicStatus">
                                <Form.Label>Status</Form.Label>
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox value={status} onChange={event => setStatus(event.target.value)} aria-label="Checkbox for following text input" />
                                </InputGroup.Prepend>
                            </Form.Group>
                            
                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Data Entrega</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tarefas.map((item,index)=>{
                                return(
                                <tr>
                                    <td>{item.titulo}</td>                                     
                                    <td>{item.descricao}</td>
                                    <td>{item.categoria}</td>
                                    <td>{item.dataentrega}</td>
                                    <td>{item.status?'Feito':'Para Fazer'}</td>

                                    <td>
                                        
                                        <Button variant ="warning" value={item.id} onClick={event=>editar(event)}>Editar</Button>
                                        <Button variant ="danger" value={item.id} onClick={event=>excluir(event)}>Excluir</Button>
                                        <Button variant ="primary" value={item.id}>Alterar Status</Button>
                                    </td>
                                    
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>               
        </div>
    )

}

export default Tarefas; 