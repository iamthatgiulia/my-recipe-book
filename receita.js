let sectionReceita = document.getElementById("receita-completa");


// Obtém o ID da receita a partir da URL
 let urlParams = new URLSearchParams(window.location.search);
 let receitaId = urlParams.get('id'); 

// Muda o título da página
mudarTitle = (receita) => {
  let html = `
      ${receita.titulo}
  `;
  return html;
}

renderizarReceita = (receita) => {
    let html = `
    <div class="item-resultado">
            <h1>${receita.titulo}</h1>
            <p>Tempo de preparo: ${receita.tempoPreparo}</p>
            <h2>Ingredientes</h2>
            <ul>
               ${receita.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
            </ul>
            <h2>Instruções</h2>
            <ol>
                 ${receita.passos.map(passo => `<li>${passo}</li>`).join('')}
            </ol>
        </div>
    `;
    return html;
}

//A Acha o id de cada receita e compara com o parâmetro id da função
exibirReceita = (id) => {
  const receita = dados.find(receita => receita.id == id);
  if (receita) {
    sectionReceita.innerHTML = renderizarReceita(receita);
    document.title = mudarTitle(receita);
  } else {
    sectionReceita.innerHTML = `<p class="mensagem">Receita não encontrada.</p>`;
  }
}
// Adiciona um ID único para cada receita nos dados
  dados.forEach((dado, index) => {
  dado.id = index;
  });

exibirReceita(receitaId)
