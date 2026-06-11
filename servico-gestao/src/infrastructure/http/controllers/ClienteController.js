class ClienteController {
    constructor(listarClientesUseCase) {
        this.listarClientesUseCase = listarClientesUseCase;
    }

    async listar(req, res) {
        try {
            const clientes = await this.listarClientesUseCase.execute();
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor", detalhes: error.message });
        }
    }
}
module.exports = ClienteController;