class AssinaturaController {
    constructor(assinaturaRepo) { 
        // Para simplificar o arquivo e não criar 4 casos de uso quase vazios, 
        // vamos injetar o repositório no controller como atalho. 
        // (Numa arquitetura purista, use Casos de Uso intermediários!)
        this.assinaturaRepo = assinaturaRepo; 
    }

    async criar(req, res) {
        try {
            const assinatura = await this.assinaturaRepo.criar(req.body);
            return res.status(201).json(assinatura);
        } catch (error) { return res.status(500).json({ error: error.message }); }
    }

    async listarPorTipo(req, res) {
        try {
            const assinaturas = await this.assinaturaRepo.buscarPorTipo(req.params.tipo.toUpperCase());
            return res.status(200).json(assinaturas);
        } catch (error) { return res.status(500).json({ error: error.message }); }
    }

    async listarPorCliente(req, res) {
        try {
            const assinaturas = await this.assinaturaRepo.buscarPorCliente(req.params.codcli);
            return res.status(200).json(assinaturas);
        } catch (error) { return res.status(500).json({ error: error.message }); }
    }

    async listarPorTipo(req, res) {
        try {
            // 1. Pega o tipo da URL e já converte para maiúsculo
            let tipoUrl = req.params.tipo.toUpperCase();

            // 2. Faz a "tradução" do plural da URL para o singular do Banco de Dados
            if (tipoUrl === 'ATIVOS') {
                tipoUrl = 'ATIVO';
            } else if (tipoUrl === 'CANCELADOS') {
                tipoUrl = 'CANCELADO';
            }

            // 3. Passa o valor corrigido para o repositório
            const assinaturas = await this.assinaturaRepo.buscarPorTipo(tipoUrl);
            
            return res.status(200).json(assinaturas);
        } catch (error) { 
            return res.status(500).json({ error: error.message }); 
        }
    }
}
module.exports = AssinaturaController;