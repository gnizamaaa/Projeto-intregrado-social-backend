# UniVerse: Rede social para a matéria de Projeto Integrado I

UniVerse é uma rede social básica, inspirada em plataformas populares como Twitter, um interessante projeto de Stanford chamado FizzSocial e em um blog/fórum nomeado Creeksecrets, presente na série Love,Victor e filme Love,Simon, onde a presença desse blog em que são feitos posts, em formato de nóticia de tablóide pelos alunos, move a trama principal da série.
O objetivo principal do projeto é oferecer aos usuários (Foco em universitários) uma plataforma para compartilhar pensamentos, ideias e opiniões de forma interativa. Com o UniVerse, os usuários podem se conectar com outras pessoas, seguir seus interesses e participar de discussões.

## Funcionalidades Principais

1. **Criação de Perfil:** Os usuários podem criar um perfil personalizado no UniVerse, fornecendo informações como nome, data de nascimento e uma breve biografia.

2. **Publicação de Posts:** Os usuários podem compartilhar seus pensamentos e ideias através de posts, que são mensagens que representam suas opiniões, informações relevantes ou apenas atualizações sobre a vida.
   - **Pseudônimos:**
    Os usuários têm a opção de criar e usar pseudônimos ao fazer posts e comentários. Isso permite que eles expressem suas opiniões livremente sem necessariamente revelar suas identidades reais.
    - **Comentários:**
    Os usuários têm a opção de comentar, em formato de Posts, sobre outros posts, também podendo utilizar de pseudônimos.

3. **Seguidores e Seguindo:** Os usuários podem seguir outros usuários para futuramente receber mais de suas atualizações e interagir com eles. Além disso, eles também podem ter seguidores que desejam acompanhar suas próprias atualizações.

4. **Interatividade:** Os usuários podem interagir com os twits de outras pessoas através de curtidas e comentários. Essas interações futuramente irão ajudam a impulsionar a visibilidade e o engajamento dos twits.
[Na atual versão os tweets são exibidos apenas em ordem cronológica a todos]

5. **Notificações:** Os usuários recebem notificações sobre atividades relevantes em sua conta, como novas curtidas e comentários.

## Tecnologias Utilizadas

O projeto UniVerse é desenvolvido utilizando as seguintes tecnologias:

- **Linguagem de Programação:**  
    - O front-end do UniVerse é construído utilizando Node.js com React em Typescript.
    - O back-end do UniVerse é construído utilizando Java, maven e Spring-boot. 
    Sendo essa escolha feita por ter sido o mais mostrado em sala, o que gerou maior conforto para o desenvolvimento.

- **Estilização:** A estilização do UniVerse é feita utilizando a biblioteca Tailwind CSS, que permite criar interfaces atraentes e flexíveis de maneira eficiente sem exigir tanto conhecimento.

- **Banco de Dados:** O banco de dados utilizado é o MongoDB, um banco de dados NoSQL orientado a documentos, que armazena os dados dos usuários, posts, interações e outras informações relevantes.


## Instalação a partir do DockerHub
Nota: Ao utilizar o DockerHub, estará sendo usado o banco de dados pré-configurado pelo desenvolvedor desse repositório (Rhuan Garcia)

O projeto está disponibilizado em formato de container através do DockerHub, veja:
https://hub.docker.com/repository/docker/gnizamaaa/pi_universe/general

Sendo possível obter a imagem
com 
```sh
docker pull gnizamaaa/pi_universe
```

E rodar o projeto utilizando
```sh
docker run -p 8080:8080 -p 3000:3000 gnizamaaa/pi_universe
```

## Instalação a partir do DockerBuild
Caso a opção acima não seja suficiente, e queira utilizar uma instância de MongoDB a parte, é possível construir um container passando como argumento as credenciais dessa instância

1. Clone este repositório em seu ambiente de desenvolvimento:
```sh
git clone https://github.com/gnizamaaa/Projeto-intregrado-social-uniVerse.git
```

2. Navegue até o diretório do projeto:
```sh
cd Projeto-intregrado-social-uniVerse
```

2. Construa o container passando como argumento as credenciais e informações da sua instância do MongoDB:

```sh
docker build --build-arg DATABASE=<MONGO_DB> \
             --build-arg USER=<MONGO_USER> \
             --build-arg PASSWORD=<MONGO_PASSWORD> \
             --build-arg CLUSTER=<MONGO_CLUSTER> \
             -t meu-container .
```
3. E então rodar o projeto utilizando
```sh
docker run -p 8080:8080 -p 3000:3000 meu-container
```

## Instalação e Configuração a partir do código fonte

1. Clone este repositório em seu ambiente de desenvolvimento:
```sh
git clone https://github.com/gnizamaaa/Projeto-intregrado-social-uniVerse.git
```

2. Certifique-se de ter o Node.js instalado em sua máquina. Sendo recomendada e testada a versão 16.

3. Navegue até o diretório do projeto:
```sh
cd Projeto-intregrado-social-uniVerse
```
4. Crie um arquivo de nome ".env" com suas credenciais para o MongoDB na pasta /Projeto-intregrado-social-uniVerse/Backend/src/main/resources/, esse arquivo deve seguir o seguinte formato:

```.env
MONGO_DATABASE="<MONGO_DB>"
MONGO_USER="<MONGO_USER>"
MONGO_PASSWORD="<MONGO_PASSWORD>"
MONGO_CLUSTER="<MONGO_CLUSTER>"
```
5. Navegue de volta ao diretório raiz do projeto

6. Navegue ao diretório do backend

```sh
cd Backend
```
7. Instale as dependencias
```sh
mvn install
```

8. Inicie o servidor do BackEnd
```sh
mvn spring-boot:run
```

9. Em um novo terminal, navegue ao diretório raiz do projeto

10. Navegue ao diretório do Frontend
```sh
cd Frontend/universe-web/
```

11. Instale as dependencias
```sh
npm install
```

12. Compile o servidor
```sh
npm run build
```

13. Inicie o servidor do FrontEnd
```sh
npm run start
```

Alternativamente pode se iniciar os servidores utilizando o script

6. Inicie os servidores utilizando o script 

```.env
./entrypoint.sh
```


## Contribuição

Contribuições para o desenvolvimento do UniVerse são bem-vindas! Se você deseja colaborar com o projeto, siga as diretrizes abaixo:

Faça um fork deste repositório e clone-o em seu ambiente de desenvolvimento.
Crie uma branch para suas alterações:

```sh
git checkout -b minha-feature
```

Faça as alterações necessárias e adicione os arquivos modificados:

```sh
git add .
```

Faça o commit das suas alterações:

```sh
git commit -m "Minha contribuição"
```
Envie suas alterações para o repositório remoto:
```sh
git push origin minha-feature
```

E então abra um Pull Request descrevendo suas alterações, que serão analisadas por mim (Rhuan Garcia).

## Visão para o futuro

Vejo essa versão como uma demonstração básica do UniVerse, mas o projeto possui uma visão maior e potencial para expandir com recursos adicionais que foram inicialmente planejados, mas não puderam ser implementados devido à restrições de tempo, conhecimento prévio e experiência. Abaixo estão algumas áreas que podem ser exploradas no futuro para aprimorar o UniVerse:

- Suporte a Imagens e Vídeos: Adicionar a capacidade de os usuários compartilharem imagens e vídeos em seus posts, tornando a experiência mais rica e envolvente.

- Melhorias de Segurança: Implementar recursos de segurança adicionais, como autenticação de dois fatores, criptografia de dados e prevenção de ataques de segurança comuns.

- Moderação e Verificação: Introduzir um sistema de moderação para monitorar e controlar o conteúdo compartilhado na plataforma. Além disso, realizar um processo de verificação de usuários para garantir a autenticidade das identidades e minimizar a disseminação de informações falsas.

- Algoritmo de Recomendação: Desenvolver um algoritmo de recomendação inteligente para fornecer aos usuários conteúdo relevante e interessante com base em seus interesses, interações anteriores e tendências populares.

Essas são apenas algumas áreas em que o UniVerse pode evoluir no futuro. Com mais tempo e recursos, é possível alcançar a visão inicial do projeto de criar uma rede social administrada pela universidade, com alunos verificados, que podem postar anonimamente ou identificados, promovendo um ambiente de interação e compartilhamento de informações entre estudantes.


## Licença

UniVerse é distribuído sob a licença [MIT](https://opensource.org/licenses/MIT).
