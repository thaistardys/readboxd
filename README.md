# 🎬 Readboxd

<p align="center">
  <img src="https://shields.io" alt="Mobile First">
  <img src="https://shields.io" alt="Flexbox">
  <img src="https://shields.io" alt="JavaScript Vanilla">
</p>

> Um organizador de leituras pessoal e responsivo inspirado no design do Letterboxd. Adicione, edite, filtre e avalie seus livros favoritos em uma interface moderna e fluida.

---

## 📱 Sobre o Projeto

O **Readboxd** é um aplicativo web criado para os amantes de livros organizarem suas estantes virtuais. O projeto foi desenvolvido com foco em boas práticas de estruturação, utilizando o conceito de **Mobile First** (otimizado para celulares e adaptável para telas grandes) e manipulação dinâmica do DOM sem a necessidade de frameworks externos.

### 🚀 Funcionalidades

- **CRUD Completo:** Adicione, visualize, edite e remova livros da sua lista.
- **Status de Leitura Interativo:** Botões customizados que mudam de cor para indicar se o livro está *Lido* (Verde), *Em Andamento* (Laranja) ou *Não Iniciado* (Vermelho).
- **Avaliação por Estrelas:** Sistema visual de 1 a 5 estrelas para dar nota às suas leituras.
- **Painel de Contadores Inteligente:** Estatísticas em tempo real que também funcionam como **filtros clicáveis** para segmentar sua estante.
- **Busca Dinâmica:** Barra de pesquisa por título que filtra os cards instantaneamente enquanto você digita.
- **Sinopses Inteligentes:** Textos longos são encurtados automaticamente com a opção de expansão "Ver mais / Ver menos".
- **Textarea Fluido:** Caixa de texto que cresce sozinha conforme o tamanho da sua sinopse.
- **Persistência de Dados:** Integração com o `LocalStorage` para manter seus dados salvos mesmo após fechar o navegador.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando apenas tecnologias web nativas:

- **HTML5:** Estruturação semântica da página.
- **CSS3:** Estilização moderna baseada puramente em **Flexbox** e Media Queries para responsividade (*Mobile First*).
- **JavaScript (Vanilla):** Lógica de negócios de forma limpa, utilizando escuta de eventos (`addEventListener`) e seletores (`querySelector`), sem nenhum código inline no HTML.

---

## 📸 Demonstração do Layout

O projeto se adapta de forma harmônica aos diferentes dispositivos:

- **Mobile:** Relação de formulário e lista empilhados para facilitar o toque e a leitura em celulares.
- **Desktop:** Visual em duas colunas, mantendo o formulário de cadastro fixado na lateral esquerda enquanto você navega pela sua coleção à direita.

---

## 🔧 Como Executar o Projeto

1. Clone este repositório em sua máquina:
   ```bash
   git clone https://github.com
   ```
2. Navegue até a pasta do projeto:
   ```bash
   cd readboxd
   ```
3. Abra o arquivo `index.html` em seu navegador de preferência ou utilize a extensão *Live Server* no VS Code.

---

## 📝 Licença

Todos os direitos reservados &copy; 2026.
