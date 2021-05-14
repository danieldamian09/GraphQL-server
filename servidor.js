// incializar express
const express = require('express');
const app = express();

// integracion de express con grphQL
const { graphqlHTTP } = require('express-graphql');
// Para utilizar los esquemas de grphQL
const { buildSchema, graphql } = require('graphql');

// data
const { cursos } = require('./data.json');
// console.log(cursos);

// para poder construir el esquema
const schema = buildSchema(`
    type Query {
        curso(id: Int): Curso
        cursos(tema: String): [Curso]
    }

    type Mutation{
        actualizarTemaCurso(id: Int!, tema: String!): Curso
    }

    type Curso {
        id: Int
        titulo: String
        autor: String
        tema: String
        url: String
    }

`);

let getCurso = (argumentos) => {
    let id = argumentos.id;
    return cursos.filter(cursos => {
        return cursos.id == id;
    })[0]
}

let getCursos = (argumentos) => {
    if (argumentos.tema) {
        let tema = argumentos.tema;
        return cursos.filter(cursos => cursos.tema === tema);
    } else {
        return cursos;
    }
}

let actualizarTemaCurso = ({ id, tema }) => {
    cursos.map(curso => {
        if (curso.id === id) {
            curso.tema = tema;
            return curso;
        }
    })
    return cursos.filter(curso => curso.id === id)[0];
}

const root = {
    curso: getCurso,
    cursos: getCursos,
    actualizarTemaCurso: actualizarTemaCurso
}

// Creamos una ruta o middleware para integrar los dos modulos:
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))




// servidor
app.listen(3000, () => console.log('servidor en el puerto 3000'));