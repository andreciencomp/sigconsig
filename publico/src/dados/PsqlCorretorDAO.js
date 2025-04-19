const { pool } = require('../../../servicos/database_service')
const PgUtil = require('../dados/PgUtil');
const Corretor = require('../entidades/Corretor');
const Endereco = require('../entidades/Endereco');
const ContaBancaria = require('../entidades/ContaBancaria');
const Banco = require('../entidades/Banco');
const Estado = require('../entidades/Estado');
const Cidade = require('../entidades/Cidade');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PsqlEnderecoDAO = require('./PsqlEnderecoDAO');
const FachadaDados = require('./FachadaDados');
const PsqlContaBancariaDAO = require('./PsqlContaBancariaDao');

class PsqlCorretorDAO{
    static instancia = new PsqlCorretorDAO();

    async obterPorId(id){
        try{
            const corretorQuery = "select * from corretores where id=$1";
            const resCorretor = await pool.query(corretorQuery,[id]);
            if(resCorretor.rowCount == 0){
                throw new EntidadeNaoEncontradaException("O corretor não existe");
            }
            let corretor = new Corretor();
            corretor.id = resCorretor.rows[0].id;
            corretor.codigo = resCorretor.rows[0].codigo;
            corretor.cpf = resCorretor.rows[0].cpf;
            corretor.nome = resCorretor.rows[0].cpf;
            corretor.dtNascimento = resCorretor.rows[0].dt_nascimento;
            corretor.ativo = resCorretor.rows[0].ativo;
            if(resCorretor.rows[0].endereco_id){
                const enderecoDAO = new PsqlEnderecoDAO();
                let endereco = await enderecoDAO.obterPorId(resCorretor.rows[0].endereco_id);
                corretor.endereco = endereco;
            }
            if(resCorretor.rows[0].conta_bancaria_id){
                let daoContaBancaria = new PsqlContaBancariaDAO();
                corretor.contaBancaria = await daoContaBancaria.obterPorId(resCorretor.rows[0].conta_bancaria_id);
            }
            return corretor;
        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async salvar(corretor){
        try{
            let enderecoId = null;
            let contaBancariaId = null;
            await pool.query('BEGIN');
            if(corretor.endereco){
                let queryEndereco =  "insert into enderecos (estado_id, cidade_id, cep, rua, numero, bairro, telefone) " +
                "values ($1, $2, $3, $4, $5, $6, $7) returning id";
                let estadoId = corretor.endereco.estado ? corretor.endereco.estado.id : null;
                let cidadeId = corretor.endereco.cidade ? corretor.endereco.cidade.id : null;
                let {rows} = await pool.query(queryEndereco, [estadoId, cidadeId,
                     corretor.endereco.cep, corretor.endereco.rua,corretor.endereco.numero, corretor.endereco.bairro, corretor.endereco.telefone]);
                enderecoId = rows[0].id;
            }
            if(corretor.contaBancaria){
                let queryContaBancaria = "insert into contas_bancarias (num_agencia, num_conta, digito, banco_id) values ($1, $2, $3, $4) returning id";
                let bancoId = corretor.contaBancaria.banco ? corretor.contaBancaria.banco.id : null
                const {rows} = await pool
                    .query(queryContaBancaria,[corretor.contaBancaria.numAgencia,
                         corretor.contaBancaria.numConta, corretor.contaBancaria.digito, bancoId]);
                contaBancariaId = rows[0].id;
            }
            const query = "insert into corretores (codigo, cpf, nome, dt_nascimento, conta_bancaria_id, endereco_id, ativo) " +
                        "values($1, $2, $3, $4, $5, $6, $7) returning id";
            const {rows} = await pool.query(query, [corretor.codigo, corretor.cpf, corretor.nome,
                 corretor.dtNascimento, contaBancariaId, enderecoId, corretor.ativo]);
            await pool.query('COMMIT');
            return rows[0];
            
        }catch(e){
            await pool.query('ROLLBACK');
            PgUtil.checkError(e);
        }
    }

    async listarTodos(){
        try{
            let corretores = [];
            const{rows} = await pool.query("select * from corretores");
            for(var i=0; i < rows.length ; i++){
                let corretor = new Corretor();
                corretor.id = rows[i].id;
                corretor.codigo = rows[i].codigo;
                corretor.nome = rows[i].nome;
                corretor.cpf = rows[i].cpf;
                corretor.dtNascimento = rows[i].dt_nascimento;
                corretor.ativo = rows[i].ativo;
                if(rows[i].endereco_id){
                    const queryEndereco = "select * from enderecos where id=$1";
                    const resEndereco = await pool.query(queryEndereco,[rows[i].endereco_id]);
                    let rowEndereco = resEndereco.rows[0];
                    let endereco = new Endereco();
                    endereco.id = rowEndereco.id;
                    endereco.cep = rowEndereco.cep;
                    endereco.rua = rowEndereco.rua;
                    endereco.numero = rowEndereco.numero;
                    endereco.bairro = rowEndereco.bairro;
                    endereco.telefone = rowEndereco.telefone;
                    
                    if(rowEndereco.estado_id){
                        const queryEstado = "select * from estados where id=$1";
                        const resEstado = await pool.query(queryEstado,[rowEndereco.estado_id]);
                        const rowEstado = resEstado.rows[0];
                        let estado = new Estado(rowEstado.id, rowEstado.sigla,rowEstado.nome);
                        endereco.estado = estado;
                    }

                    if(resEndereco.rows[0].cidade_id){
                        const queryCidade = "select * from cidades where id=$1";
                        const resCidade = await pool.query(queryCidade,[resEndereco.rows[0].cidade_id]);
                        let rowCidade = resCidade.rows[0];
                        let cidade = new Cidade();
                        cidade.id = rowCidade.id;
                        cidade.nome = rowCidade.nome;
                        if(endereco.estado){
                            cidade.estado = endereco.estado;
                        }
                        endereco.cidade = cidade;
                    }

                    corretor.endereco = endereco;
                    corretores.endereco = endereco;
                    
                }

                if(rows[i].conta_bancaria_id){
                    const queryConta = "select * from contas_bancarias where id=$1";
                    const resConta = await pool.query(queryConta,[rows[i].conta_bancaria_id]);
                    const rowConta = resConta.rows[0];
                    let contaBancaria = new ContaBancaria();
                    contaBancaria.id = rowConta.id;
                    contaBancaria.numAgencia = rowConta.num_agencia;
                    contaBancaria.numConta = rowConta.numConta; 
                    contaBancaria.digito = rowConta.digito;
                    if(rowConta.banco_id){
                        const queryBanco = "select * from bancos where id=$1";
                        const resBanco = await pool.query(queryBanco, [rowConta.banco_id]);
                        const rowBanco = resBanco.rows[0];
                        let banco = new Banco(rowBanco.id, rowBanco.codigo, rowBanco.nome);
                        contaBancaria.banco = banco;
                    }
                    corretor.contaBancaria = contaBancaria;
                }

                corretores.push(corretor);
            }
            return corretores;


        }catch(e){
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlCorretorDAO;