# Talent Fest Face API

## Índice

   1. [Visão do Projeto](#1-visão-do-projeto)
    
   2. [Produto](#2-produto)
   
   3. [Backlog](#3-backlog)
    
   4. [Características Técnicas](#4-características-técnicas)
    
   5. [Configuração do Ambiente](#5-configuração-do-ambiente)
    
   6. [Futuras Implementações](#6-Futuras-implementações)
    
   7. [Instalação](#7-Instalação)

   8. [Considerações Finais](#8-Considerações-finais)


## 1. Visão do Projeto

Segurança é um problema cada vez maior hoje em dia e garantí-la em meios não digitais pode ser ainda mais complexo. E o processo de se identificar em eventos ou em pontos de acesso é sempre um processo muito chato e manual. Além disso, conta normalmente com muitas filas e quase sempre é assistido por dispositivos ou acessórios para garantir a identificação. Porém, para garantir melhor experiência para as pessoas é possível fazer sua identificação sem usuários ou senhas e dispositivos utilizando o reconhecimento facial.

A expectativa com o desenvolvimento da aplicação é criar um site/app de identificação e cadastro utilizando a api de facial recognition da Microsoft.

## 2. Produto

No contexto da pandemia do Covid-19, o bootcamp da quarta geração da Laboratória foi desenvolvido online, porém como seguimos esperançosos que o próximo será presencial,resolvemos trazer uma solução que facilite a entrada das empresas parceiras e convidadas que estarão presentes no evento do Talent Fest da quinta geração e das que estão por vir. Dessa forma, agilizando o acesso e reduzindo filas, buscando auxiliar a organização geral do evento.

## 3. Backlog

Para a execução do projeto, foi proporcionado um Backlog com as etapas do fluxo do projeto, as quais foram transformadas em Histórias de Usuário e nos direcionaram na implementação do projeto. 
Para organização e otimização do trabalho a ser feito, foi criado um arquivo de Trello, onde produzimos uma estrutura de controle para as Histórias de Usuário, 

- **Implementados**
 1 – Cadastro de rostos para reconhecimento 
 2 – Reconhecimento facial 
 3 – Site com câmera 
 4 – Reconhecimento facial com foto do site
 5 - Cadastro de rostos via site

- **Implementações futuras**
 6 – Base de personagens
 7 – Escolher personagens no cadastro
 8 – Exibir personagem no reconhecimento

## 4. Características Técnicas

A API da Microsoft de Reconhecimento Facial é uma ótima ferramenta para a situação descrita e, portanto, o seu uso foi imprescindível.

### Cadastro

Para cadastrar um rosto, foi importante primeiro criar um grupo de pessoas na própria API, por meio do  _PersonGroup - Create_direto no Postman.

Todos os rostos são comparados dentro deste grupo. Após a criação de um grupo, é possível cadastrar os rostos do usuário.

### Verificação

Para identificar a quem pertence determinado rosto, foi necessário comparar a imagem contra a lista de rostos que tenham um faceId associado.

Para isso, foi gerado um FaceId para a foto capturada que, ao ser jogada contra o grupo, retorna com os FaceIds de possíveis candidatos. Para ter o nome da pessoa associada ao FaceId mais uma última chamada é feita com o FaceId do candidato no grupo.

### Site/App

Para a criação de uma autenticação, foi necessário o desenvolvimento de um site ou app com câmera para que a foto seja tirada e enviada ao Face API para a identificação ou cadastro das pessoas.

### Wireframe e Protótipo

Para definição estrutural das interfaces criadas, foram eleborados um wireframe e um protótipo.

![Wireframe](https://trello-attachments.s3.amazonaws.com/5f576124c504a425431c7ca2/5f590f08ab646d636c899a11/2ed34684a230f6f6134eb419ec2f6892/Captura_de_Tela_2020-09-09_%C3%A0s_14.21.02.png)

![Protótipo](https://trello-attachments.s3.amazonaws.com/5f576124c504a425431c7ca2/5f5915cd429a8457ea450d4e/168173031317a8b3ed9130abd8b43fe7/Captura_de_Tela_2020-09-09_%C3%A0s_15.03.27.png)

## 5. Configuração do Ambiente

1. [API  _Facial Recognition_  da Microsoft](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236?WT.mc_id=devto-blog-gllemos)
2. [React](https://pt-br.reactjs.org/)
3. [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)
4. [Laboratoria UI](https://github.com/Laboratoria/ui)
5. [React-webcam](https://www.npmjs.com/package/react-webcam)
6. [Router](https://pt-br.reactjs.org/)
7. [Sweet Alert2](https://www.npmjs.com/package/sweetalert2)

## 6. Futuras Implementações

-   Segurança via e-mail registrado;
-   Implementação de retorno automático sem auxílio da interface;
-   Separação da estruturação da API do front-end para o back-end;

## 7. Instalação

Nesse projeto é necessário utilizar alguns comandos para o correto funcionamento do site.
Após o clone deste repositório importante ter o Node.JS e o NPM instalados em sua máquina.
Para isso execute seguintes comandos em seu terminal:

- npm install para instalar todas as dependências contidas no projeto.
- npm start, o qual vai inicializar o servidor e possibilitar a visualização do projeto.

## 8. Considerações Finais

Esta aplicação foi desenvolvida por:
[Adélia Carvalho](https://github.com/adeliacristine)
[Ana Ramos](https://github.com/ana-ramos09)
[Karina Pereira](https://github.com/karina1981)
[Tamires Cordeiro](https://github.com/mirescordeiro) no  [Talent Fest](https://talentfest.laboratoria.la/) evento de encerramento do Bootcamp da Laboratória Brasil.