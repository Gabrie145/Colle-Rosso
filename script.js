/* ========================================
   1. MENU PARA CELULARES
======================================== */

const botaoMenu = document.getElementById("botao-menu");
const menuPrincipal = document.getElementById("menu-principal");

if (botaoMenu && menuPrincipal) {

    botaoMenu.addEventListener("click", function () {

        const menuAberto = menuPrincipal.classList.toggle("aberto");

        botaoMenu.setAttribute("aria-expanded", menuAberto);

        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );

        botaoMenu.textContent = menuAberto ? "✕" : "☰";

    });


    // Fecha o menu depois que uma página é selecionada.

    menuPrincipal.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            menuPrincipal.classList.remove("aberto");

            botaoMenu.setAttribute("aria-expanded", "false");

            botaoMenu.setAttribute("aria-label", "Abrir menu");

            botaoMenu.textContent = "☰";

        });

    });

}


/* ========================================
   2. CARROSSEL DE VINHOS
======================================== */

const trilhoVinhos = document.getElementById("trilho-vinhos");

const botaoAnterior = document.getElementById("vinho-anterior");

const botaoProximo = document.getElementById("proximo-vinho");

const contadorVinhos = document.getElementById("contador-vinhos");

const indicadoresVinhos = document.getElementById("indicadores-vinhos");


if (
    trilhoVinhos &&
    botaoAnterior &&
    botaoProximo &&
    contadorVinhos &&
    indicadoresVinhos
) {

    const cartoesVinhos = Array.from(
        trilhoVinhos.querySelectorAll(".cartao-vinho")
    );

    let vinhoAtual = 0;

    const totalVinhos = cartoesVinhos.length;


    // Cria os indicadores automaticamente.

    cartoesVinhos.forEach(function (cartao, indice) {

        const indicador = document.createElement("button");

        indicador.type = "button";

        indicador.classList.add("indicador-vinho");

        indicador.setAttribute(
            "aria-label",
            "Mostrar vinho " + (indice + 1)
        );

        indicador.addEventListener("click", function () {

            mostrarVinho(indice);

        });

        indicadoresVinhos.appendChild(indicador);

    });


    const indicadores = Array.from(
        indicadoresVinhos.querySelectorAll(".indicador-vinho")
    );


    // Atualiza o cartão, o contador e as setas.

    function atualizarCarrossel() {

        contadorVinhos.textContent =
            "Vinho " + (vinhoAtual + 1) + " de " + totalVinhos;


        indicadores.forEach(function (indicador, indice) {

            const selecionado = indice === vinhoAtual;

            indicador.classList.toggle("ativo", selecionado);

            if (selecionado) {

                indicador.setAttribute("aria-current", "true");

            } else {

                indicador.removeAttribute("aria-current");

            }

        });


        botaoAnterior.disabled = vinhoAtual === 0;

        botaoProximo.disabled = vinhoAtual === totalVinhos - 1;

    }


    // Mostra o vinho selecionado.

    function mostrarVinho(indice) {

        vinhoAtual = Math.max(
            0,
            Math.min(indice, totalVinhos - 1)
        );


        trilhoVinhos.scrollTo({

            left: cartoesVinhos[vinhoAtual].offsetLeft
                - cartoesVinhos[0].offsetLeft,

            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth"

        });


        atualizarCarrossel();

    }


    // Avança para o próximo vinho.

    botaoProximo.addEventListener("click", function () {

        mostrarVinho(vinhoAtual + 1);

    });


    // Retorna ao vinho anterior.

    botaoAnterior.addEventListener("click", function () {

        mostrarVinho(vinhoAtual - 1);

    });


    // Permite navegar pelas setas do teclado.

    trilhoVinhos.addEventListener("keydown", function (evento) {

        if (evento.key === "ArrowRight") {

            evento.preventDefault();

            mostrarVinho(vinhoAtual + 1);

        }

        if (evento.key === "ArrowLeft") {

            evento.preventDefault();

            mostrarVinho(vinhoAtual - 1);

        }

    });


    // Atualiza o indicador se o visitante deslizar
    // manualmente pelo celular ou pela barra de rolagem.

    let temporizadorRolagem;

    trilhoVinhos.addEventListener("scroll", function () {

        window.clearTimeout(temporizadorRolagem);

        temporizadorRolagem = window.setTimeout(function () {

            const posicaoAtual = trilhoVinhos.scrollLeft;

            let indiceMaisProximo = 0;

            let menorDistancia = Infinity;


            cartoesVinhos.forEach(function (cartao, indice) {

                const posicaoCartao =
                    cartao.offsetLeft - cartoesVinhos[0].offsetLeft;

                const distancia = Math.abs(
                    posicaoCartao - posicaoAtual
                );


                if (distancia < menorDistancia) {

                    menorDistancia = distancia;

                    indiceMaisProximo = indice;

                }

            });


            vinhoAtual = indiceMaisProximo;

            atualizarCarrossel();

        }, 80);

    });


    // Configuração inicial.

    atualizarCarrossel();

}


/* ========================================
   3. CURIOSIDADES EXPANSÍVEIS
======================================== */

const botoesCuriosidades = document.querySelectorAll(
    ".botao-curiosidade"
);


botoesCuriosidades.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const idConteudo = botao.getAttribute("aria-controls");

        const conteudo = document.getElementById(idConteudo);

        const simbolo = botao.querySelector(".simbolo");


        if (!conteudo) {

            return;

        }


        const estaAberto =
            botao.getAttribute("aria-expanded") === "true";


        // Abre ou fecha a explicação.

        botao.setAttribute(
            "aria-expanded",
            String(!estaAberto)
        );


        conteudo.hidden = estaAberto;


        // Alterna o símbolo entre + e −.

        if (simbolo) {

            simbolo.textContent = estaAberto ? "+" : "−";

        }

    });

});