# SISGIU
Sistema de Gestion Academica y Administrativa


##  Instrucciones de Instalación
Crear un \[ambiente virtual\](https://virtualenv.pypa.io/en/latest/) con estos comandos

```bash
$ cd /<tu_ruta>/SISGIU/API SISGIU/
$ virtualenv env
$ env\Scripts\activate
$ # Para Linux usar: source .env/bin/activate # Esto activa tu ambiente virtual

```

Luego, instala las dependencias a través del archivo **API/requirements.txt** (El ambiente virtual debe estar activo)

  
```bash
(env)$ pip install -r API/requirements.txt

```

### Configuración de la Base de Datos

Cambiar la contraseña del usuario "postgres"

```SQL
ALTER USER postgres WITH PASSWORD '<nueva_contraseña>';

```

Creando la Base de Datos
```SQL
CREATE DATABASE sisgiu;

```

Ir a /<tu_ruta>/SISGIU/API SISGIU/API/API/settings.py e incluye tu configuracion de la base de datos

```
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'wallet',                      # database name
        'USER': 'postgres',                      # database user
        'PASSWORD': '<contraseña>',        # database password (La que colocaste en el paso anterior)
        'HOST': 'localhost',                     # database server
        'PORT': '5432'                           # database port
    }
}

```

Luego de configurarar la base de datos, corre las migraciones

```bash
(env)$ py manage.py makemigrations
(env)$ py manage.py migrate

```

### Corriendo la Aplicación
Primero, activa el ambiente virtual si no se encuentra activado, luego corre el servidor

```bash
$ env\Scripts\activate
(env) cd API
(env)$ py manage.py runserver

```

