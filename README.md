Node 16
npm 8.1.2

Clonez le projet 
Pour lancer le serveur : docker-compose up -d
Configurez également votre .env inspirer du .env.example

Placez vous dans le container mysqldb et 
faites mysql -u root -p votre-database-name < docker-entrypoint-initdb.d/create_client.sql
Crée une base de donnée avant.

Pour connaitre l'ip de l'app faites docker inspect app | grep IPAddress
Installez Postman pour la partie 2 pour gérer les clients

POST IPAddress:votre_port/client/create => le body à envoyer dans la requête doit contenir en JSON => { name: name,description: description }

GET IPAddress:votre_port/client/clients

DELETE IPAddress:votre_port/client/delete => le body à envoyer dans la requête doit contenir en JSON => body { name: name }

PUT IPAddress:votre_port/client/update =>  le body à envoyer dans la requête doit contenir en JSON => body { name: name,description: description, newName: newName }

Si la database n'est pas crée, faites docker-compose exec mysqldb bash puis mysql -u root -p tapez password et ensuite CREATE DATABASE votre-db-name;
Ensuite docker-compose up --build --force-recreate --no-deps -d app

Si vous avez cette erreur "Client does not support authentication protocol requested by server; consider upgrading MySQL client"
connectez vous à la db - >docker-compose exec mysqldb bash puis mysql -u root -p tapez password
et ensuite faites ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
et ensuite tapez flush privileges;
Ensuite docker-compose up --build --force-recreate --no-deps -d app
