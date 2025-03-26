import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  ScrollView
} from 'react-native';
import { TextInput, List, Card } from 'react-native-paper';

export default function App() {
  const [cep, setCep] = React.useState('');
  const [rua, setRua] = React.useState('');
  const [bairro, setBairro] = React.useState('');
  const [cidade, setCidade] = React.useState('');
  const [estadoSelecionado, setEstadoSelecionado] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [user, setUser] = React.useState(null); 

  class Result {
    constructor(nome, email, cep, rua, bairro, cidade, estado) {
      this.nome = nome;
      this.email = email;
      this.cep = cep;
      this.rua = rua;
      this.bairro = bairro;
      this.cidade = cidade;
      this.estado = estado;
    }
  }

  const estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  function limpar() {
    setRua('');
    setBairro('');
    setCidade('');
    setCep('');
    setEstadoSelecionado('');
    setNome('');
    setEmail('');
    setUser(null);
  }

  const BuscarCep = (xcep) => {
    if (xcep.length !== 8) {
      alert('CEP inválido! Digite um CEP com 8 dígitos.');
      return;
    }

    let Url = `https://viacep.com.br/ws/${xcep}/json/`;
    fetch(Url)
      .then((resp) => resp.json())
      .then((dados) => {
        if (dados.erro) {
          alert('CEP não encontrado.');
        } else {
          setRua(dados.logradouro);
          setCidade(dados.localidade);
          setBairro(dados.bairro);

          const estadoEncontrado = estados.find(extr => extr.sigla === dados.uf);
          if (estadoEncontrado) {
            setEstadoSelecionado(estadoEncontrado.nome);
          }

          setUser(new Result(nome, email, xcep, dados.logradouro, dados.bairro, dados.localidade, estadoEncontrado?.nome));
        }
      })
      .catch(() => {
        alert('Erro ao buscar o CEP.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Title title="Cadastro de Endereço" />
          <Card.Content>

            <TextInput
              label="Nome"
              value={nome}
              onChangeText={setNome}
              keyboardType="default"
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="CEP"
              value={cep}
              onChangeText={setCep}
              onBlur={() => BuscarCep(cep)}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Rua"
              value={rua}
              onChangeText={setRua}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Bairro"
              value={bairro}
              onChangeText={setBairro}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Cidade"
              value={cidade}
              onChangeText={setCidade}
              mode="outlined"
              style={styles.input}
            />

            <List.Accordion title={`Estado: ${estadoSelecionado || 'Selecionar'}`} style={styles.listAccordion}>
              {estados.map((estado) => (
                <List.Item
                  key={estado.sigla}
                  title={estado.nome}
                  onPress={() => setEstadoSelecionado(estado.nome)}
                />
              ))}
            </List.Accordion>

          </Card.Content>

          <View style={styles.buttonContainer}>
            <Button title="Limpar" onPress={limpar} color="#d9534f"/>
            <Button title="Buscar CEP" onPress={() => BuscarCep(cep)} color="#0275d8" />
          </View>
        </Card>
        {/*79831332*/}
        {user && (
          <View style={styles.resultContainer}>
            <Text style={styles.textFocus}>Nome:<Text style={styles.text}> {user.nome}</Text></Text>
            <Text style={styles.textFocus}>E-mail:<Text style={styles.text}> {user.email}</Text></Text>
            <Text style={styles.textFocus}>CEP:<Text style={styles.text}> {user.cep}</Text></Text>
            <Text style={styles.textFocus}>Rua:<Text style={styles.text}> {user.rua}</Text></Text>
            <Text style={styles.textFocus}>Bairro:<Text style={styles.text}> {user.bairro}</Text></Text>
            <Text style={styles.textFocus}>Cidade:<Text style={styles.text}> {user.cidade}</Text></Text>
            <Text style={styles.textFocus}>Estado:<Text style={styles.text}> {user.estado}</Text></Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  card: {
    padding: 10,
    margin: 10,
  },
  input: {
    marginBottom: 10,
  },
  listAccordion: {
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  resultContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#dcdc',
    borderBottomWidth: 3,
    borderBottomColor: '#dcdc'
  },
  textFocus:{
    fontWeight: 'bold'
  },
  text:{
    fontWeight: 'normal',
    color: 'gray'
  }
});

