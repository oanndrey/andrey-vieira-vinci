import v1Lateral from '../assets/img/v1-lateral.webp'
import v1Detalhe from '../assets/img/v1-detalhe.webp'
import v2Lateral from '../assets/img/v2-lateral.webp'
import v2Detalhe from '../assets/img/v2-detalhe.webp'
import v3Lateral from '../assets/img/v3-lateral.webp'
import v3Detalhe from '../assets/img/v3-detalhe.webp'

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."

export const modelos = [
  {
    id: 'v1',
    nome: 'VINCI MODEL V1',
    curto: 'MODELO V1',
    chamada: 'O hatch elétrico feito para a cidade',
    descricao: lorem,
    imagem: v1Lateral,
    detalhe: v1Detalhe,
    ficha: {
      'Potência:': '220 cavalos',
      'Autonomia:': '420km por carga',
      'Peso:': '1.250 kg',
      'Tecnologia:': 'GPS e Smartlink',
    },
    destaques: [
      { valor: '420 KM', rotulo: 'com 1 carga' },
      { valor: '2.400 RPM', rotulo: 'de torque' },
      { valor: '8 anos', rotulo: 'garantia' },
    ],
  },
  {
    id: 'v2',
    nome: 'VINCI MODEL V2',
    curto: 'MODELO V2',
    chamada: 'A SUV mais robusta da categoria',
    descricao: lorem,
    imagem: v2Lateral,
    detalhe: v2Detalhe,
    ficha: {
      'Potência:': '300 cavalos',
      'Autonomia:': '500km por carga',
      'Peso:': '1.500 kg',
      'Tecnologia:': 'GPS e Smartlink',
    },
    destaques: [
      { valor: '520 KM', rotulo: 'com 1 carga' },
      { valor: '2.800 RPM', rotulo: 'de torque' },
      { valor: '10 anos', rotulo: 'garantia' },
    ],
  },
  {
    id: 'v3',
    nome: 'VINCI MODEL V3',
    curto: 'MODELO V3',
    chamada: 'Luxo e desempenho sem emissões',
    descricao: lorem,
    imagem: v3Lateral,
    detalhe: v3Detalhe,
    ficha: {
      'Potência:': '380 cavalos',
      'Autonomia:': '610km por carga',
      'Peso:': '1.720 kg',
      'Tecnologia:': 'GPS e Smartlink',
    },
    destaques: [
      { valor: '610 KM', rotulo: 'com 1 carga' },
      { valor: '3.200 RPM', rotulo: 'de torque' },
      { valor: '10 anos', rotulo: 'garantia' },
    ],
  },
]

export function buscarModelo(id) {
  return modelos.find((m) => m.id === id)
}
