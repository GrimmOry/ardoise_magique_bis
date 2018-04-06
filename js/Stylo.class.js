//Definition de la classe
var Stylo = function () {

    this.color = null;

    this.size = null;

}


//Sert à définir une nouvelle couleur
Stylo.prototype.setColor = function (nouvelleCouleur) {

    this.color = nouvelleCouleur;

}


//Sert à définir une nouvelle couleur via le rgb
Stylo.prototype.setColorAsRgb = function (red, green, blue) {

    this.color = 'rgb(' + red + ',' + green + ',' + blue + ')';

}


//Sert à définir une nouvelle taille
Stylo.prototype.setSize = function (nouvelleTaille) {

    this.size = nouvelleTaille;

}


//Sert à configurer la mise à jour du context
Stylo.prototype.configure = function (contextTableauBlanc) {

    contextTableauBlanc.strokeStyle = this.color;

    contextTableauBlanc.lineWidth = this.size;

    contextTableauBlanc.lineCap = 'round';

}
