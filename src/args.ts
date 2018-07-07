import yargs from 'yargs'
import path from 'path'

const commonArgs = (argv: yargs.Argv) => 
    argv
        .alias('h', 'help')
        .alias('n', 'noEmit')
        .alias('n', 'noemit')
        .alias('o', 'output')
        .alias('c', 'configPath')
        .describe('o', '(Opcional) Caminho aonde será salvo o resultado final')
        .describe('c', '(Opcional) Caminho aonde estão os JSON\'s de configuração')
        .describe('n', '(Opcional) Não emitir nada no console')
        .nargs('o', 1)
        .nargs('n', 0)

const option = yargs.argv._.shift() as 'generate-jwk' | 'encrypt-card-data'

function createArgs() {
    switch (option) {
        case 'generate-jwk':
            return commonArgs(yargs)
                    .command('generate-jwk', 'Gera um par de chaves JWK usando o algoritmo EC')
                    .usage('Uso: $0 <command> [options]')
                    .alias('k', 'kid')
                    .describe('k', 'Key ID da chave gerada, se não informado o kid é gerado aleatoriamente')
                    .example('$0 generate-jwk --kid 29sda-2A1od-9nJ4S-daA5n', 'Gera um par de chaves usando o ID do usuário como kid (Key Id)')
                    .nargs('k', 1)
        case 'encrypt-card-data':
        default:
            return commonArgs(yargs)
                    .command('encrypt-card-data', 'Assina os dados do cartão usando o algoritmo ES256, e depois os encripta')
                    .usage('Uso: $0 <command> [options]')
                    .alias('kp', 'keyPairPath')
                    .describe('kp', '(Opcional) Utiliza as chaves geradas no caminho especificado, caso não especifiado, utiliza o caminho padrão')
                    .example('$0 encrypt-card-data --keyPairPath ~/my_path/keys.json', 'Gera o JWE assinado')
                    .nargs('kp', 1)
                    
    }
}

const args = createArgs()
                .help('h')
                .help('help')
                .argv

const baseBath = path.join(__dirname, '..')
const configPath = path.join(baseBath, 'config')
const keyPairPath = path.join(baseBath, 'store', 'keyPair.json')

export default {
    noEmit: !!args.n || false,
    help: !!args.h || false,
    output: args.o as string | undefined,
    keyPairPath: (args.kp || keyPairPath) as string,
    configPath: (args.c || configPath) as string,
    kid: args.k as string | undefined,
    selectedOption: option
}