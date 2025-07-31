import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from 'react-icons/fa';
import './ChatIA.css';

function ChatIA() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Mensagem inicial do assistente
  useEffect(() => {
    setMessages([
      {
        text: "Olá! Sou o assistente virtual do Brechó Vogue Tec. Posso te ajudar a encontrar roupas, dar dicas de moda ou ajudar com suas vendas. Como posso te ajudar hoje?",
        sender: 'ai'
      }
    ]);
  }, []);

  // Rolagem automática para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Adiciona mensagem do usuário
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulação de resposta da IA (substitua pela chamada real à API)
      const aiResponse = await simulateAIResponse(inputMessage);
      
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Desculpe, ocorreu um erro. Por favor, tente novamente mais tarde.", 
        sender: 'ai' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de simulação - substitua por uma chamada real à API da OpenAI
  const simulateAIResponse = async (message) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('ola') || lowerMessage.includes('oi')) {
          resolve("Olá! Como posso te ajudar com o brechó hoje?");
        } else if (lowerMessage.includes('tamanho') || lowerMessage.includes('medida')) {
          resolve("Posso te ajudar com tabelas de medidas! As peças no brechó geralmente têm estes tamanhos: P (pequeno), M (médio), G (grande), GG (extra grande). Quer saber mais sobre algum específico?");
        } else if (lowerMessage.includes('preço') || lowerMessage.includes('valor')) {
          resolve("Os preços são definidos pelos vendedores. Você pode negociar diretamente com eles através do botão 'Contatar' em cada anúncio. Posso te ajudar a encontrar peças dentro do seu orçamento se me disser quanto quer gastar.");
        } else {
          resolve("Eu sou especializado em ajudar com o brechó da Vogue Tec. Posso te ajudar a: \n1. Encontrar peças específicas \n2. Dar dicas de moda sustentável \n3. Ajudar a vender suas peças \n4. Explicar como funciona o brechó \n\nComo posso te ajudar?");
        }
      }, 1000);
    });
  };

  return (
    <div className={`chat-container ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button 
          className="chat-toggle-button"
          onClick={() => setIsOpen(true)}
        >
          <FaRobot /> Assistente
        </button>
      ) : (
        <div className="chat-box">
          <div className="chat-header">
            <h3><FaRobot /> Assistente do Brechó</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.sender === 'ai' ? 'ai-message' : 'user-message'}`}
              >
                <div className="message-icon">
                  {msg.sender === 'ai' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  {msg.text.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message ai-message">
                <div className="message-icon">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!inputMessage.trim() || isLoading}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatIA;