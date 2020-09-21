const listaPizzas = require('../database/listaPizzas.json');
const fs = require('fs');
const path = require('path');

const pizzaController = {
    index: (req, res) => {
        res.render('index', { listaPizzas });
    },
    show: (req, res) => {
        let pizzaId = req.params.id;
        let pizza = listaPizzas.find(pizzaEncontrada => pizzaEncontrada.id == pizzaId );
        res.render('pizza', {pizza});
    },
    create: (req, res) => {
        res.render('create-pizza');
    },
    store: (req, res) => {
        let {nome, ingredientes, preco, img} = req.body;
        ingredientes = ingredientes.split(',');
        let id = listaPizzas.length + 1;
        listaPizzas.push({
            id: id,
            nome,
            preco,
            img: img,
            ingredientes
        });
        fs.writeFileSync(path.join('database', 'listaPizzas.json'), JSON.stringify(listaPizzas));
        res.redirect('/');
    },
    edit: (req, res) => {
        let pizzaId = req.params.id;
        let pizzaEditar = listaPizzas.find( pizza => pizza.id == pizzaId);
        res.render('edit-pizza', {pizzaEditar});
    },
    update: (req, res) => {
        let {nome, ingredientes, preco, img} = req.body;
        let pizzaId = req.params.id;
        ingredientes = ingredientes.split(',');
        let pizzaEditar = listaPizzas.find( pizza => pizza.id == pizzaId);
        pizzaEditar.nome = nome;
        pizzaEditar.ingredientes = ingredientes;
        pizzaEditar.preco = preco;
        pizzaEditar.img = img;
        fs.writeFileSync(path.join('database', 'listaPizzas.json'), JSON.stringify(listaPizzas));
        let rota = '/pizza/' + pizzaId;
        res.redirect(rota);
    }
}

// index – Lista os dados da tabela
// show – Mostra um item específco
// create – Retorna a View para criar um item da tabela
// store – Salva o novo item na tabela
// edit – Retorna a View para edição do dado
// update – Salva a atualização do dado
// destroy – Remove o dado

module.exports = pizzaController;