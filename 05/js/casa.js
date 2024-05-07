class Casa {
    constructor(id, titulo, precio)  {
        this.id = id;
        this.titulo = titulo;
        this.precio = +precio;
    }

    verify() {
        return this.checkTitulo();
    }

    checkTitulo() {
        return { succes: true, rta: null };
    }
}

export { Casa };