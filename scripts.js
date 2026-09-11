let botao = document.querySelector(".botao-gerar");
let chaveGroq = ""
let endereco = "https://api.groq.com/openai/v1/chat/completions"


async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resutadoCodigo = document.querySelector(".resultado-codigo")

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + chaveGroq
        },
        body: JSON.stringify({
            model: "groq/compound-mini",
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS depois o HTML. Siga exatamente o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
    resutadoCodigo.srcdoc = resultado
}

botao.addEventListener("click", gerarCodigo);


