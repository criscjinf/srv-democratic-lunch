# srv-democratic-lunch
>> Serviço responsavel por notificar usuários sobre início de uma votação, finalizar a votação no horário agendado através da api e notificar os usuário por e-mail

## Requisitos de sistema
```
Node v12.18.2
```

## Bibliotecas utilizados
```
Production
    sucrase
    config
    axios
    nodemailer
    express

Development
    jest
    nodemon
    faker-br
    supertest
```

## Instalar dependências
```
npm install
```

### Rodar em ambiente de desenvolvimento
```
npm run dev
```

### Rodar em ambiente de produção
```
npm start
```

### Para rodar testes unitários
```
npm test
```

### Parâmetros
```
service:
  interval: tempo em segundos entre checagem da hora do fim da votação 
api:
  uri: endereço base da api
mail: configurações do e-mail que realiza a de notificação do inicio e fim da votação aos usuários
  host: 'smtp.office365.com'
  port: '587'
  user: 'democraticlunch@outlook.com'
  pass: 'DBServer123456'
```


## Vale destacar
| Classe | Destaque |
| - | - |
| index | Fica aguardando uma votação começar para notificar os usuários  através de 2 loops interligados |
| controllers/process-voting | Notifica o inicio da votação, aguarda o horário de finalizar, chama a api para encerramento e dispara o processo de notificação do usuário, esta é a classe central do serviço |
| mail-sender | Responsavel pelo envio de fato do e-mail utilizando o componente nodemailer |
| services | São os serviços de consumo da api |


## Evolução do serviço
Poderia ser implementada a opção de envio de SMS junto ao serviço dando uma segunda opção de notificação