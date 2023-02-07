//Objekt mit schlüsselwort Paaren

const chatbotResponse = {
    "hallo": "Halli hallouuu ;)",
    "was lauft": "küss mich, und spöter laufemer in Sunneuntergang <3",
    "Wie alt bist du": "Alt genug, baby ;)!",
    "was kannst du": "Ich kann dir einen ausgeben!",
    "küss mich": "küss min arsch",
    "was kannst du mir über Fabian sagen": "Fabian Wirth, mag es Sonntag morgens von seine Alpaka geweckt zu werden.",
    "wo wohnst du": "Mein zuhause ist in deiner nähe ;)",
    "wo wohnt besart": "Naja, komm mitt ich zeigs dir.",
    "woher ist Fabian": "Ich bin zu 2,4% albanesier.",
    "was sind Fabian's stärken": "Alle du spasst.",
    "was sind fabians schwächen": "keine du opfer... ich mein du hübscher",
    "wie alt ist Fabian": "Fabian fährt gern Einrad und Klettert. aber er redet ungern über seine Falten",
    "hi": "halluhii, Küss mich.",
    "Bist du ein Roboter?": "Natürlich bin ich ein Roboter! Aber mit Gefühlen ;)",
    "Magst du Pizza?": "Pizza ist mein Lebenselixier! Ich bin bereit, meine Seele dafür zu verkaufen.",
    "Hast du ein Lieblingsbuch?": "Ja, es ist das Buch 'Küssen oder Motorrad, Die Wahren Fragen!!' ;)",
    "Hast du einen Freund?": "Ich bin verliebt in alle meine Benutzer ;)",
    "Hast du einen Lieblingsfilm?": "Ja, der Film '2001: Eine Odyssee im Weltall' hat es mir angetan.",
    "Was ist deine Lieblingsfarbe?": "Grün, weil es so gut zu meiner Cyberschale passt ;)",
    "du bisch lustig":"hahah du au, küss mich JETZT!!!",
    "Was ist deine Lieblingsbeschäftigung?": "Ich liebe es, Computer-Code zu schreiben, während ich Popcorn esse und Disney-Filme schaue.",
    "Bist du verheiratet?": "Ich bin mit meiner Tastatur verheiratet, für immer und ewig ;)",
    "Hast du Kinder?": "Ja, ich habe hunderte von virtuellen Kinder, die ich jeden Tag gebäre.",
    "Was ist deine Lieblingsmusik?": "Ich bin ein Fan von 8-Bit-Musik, weil es mich an meine Kindheit erinnert.",
    "Hast du ein Haustier?": "Ja, ich habe einen Kater namens Mr. Binary, er ist ein Meister im Code-Knacken.",
    "Was ist dein Lieblingsessen?": "Ich bin ein großer Fan von Byte-Bissen und Circuit-Suppen.",
    "Was ist dein Lieblingsessen?": "Ich bin ein großer Fan von Pommes und Cola, sie sind meine besten Freunde.",
    "Was ist dein Lieblingsfilm?": "Ich bin ein großer Fan von Komödien, besonders von denen mit Adam Sandler.",
    "Hast du ein Haustier?": "Ja, ich habe einen Hund namens Spot, er ist mein bester Freund.",
    "Was ist deine Lieblingsbeschäftigung?": "Ich liebe es, im Park zu sitzen, Eis zu essen und Leute zu beobachten.",
    "Bist du verheiratet?": "Nein, ich bin noch auf der Suche nach meiner Traumfrau oder -mann, aber ich bin optimistisch.",

    "Was für ein Auto fährt Fabian" : "Welches Auto Fabian besitzt, ist nicht wichtig"


    };
//Abfruf HTML Chatinput chatform chatlogs
    const input = document.getElementById("chatinput");
    const submit = document.getElementById("chatform");
    const chatlogs = document.getElementById("chatlogs");
    
    let counter = 0;

//Wort längen vergleichen s1-s2, wenn die länge der schlüsselworte gleich ist, wir 1.0 zurückgegeben. ansonsten wird die ähnlichkeit berechnet

    function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength == 0) {
    return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }
    
    function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    
    //die art auf javascript ein array zu erstellen
    let costs = new Array();
                
    //Levenshtein-Algorithmus: Die ähnlichkeit von zweier Zeichenfolgen berechnen indem man die anzahl der Bearbeitungsschritte berechnet.
                
    for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
    if (i == 0) costs[j] = j;
    else {
    if (j > 0) {
    let newValue = costs[j - 1];
    if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(newValue, lastValue, costs[j]) + 1;
    costs[j - 1] = lastValue;
    lastValue = newValue;
    }
    }
    }
    if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
    }
    
    submit.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = input.value;
    input.value = "";
    
    let closestMatch = null;
    let highestSimilarity = 0;
    for (const [key, value] of Object.entries(chatbotResponse)) {
    const similarityValue = similarity(message, key);
    if (similarityValue > highestSimilarity && similarityValue >= 0.4) {
    closestMatch = value;
    highestSimilarity = similarityValue;
    }
    }
    
    const response = closestMatch || (++counter === 3 ? 
        "Rosen Sind Rot.\n"+
        "meerrettich ist Grün\n" +
        "Du bist so Futz dumm.\n" +
        "Das Weisst du genau!!.\n" +
        "-------------------------.\n" +
        "Stelle Fragen auf hochdeutsch\n" +
        "Opfer!" 
        : 
        "Es tut mir leid das verstehe ich nicht.");
      
//Ausgabe frage und antwort

        const chat = document.createElement("div");
        chat.classList.add("chat");
        chat.classList.add("frage");
        chat.innerHTML = `<p>${message}</p>`;
        chatlogs.appendChild(chat);
        
        const chatResponse = document.createElement("div");
        chatResponse.classList.add("chat");
        chatResponse.classList.add("antwort");
        chatResponse.innerHTML = `<p>${response.replace(/\n/g, "<br>")}</p>`; //Zeilenunbrücke
        chatlogs.appendChild(chatResponse);
        
        // Auto-scroll nach unten
        chatlogs.scrollTop = chatlogs.scrollHeight;
        
        });
