# Decodificador de Texto - Challenge Decodificador de Texto - T7 One

Este aplicativo foi feito com base no "Challenge Decodificador de Texto" do projeto Oracle Next education em parceria com a Alura.

# Sobre o Projeto

Este projeto é um aplicativo de criptografia e descriptografia de texto que permite ao usuário criptografar e descriptografar mensagens. O objetivo do projeto é aplicar os conhecimentos adquiridos durante o curso de programação para iniciantes oferecido pela Alura em parceria com a Oracle.

# Descrição do Site de Criptografia e Descriptografia de Textos
    Design e Estilo
      ° O site possui um design inspirado em um ambiente hacker, com tons esverdeados.
      ° O fundo do site apresenta uma animação de códigos de programação, criando um clima imersivo.
      ° Foi implementado um efeito de partículas em todo o corpo do site, adicionando dinamismo visual.

# Funcionalidades Principais

# 1. Botões de Ação:

      ° Criptografia: Botão que permite criptografar o texto inserido pelo usuário.

      ° Descriptografia: Botão que permite descriptografar o texto inserido.

      ° Copiar: Botão que copia o texto criptografado ou descriptografado para a área de transferência.

      ° Resetar: Botão que limpa os campos de entrada e saída de texto.

# 2. Sistema de Som:

     ° Ambientação: Ao abrir a janela do navegador, o usuário é recebido com uma opção ao lado superior direito da pagina que permite um ambiente relaxante enquanto acessa.

# 3. Controles de Som:

    ° Play: Inicia a reprodução do som ambiente.
    ° Pause: Pausa a reprodução do som.
    ° Stop: Para a reprodução do som completamente.

# Interação com o Usuário
  # Campos de Texto:
    ° Entrada: Um campo onde o usuário pode inserir o texto que deseja criptografar ou descriptografar.
    ° Saída: Um campo que exibe o resultado da criptografia ou descriptografia.

# Rodapé
      ° Contatos e Redes Sociais: No rodapé do site, há um link para o meu perfil no GitHub, onde os usuários podem encontrar outros projetos de minha autoria.

## Desenvolvimento

No desenvolvimento deste projeto, utilizamos HTML como base para criar a estrutura do `index.html`. O CSS foi empregado para estilizar o projeto, incluindo animações de partículas, ícones flutuantes, botões animados e a aplicação das cores escolhidas.

Para estruturar a lógica do projeto, utilizamos JavaScript ES6, selecionando elementos pelo DOM e utilizando `import` e `export` para uma organização clara e legível dos scripts. Isso permitiu a importação eficiente dos áudios e a implementação da inteligência da página.

## Estrutura do Projeto

- **assets/**: Contém as imagens e video usados no projeto.
- **js/**: Contém os arquivos JavaScript.
- **music/**: Contém os arquivos de som.
- **style/**: Contém os arquivos CSS divididos em vários módulos para maior facilidade de manutenção.
- **index.html**: Arquivo HTML principal.

## Instalação

1. Faça um clone do repositorio utilizando o seguinte comando abaixo:
    ```sh
    git clone https://github.com/Hyuryx/criptografia-de-texto.git
    ```
    
## Uso
1. Acesse o link: https://criptografia-de-texto.vercel.app/

2. Outra forma é abra o arquivo `index.html` em seu navegador para usar o aplicativo.

3. Após digitar sua mensagem, clique em `Criptografia` e na caixa a direita irá mostrar sua mensagem Criptografada. Clique em copiar para adicionar a mensagem Criptografada ao clipboard.

4. Para Descriptografar, basta colar a sua mensagem e clicar em `Descriptografar'. E em seguida você irá ver sua mensagem descriptografada.

5. Você também tem a opção de Resetar a mensagem, caso não queira dar continuidade nas opções de Criptografia/Descriptografar.


## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
