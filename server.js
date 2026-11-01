const express = require("express");

const app = express();

const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pruebauno"
});

conexion.connect((error) => {
    if (error) {
        console.log("Error de conexión:", error);
    } else {
        console.log("Conectado a MySQL");
    }
});

app.use(express.urlencoded({ extended: true }));

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/estudiantes", (req, res) => {
    res.render("estudiantes");
});

app.get("/inscripcion", (req, res) => {
    res.render("inscripcion");
});

app.post("/guardarEstudiante", (req, res) => {

    console.log("ENTRÓ A ESTUDIANTE");
    console.log(req.body);

    const { nombre, apellido, rut, correo, carrera } = req.body;

    const sql = `
        INSERT INTO estudiantes
        (nombre, apellido, rut, correo, carrera)
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [nombre, apellido, rut, correo, carrera],
        (error, resultado) => {
            if (error) {
                console.log("ERROR:", error);
                res.send("Error al guardar estudiante");
            } else {
                console.log("INSERT OK:", resultado);
                res.send("Estudiante registrado correctamente");
            }
        }
    );

});

app.post("/guardarInscripcion", (req, res) => {

    console.log("ENTRÓ A INSCRIPCIÓN");
    console.log(req.body);

    const {
        curso,
        codigo,
        semestre,
        seccion,
        estudiante
    } = req.body;

    const sql = `
        INSERT INTO inscripciones
        (curso, codigo, semestre, seccion, estudiante)
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [curso, codigo, semestre, seccion, estudiante],
        (error, resultado) => {
            if (error) {
                console.log("ERROR:", error);
                res.send("Error al registrar inscripción");
            } else {
                console.log("INSERT OK:", resultado);
                res.send("Inscripción registrada correctamente");
            }
        }
    );

});

app.listen(3050, () => {
    console.log("Servidor ejecutándose en http://localhost:3050");
});