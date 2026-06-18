class ProcessarPagamentoEventoUseCase {
    constructor(cacheRepository) {
        this.cacheRepository = cacheRepository;
    }

    async execute(eventoPagamento) {
        console.log(`[Regra de Negócio] Processando pagamento para assinatura ${eventoPagamento.codass}`);
        
        // Se a assinatura recebeu um pagamento, o seu plano passa a estar ativo na cache
        await this.cacheRepository.atualizarStatus(eventoPagamento.codass, true);
    }
}
module.exports = ProcessarPagamentoEventoUseCase;