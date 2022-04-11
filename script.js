/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
var percorso_checkbox_selezionato = "images/checked.png";
var percorso_checkbox_deselezionato = "images/unchecked.png";
let selezionati = [];
let choice=[];
let num_ans=0;

init();

function init(){
    let tutte_domande = document.getElementsByClassName("choice-grid");
    for(let domanda of tutte_domande){
        let tutte_risposte = domanda.getElementsByClassName("div-data-choice");
        for(let risposta of tutte_risposte){
            risposta.addEventListener("click",seleziona);
        }
    }
    let reload = document.getElementsByTagName("button")[0];
    reload.addEventListener("click", resetta);
}

function seleziona(event){
    if(selezionati[0]!==undefined && selezionati[1]!==undefined && selezionati[2]!==undefined){
        return;
    }
    let risposta = event.currentTarget;
    let numero_domanda = risposta.dataset.questionId;
    let indice = Array.from(risposta.parentNode.children).indexOf(risposta);
    switch(numero_domanda){
        case "one":
            if(selezionati[0]===indice){
                return;
            }
            if(selezionati[0]!==undefined){
                resettaPrecedente(risposta.parentNode, selezionati[0]);
            }else{
                num_ans++;
            }
            selezionati[0]=indice;
            choice[0]=risposta.dataset.choiceId;
            break;
        case "two":
            if(selezionati[1]===indice){
                return;
            }
            if(selezionati[1]!==undefined){
                resettaPrecedente(risposta.parentNode, selezionati[1]);
            }else{
                num_ans++;
            }
            selezionati[1]=indice;
            choice[1]=risposta.dataset.choiceId;
            break;
        case "three":
            if(selezionati[2]===indice){
                return;
            }
            if(selezionati[2]!==undefined){
                resettaPrecedente(risposta.parentNode, selezionati[2]);
            }else{
                num_ans++;
            }
            selezionati[2]=indice;
            choice[2]=risposta.dataset.choiceId;
            break;
        default:
            return;
    }
    opacizzaTutti(event);
    let checkbox = risposta.getElementsByClassName("checkbox")[0];
    checkbox.setAttribute("src", percorso_checkbox_selezionato);
    let image = risposta.getElementsByTagName("img")[0];
    image.style="opacity: 1";
    risposta.style = "background-color: #cfe3ff";
    if(num_ans===3){
        rispondiAlQuiz();
    }
}

function resettaPrecedente(parentNode, indice){
    let risposta = parentNode.getElementsByTagName("div")[indice];
    risposta.style = "background-color: #f4f4f4";
    let checkbox = risposta.getElementsByClassName("checkbox")[0];
    checkbox.setAttribute("src", percorso_checkbox_deselezionato);
}

function opacizzaTutti(event){
    for(let risposte of event.currentTarget.parentNode.getElementsByClassName("div-data-choice")){
        let image = risposte.getElementsByTagName("img")[0];
        image.style="opacity: 0.6";
    }
}

function brillantaTutti(domanda){
    for(let risposte of domanda.getElementsByClassName("div-data-choice")){
        let image = risposte.getElementsByTagName("img")[0];
        image.style="opacity: 1";
    }
}

function resetta(event){
    let tutte_domande = document.getElementsByClassName("choice-grid");
    let i=0;
    for(let domanda of tutte_domande){
        if(selezionati[i]!==undefined){
            resettaPrecedente(domanda, selezionati[i]);
            brillantaTutti(domanda);
            selezionati[i]=undefined;
            choice[i]=undefined;
        }
        i++;
    }
    num_ans=0;
    let div_result_title = document.getElementById("result-title");
    let div_result_content = document.getElementById("result-content");
    div_result_title.getElementsByTagName("h1")[0].innerText="";
    div_result_content.getElementsByTagName("p")[0].innerText="";
}

function rispondiAlQuiz(){
    let num_choice = [0, 0, 0];
    var max_num=0;
    let index_max_num=0;
    // algoritmo di ricerca poco efficiente, Caso peggiore temporalmente O(n^2) con n=numero di elementi da ricercare
    for(let j=0;j<3;j++){
        for(let i=0; i<3; i++){
            if(choice[j]===choice[i] && j!==i){
                num_choice[j]++;
                if(num_choice[j]>max_num){
                    max_num=num_choice[j];
                    index_max_num=j;
                }
            }
        }
    }
    let div_result_title = document.getElementById("result-title");
    let div_result_content = document.getElementById("result-content");
    let risultato = RESULTS_MAP[choice[index_max_num]];
    div_result_title.getElementsByTagName("h1")[0].innerText=risultato.title;
    div_result_content.getElementsByTagName("p")[0].innerText=risultato.contents;
}