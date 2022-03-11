interface calculadoraInterfaz {
    agregarNumero: (a: number) => void;
    operation: (a: string) => void;
  }
 
  class calculadora implements calculadoraInterfaz {
    private anterior: any;
    private actual: any;
    private simboloOperacion: string;
  
    constructor(anterior, actuctual) {
      this.anterior = anterior;
      this.actual = actuctual;
    }
  
    agregarNumero(number) {
      if (this.actual.innerHTML.includes(".") && number == ".") return;
      this.actual.innerHTML += number;
    }
  
    operation(opearcionBtn) {
      if (this.actual.innerHTML == "") return;
  
      if (this.anterior.innerHTML !== "") {
        this.result();
      }
  
      this.anterior.innerHTML = parseFloat(this.actual.innerHTML);
      this.actual.innerHTML = "";
      this.simboloOperacion = opearcionBtn;
    }
  
    result() {
      const numeroActual = parseFloat(this.actual.innerHTML);
      const numeroAnterior = parseFloat(this.anterior.innerHTML);
      if (isNaN(this.actual.innerHTML) || isNaN(this.anterior.innerHTML)) return;
      let calcular;
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
    }
    borrarTodo() {
      this.actual.innerHTML = "";
      this.anterior.innerHTML = "";
    }
  }
  
  // variables
  const operations = Array.from(
      document.getElementsByClassName(
        "botonOperacion"
      ) as HTMLCollectionOf<HTMLElement>
    ),
    numeros = document.querySelectorAll(".botonNumero")!,
    anteriorDiv = document.getElementById("pantallaAnterior")!,
    actualDiv = document.getElementById("pantallaActual")!,
    resultadoBtn = document.getElementById("resultado")!,
    limpiarBtn = document.getElementById("limpiar")!,
    calcular = new calculadora(anteriorDiv, actualDiv);

  
  //Listener al clickar numeros
  numeros.forEach((number) => {
    number.addEventListener("click", (e) => {
      const target = e.target as Element;
      calcular.agregarNumero(target.innerHTML);
    });
  }); 
  
  // Listener al realizar operaciones
  operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
      const target = e.target as Element;
      calcular.operation(target.innerHTML);
    });
  });

    //Listener de borrado
    limpiarBtn.addEventListener("click", () => calcular.borrarTodo());

    //Listener de Resultado
    resultadoBtn.addEventListener("click", () => {
    calcular.result();
  });

