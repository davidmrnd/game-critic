# GameCriticAngular

## Integrantes del grupo
- David Miranda Campos
- Esteban Trujillo Santana
- Alejandro Guerra Jimenez

## Estructura del código del proyecto web

El proyecto está organizado en una estructura modular basada en Angular. A continuación, se describe la funcionalidad de los principales componentes y módulos:

### Componentes principales
- **HeaderComponent**: Barra de navegación principal con enlaces y buscador.
- **FooterComponent**: Contiene enlaces a redes sociales y menciones legales.
- **WelcomeComponent**: Introducción al portal con descripción y logo.
- **CarouselComponent**: Carrusel de videojuegos categorizados.
- **ProfileComponent**: Información detallada de un perfil (usuario o videojuego).
- **SocialstatsComponent**: Estadísticas sociales como seguidores y valoraciones.
- **CommentariesComponent**: Lista de comentarios realizados por usuarios.
- **NewcommentComponent**: Permite añadir, modificar o eliminar comentarios.
- **RegistrationComponent**: Formulario de registro de usuarios.
- **LoginComponent**: Permite iniciar sesión en la plataforma.

### Páginas principales
- **HomePageComponent**: Página de inicio con carrusel de novedades.
- **CategoriesPageComponent**: Carruseles de videojuegos por categorías.
- **VideogamePageComponent**: Perfil de un videojuego con comentarios y valoraciones.
- **UserPageComponent**: Perfil de usuario con estadísticas sociales.
- **FollowingPageComponent**: Comentarios recientes de usuarios seguidos.
- **NewcommentPageComponent**: Página para añadir o editar comentarios.
- **LoginPageComponent**: Página de inicio de sesión.
- **RegisterPageComponent**: Página de registro de usuarios.

## Estructura de los datos en Firebase

Los datos se almacenan en Firebase Firestore y están organizados en las siguientes colecciones:

### Colecciones principales
1. **users**
   ```json
   {
     "id": "userId",
     "email": "user@example.com",
     "name": "Nombre del Usuario",
     "username": "nombreUsuario",
     "profileicon": "ruta/a/icono.png",
     "followers": ["userId1", "userId2"],
     "following": ["userId3", "userId4"],
     "description": "Descripción del usuario",
     "createdAt": "2023-01-01T00:00:00Z"
   }
   ```

2. **videogames**
   ```json
   {
     "id": "videogameId",
     "title": "Título del videojuego",
     "category": ["Acción", "Aventura"],
     "image": "ruta/a/imagen.png",
     "description": "Descripción del videojuego",
     "rating": 4.5
   }
   ```

3. **comments**
   ```json
   {
     "id": "commentId",
     "userId": "userId",
     "videogameId": "videogameId",
     "content": "Este juego es increíble.",
     "rating": 5,
     "createdAt": "2023-01-01T12:00:00Z"
   }
   ```

### Relaciones entre colecciones
- **users** → **comments**: Cada usuario puede tener múltiples comentarios asociados.
- **videogames** → **comments**: Cada videojuego puede tener múltiples comentarios asociados.
- **users** → **users**: Los usuarios pueden seguir a otros usuarios mediante las listas `followers` y `following`.
