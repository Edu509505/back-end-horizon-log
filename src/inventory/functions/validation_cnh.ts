export function validarCNH(cnh) {
    // Remove espaços e caracteres não numéricos
    cnh = cnh.replace(/\D/g, '');

    // A CNH precisa ter exatamente 11 dígitos
    if (cnh.length !== 11) {
        return false;
    }

    // Bloqueia sequências de números repetidos inválidos
    if (/^(\d)\1{10}$/.test(cnh)) {
        return false;
    }

    const novePrimeiros = cnh.substring(0, 9);
    
    // --- CÁLCULO DO PRIMEIRO DÍGITO (DV1) ---
    let somaDv1 = 0;
    let pesoDv1 = 9;
    
    for (let i = 0; i < 9; i++) {
        somaDv1 += parseInt(novePrimeiros.charAt(i)) * pesoDv1;
        pesoDv1--;
    }

    let restoDv1 = somaDv1 % 11;
    let decrementoDv2 = 0;
    let dv1 = restoDv1;

    if (restoDv1 >= 10) {
        dv1 = 0;
        decrementoDv2 = 2; // Ativa o ajuste para o cálculo do DV2
    }

    // --- CÁLCULO DO SEGUNDO DÍGITO (DV2) ---
    let somaDv2 = 0;
    let pesoDv2 = 1;

    for (let i = 0; i < 9; i++) {
        somaDv2 += parseInt(novePrimeiros.charAt(i)) * pesoDv2;
        pesoDv2++;
    }

    let restoDv2 = somaDv2 % 11;
    let vBaseDv2 = (restoDv2 >= 10) ? 0 : restoDv2;
    
    // Aplica o ajuste herdado do primeiro cálculo
    let dv2 = vBaseDv2 - decrementoDv2;
    
    // Se o ajuste deixar o número negativo, soma-se 11
    if (dv2 < 0) {
        dv2 += 11;
    }

    // --- VALIDAÇÃO FINAL ---
    // Verifica se os DVs calculados são iguais aos informados na string
    const dv1Informado = parseInt(cnh.charAt(9));
    const dv2Informado = parseInt(cnh.charAt(10));

    return (dv1 === dv1Informado && dv2 === dv2Informado);
}