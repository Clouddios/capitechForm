const estrelas = document.querySelectorAll('#stars span');
let nota = 0;

// Efeito hover e seleção
estrelas.forEach((estrela, idx) => {
  estrela.addEventListener('mouseenter', () => {
    for (let i = 0; i <= idx; i++) {
      estrelas[i].classList.add('hovered');
    }
  });
  estrela.addEventListener('mouseleave', () => {
    estrelas.forEach(e => e.classList.remove('hovered'));
  });
  estrela.addEventListener('click', () => {
    nota = parseInt(estrela.dataset.value);
    estrelas.forEach((e, i) => {
      e.textContent = i < nota ? '★' : '☆';
      e.classList.toggle('selected', i < nota);
    });
  });
});

function resetStars() {
  estrelas.forEach(e => {
    e.textContent = '☆';
    e.classList.remove('selected');
  });
}

function enviar() {
  const comentario = document.getElementById("comentario").value;
  const resposta = document.getElementById("resposta");
  const btn = document.getElementById("btnEnviar");

  resposta.style.color = "#2e7d32";
  resposta.textContent = "";

  if (nota === 0) {
    resposta.style.color = "#d32f2f";
    resposta.textContent = "Por favor, selecione uma nota de 1 a 5.";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Enviando...";

  fetch("https://script.google.com/macros/s/AKfycbzdC-DLjdgCcyVNbnngqc7LLbKzSkv9NvvkjrnqS-R2M3tTh9sb-1dkDpg3nRKbeLUDmQ/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nota, comentario })
  })
  .then(() => {
    resposta.textContent = "Obrigado pela sua avaliação!";
    resposta.style.color = "#2e7d32";
    document.getElementById("comentario").value = "";
    resetStars();
    nota = 0;
  })
  .catch(() => {
    resposta.textContent = "Erro ao enviar. Tente novamente mais tarde.";
    resposta.style.color = "#d32f2f";
  })
  .finally(() => {
    btn.disabled = false;
    btn.textContent = "Enviar Avaliação";
  });
}
