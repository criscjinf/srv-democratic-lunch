const config = require('config');
const ProcessVoting = require('./controllers/process-voting');

const $doLoop = () => {
    setTimeout(() => {
        $main();
    }, config.get('service').interval * 1000);
}

const $main = async () => {
    try {
        const controller = new ProcessVoting();
        if (await controller.process()) {
            console.log('Votação Finalizada!');
        } else {
            console.log('Nenhuma votação em aberto!');
        }
    } catch (error) {
        console.log(`Não foi possível processar! ERROR: [${JSON.stringify(error)}]`, error.stack);
    } finally {
        $doLoop();
    }
}

(() => {
    $doLoop();
})()
