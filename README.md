# Webhooks Monitor - Frontend

Uma aplicação moderna de monitoramento de webhooks construída com React, TypeScript e Vite. Esta aplicação permite visualizar, filtrar e analisar webhooks em tempo real com uma interface intuitiva e responsiva.

## 🚀 Tecnologias Utilizadas

### Core
- **React 19.1.1** - Biblioteca JavaScript para construção da interface
- **TypeScript 5.9.3** - Superset do JavaScript com tipagem estática
- **Vite 7.1.7** - Build tool e servidor de desenvolvimento rápido

### Roteamento
- **TanStack Router 1.133.32** - Roteador moderno e type-safe para React
- **@tanstack/router-plugin** - Plugin para geração automática de rotas

### Estado e Dados
- **TanStack Query 5.90.5** - Gerenciamento de estado assíncrono e cache
- **Zod 4.1.12** - Validação de esquemas TypeScript-first

### Estilização
- **TailwindCSS 4.1.16** - Framework CSS utilitário
- **tailwind-merge** - Utilitário para mesclar classes CSS condicionalmente
- **tailwind-variants** - Criação de variantes de componentes

### Componentes UI
- **Radix UI** - Componentes headless acessíveis
- **Lucide React** - Biblioteca de ícones
- **react-resizable-panels** - Painéis redimensionáveis

### Code Quality
- **Biome 2.3.1** - Linter e formatter ultrarrápido
- **ESLint** - Linter para identificação de problemas no código

### Utilitários
- **date-fns 4.1.0** - Biblioteca para manipulação de datas
- **shiki 3.14.0** - Highlighter de código

## 📁 Estrutura do Projeto

```
frontend/
├── public/                    # Arquivos estáticos
├── src/
│   ├── assets/               # Recursos da aplicação (imagens, etc.)
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes de interface base
│   │   ├── webhook-details.tsx
│   │   ├── webhooks-list.tsx
│   │   └── ...
│   ├── http/                # Configurações e schemas HTTP
│   │   ├── hooks/           # Custom hooks para API
│   │   └── schemas/         # Schemas de validação Zod
│   ├── routes/              # Definições de rotas
│   │   ├── __root.tsx       # Layout raiz
│   │   ├── index.tsx        # Página inicial
│   │   └── webhooks.$id.tsx # Detalhes do webhook
│   ├── index.css            # Estilos globais
│   ├── main.tsx            # Ponto de entrada da aplicação
│   └── routeTree.gen.ts    # Árvore de rotas gerada automaticamente
├── biome.json              # Configuração do Biome
├── eslint.config.js        # Configuração do ESLint
├── package.json            # Dependências e scripts
├── tailwind.config.js      # Configuração do TailwindCSS
├── tsconfig.json           # Configuração do TypeScript
└── vite.config.ts          # Configuração do Vite
```

## 🛠️ Funcionalidades

- **📊 Dashboard de Webhooks**: Visualização em tempo real de todos os webhooks recebidos
- **🔍 Filtros Avançados**: Filtragem por método HTTP, status, data e outros parâmetros
- **📄 Paginação Infinita**: Carregamento otimizado de grandes volumes de dados
- **🎯 Detalhes Completos**: Visualização detalhada de headers, body, query params e metadados
- **🎨 Interface Responsiva**: Layout adaptável para diferentes tamanhos de tela
- **⚡ Performance Otimizada**: Cache inteligente e atualizações incrementais
- **🌙 Tema Escuro**: Interface moderna com tema dark

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18.0.0 ou superior)
- **npm** (versão 8.0.0 ou superior) ou **yarn** (versão 1.22.0 ou superior)
- **Git** (para clonagem do repositório)

### Verificar versões instaladas:

```bash
node --version
npm --version
git --version
```

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ricardoaruiz/rocketseat-desafilo-fullstack-ia-frontend.git
cd rocketseat-desafilo-fullstack-ia-frontend
```

### 2. Instale as dependências

```bash
# Usando npm
npm install

# Ou usando yarn
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto (opcional):

```env
# URL da API backend (padrão: http://localhost:3334)
VITE_API_BASE_URL=http://localhost:3334

# Outras configurações opcionais
VITE_APP_TITLE="Webhooks Monitor"
```

## 🚀 Como Executar

### Desenvolvimento

Para executar a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação será executada em: **http://localhost:5173**

### Build para Produção

Para gerar o build otimizado para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

### Preview do Build

Para visualizar o build de produção localmente:

```bash
npm run preview
```

## 🧹 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build para produção |
| `npm run preview` | Visualiza o build de produção |
| `npm run lint` | Executa verificação de código com Biome |
| `npm run lint:fix` | Corrige automaticamente problemas de código |

## 📊 Configuração da API Backend

A aplicação frontend consome uma API REST que deve estar rodando em `http://localhost:3334` (padrão).

### Endpoints utilizados:

- **GET** `/api/webhooks` - Lista webhooks com paginação
- **GET** `/api/webhooks/:id` - Detalhes de um webhook específico

### Exemplo de resposta da API:

```json
{
  "webhooks": [
    {
      "id": "01234567-89ab-cdef-0123-456789abcdef",
      "method": "POST",
      "pathname": "/webhook/endpoint",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "nextCursor": "01234567-89ab-cdef-0123-456789abcdef"
}
```

## 🎨 Personalização

### Modificar o tema

Os estilos da aplicação utilizam TailwindCSS. Para personalizar cores e estilos:

1. Edite o arquivo `src/index.css` para estilos globais
2. Modifique componentes individuais em `src/components/ui/`
3. Ajuste a configuração do Tailwind em `tailwind.config.js` (se existir)

### Adicionar novos componentes

1. Crie componentes em `src/components/`
2. Para componentes UI reutilizáveis, use `src/components/ui/`
3. Siga os padrões de tipagem TypeScript estabelecidos

## 📱 Responsividade

A aplicação foi desenvolvida com design mobile-first e é totalmente responsiva:

- **Desktop**: Layout com sidebar lateral e painel principal
- **Tablet**: Interface adaptada com navegação otimizada
- **Mobile**: Stack vertical com navegação touch-friendly

## 🔧 Troubleshooting

### Problemas Comuns

**1. Erro de porta em uso**
```bash
Error: Port 5173 is already in use
```
**Solução**: Altere a porta no `vite.config.ts` ou encerre o processo na porta 5173.

**2. Erro de dependências**
```bash
npm ERR! peer dep missing
```
**Solução**: Execute `npm install --force` ou delete `node_modules` e `package-lock.json`, depois rode `npm install`.

**3. Erro de conexão com API**
```bash
Network Error: Failed to fetch
```
**Solução**: Verifique se o backend está rodando em `http://localhost:3334` e se não há problemas de CORS.

**4. Erro de tipagem TypeScript**
```bash
Type error: Property 'x' does not exist
```
**Solução**: Execute `npm run build` para verificar todos os erros de tipo e corrija-os.

### Logs e Debug

Para habilitar logs detalhados no desenvolvimento:

```bash
# Definir nível de log
VITE_LOG_LEVEL=info npm run dev

# Debug do TanStack Query
# Adicione ReactQueryDevtools no main.tsx (já configurado em desenvolvimento)
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use **TypeScript** para tipagem estática
- Siga os padrões do **Biome** (executar `npm run lint`)
- Nomeie componentes em **PascalCase**
- Use **kebab-case** para nomes de arquivos
- Mantenha componentes pequenos e focados em uma responsabilidade

## 📄 Licença

Este projeto é parte de um desafio da Rocketseat e está disponível sob a licença MIT.

## 📞 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique a seção de [Troubleshooting](#-troubleshooting)
2. Consulte a documentação das tecnologias utilizadas
3. Abra uma issue no repositório GitHub

---