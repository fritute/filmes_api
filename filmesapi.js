'use strict'

async function pesquisarFotos(filme) {
  const url = `https://imdb.iamidiotareyoutoo.com/search?q=${filme}`
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data.description;
  } else {
    console.error(`Erro ao buscar fotos: ${response.status}`)
    return [];
  }
}

function criarImagem(link) {
  const galeria = document.getElementById('galeria')
  const novaImg = document.createElement('img')
  novaImg.src = link
  galeria.appendChild(novaImg)
}

async function preencherFotosdeFilmes() {
  const filme = document.getElementById('filme').value
  const galeria = document.getElementById('galeria')

  galeria.replaceChildren('')

  const fotos = await pesquisarFotos(filme)
  if (fotos && fotos.length > 0) {
    fotos.forEach((foto) => {
      if (foto['#IMG_POSTER']) {
        criarImagem(foto['#IMG_POSTER'])
      }
    });
  } else {
    console.log('Nenhuma foto encontrada')
  }
}

document.getElementById('pesquisar').addEventListener('click', preencherFotosdeFilmes)