Node 16
npm 8.1.2

Clone le projet 
Pour lancer le serveur : docker-compose up -d

Rendez à l'adresse 172.30.0.3:votre_port pour télécharger le csv
Pour connaitre l'ip de l'app faites docker inspect app | grep IPAddress
Installez Postman pour la partie 2 pour gérer les clients

172.30.0.3:votre_port/client/create => le body à envoyer dans la requête doit contenir en JSON => { name: name,description: description }

172.30.0.3:votre_port/client/clients

172.30.0.3:votre_port/client/delete => le body à envoyer dans la requête doit contenir en JSON => body { name: name }

172.30.0.3:votre_port/client/update =>  le body à envoyer dans la requête doit contenir en JSON => body { name: name,description: description, newName: newName }

Si la database n'est pas crée, faites docker-compose exec mysqldb bash puis mysql -u root -p tapez password et ensuite CREATE DATABASE votre-db-name;
Ensuite docker-compose up --build --force-recreate --no-deps -d app

Si vous avez cette erreur "Client does not support authentication protocol requested by server; consider upgrading MySQL client"
connectez vous à la db - >docker-compose exec mysqldb bash puis mysql -u root -p tapez password
et ensuite faites ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
et ensuite tapez flush privileges;
Ensuite docker-compose up --build --force-recreate --no-deps -d app
