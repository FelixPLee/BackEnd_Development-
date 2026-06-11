class ListarClientesUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository; // Injeção de dependência
    }

    async execute() {
        // Se houvesse alguma regra de negócio (ex: não listar clientes inativos),
        // seria aplicada aqui.
        const clientes = await this.clienteRepository.buscarTodos();
        return clientes;
    }
}
module.exports = ListarClientesUseCase;