class PlanoController {
    constructor(listarPlanosUseCase, atualizarCustoPlanoUseCase) {
        this.listarPlanosUseCase = listarPlanosUseCase;
        this.atualizarCustoPlanoUseCase = atualizarCustoPlanoUseCase;
    }

    async listar(req, res) {
        try {
            const planos = await this.listarPlanosUseCase.execute();
            return res.status(200).json(planos);
        } catch (error) { return res.status(500).json({ error: error.message }); }
    }

    async atualizarCusto(req, res) {
        try {
            const { idPlano } = req.params;
            const { custoMensal } = req.body;
            const planoAtualizado = await this.atualizarCustoPlanoUseCase.execute(idPlano, custoMensal);
            return res.status(200).json(planoAtualizado);
        } catch (error) { return res.status(400).json({ error: error.message }); }
    }
}
module.exports = PlanoController;