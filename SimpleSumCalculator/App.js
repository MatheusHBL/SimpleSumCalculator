import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Modal, StatusBar, KeyboardAvoidingView, Platform, Image } from 'react-native';

export default function App() {
  const [primeiroNumero, setPrimeiroNumero] = useState('');
  const [segundoNumero, setSegundoNumero] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [operacaoAtual, setOperacaoAtual] = useState('Soma');

  const validarNumero = (valor) => {
    return !isNaN(parseFloat(valor)) && isFinite(valor);
  };

  const calcular = () => {
    setErro('');
    
    if (!validarNumero(primeiroNumero) || !validarNumero(segundoNumero)) {
      setErro('Por favor, insira números válidos.');
      setResultado('');
      return;
    }
    
    const num1 = parseFloat(primeiroNumero);
    const num2 = parseFloat(segundoNumero);
    let resultadoCalculo = 0;
    
    switch (operacaoAtual) {
      case 'Soma':
        resultadoCalculo = num1 + num2;
        break;
      case 'Subtração':
        resultadoCalculo = num1 - num2;
        break;
      case 'Multiplicação':
        resultadoCalculo = num1 * num2;
        break;
      case 'Divisão':
        if (num2 === 0) {
          setErro('Não é possível dividir por zero.');
          setResultado('');
          return;
        }
        resultadoCalculo = num1 / num2;
        break;
      default:
        resultadoCalculo = num1 + num2;
    }
    
    if (Number.isInteger(resultadoCalculo)) {
      setResultado(resultadoCalculo.toString());
    } else {
      setResultado(resultadoCalculo.toFixed(6).replace(/\.?0+$/, ''));
    }
  };

  const limparCampos = () => {
    setPrimeiroNumero('');
    setSegundoNumero('');
    setResultado('');
    setErro('');
  };

  const trocarOperacao = (novaOperacao) => {
    setOperacaoAtual(novaOperacao);
    setMenuVisivel(false);
    setResultado('');
    setErro('');
  };

  const simboloOperacao = {
    'Soma': '+',
    'Subtração': '-',
    'Multiplicação': '×',
    'Divisão': '÷'
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Calculadora - {operacaoAtual}</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuVisivel(true)}
        >
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisivel}
        onRequestClose={() => setMenuVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha a Operação</Text>
            
            {['Soma', 'Subtração', 'Multiplicação', 'Divisão'].map((operacao) => (
              <TouchableOpacity
                key={operacao}
                style={[
                  styles.operacaoItem,
                  operacao === operacaoAtual && styles.operacaoAtiva
                ]}
                onPress={() => trocarOperacao(operacao)}
              >
                <Text style={[
                  styles.operacaoText,
                  operacao === operacaoAtual && styles.operacaoTextoAtivo
                ]}>
                  {operacao} {simboloOperacao[operacao]}
                </Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={styles.fecharModal}
              onPress={() => setMenuVisivel(false)}
            >
              <Text style={styles.fecharModalText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.calculadoraContainer}
      >
        <View style={styles.operacaoDisplay}>
          {/* Adicionando a imagem GIF acima do símbolo da operação */}
          <Image 
            source={require('./src/image/Dance.gif')}
            style={styles.dancingGif}
          />
          <Text style={styles.operacaoSymbol}>{simboloOperacao[operacaoAtual]}</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Primeiro número:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={primeiroNumero}
            onChangeText={setPrimeiroNumero}
            placeholder="Digite o primeiro número"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Segundo número:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={segundoNumero}
            onChangeText={setSegundoNumero}
            placeholder="Digite o segundo número"
          />
        </View>
        
        <View style={styles.botoesContainer}>
          <TouchableOpacity 
            style={styles.botao} 
            onPress={calcular}
          >
            <Text style={styles.textoBotao}>Calcular</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.botao, styles.botaoLimpar]} 
            onPress={limparCampos}
          >
            <Text style={styles.textoBotao}>Limpar</Text>
          </TouchableOpacity>
        </View>
        
        {erro ? (
          <Text style={styles.erro}>{erro}</Text>
        ) : resultado ? (
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoLabel}>Resultado:</Text>
            <Text style={styles.resultadoValor}>{resultado}</Text>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navBar: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 5,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  operacaoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  operacaoAtiva: {
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
  },
  operacaoText: {
    fontSize: 16,
    color: '#555',
  },
  operacaoTextoAtivo: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  fecharModal: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  fecharModalText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calculadoraContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  operacaoDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dancingGif: {
    width: 200,
    height: 270,
    marginBottom: 10,
  },
  operacaoSymbol: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  botao: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  botaoLimpar: {
    backgroundColor: '#f44336',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultadoContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultadoLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  resultadoValor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  erro: {
    color: '#f44336',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});