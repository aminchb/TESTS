// Hira : Map contenant le romaji comme clé et un tableau avec le kana correspondant comme valeur
const hira = new Map([
    ["a", ["あ"]],
    ["i", ["い"]],
    ["u", ["う"]],
    ["e", ["え"]],
    ["o", ["お"]],
    ["ka", ["か"]],
    ["ki", ["き"]],
    ["ku", ["く"]],
    ["ke", ["け"]],
    ["ko", ["こ"]],
    ["sa", ["さ"]],
    ["shi", ["し"]],
    ["su", ["す"]],
    ["se", ["せ"]],
    ["so", ["そ"]]
]);

// Kanj : Map contenant le romaji comme clé et un tableau avec le kana et les kanji/homonimes comme valeur
const kanj = new Map([
    ["hi", ["ひ", "日", "火"]],
    ["tsuki", ["つき", "月"]],
    ["yama", ["やま", "山"]],
    ["kawa", ["かわ", "川"]],
    ["mizu", ["みず", "水"]],
    ["ki", ["き", "木"]],
    ["sora", ["そら", "空"]],
    ["kaze", ["かぜ", "風"]],
    ["ame", ["あめ", "雨"]],
    ["yuki", ["ゆき", "雪"]],
    ["hito", ["ひと", "人"]],
    ["otoko", ["おとこ", "男"]],
    ["onna", ["おんな", "女"]],
    ["ko", ["こ", "子"]],
    ["kane", ["かね", "金"]],
    ["katana", ["かたな", "刀"]]
]);


// VARIABLES :
let keyboard = {
    verbes: new Map(),
    kanji: kanj,
    hiragana: hira,
    katakana: new Map()
};



// KEYBOARD : 
// @param input : une String à traduire.
// =>return : la String* traduite.
// !disclaimer : String*
//               String* : Homonimes possibles.
function TRADUIT(input){
    // TRADUIT_MOT :
    // @param mot : un mot à traduire.
    // =>return : le mot traduit.
    function TRADUIT_MOT(mot){
        // si le mot est un verbe :
        if(keyboard.verbes.has(mot)){
            // HOIMONIMES POSSIBLES !!!!!!!
            return keyboard.verbes.get(mot)[1];
        }
        // si le mot est un kanji :
        else if(keyboard.kanji.has(mot)){
            // HOIMONIMES POSSIBLES !!!!!!!
            return keyboard.kanji.get(mot)[1];
        }
        // si le mot est un hiragana :
        else if(keyboard.hiragana.has(mot)){
            return keyboard.hiragana.get(mot)[0];
        }
        // si le mot est un katakana :
        else if(keyboard.katakana.has(mot)){
            return keyboard.katakana.get(mot)[0];
        }
        // si le mot n'est pas trouvé :
        return mot;
    }
    return input.trim().split(/\s+/)
        .map(mot => TRADUIT_MOT(mot))
        .join(" ");
}



function copyText() {
    const translatedText = document.getElementById("translatedText");

    // Vérifie si le contenu est non vide
    if (translatedText.textContent.trim() !== "") {
        // Copie le contenu de translatedText dans le presse-papier
        navigator.clipboard.writeText(translatedText.textContent)
            .then(() => {
                alert("Texte copié dans le presse-papier !");
            })
            .catch(err => {
                console.error("Erreur lors de la copie : ", err);
                alert("Impossible de copier le texte.");
            });
    } else {
        alert("Aucun texte à copier !");
    }
}


function updateTranslation() {
    const input = document.getElementById('input').value; // Récupère le texte de l'input
    const translatedText = TRADUIT(input); // Traduction du texte
    document.getElementById('translatedText').textContent = translatedText; // Affiche la traduction
}

window.onload = async function() {
    document.getElementById('input').addEventListener('input', updateTranslation);
};