class AtualizarCustoPlanoUseCase {
    constructor(planoRepository) { this.planoRepository = planoRepository; }
    async execute(idPlano, novoCusto) {
        if (novoCusto <= 0) throw new Error("O custo mensal deve ser maior que zero.");
        return await this.planoRepository.atualizarCusto(idPlano, novoCusto);
    }
}
module.exports = AtualizarCustoPlanoUseCase;