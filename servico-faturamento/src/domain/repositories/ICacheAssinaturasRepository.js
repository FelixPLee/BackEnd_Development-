class ICacheAssinaturasRepository {
    async obterStatus(codass) {
        throw new Error("O método obterStatus() deve ser implementado");
    }

    async atualizarStatus(codass, status) {
        throw new Error("O método atualizarStatus() deve ser implementado");
    }
}
module.exports = ICacheAssinaturasRepository;