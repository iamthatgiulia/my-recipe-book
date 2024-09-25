// Get Element by ID- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - <3

let section = document.getElementById("resultados-pesquisa");
let inputPesquisa = document.getElementById("busca");
let botaoBuscar = document.getElementById("botao-buscar");
let botaoTodos = document.getElementById("botao-todos");
let botaoDoces = document.getElementById("botao-doces");
let botaoSalgados = document.getElementById("botao-salgados");
let botaoMilagre = document.getElementById("botao-milagre");

// Funções- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - <3

// Função para buscar a receita no input
buscar = (pesquisa) => {
    if(pesquisa == "" || pesquisa == " "){
        section.innerHTML = `<p class="mensagem">Campo de busca vazio.</p>`;
        return;
    };

    let resultados = "";
  
    let regex = new RegExp(`(${pesquisa})`, "gi");

    let dadosFiltrados = dados.filter(dado =>
        dado.titulo.toLowerCase().includes(pesquisa) || dado.titulo.toLocaleLowerCase().includes(pesquisa) 
        || dado.descricao.toLocaleLowerCase().includes(pesquisa) || dado.descricao.toLowerCase().includes(pesquisa)
    );

    if (dadosFiltrados.length === 0) {
        section.innerHTML = `<p class="mensagem">Nenhum resultado encontrado.</p>`;
        return;
    };
  
    for (let dado of dadosFiltrados) {
        let tituloDestacado = dado.titulo.replace(regex, `<mark style="background-color: #F79F81; color: #fcd9b7">$1</mark>`);
        let descricaoDestacado = dado.descricao.replace(regex, `<mark style="background-color: #F79F81; color: #fcd9b7">$1</mark>`);

        resultados += `
        <div class="item-resultado">
            <h2>
                ${tituloDestacado}
            </h2>
            <p class="descricao-meta">
                ${descricaoDestacado}
            </p>
            <a href="receita.html?id=${dado.id}" target="_blank" ">Clique aqui para a receita completa</a>
        </div>
    `;
    }

        section.innerHTML = resultados;
    }

// Função para mostrar as receitas ao clicar nos botões
mostrarReceitas = (listaReceitas) => {
        section.innerHTML = listaReceitas.map(receita =>
            `<div class="item-resultado">
                <h2>
                    ${receita.titulo}
                </h2>
                <p class="descricao-meta">
                    ${receita.descricao}
                </p>
                <a href="receita.html?id=${receita.id}" target="_blank" id="link-receita-completa">Clique aqui para a receita completa</a>
            </div>`
        ).join('');
    }

// Muda a cor dos botões ao serem selecionados
mudarCor = (botao) => {
    const botoes = document.querySelectorAll('.btn')
    botoes.forEach(btn => btn.classList.remove('selected'));
    botao.classList.add('selected');
}

// Event Listener - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - <3
    // acionando a função 'buscar' quando a tecla Enter é pressionada.
    inputPesquisa.addEventListener("keypress", function (event) {
        if (event.key === 'Enter') {
            buscar(inputPesquisa.value);
        }
    });
    // acionando a função 'buscar' quando o botão buscar é pressionado.
    botaoBuscar.addEventListener("click", function (event) {
        buscar(inputPesquisa.value);
        event.stopPropagation();
    });
    // acionando a função 'buscar' a cada digitação do usuário.
    inputPesquisa.addEventListener("input", function (event) {
          let pesquisa = event.target.value.toLowerCase();
          buscar(pesquisa);
     });
    // limpando a seção de resultados quando o usuário clica fora do campo de pesquisa ou da seção de resultados.
    document.addEventListener("click", function (event) {
        if (!inputPesquisa.contains(event.target) && !section.contains(event.target)) {
        section.innerHTML = "";
        inputPesquisa.value = "";
        mudarCor(this);
         }
     });
     // Adiciona as funções mostrarReceitas() e mudarCor() aos botões:
    botaoTodos.addEventListener("click", function(event) {
        mostrarReceitas(dados);
        event.stopPropagation();
        mudarCor(this);
    })

    botaoSalgados.addEventListener("click", function(event){
        const receitasSalgadas = dados.filter(receita => receita.categoria === "Salgados");
        mostrarReceitas(receitasSalgadas);
        event.stopPropagation();
        mudarCor(this);
    })

    botaoDoces.addEventListener("click", function(event){
        const receitasDoces = dados.filter(receita => receita.categoria === "Doces");
        mostrarReceitas(receitasDoces);
        event.stopPropagation();
        mudarCor(this);
    })
    

