class PlanoController {
    // O construtor recebe o Caso de Uso injetado via routes.js
    constructor(listarPlanosUseCase) {
        this.listarPlanosUseCase = listarPlanosUseCase;
    }

    // Método que atende a rota GET /gestao/planos
    async listar(req, res) {
        try {
            // No futuro, isso chamará: await this.listarPlanosUseCase.execute();
            // Por enquanto, vamos retornar uma resposta mockada para testar se o servidor sobe
            res.status(200).json({ message: 'Endpoint de Planos conectado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PlanoController;