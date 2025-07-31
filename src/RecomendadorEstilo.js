import React, { useState } from 'react';
import { FaRegSmile, FaRegLightbulb, FaArrowRight, FaRedo } from 'react-icons/fa';
import './RecomendadorEstilo.css';

const RecomendadorEstilo = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const questions = [
    {
      question: "Qual estilo combina mais com você?",
      options: [
        { text: "Casual", icon: "👕", desc: "Conforto no dia a dia" },
        { text: "Elegante", icon: "👔", desc: "Looks sofisticados" },
        { text: "Esportivo", icon: "👟", desc: "Estilo ativo" },
        { text: "Romântico", icon: "🌸", desc: "Delicado e feminino" }
      ]
    },
    {
      question: "Para qual ocasião precisa de looks?",
      options: [
        { text: "Dia a dia", icon: "🏙️", desc: "Looks cotidianos" },
        { text: "Trabalho", icon: "💼", desc: "Estilo profissional" },
        { text: "Festa", icon: "🎉", desc: "Looks para festas" },
        { text: "Evento especial", icon: "✨", desc: "Ocasiões únicas" }
      ]
    },
    {
      question: "Suas cores preferidas:",
      options: [
        { text: "Neutras", icon: "⚪", desc: "Preto, branco, bege" },
        { text: "Coloridas", icon: "🌈", desc: "Cores vibrantes" },
        { text: "Escuras", icon: "⚫", desc: "Tons profundos" },
        { text: "Pastéis", icon: "🍥", desc: "Tons suaves" }
      ]
    }
  ];

  const recommendations = {
    "Casual-Dia a dia-Neutras": {
      look: "Jeans clássico + Camiseta branca + Tênis",
      desc: "Perfeito para seu dia a dia com conforto e estilo!",
      items: ["Calça Jeans", "Camiseta Básica", "Tênis Branco"]
    },
    "Elegante-Trabalho-Escuras": {
      look: "Blazer preto + Camisa social + Calça de alfaiataria",
      desc: "Look profissional que transmite confiança e sofisticação.",
      items: ["Blazer Preto", "Camisa Social", "Calça Alfaiataria"]
    },
    // ... outras combinações
    default: {
      look: "Jeans + Camiseta básica + Tênis casual",
      desc: "Um look versátil que nunca sai de moda!",
      items: ["Calça Jeans", "Camiseta Básica", "Tênis Casual"]
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      generateRecommendation(newAnswers);
    }
  };

  const generateRecommendation = (answers) => {
    const answerKeys = answers.map(a => a.text);
    const recommendationKey = answerKeys.join('-');
    setRecommendation(recommendations[recommendationKey] || recommendations.default);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setRecommendation(null);
  };

  return (
    <div className="recomendador-container">
      {!showQuiz ? (
        <div className="recomendador-hero">
          <h2><FaRegLightbulb /> Descubra seu estilo ideal</h2>
          <p>Responda 3 perguntas e nossa IA sugerirá looks perfeitos do nosso brechó</p>
          <button 
            onClick={() => setShowQuiz(true)}
            className="cta-button"
          >
            Começar agora <FaArrowRight />
          </button>
        </div>
      ) : recommendation ? (
        <div className="recommendation-result">
          <h3><FaRegSmile /> Seu estilo recomendado:</h3>
          <div className="look-box">
            <p className="look-title">{recommendation.look}</p>
            <p className="look-desc">{recommendation.desc}</p>
            <div className="recommended-items">
              <h4>Peças sugeridas:</h4>
              <ul>
                {recommendation.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <button onClick={resetQuiz} className="cta-button">
            <FaRedo /> Fazer novamente
          </button>
        </div>
      ) : (
        <div className="quiz-step">
          <h3>{questions[step].question}</h3>
          <div className="options-grid">
            {questions[step].options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleAnswer(option)}
                className="option-card"
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-text">{option.text}</span>
                <span className="option-desc">{option.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecomendadorEstilo;