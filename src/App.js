import React, { useState } from 'react';
import { 
  FaUser, 
  FaCity, 
  FaUsers, 
  FaEnvelope, 
  FaPlay, 
  FaArrowRight, 
  FaSignInAlt,
  FaTshirt
} from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Brecho from './Brecho';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/brecho" element={<MainContent secaoAtiva="brecho" />} />
          <Route path="/*" element={<MainContent />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainContent({ secaoAtiva: secaoInicial = 'inicio' }) {
  const [secaoAtiva, setSecaoAtiva] = useState(secaoInicial);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const navigate = useNavigate();

  const renderizarSecao = () => {
    switch (secaoAtiva) {
      case 'comissao':
        return (
          <div className="secao-conteudo">
            <div className="cabecalho-secao">
              <FaUsers className="icone-secao" />
              <h2>Grupo</h2>
            </div>
            <div className="equipe-container">
              <h3 className="subtitulo-equipe">Conheça nosso time de especialistas</h3>
              <div className="membros-equipe">
                <div className="membro">
                  <img src="/Projeto-INOVA/imagens/equipe1.jpg" alt="Ana Catarina" />
                  <h4>Ana Catarina</h4>
                  <div className="redes-sociais">
                    <a href="#"><span className="icone-linkedin"></span></a>
                    <a href="#"><span className="icone-twitter"></span></a>
                  </div>
                </div>
                <div className="membro">
                  <img src="/Projeto-INOVA/imagens/equipe2.jpg" alt="Ricardo Moura" />
                  <h4>Arthur Renato</h4>
                  <div className="redes-sociais">
                    <a href="#"><span className="icone-linkedin"></span></a>
                    <a href="#"><span className="icone-twitter"></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'cartista':
        return (
          <div className="secao-conteudo">
            <div className="cabecalho-secao">
              <FaEnvelope className="icone-secao" />
              <h2>Cursos</h2>
            </div>
            <div className="cartas-container">
              <div className="carta-item">
                <div className="data-carta">15/03/2023</div>
                <h3 className="titulo-carta">O futuro da moda tecnológica</h3>
                <p className="resumo-carta">Nossa visão para os próximos 5 anos no mercado de wearables...</p>
                <a href="#" className="ler-mais">Assinar Curso <FaArrowRight /></a>
              </div>
              <div className="carta-item">
                <div className="data-carta">22/01/2023</div>
                <h3 className="titulo-carta">Tecnologia sustentável</h3>
                <p className="resumo-carta">Como estamos reduzindo nosso impacto ambiental...</p>
                <a href="#" className="ler-mais">Assinar Curso <FaArrowRight /></a>
              </div>
              <div className="carta-item">
                <div className="data-carta">10/12/2022</div>
                <h3 className="titulo-carta">Tecidos tecnologicos</h3>
                <p className="resumo-carta">Detalhes do nosso projeto premiado com a prefeitura...</p>
                <a href="#" className="ler-mais">Assinar Curso <FaArrowRight /></a>
              </div>
            </div>
          </div>
        );
case 'brecho':
  return (
    <div className="secao-conteudo">
      <div className="cabecalho-secao">
        <FaTshirt className="icone-secao" />
        <h2>Brechó Vogue Tec</h2>
        <span className="destaque-tag">Moda Sustentável</span>
      </div>
      <div className="anuncio-brecho">
        <h3>Venda ou compre peças incríveis!</h3>
        <p>Nosso brechó tecnológico conecta quem quer vender peças usadas em ótimo estado com quem busca achados exclusivos.</p>
        
        <div className="destaque-brecho">
          <div className="vantagem">
            <div className="icone-vantagem">🔄</div>
            <p>Economia circular</p>
          </div>
          <div className="vantagem">
            <div className="icone-vantagem">💰</div>
            <p>Preços acessíveis</p>
          </div>
          <div className="vantagem">
            <div className="icone-vantagem">🌱</div>
            <p>Sustentabilidade</p>
          </div>
        </div>
        
        <button 
          className="botao-principal"
          onClick={() => navigate('/brecho')}
        >
          Acessar Brechó
        </button>
      </div>
    </div>
  );
      case 'video':
        return (
          <div className="secao-conteudo">
            <div className="cabecalho-secao">
              <FaPlay className="icone-secao" />
              <h2>Vídeo</h2>
            </div>
            <div className="video-container">
              <iframe width="1296" height="729" src="https://www.youtube.com/embed/msts778LKOs" title="VogueTec" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="galeria-videos">
              <h3 className="subtitulo-galeria">Mais vídeos</h3>
              <div className="lista-videos">
                <div className="video-miniatura">
                  <img src="/Projeto-INOVA/imagens/thumb1.jpg" alt="Tecnologia Wearable" />
                  <div className="titulo-miniatura">Tecnologia Wearable</div>
                </div>
                <div className="video-miniatura">
                  <img src="/Projeto-INOVA/imagens/thumb3.jpg" alt="Projetos Recentes" />
                  <div className="titulo-miniatura">Projetos Recentes</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="secao-conteudo">
            <div className="banner-principal">
              <h1>Bem-vindo a <span className="destaque-titulo">VogueTec</span></h1>
              <p className="subtitulo-banner">Onde moda e tecnologia se encontram</p>
              <button className="botao-principal">Conheça nossos serviços</button>
            </div>
            
            <div className="destaques-container">
              <div className="destaque-item">
                <div className="icone-destaque">💻</div>
                <h3>Soluções Tecnológicas</h3>
                <p>Sistemas personalizados para o seu negócio</p>
              </div>
              <div className="destaque-item">
                <div className="icone-destaque">👗</div>
                <h3>Inovação em Moda</h3>
                <p>Tecnologia wearable de última geração</p>
              </div>
              <div className="destaque-item">
                <div className="icone-destaque">✨</div>
                <h3>Design Exclusivo</h3>
                <p>Interfaces que combinam estilo e funcionalidade</p>
              </div>
            </div>
            
            <div className="sobre-nos">
              <div className="texto-sobre">
                <h2>Sobre a Vogue Tec</h2>
                <p>
                  Somos uma empresa especializada em soluções tecnológicas personalizadas para o seu negócio, 
                  sempre atentos às tendências de moda e tecnologia para oferecer o melhor. 
                  A combinação entre inovação e estilo define novas filosofias de trabalho.
                </p>
                <p>
                  Conheça nossos serviços e descubra como a tecnologia pode transformar a sua marca ou seu estilo pessoal.
                </p>
              </div>
              <div className="imagem-sobre">
                <img src="/Projeto-INOVA/imagens/sobre-nos.jpg" alt="Equipe Vogue Tec" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <header className="cabecalho">
        <div className="container-cabecalho">
          <div className="logo-container">
            <img src="/Projeto-INOVA/imagens/logo-vogue-tec.png" alt="Vogue Tec Logo" className="logo" />
          </div>

          <button 
  className={`botao-nav brecho-destaque ${secaoAtiva === 'brecho' ? 'ativo' : ''}`}
  onClick={() => {
    setSecaoAtiva('brecho');
    setMenuMobileAberto(false);
    navigate('/brecho');
  }}
>
  <FaTshirt className="icone-nav" /> Brechó
  <span className="badge-novo">NOVO</span>
</button>
          
          <button 
            className="botao-menu-mobile"
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
          >
            ☰
          </button>
          
          <nav className={`navegacao ${menuMobileAberto ? 'aberto' : ''}`}>
            <button 
              className={`botao-nav ${secaoAtiva === 'inicio' ? 'ativo' : ''}`}
              onClick={() => {
                setSecaoAtiva('inicio');
                setMenuMobileAberto(false);
              }}
            >
              Início
            </button>
            <button 
              className={`botao-nav ${secaoAtiva === 'comissao' ? 'ativo' : ''}`}
              onClick={() => {
                setSecaoAtiva('comissao');
                setMenuMobileAberto(false);
              }}
            >
              <FaUsers className="icone-nav" /> Comissão
            </button>
            <button 
              className={`botao-nav ${secaoAtiva === 'cartista' ? 'ativo' : ''}`}
              onClick={() => {
                setSecaoAtiva('cartista');
                setMenuMobileAberto(false);
              }}
            >
              <FaEnvelope className="icone-nav" /> Cursos
            </button>
            <button 
              className={`botao-nav ${secaoAtiva === 'video' ? 'ativo' : ''}`}
              onClick={() => {
                setSecaoAtiva('video');
                setMenuMobileAberto(false);
              }}
            >
              <FaPlay className="icone-nav" /> Vídeo
            </button>
            <button 
              className={`botao-nav ${secaoAtiva === 'brecho' ? 'ativo' : ''}`}
              onClick={() => {
                setSecaoAtiva('brecho');
                setMenuMobileAberto(false);
                navigate('/brecho');
              }}
            >
              <FaTshirt className="icone-nav" /> Brechó
            </button>
            <button 
              className="botao-nav"
              onClick={() => {
                setMenuMobileAberto(false);
                navigate('/login');
              }}
            >
              <FaSignInAlt className="icone-nav" /> Login
            </button>
          </nav>
        </div>
      </header>

      <main className="conteudo-principal">
        {renderizarSecao()}
      </main>

      <footer className="rodape">
        <div className="container-rodape">
          <div className="coluna-rodape">
            <h4>Vogue Tec</h4>
            <p>Inovação em tecnologia e moda desde 1995</p>
            <div className="redes-sociais-rodape">
              <a href="#"><span className="icone-facebook"></span></a>
              <a href="#"><span className="icone-instagram"></span></a>
              <a href="#"><span className="icone-linkedin"></span></a>
              <a href="#"><span className="icone-youtube"></span></a>
            </div>
          </div>
          <div className="coluna-rodape">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Serviços</a></li>
              <li><a href="#">Portfólio</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>
          <div className="coluna-rodape">
            <h4>Contato</h4>
            <p>VogueTec@gmail.com</p>
            <p>(34) 98899-9169</p>
            <p>R. Abrão José Bittar, 100 - Araxá MG</p>
          </div>
        </div>
        <div className="copyright">
          <p>© {new Date().getFullYear()} Vogue Tec - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default App;