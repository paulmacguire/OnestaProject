# Pasos implementados

Pude implementar casi todo lo que se pedía, esto era:

* Frutas y sus distintos tipos de variedades. 
* Cosechas.
* Agricultores y sus distintos campos.
* Clientes.


# Pasos no implementados

No pude implementar la parte de *"También debe incluir una ruta para crear nuevas cosechas usando la información disponible."*, ya que no sabía exactamente como querían que lo implementara, no sabía si tenía que modificar la API o mandarle esa información en método POST a una BDD, así que decidí no implementarla.

# Funcionamiento de la página

* En la primera parte, en el apartado de *frutas*, tuve que poner una foto por default para todas las frutas, ya que no encontré una API que me diera fotos de frutas, así que decidí poner una foto por default para todas las frutas.

* En la segunda parte, en el apartado de *growers*, si uno selecciona un grower en específico, se desplegará a la derecha toda la información asociada a ese grower en particular.

* En la tercera parte, en el apartado de *cosechas*, solo implementé una tabla que permitía ver toda la información asociada a una cosecha en particular.

* En la última parte, en el apartado de *clientes*, implementé para que se puedan ver todas las cosechas asociadas a los clientes, junto a los commodities, farms, growers,y varieties de las frutas.

# Consideraciones generales

* En la documentación de Figma que me dieron, no pude hacer tal cual las tablas o ciertos elementos que se habían establecido con un formato en particular, espero aprender acerca de eso. Sin embargo, pude hacer algo parecido a lo que se pedía y logré utilizar las fonts que ustedes utilizan, solo que no pude descargarlas directamente de la documentación que me entregaron, ya que me solicitaba un permiso que yo no tenía.

* Otra consideración es que, no se por qué, pero cuando creaba el proyecto con `npx create-next-app --tailwind with-tailwindcss-app`, se me creaba la carpeta `with-tailwindcss-app` como raiz del proyecto y no supe como cambiarlo. También no se me creaba la carpeta `pages`. Toda la app la realicé en el archivo `src/app/page.tsx`

# Bugs

* Tuve algunos bugs por no estar tan familiarizado con Next.js, pero pude solucionarlos. Uno de ellos era agregar en la primera línea del código `use-client`, el cual me permitía utilizar los hooks de React, ya que sin eso no podía utilizarlos.

* Otro bug que tuve pero que no logré solucionar era el de:

``` 
Unhandled Runtime Error
Error: Hydration failed because the initial UI does not match what was rendered on the server.

Warning: Expected server HTML to contain a matching <table> in <div>.

See more info here: https://nextjs.org/docs/messages/react-hydration-error
```

Si bien este error no me impedía seguir trabajando, me molestaba que estuviera ahí pero no pude arreglarlo.

# Para correr la aplicación

```
yarn
```
```
yarn dev
```