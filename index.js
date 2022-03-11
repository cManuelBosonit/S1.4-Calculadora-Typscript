var calculadora = /** @class */ (function () {
    function calculadora(anterior, actuctual) {
        this.anterior = anterior;
        this.actual = actuctual;
    }
    calculadora.prototype.agregarNumero = function (number) {
        if (this.actual.innerHTML.includes(".") && number == ".")
            return;
        this.actual.innerHTML += number;
    };
    calculadora.prototype.operation = function (opearcionBtn) {
        if (this.actual.innerHTML == "")
            return;
        if (this.anterior.innerHTML !== "") {
            this.result();
        }
        this.anterior.innerHTML = parseFloat(this.actual.innerHTML);
        this.actual.innerHTML = "";
        this.simboloOperacion = opearcionBtn;
    };
    calculadora.prototype.result = function () {
        var numeroActual = parseFloat(this.actual.innerHTML);
        var numeroAnterior = parseFloat(this.anterior.innerHTML);
        if (isNaN(this.actual.innerHTML) || isNaN(this.anterior.innerHTML))
            return;
        var calcular;
        switch (this.simboloOperacion) {
            case "+":
                calcular = numeroAnterior + numeroActual;
                break;
            case "-":
                calcular = numeroAnterior - numeroActual;
                break;
            case "X":
                calcular = numeroAnterior * numeroActual;
                break;
            case "/":
                calcular = numeroAnterior / numeroActual;
                break;
            case "exp":
                calcular = numeroAnterior * Math.pow(10, numeroActual);
                break;
            default:
                return;
        }
        this.actual.innerHTML = calcular.toLocaleString("en"); //
        this.anterior.innerHTML = "";
    };
    calculadora.prototype.borrarTodo = function () {
        this.actual.innerHTML = "";
        this.anterior.innerHTML = "";
    };
    return calculadora;
}());
// variables
var operations = Array.from(document.getElementsByClassName("botonOperacion")), numeros = document.querySelectorAll(".botonNumero"), anteriorDiv = document.getElementById("pantallaAnterior"), actualDiv = document.getElementById("pantallaActual"), resultadoBtn = document.getElementById("resultado"), limpiarBtn = document.getElementById("limpiar"), calcular = new calculadora(anteriorDiv, actualDiv);
//Listener al clickar numeros
numeros.forEach(function (number) {
    number.addEventListener("click", function (e) {
        var target = e.target;
        calcular.agregarNumero(target.innerHTML);
    });
});
// Listener al realizar operaciones
operations.forEach(function (operation) {
    operation.addEventListener("click", function (e) {
        var target = e.target;
        calcular.operation(target.innerHTML);
    });
});
//Listener de borrado
limpiarBtn.addEventListener("click", function () { return calcular.borrarTodo(); });
//Listener de Resultado
resultadoBtn.addEventListener("click", function () {
    calcular.result();
});
