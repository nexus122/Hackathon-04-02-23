# Hackathon-04-02-23

>Proyecto donde nos conectamos a la api de unsplash y cargamos imagenes en diferentes preguntas.
Para este proyecto he seleccionado Angular, que es el framework con el que trabajo a diario y me siento mas comodo.
Para empezar he tenido que crearme una cuenta en Unspash para acceder a la api, y firmar las peticiónes con un token.

Despues he recogido esas peticiónes con un fetch, y las he transformado en un observable para poder consumirlas desde el frontend.
He utilizado dos variables importantes:
1. **page** => Numero de pagina actual
2. **per_page** => Numero de imagenes que queremos cargar por pagina

Para que el boton pueda cargar mas imagenes he creado un metodo que antes de hacer la llamada modifica el valor de **page** a *page + 1*
De esta manera vuelve a hacer la petición cargando las siguientes **per_page** imagenes

Para que las imagenes se dividan al igual que en figma, obtengo todos los datos y nos divido en un numero x de arrays:
1. Si el ancho de la pantalla es PC 1024px - Tiene 3 columnas
2. Si el ancho de pantalla es Tablet 768px - Tiene 2 columnas 
3. Si el ancho de pantalla es Movil 425px  - Tiene 1 columna

Se crea un array con distintas array en funcion al numero de columnas, y se dividen los elementos en estas arrays.
``` TS
splitArray(originalArray: Array<any>, parts: number) {
    const arrays = [];
    const chunkLength = Math.floor(originalArray.length / parts);

    for (let i = 0; i < parts; i++) {
      if (i === parts - 1) {
        arrays.push(originalArray.slice(i * chunkLength));
      } else {
        arrays.push(
          originalArray.slice(i * chunkLength, (i + 1) * chunkLength)
        );
      }
    }

    return arrays;
  }
```

## ScreenShot
![descarga](https://user-images.githubusercontent.com/22988550/216824487-60c876a3-5a67-4842-ad17-ff47de346a40.jpg)

## Installation
1. Clonar el proyecto
```shell
    # Clone or install commands
    npm clone https://github.com/nexus122/Hackathon-04-02-23
```
2. Ejecuta el comando npm i
3. Ejecuta el comando ng serve
## Reconocimientos 
- [Unsplash](https://unsplash.com/es)

## Contact info
> [Linkedin](https://www.linkedin.com/in/jromero-frontend-developer/) || [Github](https://github.com/nexus122)
