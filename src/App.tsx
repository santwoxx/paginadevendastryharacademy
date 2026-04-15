/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Gamepad2, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  HelpCircle,
  Star,
  DollarSign,
  PlayCircle,
  Lock,
  Clock,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const Button = ({ children, onClick, className = "", variant = "primary" }: { children: ReactNode, onClick?: () => void, className?: string, variant?: "primary" | "secondary" }) => {
  const baseStyles = "w-full py-4 px-6 md:px-8 rounded-xl font-bold text-base md:text-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]",
    secondary: "bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600/10"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-12 md:py-24 px-4 md:px-6 max-w-5xl mx-auto ${className}`}>
    {children}
  </section>
);

const Card = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <div className={`bg-gray-900/50 border border-gray-800 p-6 rounded-2xl ${className}`}>
    {children}
  </div>
);

// --- Types ---

type Segment = 'parent' | 'student' | null;

// --- Quiz Component ---

const Quiz = ({ onComplete }: { onComplete: (segment: Segment) => void }) => {
  const [step, setStep] = useState(0);
  const [segment, setSegment] = useState<Segment>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const parentQuestions = [
    {
      title: "Qual a idade do seu filho(a)?",
      options: [
        { text: "4 a 7 anos", value: "kids" },
        { text: "8 a 12 anos", value: "junior" },
        { text: "13+ anos", value: "teen" }
      ]
    },
    {
      title: "Qual a maior dificuldade dele(a) hoje?",
      options: [
        { text: "Falta de interesse nos estudos", value: "interest" },
        { text: "Dificuldade em entender os cálculos", value: "math" },
        { text: "Vício em jogos improdutivos", value: "screens" }
      ]
    },
    {
      title: "Você gostaria de recuperar o valor investido apenas compartilhando o jogo com outros pais?",
      options: [
        { text: "Sim, seria excelente", value: "yes" },
        { text: "Se for natural, sim", value: "natural" }
      ]
    }
  ];

  const studentQuestions = [
    {
      title: "Qual o seu nível de dificuldade em matemática?",
      options: [
        { text: "Tenho muita dificuldade", value: "hard" },
        { text: "Consigo ir bem, mas quero melhorar", value: "medium" },
        { text: "Sou bom, mas quero dominar tudo", value: "easy" }
      ]
    },
    {
      title: "Você gostaria de ter sua própria renda enquanto estuda?",
      options: [
        { text: "Sim, meu sonho", value: "dream" },
        { text: "Sim, ajudaria muito", value: "help" },
        { text: "Talvez, se for fácil", value: "maybe" }
      ]
    },
    {
      title: "Você tem 30 minutos por dia para postar vídeos prontos?",
      options: [
        { text: "Sim, com certeza", value: "yes" },
        { text: "Tenho pouco tempo, mas consigo", value: "maybe" }
      ]
    }
  ];

  const handleNext = (value: any) => {
    if (step === 0) {
      setSegment(value as Segment);
      setStep(1);
    } else {
      const currentQuestions = segment === 'parent' ? parentQuestions : studentQuestions;
      if (step < currentQuestions.length) {
        setStep(step + 1);
      } else {
        setIsCalculating(true);
        setTimeout(() => {
          onComplete(segment);
        }, 2000);
      }
    }
  };

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-12 md:w-16 h-12 md:h-16 border-4 border-blue-600 border-t-transparent rounded-full mb-6"
        />
        <h2 className="text-xl md:text-2xl font-bold mb-2 px-4">
          {segment === 'parent' ? "Analisando o perfil do seu filho..." : "Validando seu perfil de estudante..."}
        </h2>
        <p className="text-sm md:text-base text-gray-400">Preparando seu acesso exclusivo ao Tryhard Academy.</p>
      </div>
    );
  }

  const currentQuestions = segment === 'parent' ? parentQuestions : studentQuestions;
  const currentQuestion = step === 0 
    ? { 
        title: "Qual o seu perfil hoje?", 
        options: [
          { text: "Sou pai/mãe e quero ajudar meu filho", value: "parent" }, 
          { text: "Sou estudante/jovem e quero aprender e lucrar", value: "student" }
        ] 
      }
    : currentQuestions[step - 1];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-6">
      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-md w-full"
      >
        <div className="mb-6 md:mb-8 text-center">
          <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-[10px] md:text-xs font-bold rounded-full mb-4 uppercase tracking-widest">
            Etapa {step + 1} de {segment ? currentQuestions.length + 1 : 2}
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight px-2">{currentQuestion.title}</h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleNext(opt.value)}
              className="w-full p-4 text-left bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-600 hover:bg-gray-800 transition-all group flex justify-between items-center"
            >
              <span className="font-medium text-sm md:text-base">{opt.text}</span>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

declare global {
  interface Window {
    fbq: any;
  }
}

export default function App() {
  const [showSalesPage, setShowSalesPage] = useState(false);
  const [segment, setSegment] = useState<Segment>(null);

  const trackEvent = (event: string, data?: any) => {
    if (window.fbq) {
      window.fbq('track', event, data);
    }
  };

  // Scroll to top and track PageView when switching to sales page
  useEffect(() => {
    if (showSalesPage) {
      window.scrollTo(0, 0);
      trackEvent('PageView');
      trackEvent('Lead', { content_category: segment });
    }
  }, [showSalesPage, segment]);

  const checkoutUrl = "https://pay.cakto.com.br/u5h6im8_850195";

  const handleCheckout = () => {
    trackEvent('InitiateCheckout', {
      value: 47.00,
      currency: 'BRL',
      content_name: 'Tryhard Academy Vitalício'
    });
    window.open(checkoutUrl, '_blank');
  };

  if (!showSalesPage) {
    return <Quiz onComplete={(seg) => { setSegment(seg); setShowSalesPage(true); }} />;
  }

  const isParent = segment === 'parent';

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-600/30">
      {/* Header / Hero */}
      <header className="relative pt-12 md:pt-24 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-xs md:text-sm font-bold mb-6 md:mb-8 uppercase tracking-tighter"
          >
            <Zap className="w-4 h-4 fill-current" />
            {isParent ? "O Jogo que Transforma Notas em 10" : "O Produto que Pais Compram Todos os Dias"}
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white uppercase px-2 md:px-0">
            {isParent 
              ? "Seu filho não precisa parar de jogar… ele só precisa jogar isso — e você ainda pode ganhar dinheiro."
              : "Você não precisa parar de jogar… você só precisa jogar isso — e ainda ganhar dinheiro."}
          </h1>

          <p className="text-lg md:text-2xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
            {isParent
              ? "O jogo que faz seu filho aprender matemática… e ainda paga você por isso."
              : "O jogo que te faz aprender matemática… e ainda te paga por isso."}
          </p>

          <div className="max-w-sm mx-auto px-4 md:px-0">
            <Button onClick={handleCheckout} className="py-5 md:py-6 text-lg md:text-xl">
              {isParent ? "SIM! QUERO MEU FILHO BOM EM MATEMÁTICA" : "QUERO DESBLOQUEAR MEU ACESSO AGORA"}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-[10px] md:text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Acesso Vitalício + Garantia Incondicional
            </p>
          </div>
        </div>
      </header>

      {/* A Indicação Natural */}
      <Section className="bg-blue-600/10 border-y border-blue-600/20 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-md">
            <h2 className="text-xl md:text-2xl font-black text-blue-400 mb-2 uppercase">
              {isParent ? "A indicação que se paga sozinha" : "O sistema que se paga sozinho"}
            </h2>
            <p className="text-sm md:text-base text-gray-300">
              {isParent
                ? "Com apenas 2 indicações, você recupera 100% do investimento e transforma o jogo em uma renda automática."
                : "Com apenas 2 indicações, você recupera 100% do investimento e transforma o jogo em uma renda automática."}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-black/40 p-4 md:p-6 rounded-2xl border border-blue-600/30 w-full md:w-auto justify-center">
            <div className="text-center">
              <p className="text-[10px] md:text-xs text-gray-500 uppercase">Seu Acesso</p>
              <p className="text-lg md:text-xl font-bold">R$ 47</p>
            </div>
            <div className="h-8 w-px bg-gray-800" />
            <div className="text-center">
              <p className="text-[10px] md:text-xs text-gray-500 uppercase">2 Indicações</p>
              <p className="text-lg md:text-xl font-bold text-green-500">R$ 79,90 NO PIX</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pais ajudando Pais */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 uppercase leading-tight px-2 md:px-0">
              {isParent ? "Você não está comprando um jogo…" : "Você não está comprando um jogo…"}
            </h2>
            <p className="text-sm md:text-base text-gray-400 mb-4 px-4 md:px-0 font-bold text-blue-400">
              {isParent
                ? "…está entrando em um sistema que ensina e paga."
                : "…está entrando em um sistema que ensina e paga."}
            </p>
            <p className="text-sm md:text-base text-gray-400 mb-4 px-4 md:px-0">
              {isParent
                ? "Em vez de tirar o celular, você dá a ele o Tryhard Academy. Ele joga, se diverte e, sem perceber, domina a matemática que antes era um pesadelo."
                : "Aprenda matemática jogando e use nosso sistema pronto para gerar renda. É a combinação perfeita de educação e lucro."}
            </p>
            <p className="text-sm md:text-base text-gray-400 px-4 md:px-0">
              {isParent
                ? "É a solução que todo pai procura. Por isso, quando você compartilha no grupo da escola, a venda acontece de forma 100% natural."
                : "É o nicho mais lucrativo e fácil de vender hoje. Com nossos vídeos virais, você atrai centenas de interessados todos os dias."}
            </p>
          </div>
          <Card className="bg-blue-600/5 border-blue-600/20 p-5 md:p-6 mx-2 md:mx-0">
            <h4 className="font-bold mb-4 flex items-center gap-2 justify-center md:justify-start">
              <Users className="w-5 h-5 text-blue-400" />
              {isParent ? "Recupere seu investimento hoje" : "Seu negócio pronto para rodar"}
            </h4>
            <ul className="space-y-3 text-xs md:text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                {isParent ? "Compartilhe o link no grupo da escola" : "Poste os vídeos prontos no TikTok/Reels"}
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                {isParent ? "Mostre o progresso do seu filho" : "Atraia pais interessados no orgânico"}
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                Receba 85% de comissão por indicação
              </li>
              <li className="flex gap-2 font-bold text-white">
                <span className="text-blue-400">✓</span>
                {isParent ? "O jogo sai de graça com 2 envios" : "Lucro imediato com apenas 2 vendas"}
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Como Funciona o Jogo */}
      <Section className="bg-gray-900/30">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase px-4">Por que o Tryhard Academy é Imbatível?</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="flex flex-col gap-4 border-l-4 border-l-blue-600 p-5 md:p-6">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500">
              <Gamepad2 className="w-5 md:w-6 h-5 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold">Dopamina do Bem</h3>
            <p className="text-sm md:text-base text-gray-400">
              Usamos a mesma mecânica dos jogos viciantes para prender a atenção do seu filho no que importa: <strong>aprender matemática de verdade</strong>.
            </p>
          </Card>

          <Card className="flex flex-col gap-4 border-l-4 border-l-blue-600 p-5 md:p-6">
            <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500">
              <Star className="w-5 md:w-6 h-5 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold">Zero Frustração</h3>
            <p className="text-sm md:text-base text-gray-400">
              O jogo identifica onde ele trava e ajusta o desafio. Ele sente que está vencendo, e essa confiança transborda para as provas da escola.
            </p>
          </Card>
        </div>
      </Section>

      {/* O que você recebe */}
      <Section>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase px-4">O que você desbloqueia agora:</h2>
          <p className="text-sm md:text-base text-gray-400">Um ecossistema completo de aprendizado e renda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {[
            { icon: <Gamepad2 />, title: "Jogo Tryhard Academy (Vitalício)", desc: "Acesso ilimitado ao sistema gamificado que ensina matemática de verdade." },
            { icon: <Users />, title: "Licença de Afiliado Master", desc: "Direito de usar nosso sistema para lucrar 85% em cada indicação." },
            { icon: <Zap />, title: "Sistema de Comissões Automáticas", desc: "Receba seus lucros direto no PIX através da Cakto, sem burocracia." },
            { icon: <PlayCircle />, title: "Pack de Criativos Virais", desc: "Nós já fizemos os vídeos e as copys. Você só precisa postar e lucrar." },
            { icon: <Lock />, title: "Estratégia de Venda Rápida", desc: "O script exato para recuperar seu investimento nas primeiras 24 horas." },
            { icon: <TrendingUp />, title: "Suporte VIP no WhatsApp", desc: "Acompanhamento total para garantir que você aprenda e lucre." }
          ].map((item, i) => (
            <div key={i}>
              <Card className="flex gap-3 md:gap-4 items-start h-full hover:border-blue-600/50 transition-colors p-4 md:p-6">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-sm md:text-base">{item.title}</h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Redução de Objeções */}
      <Section className="bg-gray-900/30">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase px-4">Perguntas Frequentes</h2>
        </div>

        <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto px-2">
          <div className="flex gap-3 md:gap-4">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 shrink-0">
              <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6" />
            </div>
            <div>
              <h4 className="font-bold mb-1 text-sm md:text-base">"Eu não sei vender nada..."</h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Você não precisa vender nada. Nós já fizemos tudo: criativos, estratégia e produto validado. Sua única função é postar ou indicar.</p>
            </div>
          </div>
          <div className="flex gap-3 md:gap-4">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 shrink-0">
              <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6" />
            </div>
            <div>
              <h4 className="font-bold mb-1 text-sm md:text-base">"Eu não tenho filhos, posso lucrar?"</h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Com certeza! A maioria dos nossos maiores afiliados não tem filhos. Eles apenas aproveitam a alta demanda de pais que querem o jogo.</p>
            </div>
          </div>
          <div className="flex gap-3 md:gap-4">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 shrink-0">
              <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6" />
            </div>
            <div>
              <h4 className="font-bold mb-1 text-sm md:text-base">"Não sou bom em matemática, consigo usar?"</h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">O jogo foi feito para ensinar. Se você quer aprender, ele é perfeito. Se quer apenas lucrar, você não precisa saber matemática para indicar.</p>
            </div>
          </div>
          <div className="flex gap-3 md:gap-4">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 shrink-0">
              <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6" />
            </div>
            <div>
              <h4 className="font-bold mb-1 text-sm md:text-base">"Isso funciona mesmo?"</h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">Sim! O jogo é baseado em métodos de ensino gamificados comprovados. E o sistema de indicação já pagou milhares de reais em comissões.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Oferta Final */}
      <Section id="oferta" className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase px-4">Não é apenas um jogo, é a sua nova realidade</h2>
          
          <Card className="border-2 border-blue-600 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black p-6 md:p-10 mx-2 md:mx-0">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] md:text-[10px] font-bold px-4 md:px-6 py-1 rotate-45 translate-x-4 md:translate-x-6 translate-y-2 md:translate-y-3 uppercase tracking-widest">
              OFERTA ÚNICA
            </div>

            <p className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-xs md:text-sm">Acesso ao Sistema Tryhard Academy</p>
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Aprenda Matemática + Lucro de 85% Vitalício</h3>

            <div className="mb-8 md:mb-10">
              <p className="text-gray-500 line-through text-lg md:text-xl">De: R$ 97,00</p>
              <p className="text-5xl md:text-7xl font-black text-white my-2">R$ 47,00</p>
              <p className="text-xs md:text-gray-400">Pagamento único. Sem taxas mensais.</p>
            </div>

            <Button onClick={handleCheckout} className="animate-pulse py-5 md:py-6 text-lg md:text-xl">
              QUERO TESTAR HOJE E DESBLOQUEAR MEU ACESSO
            </Button>

            <p className="mt-6 text-xs text-gray-400 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              O preço subirá para R$ 97 em breve.
            </p>
          </Card>
        </div>
      </Section>
      {/* FAQ Rápido */}
      <Section className="bg-gray-900/30">
        <div className="max-w-2xl mx-auto space-y-3 md:space-y-4">
          {[
            { q: "Como meu filho recebe o acesso?", a: "Imediatamente após o pagamento, você recebe um e-mail com o link do jogo para qualquer dispositivo." },
            { q: "Como funciona a indicação?", a: "Dentro da plataforma, você terá seu link exclusivo. Se outro pai comprar pelo seu link, você recebe 85% de comissão (R$ 39,95 por venda) direto na sua conta." },
            { q: "O jogo é seguro?", a: "Sim, ambiente 100% livre de anúncios e focado apenas em educação e diversão saudável." },
            { q: "E se meu filho não gostar?", a: "Você tem 7 dias de garantia. Se não for o que esperava, devolvemos seu dinheiro sem perguntas." }
          ].map((item, i) => (
            <details key={i} className="group bg-black border border-gray-800 rounded-xl overflow-hidden mx-2 md:mx-0">
              <summary className="p-4 cursor-pointer font-bold flex justify-between items-center hover:bg-gray-900 transition-colors text-sm md:text-base">
                {item.q}
                <ChevronRight className="w-4 md:w-5 h-4 md:h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="p-4 text-xs md:text-sm text-gray-400 border-t border-gray-800 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-gray-600 text-xs border-t border-gray-900">
        <p className="mb-4">© 2026 Tryhard Academy. Todos os direitos reservados.</p>
        <p className="max-w-xl mx-auto">
          Este site não faz parte do Facebook ou do Google. Além disso, este site NÃO é endossado pelo Facebook ou Google de nenhuma maneira. Resultados podem variar de pessoa para pessoa.
        </p>
      </footer>
    </div>
  );
}
