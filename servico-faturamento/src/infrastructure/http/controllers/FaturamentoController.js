class FaturamentoController {
    constructor(registrarPagamentoUseCase) {
        this.registrarPagamentoUseCase = registrarPagamentoUseCase;
    }

    async registrar(req, res) {
        try {
            const pagamento = await this.registrarPagamentoUseCase.execute(req.body);
            return res.status(201).json({
                mensagem: "Pagamento registrado e eventos disparados com sucesso",
                pagamento: pagamento
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao registrar pagamento", detalhes: error.message });
        }
    }
}
module.exports = FaturamentoController;