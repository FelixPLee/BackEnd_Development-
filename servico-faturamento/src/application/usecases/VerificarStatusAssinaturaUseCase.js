class VerificarStatusAssinaturaUseCase {
    constructor(cacheRepository) {
        this.cacheRepository = cacheRepository;
    }

    async execute(codass) {
        // Regras de negócio adicionais entrariam aqui, se existissem.
        return await this.cacheRepository.obterStatus(codass);
    }
}
module.exports = VerificarStatusAssinaturaUseCase;