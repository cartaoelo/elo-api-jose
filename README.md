Clone este projeto para um diretório do seu computador e instale as dependências
```shell
npm i
```

## Fluxo de criação de Cartão pelo Elo API

> `addPublicKeyToUser` > `createCard`

> `addPublicKeyToProvisionedUser` > `createProvisionedCard`

Em `addPublicKeyToUser` / `addPublicKeyToProvisionedUser` você deve fornecer uma chave gerada por você mesmo, que será utilizada posteriormente.
Para isso use a API `generate-jwk`.

Em `createCard` / `createProvisionedCard` você deve fornecer um `CardSensitiveInput.json` assinado como JWS e depois encriptado como JWE.
Para isso use a API `encrypt-card-data`.

## Configuração

Existem 2 arquivos em `config/`

- `cardData.json`: Dados do cartão a ser encriptado em `encrypt-card-data`
- `client.json`: Dados para fazer request do serverKey. Altere somente o valor de `client_id`

Eles devem ser configurados antes de prosseguir

## CLI API

### `generate-jwk`
```
npm run generate-jwk [-- [--kid some_string_kid] [--output|-o ~/some/dir/keypair.json] [--copy-to-clipboard] [--noemit] [-h]] 
```
Gera um par de chaves para ser usado em `addPublicKeyToUser` ou `addPublicKeyToProvisionedUser`.
O retorno será uma JWK gerada com o algorítmo EC (Elliptic Curve)


### `encrypt-card-data`
```
npm run encrypt-card-data [-- [--keyPairPath|-kp ~/path/to/keypair.json] [--copy-to-clipboard] [--output|-o ~/some/dir/jwe.json] [--noemit] [-h]]
```
Encripta os dados de `cardData.json` para ser usado no campo de `sensitive` em `createCard` ou `createProvisionedCard`.

> **OBS:** Para mais informações utilize a opção `-h`

Exemplo:
```shell
npm run generate-jwk -- -o ./publickey.json --noemit && npm run encrypt-card-data -- --noEmit --output ./jwe.txt --copy-to-clipboard
```
O snippet acima vai criar um arquivo `publickey.json` com a public key gerada + um arquivo `jwe.txt` com a `CardSensitiveData` encriptada.
E ainda irá copiar essa chave para a área de transferência (Clipboard)

## JavaScript

Se deseja ver esse exemplo em plain JavaScript (Sem tipagens do TypeScript), utilize `npm run build`.

Todos os arquivos serão compilados dentro de `js/`