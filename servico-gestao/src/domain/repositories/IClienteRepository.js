class IClienteRepository {
    async buscarTodos() {
        throw new Error("O método buscarTodos() deve ser implementado");
    }
}
module.exports = IClienteRepository;