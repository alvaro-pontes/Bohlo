// Atualiza os campos de entrada de medidas com base no tipo de forma selecionada

function atualizarCamposMedidas(tipo) {
    const tipoForma = document.getElementById(`tipo-forma-${tipo}`).value;
    const camposContainer = document.getElementById(`campos-${tipo}`);

    camposContainer.innerHTML = '';

    if (tipoForma === 'redonda') {
        adicionarCamposRedonda(camposContainer, tipo);
    } else if (tipoForma === 'redonda-furo') {
        adicionarCamposRedondaFuro(camposContainer, tipo);
    } else if (tipoForma === 'quadrada') {
        adicionarCamposQuadrada(camposContainer, tipo);
    } else if (tipoForma === 'retangular') {
        adicionarCamposRetangular(camposContainer, tipo);
    }
}

function adicionarCamposRedonda(container, prefix) {
    container.innerHTML += `
        <label for="${prefix}-diametro">Diâmetro (cm)</label>
        <input type="number" id="${prefix}-diametro" class="campo-medidas">
	<br>
        <label for="${prefix}-altura">Altura (cm)</label>
        <input type="number" id="${prefix}-altura" class="campo-medidas">
    `;
}

function adicionarCamposRedondaFuro(container, prefix) {
    container.innerHTML += `
        <label for="${prefix}-diametro-externo">Diâmetro Externo (cm)</label>
        <input type="number" id="${prefix}-diametro-externo" class="campo-medidas">
        <label for="${prefix}-diametro-interno">Diâmetro Interno (cm)</label>
        <input type="number" id="${prefix}-diametro-interno" class="campo-medidas">
        <label for="${prefix}-altura">Altura (cm)</label>
        <input type="number" id="${prefix}-altura" class="campo-medidas">
    `;
}

function adicionarCamposQuadrada(container, prefix) {
    container.innerHTML += `
        <label for="${prefix}-largura">Largura (cm)</label>
        <input type="number" id="${prefix}-largura" class="campo-medidas">
        <label for="${prefix}-altura">Altura (cm)</label>
        <input type="number" id="${prefix}-altura" class="campo-medidas">
    `;
}

function adicionarCamposRetangular(container, prefix) {
    container.innerHTML += `
        <label for="${prefix}-largura">Largura (cm)</label>
        <input type="number" id="${prefix}-largura" class="campo-medidas">
        <label for="${prefix}-comprimento">Comprimento (cm)</label>
        <input type="number" id="${prefix}-comprimento" class="campo-medidas">
        <label for="${prefix}-altura">Altura (cm)</label>
        <input type="number" id="${prefix}-altura" class="campo-medidas">
    `;
}

function calcularDiferencaVolume() {
    const tipoFormaReceita = document.getElementById('tipo-forma-receita').value;
    const tipoFormaDisponivel = document.getElementById('tipo-forma-disponivel').value;

    let volumeReceita = 0;
    let volumeDisponivel = 0;

    if (tipoFormaReceita === 'redonda') {
        volumeReceita = calcularVolumeRedonda('receita');
    } else if (tipoFormaReceita === 'redonda-furo') {
        volumeReceita = calcularVolumeRedondaFuro('receita');
    } else if (tipoFormaReceita === 'quadrada') {
        volumeReceita = calcularVolumeQuadrada('receita');
    } else if (tipoFormaReceita === 'retangular') {
        volumeReceita = calcularVolumeRetangular('receita');
    }

    if (tipoFormaDisponivel === 'redonda') {
        volumeDisponivel = calcularVolumeRedonda('disponivel');
    } else if (tipoFormaDisponivel === 'redonda-furo') {
        volumeDisponivel = calcularVolumeRedondaFuro('disponivel');
    } else if (tipoFormaDisponivel === 'quadrada') {
        volumeDisponivel = calcularVolumeQuadrada('disponivel');
    } else if (tipoFormaDisponivel === 'retangular') {
        volumeDisponivel = calcularVolumeRetangular('disponivel');
    }

    // Converter volumes de cm³ para ml (1 cm³ = 1 ml) e arredondar para o inteiro mais próximo
    volumeReceita = Math.round(volumeReceita);
    volumeDisponivel = Math.round(volumeDisponivel);

    // Calcular o resultado dos volumes
    let mensagemResultado = '';
	
	// Calcular o fator de ajuste da receita
    let mensagemAjuste = '';

    if (volumeDisponivel > volumeReceita) {
        const multiplicador = (volumeDisponivel / volumeReceita).toFixed(1);
        if (multiplicador == 1.0) {
            mensagemResultado = 'Sua forma é perfeita para esta receita.';
        } else {
            mensagemResultado = `A forma disponível é maior que a da receito.`;
			mensagemAjuste = `Multiplique os ingredientes da receita por ${multiplicador}.`;
        }
    } else if (volumeDisponivel < volumeReceita) {
        const divisor = (volumeReceita / volumeDisponivel).toFixed(1);
        if (divisor == 1.0) {
            mensagemResultado = 'Sua forma é perfeita para esta receita.';
        } else {
            mensagemResultado = `A forma da receita é maior que a disponível.Divida os ingredientes da receita por ${divisor}.`;
        }
    } else {
        mensagemResultado = 'Sua forma é perfeita para esta receita.';
    }

    // Exibir resultados
    document.getElementById('volume-receita').textContent = `Volume da forma na receita: ${volumeReceita} ml`;
    document.getElementById('volume-disponivel').textContent = `Volume da forma disponível: ${volumeDisponivel} ml`;
    document.getElementById('resultado-volumes').textContent = mensagemResultado;
	document.getElementById('proporcao-volumes').textContent = mensagemAjuste;
	document.getElementById('resultado').style.display = 'block';
}

function calcularVolumeRedonda(prefix) {
    const diametro = document.getElementById(`${prefix}-diametro`).value;
    const altura = document.getElementById(`${prefix}-altura`).value;
    const raio = diametro / 2;
    return Math.PI * Math.pow(raio, 2) * altura;
}

function calcularVolumeRedondaFuro(prefix) {
    const diametroExterno = document.getElementById(`${prefix}-diametro-externo`).value;
    const diametroInterno = document.getElementById(`${prefix}-diametro-interno`).value;
    const altura = document.getElementById(`${prefix}-altura`).value;
    const raioExterno = diametroExterno / 2;
    const raioInterno = diametroInterno / 2;
    return Math.PI * (Math.pow(raioExterno, 2) - Math.pow(raioInterno, 2)) * altura;
}

function calcularVolumeQuadrada(prefix) {
    const largura = document.getElementById(`${prefix}-largura`).value;
    const altura = document.getElementById(`${prefix}-altura`).value;
    return Math.pow(largura, 2) * altura;
}

function calcularVolumeRetangular(prefix) {
    const largura = document.getElementById(`${prefix}-largura`).value;
    const comprimento = document.getElementById(`${prefix}-comprimento`).value;
    const altura = document.getElementById(`${prefix}-altura`).value;
    return largura * comprimento * altura;
}

// Inicializa os campos de medida para a forma padrão (redonda) quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    atualizarCamposMedidas('receita');
    atualizarCamposMedidas('disponivel');
});

function adicionarCampo(container, id, label, tipo) {
    const divGroup = document.createElement('div');
    divGroup.className = 'form-group';

    const labelElement = document.createElement('label');
    labelElement.htmlFor = `${tipo}-${id}`;
    labelElement.textContent = label;

    const input = document.createElement('input');
    input.type = 'number';
    input.id = `${tipo}-${id}`;
    input.name = `${tipo}-${id}`;

    divGroup.appendChild(labelElement);
    divGroup.appendChild(input);
    container.appendChild(divGroup);
}
