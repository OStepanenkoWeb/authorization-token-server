## Установка проекта


Для установки проекта скопируйте репозиторий командой

``git clone https://github.com/OStepanenkoWeb/authorization-token-server.git```

Перейдите в каталог с скорированным кодом.

В корне проекта создайте файл .env и поместите в него переменные.

```dotenv
PORT=5000
MONGODB_URL=mongodb://mongo:27017/jwt
DB_NAME=my_db
JWT_ACCESS_SECRET=jwt-accsess-secret
JWT_REFRESH_SECRET=jwt-refresh-secret
SMTP_HOST=mail.mail.ru
SMTP_PORT=465
SMTP_USER=user@user.ru
SMTP_PASSWORD=123456
API_URL=http://localhost:5000
CLIENT_URL=
```
  **PORT:**

Порт по которому ваше приложение должно быть доступным.

**MONGODB_URL**

url для соединения с б/д Mongo.

**DB_NAME**

Название базы данных Mongo

**JWT_ACCESS_SECRET**

Атрибут хранения accsess secret ключа

**JWT_REFRESH_SECRET**

Атрибут хранения refresh secret ключа

**SMTP_HOST**

Хост почтового сервера от которого будут рассылаться ссылки для активации аккаунта

**SMTP_PORT**

Порт почтового сервера от которого будут рассылаться ссылки для активации аккаунта

**SMTP_USER**

Пользователь почтового сервера от которого будут рассылаться ссылки для активации аккаунта

**SMTP_PASSWORD**

Пароль пользователья почтового сервера от которого будут рассылаться ссылки для активации аккаунта

**API_URL**

Адрес и порт сервера на котором развернут сервис.

**CLIENT_URL**

Адрес и порт сервера на котором развернут фронтенд.

### Запуск сервиса c использованием Docker контейнера

Выпоните в корне проекта команду

```
docker-compose up
```
### Запуск сервиса c использованием npm

Выпоните в корне проекта команду

```
npm run start
```

### API сервиса

```
POST:  http://host:port/api/registration

body: {
    email: "mail@mail.com"
    password: "password"
}
```
Запрос регистрации нового пользователя.

```
POST:  http://host:port/api/login

body: {
    email: "mail@mail.com"
    password: "password"
}

response: {
    accessToken: "hkk21312fgkflk1231f2k3f12312f3k12f12",
    refreshToken: "awsqweq79qweqweq79qrqqrqwr68qw",
    user: {
        email: "mail@mail.com"
        id: "qwe21"
        isActivated: false
    
    }
}
```
Запрос на логин пользователя

```
POST:  http://host:port/api/logout

body: {}

response: {
    status: "logout success"
}
```
Запрос на релогин пользователя

```
GET:  http://host:port/api/activate/:link

params: {
    link: 'sdf2233442342342342sa'
}

redirect: CLIENT_URL
```

Активация учетной записи

```
GET:  http://host:port/api/refresh

response: {
        email: "mail@mail.com"
        id: "qwe21"
        isActivated: false
}
```

Обновление токена

```
AUTH
GET:  http://host:port/api/users

response: [
    users
]
```
Получение списка пользователей

