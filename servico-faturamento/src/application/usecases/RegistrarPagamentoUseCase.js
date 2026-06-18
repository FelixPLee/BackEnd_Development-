class RegistrarPagamentoUseCase {
    constructor(pagamentoRepository, eventPublisher) {
        this.pagamentoRepository = pagamentoRepository;
        this.eventPublisher = eventPublisher; // Injeção de dependência para Mensageria
    }

    async execute(dadosPagamento) {
        // 1. Salva o pagamento na base própria do Faturamento
        const pagamentoSalvo = await this.pagamentoRepository.salvar(dadosPagamento);

        // 2. Dispara os eventos exigidos na arquitetura para os outros microsserviços
        if (this.eventPublisher) {
            this.eventPublisher.publish('PagamentoPlanoServicoGestao', pagamentoSalvo);
            this.eventPublisher.publish('PagamentoPlanoServicoPlanosAtivos', pagamentoSalvo);
        }

        return pagamentoSalvo;
    }
}
module.exports = RegistrarPagamentoUseCase;