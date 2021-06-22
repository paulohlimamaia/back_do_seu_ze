# Descrição

### Projeto backend do seu Zé.

# Requisitos

```bash
- Docker
- Docker Compose
- NodeJS
```

# Rodando

```bash
$ git clone https://github.com/paulohlimamaia/back_do_seu_ze.git

$ cd back_do_seu_ze/

$ docker-compose up -d
```

### O projeto estará disponível em http://localhost:3000/ após poucos minutos.

#### Caso deseje acompanhar os logs de inicialização, basta rodar o comando abaixo:
```bash
$ docker logs -f back_ze
```

# Observações

```
Os containers referentes ao RabbitMQ e ao serviço de estoque do seu Zé já estão incluídos dentro do mesmo ambiente do projeto.
```

# License

[MIT licensed](LICENSE).
