# gestion-de-reclamos-consorcio-frontend
frontend con react.js de la app gestion de consorcios
frontEnd para gestionar reclamos de edificios pertenecientes a un consorcio

para que funcione la app se debe 
**bajar el repo gestion-de-reclamos-de-consorcios, corresponde al backend
**crear una imagen en docker con los siguientes datos: docker run --name sqlserver_developer -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=ROOTfancyPass25!" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
**correr el siguiente script en dataGrip para la base de datos sql server
**se pueden hacer pruebas en postman, dejare la coleccion en este repo con el siguiente nombre: administracion de reclamos.postman_collection (es necesario usar autorization para todos los endopoints que no pertenezcan al login, use basic auth, si corrio el script debe funcionar con estos datos Username: CPA3449614, Password: 123456)


