# lambda-test-proxy

## Configuracion en AWS

- Crear lambda normal, crear aliases, agregar layer, vpc, etc etc etc (cualquier lambda puede ser proxy)
- Crear recurso en apigateway sin metodos (base)
- Crear otro recurso bajo ese (proxy)
![image](https://user-images.githubusercontent.com/82911801/164067347-c70de485-33b0-4e62-a251-667dc456f1fe.png)

- Check proxy resource
![image](https://user-images.githubusercontent.com/82911801/164067468-57d5ccaa-87dc-45a4-a97c-d3b63f0c388d.png)

- crear metodos ANY para los 2 recursos

![image](https://user-images.githubusercontent.com/82911801/164074787-c6f53fb5-a516-49d6-b449-7ee0a72188f7.png)

![image](https://user-images.githubusercontent.com/82911801/164074886-fd746b00-9b0d-4548-98ac-858d3a9273dd.png)

- Se debe ver asi (el nombre del recurso proxy puede ser el que sea siempre que se haya registrado la ruta como {NOMBRE+}

![image](https://user-images.githubusercontent.com/82911801/164075046-a746d068-b3a5-4c3f-8e63-e8cd84e7b807.png)

- registrar lambda como proxy en ruta base `NOMBRE_DE_LAMBDA:${stageVariables.env}` **Use Lambda Proxy integration** 

![image](https://user-images.githubusercontent.com/82911801/164075371-dd4109d1-f5ea-49cb-a8ff-5c1e95219d0e.png)

- registrar lambda en ruta proxy `NOMBRE_DE_LAMBDA:${stageVariables.env}`

![image](https://user-images.githubusercontent.com/82911801/164079802-1a145d77-8b4b-4306-95cd-75e1c8c3958d.png)

- Correr comandos de pop-up para permisos de apigateway en prod y dev para ambas integraciones (4 comandos total)
![image](https://user-images.githubusercontent.com/82911801/164076625-66446d63-322a-4491-903c-45abbe949d60.png)

- Hacer deploy del API

## Configuracion del proyecto / terraform
- Clonar repo y copiar archivo a tu carpeta donde vas a trabajar o lo que sea no se, puedes hacer lo que quieras con el, cambiale el nombre o algo y ponlo donde va, no me pregunten sobre este paso.
- `npm install`

- Cambiar nombre en package.json (solo minusculas, separar con guiones)

![image](https://user-images.githubusercontent.com/82911801/164069250-4aa52ca7-fbb1-4ed6-b784-f6641b26294c.png)

- editar `config.auto.tfvars` cambiar el valor de `function_name` por el nombre de tu lambda.

![image](https://user-images.githubusercontent.com/82911801/164080204-3d930aa0-cc77-4025-9d36-27a896f34527.png)


- Editar src/index.ts para agregar la ruta base (debe ser la misma que declaraste en API Gateway, NO ES EL NOMBRE DEL LAMBDA)
- 
![image](https://user-images.githubusercontent.com/82911801/164084159-3175c097-3dd3-4feb-a0cb-88f7d2aa43f3.png)


- cambiarse a la carpeta de terraform, correr script de init `./init.ps1 dev`
- regresar a la carpeta anterior
- `npm run deploy` para compilar TS y subir con terraform

``` 
> cd terraform
> ./init.ps1 dev
> cd ..
> npm run deploy
```

Si todo salio bien el API debe contestar a la ruta base y a la ruta base + /test.

## Para agregar dependencias
En realidad solo deberias agregar dependencias para tener intelisense y tipados de los paquetes que usa el lambda, todas las dependencias van aca https://github.com/Juan-DeLeon/nodejsDependenciesLayer
