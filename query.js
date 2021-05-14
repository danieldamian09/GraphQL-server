// ----------------------------Primera Query-------------------------

query obtenerUnCurso($cursoID: Int!){
    curso(id: $cursoID){
        titulo
        autor
        tema
        url
    }
}

{
    "cursoID": 3

}

// ----------------------------Segunda Query-------------------------

query obtenerCursos($temaCurso: String!){
    cursos(tema: $temaCurso){
        titulo
        autor
        url
    }
}

{
    "temaCurso": "Javascript"
}

// -------------------------Fragmentios para poder definir nuestra propia arquitectura de consulta

query consultaCursosFragmantos($curso1ID: Int!, $curso2ID: Int!){
    curso1: curso(id: $curso1ID){
    ...camposCurso
    }

    curso2: curso(id: $curso2ID){
    ...camposCurso
    }
}

fragment camposCurso on Curso {
    titulo
    autor
    tema
    url
}

{
    "curso1ID": 3,
    "curso2ID": 1

}
