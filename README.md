<!-- omit in toc -->
# Npm Audit Publish

Ferramenta de linha de comando para publicar o resumo de `npm audit --production` para uma tabela Azure.

- [Uso](#uso)
- [Parâmetros](#parâmetros)
  - [`--app`](#--app)
  - [`--team`](#--team)
  - [`--branch`](#--branch)
  - [`--build-url`](#--build-url)
  - [Exemplo completo](#exemplo-completo)
- [Desenvolvimento, por onde começar](#desenvolvimento-por-onde-começar)
- [Como funciona](#como-funciona)
- [Variáveis de ambiente](#variáveis-de-ambiente)

## Uso
```bash
# Install
npm i -g @wizsolucoes/npm-audit-publish

# Run
npm-audit-publish
```

## Parâmetros
### `--app`
**(Required)** Nome do repositório da aplicação a ser analisada.

```sh
# Exemplo
$ npm-audit-publish --app anyname-web
```

### `--team`
**(Required)** Nome da equipe/squad responsável pela aplicação a ser analisada.

```sh
# Exemplo
$ npm-audit-publish --team AnyTeamName
```

### `--branch`
**(Required)** Nome da branch a ser analisada.

```sh
# Exemplo
$ npm-audit-publish --branch master
```

### `--build-url`
**(Required)** URL do build de CI/CD no qual a análise foi feita.

```sh
# Exemplo
$ npm-audit-publish --build-url="https://dev.azure.com/company/SquadOne/_build/results?buildId=106015"
```

### Exemplo completo
```sh
$ npm-audit-publish --app anyname-web --team AnyTeamName --branch="release/example" --build-url="https://dev.azure.com/company/SquadOne/_build/results?buildId=106015"
```

## Desenvolvimento, por onde começar
Primeiramente, seta os [variáveis de ambiente necessários](#variáveis-de-ambiente) para rodar o programa.

```bash
# Install
npm install

# Run tests
npm test

# Run (Exemplo)
npm run start --  --app anyname-web --team AnyTeamName --branch="release/example" --build-url="https://dev.azure.com/company/SquadOne/_build/results?buildId=106015"
```

## Como funciona
A ferramenta segue os seguintes passos:
1. Executa o comando `npm audit --production`
2. Publica o resumo das vulnerabilidades encontradas para a tabela de conta de armazenamento da Azure especificada pelas [variáveis de ambiente](#variáveis-de-ambiente)

## Variáveis de ambiente
Você deve prover as informações para a conexão com a conta de storage da Azure para publicação dos resultados da análise com os seguintes variáveis de ambiente:

`WIZ_NPM_AUDIT_STORAGE_KEY` - Chave de accesso.

`WIZ_NPM_AUDIT_STORAGE_ACCOUNT` - Nome da conta de storage.

`WIZ_NPM_AUDIT_STORAGE_TABLE` - Nome da tabela da conta de storage.
