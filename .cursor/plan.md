# Objetivo

Criar um template simples, funcional e minimalista composto por 3 aplicações independentes:

- panel (React + TypeScript)
- backend (Java 21 + Spring Boot)
- client (React + TypeScript)

O foco é demonstrar sincronização em tempo real utilizando WebSocket.

---

# Regras obrigatórias

## Arquitetura

O projeto deve possuir a seguinte estrutura:

```text
root/
├── docker-compose.yml
├── backend/
├── panel/
└── client/
```

Cada módulo deve possuir seu próprio Dockerfile.

---

## Restrições

- Não criar testes unitários.
- Não criar testes de integração.
- Não adicionar bibliotecas desnecessárias.
- Não adicionar autenticação.
- Não adicionar banco externo.
- Não adicionar observabilidade.
- Não adicionar logs complexos.
- Não adicionar arquitetura em camadas desnecessárias.
- Não adicionar código preparado para produção.
- Não adicionar funcionalidades extras.

Implementar somente o necessário para o funcionamento.

---

## Build

IMPORTANTE:

Não executar automaticamente nenhum comando após gerar o projeto.

Não executar:

- mvn package
- mvn clean
- npm install
- npm run build
- docker build
- docker compose up

Apenas gerar os arquivos do projeto.

---

# Backend

Tecnologias:

- Java 21
- Spring Boot
- Maven

## Persistência

Criar uma entidade chamada:

```java
Dummy
```

Campos:

```java
Float x;
Float y;
```

Persistir utilizando H2 em memória.

Não utilizar volumes.

Os dados podem ser perdidos ao reiniciar a aplicação.

---

## Estado inicial

Ao iniciar a aplicação deve existir exatamente um registro:

```text
x = 0
y = 0
```

---

## API REST

Criar endpoint:

```http
POST /api/dummy
```

Body:

```json
{
  "x": 0.5,
  "y": -0.3
}
```

Comportamento:

- Atualizar o único registro existente.
- Persistir no H2.
- Após atualizar, publicar o novo estado via WebSocket.

Resposta:

```json
{
  "x": 0.5,
  "y": -0.3
}
```

---

Criar endpoint:

```http
GET /api/dummy
```

Retorna:

```json
{
  "x": 0.5,
  "y": -0.3
}
```

---

## WebSocket

Implementar WebSocket utilizando Spring Boot.

Endpoint:

```text
/ws
```

Sempre que os valores forem alterados:

```json
{
  "x": 0.5,
  "y": -0.3
}
```

deve ser enviado para todos os clientes conectados.

Não utilizar polling.

Não utilizar SSE.

Utilizar WebSocket.

---

## CORS

Permitir acesso do client e panel.

Configuração simples.

---

# Client

Tecnologias:

- React
- TypeScript
- Vite

Objetivo:

Permitir alteração dos valores.

---

## Layout

Tela contendo apenas:

- Um painel centralizado.
- Slider X.
- Slider Y.

Nada mais.

Sem cabeçalho.

Sem rodapé.

Sem textos extras.

Sem componentes extras.

---

## Slider X

Label:

```text
X
```

Range:

```text
-1 até 1
```

Step:

```text
0.01
```

---

## Slider Y

Label:

```text
Y
```

Range:

```text
-1 até 1
```

Step:

```text
0.01
```

---

## Inicialização

Ao abrir a página:

```http
GET /api/dummy
```

para carregar o valor atual.

---

## Atualização

Sempre que o usuário mover qualquer slider:

```http
POST /api/dummy
```

enviando os dois valores atuais.

Não utilizar debounce.

Não utilizar botão salvar.

Atualização imediata.

---

# Panel

Tecnologias:

- React
- TypeScript
- Vite

Objetivo:

Visualizar em tempo real o ponto recebido do backend.

---

## Inicialização

Ao abrir a página:

```http
GET /api/dummy
```

para obter o estado atual.

---

## WebSocket

Conectar ao endpoint:

```text
/ws
```

Sempre que receber uma mensagem:

```json
{
  "x": valor,
  "y": valor
}
```

atualizar imediatamente a tela.

---

## Layout

Tela contendo apenas:

- Um painel centralizado.
- Um plano cartesiano.

Sem textos extras.

Sem componentes extras.

Sem gráficos externos.

Sem bibliotecas de chart.

Utilizar apenas HTML/CSS/SVG ou Canvas.

---

## Plano cartesiano

Exibir:

- eixo X horizontal
- eixo Y vertical

Escala:

```text
-1 até 1
```

nos dois eixos.

Demarcar visualmente:

```text
-1
-0.5
0
0.5
1
```

---

## Ponto

Exibir um único ponto vermelho.

Posição:

```text
x = valor recebido
y = valor recebido
```

Converter corretamente para coordenadas visuais do plano.

Sempre refletir exatamente o valor recebido.

---

# Docker

## Backend

Criar Dockerfile próprio.

Porta:

```text
8080
```

---

## Client

Criar Dockerfile próprio.

Porta:

```text
3000
```

---

## Panel

Criar Dockerfile próprio.

Porta:

```text
3001
```

---

# Docker Compose

Criar um único:

```yaml
docker-compose.yml
```

na raiz.

Subir:

- backend
- client
- panel

Configurar comunicação entre containers.

Expor portas:

```text
8080
3000
3001
```

---

# Resultado esperado

Fluxo final:

1. Usuário abre Client.
2. Move slider X ou Y.
3. Client executa POST.
4. Backend atualiza Dummy.
5. Backend publica evento WebSocket.
6. Panel recebe evento.
7. Ponto vermelho muda de posição instantaneamente.

O projeto deve permanecer extremamente simples, minimalista e servir apenas como template funcional para evolução futura.