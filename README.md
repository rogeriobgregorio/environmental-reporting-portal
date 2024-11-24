# Environmental Reporting Portal
[![Status](https://img.shields.io/badge/Status-Concluído-brightgreen.svg)](https://github.com/seu-usuario/seu-projeto)

O **Environmental Reporting Portal** é uma Aplicação Web robusta, para um Portal de Denúncias Ambientais, que permite 
reportar situações que prejudicam o meio ambiente. Construída em Java e Ecossistema Spring, prioriza código limpo e implementação 
de princípios SOLID, além de Design Patterns para criar um software flexível, escalável e de fácil manutenção.
Utiliza tecnologias como JWT, JUnit, Mockito e log4j2 para garantir a qualidade e eficiência do sistema.

#### Assista ao vídeo demonstrativo: https://youtu.be/aoaOdXzpXEY

## Problema a ser resolvido:
Este software visa resolver a falta de um canal seguro, eficiente e organizado para a denúncia e o monitoramento de 
problemas ambientais, proporcionando uma plataforma acessível para cidadãos e autoridades reportarem e acompanharem 
questões que afetam o meio ambiente, como poluição e infrações ambientais, com funcionalidades que garantem transparência, 
segurança e gestão eficaz das denúncias.

## Principais funcionalidades:
- Login seguro com JWT.
- Postagem de denúncias com fotos.
- Cadastro de Usuários e Administradores.
- Opção de comentar postagens de denúncias.
- Envio de e-mail ao usuário com atualizações de status.
- Classificação das denúncias por gravidade, tipo e status.
- Relatórios gráficos para acompanhamento de estatísticas.

## Modelo Conceitual

**Diagrama Entidade-Relacionamento**
![diagram-der](https://github.com/rogeriobgregorio/environmental-reporting-portal/raw/main/diagrams/diagram-der.png)

## Stack utilizada

**Back-end:**
- Java 17
- Spring Boot
- Spring Data MongoDB
- Spring Security
- JWT

**Front-end:**
- HTML5
- CSS3
- Javascript

**Banco de Dados:**
- MongoDB
- MongoDB Compass

## Rodando localmente

Siga as etapas abaixo para configurar e executar o projeto Java com Spring localmente:

1. Certifique-se de ter o Java 17 JDK instalado. Caso não tenha, faça o download e a instalação a partir do site oficial da Orecle.

2. Clone o repositório do projeto:
```bash
  git clone https://github.com/rogeriobgregorio/environmental-reporting-portal
```

3. Acesse o diretório do projeto:
```bash
  cd environmental-reporting-portal
```

4. Execute o projeto:
```bash
  ./mvnw spring-boot:run
```
Se preferir, abra o projeto em uma IDE, como IntelliJ por exemplo, e execute o projeto.

Após concluir essas etapas, o seu servidor Spring estará em execução localmente na porta 8080.

A interface para consumir a API esta localizada na pasta "front-end".

5. Abra a página index.html no browser utilizando um servidor, como live server por exemplo.

6. Importante: as variáveis de ambiente do projeto "JWT_SECRET" e "PASSWORD_SECRET" devem receber o valor "mysecret" ou qualquer outro que você desejar.

7. Utilize o usuário **admin@email.com** e a senha **myscret** (ou outra senha que você tenha definido no passo 6) para logar como administrador.


## Referência

- [Documentação da API](http://localhost:8080/swagger-ui/index.html#)
  A documentação completa da API pode ser acessada localmente ao executar a aplicação e visitar http://localhost:8080/swagger-ui/index.html#. Esta interface interativa, gerada pelo Swagger, fornece detalhes sobre cada endpoint, parâmetros de solicitação, respostas esperadas e exemplos práticos de uso.

- [Spring Framework](https://spring.io/)
  Consulte a documentação oficial do Spring Framework para obter informações detalhadas sobre o framework utilizado no backend. Esta referência abrange conceitos fundamentais, configurações avançadas e as melhores práticas recomendadas pela comunidade Spring.

- [Swagger Documentation](https://swagger.io/)
  O Swagger é integrado à API para facilitar a compreensão e interação. Obtenha mais informações sobre o Swagger em https://swagger.io/.
## Autores
#### Rogério Bernardo Gregório
- [Github](https://github.com/rogeriobgregorio)
- [LinkedIn](https://www.linkedin.com/in/rogeriogregorio/)