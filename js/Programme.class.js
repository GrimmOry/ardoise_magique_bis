var Programme = function () { //Cet classe nous servira à ajouter les ecouteurs du programme ainsi qu'a gerer ses composants

    this.stylo = new Stylo();

    this.tableauBlanc = new TableauBlanc(this.stylo);

    this.palette = new ColorPalette();

}


//////On ajoute les écouteurs://////

Programme.prototype.ajoutEcouteurs = function () {

    // Ecouteur : au clic sur le bouton effacer
    $('#gomme').on('click', this.onEraserClick.bind(this));

    // Ecouteur palette
    $('#tableauCouleur').on('click',this.colorPalette.bind(this));

    // Ecouteurs taille pinceau
    $('.epaisseurs').on('click', this.penWidth.bind(this));

    // Ecouteurs couleur pinceau
    $('.couleurs').on('click', this.choixCouleur.bind(this));

    //Ecouteurs couleur palette
    $('#colorPalette').on('click', this.onPickColor.bind(this));
    
    // Création d'un évènement spécifique à l'application.
    $(document).on('magical-slate:pick-color', this.onPickColor.bind(this));

}

//////Fonctions des différents boutons de la palette d'outils du programme: //////

//Efface la canvas quand on appuye sur le bouton effacer
Programme.prototype.onEraserClick = function () {

    this.tableauBlanc.context.clearRect(0, 0, this.tableauBlanc.canvas.width, this.tableauBlanc.canvas.height);

}


//Faire apparaitre la palette de couleur
Programme.prototype.colorPalette = function(){
    
     $('#colorPalette').fadeIn('slow');
    
}


//Changez la couleur du pinceau via la palette
Programme.prototype.onPickColor = function(){
        
    //Récuperation de la couleur via le color picker
    var color = this.palette.getPickedColor();
    
    //Changement de la couleur du stylo
    this.stylo.setColorAsRgb(color.red,color.green,color.blue);
    
    //Ensuite faire disparaitre la palette jusqu'au prochain appelle
    $('#colorPalette').fadeOut('slow');
    
}


//Choix de l'épaisseur du stylo
Programme.prototype.penWidth = function (event) {

    // Récupération du <button> qui a déclenché l'évènement.
    var button = event.currentTarget;


    // Récupération de l'attribut HTML5 data-size.
    var penSize = button.dataset.size; // Avec jQuery cela donnerait $(button).data('size')

    // Modification de la taille du crayon.
    this.stylo.setSize(penSize);

}


//Choix de la couleur
Programme.prototype.choixCouleur = function (event) {

    // Récupération de la <div> qui a déclenché l'évènement.
    var div = event.currentTarget;

    // Récupération de l'attribut HTML5 data-color.
    var penColor = div.dataset.color; // Avec jQuery cela donnerait $(div).data('color')

    // Modification de la couleur du crayon.
    this.stylo.setColor(penColor);

}
