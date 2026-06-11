class ListarPlanosUseCase {
    constructor(planoRepository) {
        this.planoRepository = planoRepository; // Injeção de dependência
    }

    async execute() {
        const planos = await this.planoRepository.buscarTodos();
        return planos;
    }
}
module.exports = ListarPlanosUseCase;