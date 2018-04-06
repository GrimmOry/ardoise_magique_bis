var TableauBlanc = function (stylo /*Instance crée dans programme*/ )  {

    this.canvas = $('#my-canvas')[0]; //Canvas

    this.context = this.canvas.getContext('2d'); //Contexte

    this.currentPosition = null; //Position Souris

    this.isDrawing = false; //En train de dessiner

    this.stylo = stylo; //Le stylo

}


//////On ajoute les écouteurs://////

TableauBlanc.prototype.ajoutEcouteurs = function () {

    // Ecouteur : au clic
    $('#my-canvas').on('mousedown', this.mouseDown.bind(this));

    // Ecouteur : au lever de la souris    
    $('#my-canvas').on('mouseup', this.mouseUp.bind(this));

    // Ecouteur : quand la souris part du tableau
    $('#my-canvas').on('mouseleave', this.mouseLeave.bind(this));

    // Ecouteur : au mouvement de la souris dans le canvas
    $('#my-canvas').on('mousemove', this.mouseMove.bind(this));
    
    $('#my-canvas').on('mousemove', _.throttle(onMouseMoveLowdash,20));
    
}


//////Fonctions de la souris ://////

//Quand on clique:
TableauBlanc.prototype.mouseDown = function (event) {

    //On commence le dessin
    this.isDrawing = true;

}


//Quand la sourie bouge
TableauBlanc.prototype.mouseMove = function (event) {

    //On commence à dessiner si le bouton gauche de la sourie est enfoncée
    if (this.isDrawing == true) {

        this.dessiner(event);

    }

}


//Quand on arette d'appuiyer:
TableauBlanc.prototype.mouseUp = function (event) {

    //On arrête de dessiner
    this.isDrawing = false;

    //et on redéfini la position de la sourie à null pour eviter de crée une lingne droite entre 2 points différent
    this.currentPosition = null;

}


//Quand la sourie quitte le canvas
TableauBlanc.prototype.mouseLeave = function (event) {

    //On arrête de dessiner
    this.isDrawing = false;

    //et on redéfini la position de la sourie à null pour eviter de crée une lingne droite entre 2 points différent
    this.currentPosition = null;

}


//////Fonctions utilitaire://////

//Configuration du dessin entre 2 points
TableauBlanc.prototype.tracerLigneEntreDeuxPoints = function (departX, departY, arriveeX, arriveeY) {

    // config
    this.context.beginPath();

    this.stylo.configure(this.context);


    // dessin
    this.context.moveTo(departX, departY);

    this.context.lineTo(arriveeX, arriveeY);

    this.context.stroke();

    // fin    
    this.context.closePath();

};


//Fonction de dessin
TableauBlanc.prototype.dessiner = function (event) {

    if (this.currentPosition == null) {
        // On définit la position de la souris si il n'y en à pas de déjà défini
        this.positionSouris(event);

    } else {

        // On utilise des variables temporaires pour la position actuelle
        var premierePositionX = this.currentPosition.sourisX;

        var premierePositionY = this.currentPosition.sourisY;

        // Nouvelle position de la souris, tandis que les premierePosition sont celle juste avant
        this.positionSouris(event);

        // On dessine
        this.tracerLigneEntreDeuxPoints(

            premierePositionX,

            premierePositionY,

            this.currentPosition.sourisX,

            this.currentPosition.sourisY

        );

    }

}


//Définit la position de la souris
TableauBlanc.prototype.positionSouris = function (event) {

    //Défini la position du canvas par rapport à la page
    var rectangleQuiDonneLaPositionDuCanvas = this.canvas.getBoundingClientRect();
    // console.log(rectangleQuiDonneLaPositionDuCanvas);

    var canvasX = rectangleQuiDonneLaPositionDuCanvas.x;

    var canvasY = rectangleQuiDonneLaPositionDuCanvas.y;

    var positionSourisX = event.clientX;

    var positionSourisY = event.clientY;
    // console.log("Position X : " + positionSourisX + ", Y : " + positionSourisY);

    //Soustrait la valeur de la position du canvas par rapport à la position de la page
    var positionXSurLeCanvas = positionSourisX - canvasX;

    var positionYSurLeCanvas = positionSourisY - canvasY;
    // console.log("Position X : " + positionXSurLeCanvas + ", Y : " + positionYSurLeCanvas);

    this.currentPosition = {

        sourisX: positionXSurLeCanvas,

        sourisY: positionYSurLeCanvas

    }

}


function onMouseMoveLowdash(event) {
           
//	console.log('Hey!');
	
}
