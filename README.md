# # Check Fest

## Índice

-   [1. Visão do Produto](#1-visão-do-projeto)
    
-   [2. Backlog](#2-backlog)
    
-   [3. Características Técnicas](#3-características-técnicas)
    
-   [4.  Montagem do Ambiente](#4-Montagem-do-ambiente)
    
-   [5. Futuras Implementações](#5-Futuras-implementações)
    
-   [6. Considerações Finais](#6-Considerações-finais)


## 1. Visão do Produto
Segurança é um problema cada vez maior hoje em dia e garanti-la em meios não digitais pode ser ainda mais complexo. E o processo de se identificar em eventos ou em pontos de acesso é sempre um processo muito chato e manual. Além disso, conta normalmente com muitas filas e quase sempre é assistido por dispositivos ou acessórios para garantir a identificação. Porém, para garantir melhor experiência para as pessoas é possível fazer sua identificação sem usuários ou senhas e dispositivos utilizando o reconhecimento facial.

A expectativa com o desenvolvimento da aplicação é criar um site/app de identificação e cadastro utilizando a api de facial recognition da Microsoft.

## 2. Backlog

- **Implementados**
 1 – Cadastro de rostos para reconhecimento 
 2 – Reconhecimento facial 
 3 – Site/App com câmera 
 4 – Reconhecimento facial com foto do site/app 
 
 - **Implementações futuras**
 5 – Cadastro de rostos via site/app 
 6 – Base de personagens 
 7 – Escolher personagens no cadastro 
 8 – Exibir personagem no reconhecimento
 
 


## 3. Características Técnicas(arrumar esse texto)

A API da Microsoft de Reconhecimento Facial é uma ótima ferramenta para a situação descrita e, portanto, o seu uso foi imprescindível.

### Cadastro

Para cadastrar um rosto, foi importante primeiro criar um grupo de pessoas na própria API, por meio do  _PersonGroup - Create_.

Todos os rostos são comparados dentro deste grupo. Após a criação de um grupo, é possível cadastrar os rostos do usuário.

### Verificação

Para identificar a quem pertence determinado rosto, foi necessário comparar a imagem contra a lista de rostos que tenham um faceId associado.

Para isso, foi gerado um FaceId para a foto capturada que, ao ser jogada contra o grupo, retorna com os FaceIds de possíveis candidatos. Para ter o nome da pessoa associada ao FaceId mais uma última chamada é feita com o FaceId do candidato no grupo.

### Site/App

Para a criação de uma autenticação, foi necessário o desenvolvimento de um site ou app com câmera para que a foto seja tirada e enviada ao Face API para a identificação ou cadastro das pessoas.

## 4. Montagem do Ambiente

1. [API  _Facial Recognition_  da Microsoft](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236?WT.mc_id=devto-blog-gllemos)
2. [React](https://pt-br.reactjs.org/)
3. [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)
4. [Laboratoria UI](https://github.com/Laboratoria/ui)
5. [React-webcam](https://www.npmjs.com/package/react-webcam)

## 5. Futuras Implementações
**confirmar essa parte**
-   Tempo de Resposta;
-   Cadastro de forma interativa;
-   Verificação da imagem enviada; e
-   Reconhecimento de múltiplas faces.
- 
## 6. Considerações Finais

Esta aplicação foi desenvolvida por:
[Adélia Carvalho](https://github.com/adeliacristine)
[Ana Ramos](https://github.com/ana-ramos09)
[Karina Pereira](https://github.com/karina1981)
[Tamires Cordeiro](https://github.com/mirescordeiro) no  [Talent Fest](https://talentfest.laboratoria.la/) evento de encerramento do Bootcamp da Laboratória Brasil.
