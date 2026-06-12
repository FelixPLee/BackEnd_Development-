class CriarAssinaturaUseCase {
    constructor(assinaturaRepository) { this.assinaturaRepository = assinaturaRepository; }
    async execute(dadosAssinatura) {
        // Validações de regra de negócio poderiam entrar aqui
        return await this.assinaturaRepository.criar(dadosAssinatura);
    }
}
module.exports = CriarAssinaturaUseCase;