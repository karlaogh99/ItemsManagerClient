# Manual de Usuario - Items Manager

## Introducción

Bienvenido/a a Items Manager. Este manual de usuario te guiará a través de las funciones principales de la aplicación y cómo utilizarlas de manera efectiva.
Primero, debemos tener en cuenta que esta es la parte del cliente, por lo que debes inicializar primero el servidor, que lo encontrarás en el siguiente enlace: https://github.com/karlaogh99/ItemsManagerServer

## Contenido

### 1. Iniciar Sesión

- Abre la aplicación Items Manager.
- Busca el botón "Login"
- En la página de inicio de sesión, ingresa tu nombre de usuario y contraseña.
![Login](https://github.com/karlaogh99/ItemsManagerClient/blob/main/capturas/Captura_login.PNG)
- Haz clic en el botón "Sign in" para acceder a tu cuenta.
- También tienes la opción de registrarte.


### 2. Interfaz Principal

Una vez que hayas iniciado sesión, serás llevado/a a la interfaz principal de la aplicación. Aquí encontrarás las siguientes secciones:

- **Items List**: Aquí veremos la lista de items.
- **User Management** (solo admin): Aquí veremos la lista de usuarios.
- **Info SQL** (solo admin): Aquí veremos 2 listas personalizadas.

### 3. Items List
![List User](https://github.com/karlaogh99/ItemsManagerClient/blob/main/capturas/Captura_user_items.PNG)
- Aquí podrás ver todos los Items tanto los activos como los inactivos, además tenemos la opción de filtrarlos.
- Tenemos un botón "Create New Item" con el que crearemos un item nuevo.
- De cada item, tenemos la opción de ver detalles, editar el item, añadir supplier y price reduction.
- Si está activado el item y queremos desactivarlo, debemos ir a editar item, y dentro tendremos la opción de desactivar y debemos poner la razón. 
- Al añadir un supplier, te muestra solo los supplier que no están relacionados ya con el item.
- Si el usuario es un admin, podrá moverse a la pantalla de "Users Management" e "info" desde esta pantalla.


### 4. User Management
![User list](https://github.com/karlaogh99/ItemsManagerClient/blob/main/capturas/Captura_admin_users.PNG)
- Función solo habilitada a usuarios de tipo admin.
- Podemos ver la funcionalidad de crear usuarios nuevos. 
- Lo siguiente que vemos son los botones para ir a la lista de items, o ir a la consultas sql personalizadas.
- Por último veremos la lista de usuarios que están creados con la opción de eliminar el que no nos intere.

### 5. Info SQL

- Función solo habilitada a usuarios de tipo admin.
- Desde aquí veremos 2 listas, la primera muestra el item mas barato por supplier, osea el item más barato que tiene cada proveedor.
- La segunda lista, muestra todos los proveedores que tienen al menos 1 reducción de precio en alguno de sus productos

### 6. Cerrar Sesión

- Para cerrar sesión, haz clic en "Logout" en la esquina superior derecha de la pantalla.


## Soporte Técnico

Si encuentras algún problema o necesitas asistencia adicional, no dudes en contactar a nuestro equipo de soporte técnico en carlosgarciahernandez1999@gmail.com

¡Gracias por usar Items Manager! Esperamos que esta aplicación te ayude a lograr tus objetivos de manera eficiente y efectiva.
