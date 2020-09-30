const user = require('../database/User.json');
const fs = require('fs');
const path = require('path');
const listaPizzas = require('../database/listaPizzas.json');

const UserController = {
    index: (req, res) => {
        res.render('menu-user', {listaPizzas});
    },
    create: (req, res) => {
        res.render('create-user');
    },
    store: (req, res) => {
        let {nome, email, senha, conf} = req.body;
        user.push({
            img: '',
            nome: nome,
            email: email,
            senha: senha,
            conf: conf
        });
        console.log(user);
        fs.writeFileSync(path.join('database', 'User.json'), JSON.stringify(user));
        res.redirect('/user/cadastro');
    },
    show: (req, res) => {
        res.render('login');
    },
    login: (req, res) => {
        let {email, senha} = req.body;
        let usuario = user.find( usuario => {
            return usuario.email == email
        });
        if (usuario.email == email && usuario.senha == senha) {
            req.session.user = usuario;
            return res.redirect('/');
        } else {
            res.send("voce nao esta autorizado");
        }
    }
}

module.exports = UserController;