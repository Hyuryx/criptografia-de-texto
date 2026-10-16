# Criptografia de Textos // Matrix Neural Cipher v2.0

![Status](https://img.shields.io/badge/STATUS-OPERACIONAL-00ff66?style=for-the-badge)
![Encryption](https://img.shields.io/badge/CIPHER-MATRIX_NEURAL_v2.0-00f0ff?style=for-the-badge)
![Tech](https://img.shields.io/badge/HTML5_CSS3_JS_ES6-000000?style=for-the-badge&logo=javascript)

Aplicação web futurista de criptografia e decodificação de texto de alta segurança, inspirada na estética **Matrix / Cyberpunk**, com vídeo de fundo imersivo, chuva digital Matrix procedimental em canvas, terminal HUD responsivo e um motor criptográfico proprietário exclusivo.

---

## ⚡ Principais Melhorias Implementadas (v2.0)

### 1. 🧠 Motor Criptográfico Proprietário (Matrix Neural Cipher)
- **Criptografia Real e Profunda:** Substituição do modelo simplificado de vogais por uma pipeline criptográfica robusta baseada em chave mestra proprietária, S-Box de 256 bytes exclusiva, difusão dinâmica com keystream modular e permutação de blocos.
- **Suporte Total a Caracteres:** Criptografa e embaralha qualquer texto — incluindo letras maiúsculas e minúsculas, **números (0-9)**, acentuação em português (á, é, í, ó, ú, ç, ã, õ), símbolos especiais, quebras de linha e até emojis.
- **Exclusividade da Aplicação:** O texto criptografado se transforma em uma sequência cifrada indecifrável por decodificadores convencionais externos (Base64, Rot13, etc.), sendo reversível exclusivamente por meio deste aplicativo.
- **Compatibilidade Retroativa:** Consegue detectar e decodificar mensagens antigas no formato do desafio original.

### 2. 🟢 Design Cyberpunk Matrix de Alto Padrão
- **Paleta de Cores Matrix Verde Fluorescente:** Substituição dos gradientes genéricos por tons neon (`#00ff66`, `#00ff41`, `#39ff14`), superfícies em glassmorphism com desfoque de fundo e contornos cibernéticos chanfrados.
- **Chuva Digital Matrix Interativa (Canvas):** Efeito clássico de caracteres Matrix caindo na tela com variações de brilho e velocidade, com botão para ativar/desativar em tempo real.
- **Preservação do Vídeo de Fundo:** O vídeo original (`assets/video.mp4`) atua como camada de fundo em harmonia com a chuva de código e as scanlines CRT sutis.

### 3. 📱 100% Responsivo e Fluido
- Redesenhado do zero para adaptar-se com perfeição em **telas mobile (smartphones), tablets e monitores widescreen**.
- Eliminação de posições absolutas desalinhadas e margens negativas; layout em grade flexível com terminais expansíveis.

### 4. 🛠️ Controles e Usabilidade Futurista
- **Animação de Decodificação Matrix:** Efeito visual de embaralhamento de caracteres nos terminais durante a criptografia e descriptografia.
- **Inverter Terminais (SWAP):** Botão rápido para trocar o texto de entrada com a saída.
- **Sistema de Notificações Toast:** Avisos holográficos flutuantes com barra de progresso para confirmações e alertas.
- **Contador de Caracteres em Tempo Real:** Monitoramento dinâmico em cada terminal.
- **Atalhos Rápidos:** Botões de copiar, colar da área de transferência e limpar terminal.

---

## 🚀 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Hyuryx/criptografia-de-texto.git
   cd criptografia-de-texto
   ```

2. **Abra o projeto:**
   - Basta abrir o arquivo `index.html` em qualquer navegador web moderno, ou
   - Iniciar um servidor local (exemplo: `python -m http.server 8080` ou Live Server do VS Code).

3. **Deploy Automático para GitHub & Vercel:**
   - Dê um duplo clique no arquivo `deploy.bat` na raiz do projeto. Ele adicionará as alterações, criará o commit e fará o push para o GitHub, disparando a publicação automática na Vercel.

---

## 📂 Estrutura de Arquivos

```
criptografia-de-texto/
├── assets/
│   ├── fundo1.jpg       # Avatar / Operador Matrix
│   ├── fundo2.jpg       # Holograma radar do terminal de saída
│   ├── icone.jpg        # Favicon e logo do sistema
│   └── video.mp4        # Vídeo de fundo em loop
├── js/
│   ├── app.js           # Orquestrador da interface, animações e toasts
│   ├── cipher.js        # Motor Matrix Neural Cipher v2.0
│   ├── json.js          # Arquivo de compatibilidade
│   └── som.js           # Controlador do áudio HUD e equalizador
├── music/
│   └── jazz.mp3         # Trilha sonora ambiente
├── style/
│   └── style.css        # Folha de estilos Matrix com design system responsivo
├── index.html           # Interface principal estruturada
└── README.md            # Documentação completa
```

---

## 🛡️ Licença

Este projeto está sob a licença MIT. Desenvolvido por [Hyury](https://github.com/Hyuryx?tab=repositories).
