/* Fait par Sarah Guerber le 12/01/2020 */

var chaine='';
var stock1='';
var stock2='';
var op;
var cptOp=0;

/* fonction pour entrer des caractères */
function ajoutTexte(b){
    if(chaine=='' && isNaN(b) && b!='.'){ /* Si le premier caractère entré n'est pas un chiffre ou un point */
        affiche("Saisir un chiffre");
    }
    else if(cptOp==0 && isNaN(b) && b!='.'){  /* Si on a pas encore entré d'opérateur et que le char n'est ni un nombre ni un point (donc si c'est un opérateur) */
        cptOp=cptOp+1;
        chaine+=b;
        affiche(chaine);
    }
    else if(cptOp>0 && isNaN(b) && b!='.'){  /* Si on  a déjà entré notre opérateur et qu'on tente d'en entrer un second */
        affiche("Maximum une opération");
    }
    else{   /* Dans les autres cas on continue d'entrer nos caractères dans la chaine et d'afficher celle-ci */
        chaine+=b;
        affiche(chaine);
    }
}

/* fonction addition */
function add(a,b){
    return (+a)+(+b);
}

/* fonction produit */
function prod(a,b){
    return (+a)*(+b);
}

/* fonction division */
function divi(a,b){
    if((+b)!=0){
        return (+a)/(+b);
    }
    else{                                       /* On interdit la division par 0 */
        return("Pas de division par 0!");
    }
}

/* fonction soustraction */
function minus(a,b){
    return (+a)-(+b);
}

/* fonction pour afficher un caractère*/
function affiche(b){
    document.getElementById ("ecran").innerHTML=b;
}

/* fonction qui vide l'écran */
function CE(){
    chaine='';    
    document.getElementById("ecran").innerHTML=chaine;
    cptOp=0;
}

/* fonction supprimant le deuxième nombre de l'opération */
function C(){
    var pasTrouve=true; /* avant de parcourir toute la chaine de char on a pas encore trouvé l'opérateur */
    var i=0;
    newchaine='';
    for (let char of chaine){
        if(!isNaN(char)&&pasTrouve){  /* si le char est un chiffre et qu'on a pas encore trouvé l'opérateur */
            newchaine+=char;
        }
        else{
            pasTrouve=false; /* si l'opérateur a été trouvé...*/
            if(isNaN(char)){  /* ...et que le char n'est pas un chiffre (donc c'est l'opérateur en question) */
                newchaine+=char;
            }      
        }
    }
    chaine=newchaine;
    document.getElementById("ecran").innerHTML=newchaine;
}


/* la fonction pour supprimer le dernier caractère entré */
function supp(){
    if (chaine!=''){
    chaine = chaine.replace(chaine.slice(-1), "");
    affiche(chaine);
    }
}

/* la fonction pour afficher le résultat quand on clique sur la touche = */
function resultat(){
    cptOp=0;
    for (let char of chaine){ /* pour tous les char de la chaine */
        if((!isNaN(char)||char=='.') && cptOp==0){ /* si le char est un chiffre ou une virgule et qu'on a pas encore cliqué sur un opérateur */
            stock1+=char;      /* on stocke le premier nombre, chiffre après chiffre */
        }
        else if ((!isNaN(char)||char=='.') && cptOp==1) { /* si le char est un chiffre ou une virgule et qu'on a déjà sélectionné un opérateur */
            stock2+=char;
        }
        else if ( (char=='+' || char=='-' || char=='/' || char=='*')) {  /* si le char est un opérateur */
            if(cptOp==0){   /* si on a pas encore sélectionné d'opérateur */
                cptOp+=1;
                op=char;
            }
            else{   /* si l'utilisateur tente d'entrer une seconde opération on affiche un message */
                affiche("Maximum une opération");  
            }
        }
        
    }
    /* affichage des différentes opérations */
    switch(op){
        case "+":
            chaine=add(stock1,stock2);
            affiche(add(stock1,stock2));
        break;
        case "-":
            chaine=minus(stock1,stock2);
            affiche(minus(stock1,stock2));
        break;
        case "/":
            chaine=divi(stock1,stock2);
            affiche(divi(stock1,stock2));
        break;
        case "*":
            chaine=prod(stock1,stock2);
            affiche(prod(stock1,stock2));
        break;
        
    }

    /* à la fin du calcul de l'opération on réinitialise toutes les variables à leurs valeurs par défaut */
    stock1='';
    stock2='';
    chaine='';
    cptOp=0;
}