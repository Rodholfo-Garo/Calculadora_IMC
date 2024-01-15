import { useState } from "react";
import styles from './Formulario.module.css'

// Componente de formulário para calcular o IMC
const Formulario = () => {
    // Estados para armazenar o nome, peso, altura e IMC
    const [nome, setNome] = useState('');
    const [peso, setPeso] = useState();
    const [altura, setAltura] = useState();
    // o estado imc é inicializado com o valor null para indicar que ainda não há um valor de IMC calculado
    const [imc, setImc] = useState(null);

   // Estado para armazenar a classificação do IMC
   const [classificacao, setClassificacao] = useState(''); 

    // Recuperar o nome Digitado
    const alteraNome = (e) =>{
        setNome(e.target.value);
    }

    // Função para classificar o IMC
    const classificaIMC = (imc) => {
        switch (true) {
          case imc < 17:
            return 'Muito abaixo do peso';
          case imc >= 17 && imc <= 18.49:
            return 'Abaixo do peso';
          case imc >= 18.5 && imc <= 24.99:
            return 'Peso normal';
          case imc >= 25 && imc <= 29.99:
            return 'Acima do peso';
          case imc >= 30 && imc <= 34.99:
            return 'Obesidade I';
          case imc >= 35 && imc <= 39.99:
            return 'Obesidade II (severa)';
          case imc > 40:
            return 'Obesidade III (mórbida)';
          default:
            return 'Classificação não encontrada';
        }
      };

     // Função para calcular o IMC quando o formulário é enviado
    const calculaIMC = (e) =>{
        e.preventDefault();
        const calcAltura = altura / 100;// Converte altura para metros
        const calcIMC = (peso / (calcAltura * calcAltura)).toFixed(2);// Calcula o IMC e limita a duas casas decimais
        setImc(calcIMC);// Atualiza o estado do IMC com o valor calculado
        setClassificacao(classificaIMC(calcIMC)); // Atualiza a classificação do IMC
    }

  return (
    <div className="container">
    <form  className={styles.form} onSubmit={calculaIMC}>
        <h1 className={styles.title}>Calculadora de IMC</h1>
         {/* Campo de entrada para o nome do usuário */}
         {/* value={nome} garante que o valor do campo seja sempre o mesmo que o estado nome */}
        <input className={styles.campo} type="text" placeholder="Digite Seu nome" value={nome} onChange={alteraNome}/>

        <input className={styles.campo} type="number" placeholder="Digite Seu Peso em Kg"  onChange={e => setPeso(parseFloat(e.target.value))}/>

        {console.log(peso)}

        <input className={styles.campo} type="number" placeholder="Digite Sua Altura em cm"  value={altura} onChange={evento => setAltura(parseFloat(evento.target.value))}/>

        <button className={`${styles.campo} ${styles.btn}`} type="submit">CALCULAR</button>
        {/* Mensagem exibida com o IMC calculado após o envio do formulário */}

        {imc && classificacao && <p>Olá {nome}, seu índice IMC é {imc} e você está classificado como: {classificacao}</p>}

       
    </form>
    </div>
  );
};

export default Formulario;
