class PlanosAtivosController {
    constructor(verificarStatusAssinaturaUseCase) {
        this.verificarStatusAssinaturaUseCase = verificarStatusAssinaturaUseCase;
    }

    async verificar(req, res) {
        try {
            const { codass } = req.params;
            const isAtivo = await this.verificarStatusAssinaturaUseCase.execute(codass);
            
            // Retorna estritamente o valor Booleano conforme o requisito
            return res.status(200).json(isAtivo);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = PlanosAtivosController;