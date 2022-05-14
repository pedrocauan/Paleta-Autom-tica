const cor = document.querySelector("#pegaCor"); //o input color
const root = document.querySelector(":root"); //Lugar onde fica a variavel que muda a cor de fundo

//Converte uma cor hexadecimal em hsl. ex: #ff0000 -> hsl 0,100,50 )
function HexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return { h, s, l };
}

//Pega a cor do input em hexadecimal e converte em um número correspondente ao hue do hsl
const pegaCor = () => {
    let corHexa = cor.value;
    corHsl = HexToHSL(corHexa);
    return corHsl.h; //h = hue = cor 

}

const pegaSaturacao = () => {
    let corHexa = cor.value;
    corHsl = HexToHSL(corHexa);
    return corHsl.s; //s = saturation = saturação
}

const pegaBrilho = () => {
    let corHexa = cor.value;
    corHsl = HexToHSL(corHexa);
    return corHsl.l; //s = saturation = saturação
}

//Muda a cor do fundo
const mudaCOr = () => {
    let bgColor = pegaCor();
    let bgSaturation = pegaSaturacao();
    let bgBrilho = pegaBrilho();
    root.style.setProperty("--cor", bgColor);
    root.style.setProperty("--saturation", `${bgSaturation}%`);
    root.style.setProperty("--brightness", `${bgBrilho}%`);
    root.style.setProperty("--brightnessDiv", `${bgBrilho*0.25}%`);
    //Se o brilho da div for igual ao brilho do fundo ele deixa a div mais escura
    if(bgSaturation === 88 && bgBrilho === 10)
        root.style.setProperty("--brightnessDiv", `${bgBrilho*0.5}%`);
    //Se a cor do fundo for preto, ele  coloca a div branca
    if(bgSaturation === 0 && bgBrilho < 3)
        root.style.setProperty("--brightnessDiv", `85%`);

    
}

//Roda a função mudaCor quando o usuario escolher a cor na paleta
cor.addEventListener("click", mudaCOr);
cor.addEventListener("change", mudaCOr); 