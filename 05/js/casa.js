class Casa {
    constructor(id, titulo, precio)  {
        this.id = id;
        this.titulo = titulo;
        this.precio = +precio;
    }

    verify() {
        return this.titulo && this.precio > 0;
    }
}

export { Casa };