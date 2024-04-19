# BackendChallenge

## Requisitos previos

Asegúrate de tener instalado Node.js y un gestor de bases de datos SQL (como MySQL, PostgreSQL, etc.) en tu sistema. También necesitarás tener `npm` o `yarn` para manejar las dependencias del proyecto.

### Versiones recomendadas:
- Node.js: 14.x o superior
- NPM: 6.x o superior
- MySQL: 8.x o PostgreSQL: 12.x (ajusta según tu gestor de base de datos)

## Configuración del entorno

Para configurar el entorno necesario para ejecutar la aplicación, sigue estos pasos:

1. Clona el repositorio:
git@github.com:CS-Leslie/BackendChallenge.git

Ingresa a la carpeta con cd BackendChallenge


2. Instala las dependencias del proyecto:

npm install


3. Configura las variables de entorno necesarias para conectar con la base de datos y otras configuraciones necesarias. Crea un archivo `.env` en la raíz del proyecto y ajusta las siguientes variables:

Busca el archivo .env.example y copia en un .env


## Iniciar la base de datos

Asegúrate de que tu servicio de base de datos esté en ejecución y de que has creado la base de datos especificada en tu archivo `.env`.

Puedes inicializar la estructura de tu base de datos ejecutando scripts SQL para crear tablas y otros objetos de base de datos necesarios. Aquí deberías incluir instrucciones específicas o un archivo SQL que se pueda ejecutar para configurar todo.

## Cómo correr la aplicación

Para iniciar la aplicación en modo desarrollo, usa el siguiente comando:

npm run dev


Esto iniciará el servidor usando `nodemon`, lo que permite que el servidor se reinicie automáticamente al hacer cambios en el código.

## Ejecutar pruebas

Para correr las pruebas de tu aplicación, ejecuta:

npm run test


Este comando utilizará Jest para ejecutar las pruebas y proporcionará un informe de cobertura.

## Despliegue



Para más información, consulta la documentación de cada una de las herramientas y tecnologías utilizadas.
