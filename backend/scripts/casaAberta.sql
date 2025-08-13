/* -------------------- CRIAR BANCO DE DADOS -------------------- */
CREATE DATABASE casaAberta;
USE casaAberta;


/* -------------------- TABELAS -------------------- */

/* ---------- ✅ presencas (registro da presença no evento) ---------- */
CREATE TABLE presencas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  cpf CHAR(14) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedbacks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  estrelas INT NOT NULL CHECK (estrelas BETWEEN 1 AND 5),
  comentario TEXT,
  ip VARCHAR(45),
  data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
);

/* -------------------- TESTAR CONEXÃO COM O WORKBENCH -------------------- */
/* ---------- executar consultas para listar os dados inseridos ---------- */

SELECT * FROM presencas;
DESCRIBE presencas;

SELECT * FROM feedbacks;
DESCRIBE feedbacks;