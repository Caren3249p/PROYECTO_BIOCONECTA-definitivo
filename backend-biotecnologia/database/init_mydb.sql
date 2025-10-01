CREATE DATABASE IF NOT EXISTS mydb DEFAULT CHARACTER SET utf8;
USE mydb;
CREATE USER IF NOT EXISTS 'biotec'@'%' IDENTIFIED BY 'oki31xdc!#biotec';
CREATE USER IF NOT EXISTS 'agro'@'%' IDENTIFIED BY 'oki31xdc!#agro';
CREATE USER IF NOT EXISTS 'automat'@'%' IDENTIFIED BY 'oki31xdc!#automat';
CREATE USER IF NOT EXISTS 'energias'@'%' IDENTIFIED BY 'oki31xdc!#energias';
CREATE USER IF NOT EXISTS 'smartcities'@'%' IDENTIFIED BY 'oki31xdc!#smart';

GRANT ALL PRIVILEGES ON mydb.* TO 'biotec'@'%';
GRANT ALL PRIVILEGES ON mydb.* TO 'agro'@'%';
GRANT ALL PRIVILEGES ON mydb.* TO 'automat'@'%';
GRANT ALL PRIVILEGES ON mydb.* TO 'energias'@'%';
GRANT ALL PRIVILEGES ON mydb.* TO 'smartcities'@'%';

FLUSH PRIVILEGES;
