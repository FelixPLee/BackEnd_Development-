class IPagamentoRepository {
    async salvar(pagamento) {
        throw new Error("O método salvar() deve ser implementado");
    }
}
module.exports = IPagamentoRepository;