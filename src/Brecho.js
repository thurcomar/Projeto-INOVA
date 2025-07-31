import React, { useState, useEffect } from 'react';
import { FaTshirt, FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import './Brecho.css';
import { useNavigate } from 'react-router-dom';

function Brecho() {
  const [produtos, setProdutos] = useState(() => {
    const salvos = localStorage.getItem('produtosBrecho');
    return salvos ? JSON.parse(salvos) : [];
  });

  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    preco: '',
    tamanho: 'P',
    categoria: 'camiseta',
    condicao: 'nova',
    descricao: '',
    imagem: null,
    contato: ''
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();

  // Salvar produtos no localStorage quando houver mudanças
  useEffect(() => {
    localStorage.setItem('produtosBrecho', JSON.stringify(produtos));
  }, [produtos]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNovoProduto({
      ...novoProduto,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editandoId) {
      // Editar produto existente
      setProdutos(produtos.map(prod => 
        prod.id === editandoId ? { ...novoProduto, id: editandoId } : prod
      ));
      setEditandoId(null);
    } else {
      // Adicionar novo produto
      const novoProdutoComId = {
        ...novoProduto,
        id: Date.now(),
        dataCadastro: new Date().toISOString()
      };
      setProdutos([...produtos, novoProdutoComId]);
    }

    // Resetar formulário
    setNovoProduto({
      nome: '',
      preco: '',
      tamanho: 'P',
      categoria: 'camiseta',
      condicao: 'nova',
      descricao: '',
      imagem: null,
      contato: ''
    });
    setMostrarFormulario(false);
  };

  const editarProduto = (id) => {
    const produto = produtos.find(p => p.id === id);
    setNovoProduto(produto);
    setEditandoId(id);
    setMostrarFormulario(true);
  };

  const excluirProduto = (id) => {
    setProdutos(produtos.filter(prod => prod.id !== id));
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(termoBusca.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="brecho-container">
      <div className="controles-brecho">
        <div className="busca-container">
          <FaSearch className="icone-busca" />
          <input
            type="text"
            placeholder="Buscar roupas..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>
        
        <button 
          className="botao-adicionar"
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setEditandoId(null);
          }}
        >
          <FaPlus /> {mostrarFormulario ? 'Cancelar' : 'Vender Roupa'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="formulario-brecho">
          <h3>{editandoId ? 'Editar Produto' : 'Anunciar Novo Produto'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do Produto</label>
              <input
                type="text"
                name="nome"
                value={novoProduto.nome}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Preço (R$)</label>
              <input
                type="number"
                name="preco"
                value={novoProduto.preco}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Tamanho</label>
              <select
                name="tamanho"
                value={novoProduto.tamanho}
                onChange={handleInputChange}
              >
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
                <option value="Único">Único</option>
              </select>
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <select
                name="categoria"
                value={novoProduto.categoria}
                onChange={handleInputChange}
              >
                <option value="camiseta">Camiseta</option>
                <option value="calca">Calça</option>
                <option value="vestido">Vestido</option>
                <option value="casaco">Casaco</option>
                <option value="acessorio">Acessório</option>
              </select>
            </div>

            <div className="form-group">
              <label>Condição</label>
              <select
                name="condicao"
                value={novoProduto.condicao}
                onChange={handleInputChange}
              >
                <option value="nova">Nova</option>
                <option value="seminova">Seminova</option>
                <option value="usada">Usada</option>
              </select>
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="descricao"
                value={novoProduto.descricao}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Contato (WhatsApp)</label>
              <input
                type="text"
                name="contato"
                value={novoProduto.contato}
                onChange={handleInputChange}
                placeholder="(XX) XXXXX-XXXX"
                required
              />
            </div>

            <div className="form-group">
              <label>Imagem do Produto</label>
              <input
                type="file"
                name="imagem"
                onChange={handleInputChange}
                accept="image/*"
              />
            </div>

            <button type="submit" className="botao-anunciar">
              {editandoId ? 'Atualizar Anúncio' : 'Publicar Anúncio'}
            </button>
          </form>
        </div>
      )}

      <div className="lista-produtos">
        {produtosFiltrados.length > 0 ? (
          <div className="grid-produtos">
            {produtosFiltrados.map(produto => (
              <div key={produto.id} className="card-produto">
                <div className="produto-imagem">
                  {produto.imagem ? (
                    <img 
                      src={typeof produto.imagem === 'string' ? produto.imagem : URL.createObjectURL(produto.imagem)} 
                      alt={produto.nome} 
                    />
                  ) : (
                    <div className="imagem-placeholder">
                      <FaTshirt size={40} />
                    </div>
                  )}
                </div>
                <div className="info-produto">
                  <h4>{produto.nome}</h4>
                  <div className="detalhes">
                    <span>Tamanho: {produto.tamanho}</span>
                    <span className="preco">R$ {Number(produto.preco).toFixed(2)}</span>
                  </div>
                  <div className="tipo-anuncio">{produto.categoria}</div>
                  <p className="descricao">{produto.descricao}</p>
                  <div className="acoes-produto">
                    <button 
                      className="botao-editar"
                      onClick={() => editarProduto(produto.id)}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button 
                      className="botao-excluir"
                      onClick={() => excluirProduto(produto.id)}
                    >
                      <FaTrash /> Excluir
                    </button>
                  </div>
                  <a 
                    href={`https://wa.me/55${produto.contato.replace(/\D/g, '')}`} 
                    className="botao-contato"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contatar Vendedor
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="nenhum-produto">
            <p>Nenhum produto encontrado. {!mostrarFormulario && (
              <button 
                onClick={() => setMostrarFormulario(true)}
                className="link-adicionar"
              >
                Adicione o primeiro produto!
              </button>
            )}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Brecho;