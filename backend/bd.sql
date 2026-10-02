CREATE DATABASE exames;

USE exames;

CREATE TABLE exames (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente VARCHAR(100) NOT NULL,
    tipo_exame VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pendente'
);
