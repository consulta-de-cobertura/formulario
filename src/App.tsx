import React, { useState } from 'react';
import { ChevronDown, Wifi } from 'lucide-react';
import WhatsAppIcon from './components/WhatsAppIcon';

interface FormData {
  name: string;
  city: string;
  state: string;
  internetUse: string;
}

interface ValidationErrors {
  name: boolean;
  city: boolean;
  state: boolean;
  internetUse: boolean;
}

const brazilianStates = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 
  'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 
  'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 
  'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 
  'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 
  'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
];

const internetUseOptions = [
  {
    value: 'pessoal',
    label: 'Uso pessoal',
    description: 'Assistir vídeos, acessar redes sociais'
  },
  {
    value: 'familia',
    label: 'Uso em família',
    description: 'Uso em Wi-Fi, como roteadores, modems'
  },
  {
    value: 'trabalho',
    label: 'Uso para trabalho',
    description: 'Home office, reuniões online, atividades profissionais'
  },
  {
    value: 'viagens',
    label: 'Uso em viagens',
    description: 'Se locomovendo de uma cidade a outra - motoristas, taxistas, caminhoneiros, vendedores, motoboy, etc'
  },
  {
    value: 'empresa',
    label: 'Uso empresarial',
    description: 'Para estabelecimento comercial, loja, escritório'
  }
];

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    city: '',
    state: '',
    internetUse: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({
    name: false,
    city: false,
    state: false,
    internetUse: false
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Remove error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      name: formData.name.trim().length === 0,
      city: formData.city.trim().length === 0,
      state: formData.state.length === 0,
      internetUse: formData.internetUse.length === 0
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const generateWhatsAppMessage = () => {
    let useDescription = '';
    
    switch (formData.internetUse) {
      case 'pessoal':
        useDescription = 'uso pessoal como assistir vídeos e navegar nos apps';
        break;
      case 'familia':
        useDescription = 'usar com a família no Wi-Fi';
        break;
      case 'trabalho':
        useDescription = 'usar no trabalho';
        break;
      case 'viagens':
        useDescription = 'usar em viagens me locomovendo de uma cidade a outra';
        break;
      case 'empresa':
        useDescription = 'uso empresarial no meu estabelecimento';
        break;
      default:
        useDescription = 'uso geral';
    }
    
    return `Olá, me chamo ${formData.name}, sou de ${formData.city}, ${formData.state}, estou buscando internet para ${useDescription}. Quais os planos disponíveis para essa finalidade?`;
  };

  const handleWhatsAppClick = () => {
    if (validateForm()) {
      const message = encodeURIComponent(generateWhatsAppMessage());
      const whatsappUrl = `https://wa.me/5584981321396?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wifi className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Federal Associados</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto px-4">
            Antes de transferirmos você para o nosso atendente, poderia responder essas
            perguntinhas rápidas?
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 w-full mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {/* Question 1: Name */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Qual é o seu nome?
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sua resposta:
                </label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">Este campo é obrigatório</p>
                )}
              </div>
            </div>

            {/* Question 2: City */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Em qual cidade você mora?
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sua resposta:
                </label>
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                    errors.city ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">Este campo é obrigatório</p>
                )}
              </div>
            </div>

            {/* Question 3: State */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Em qual estado você mora?
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione seu estado:
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-left flex items-center justify-between bg-white text-sm sm:text-base ${
                      errors.state ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <span className={formData.state ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.state || 'Escolha seu estado'}
                    </span>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {brazilianStates.map((state) => (
                        <button
                          key={state}
                          onClick={() => {
                            handleInputChange('state', state);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm sm:text-base"
                        >
                          {state}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.state && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">Este campo é obrigatório</p>
                )}
              </div>
            </div>

            {/* Question 4: Internet Use */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Como você utilizar a internet?
              </h2>
              <div className={`space-y-3 ${errors.internetUse ? 'p-2 sm:p-3 border-2 border-red-500 rounded-lg bg-red-50' : ''}`}>
                {internetUseOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleInputChange('internetUse', option.value)}
                    className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                      formData.internetUse === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 mt-0.5 flex-shrink-0 ${
                        formData.internetUse === option.value
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.internetUse === option.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">{option.label}</div>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{option.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {errors.internetUse && (
                  <p className="text-red-500 text-xs sm:text-sm mt-2">Selecione uma opção</p>
                )}
              </div>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span>FALAR COM ATENDENTE</span>
            </button>
            <p className="text-xs text-gray-500 text-center mt-3 px-2">
              Você será direcionado ao WhatsApp com suas informações já preenchidas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;