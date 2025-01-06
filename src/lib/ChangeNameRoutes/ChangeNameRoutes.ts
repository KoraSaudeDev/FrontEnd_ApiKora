
export function changeNameRoutes(rotas: string[]): string[] {
    // Mapeamento de rotas
    const mapeamento: { [key: string]: string } = {
        "/systems": "/agrupamentos",
        "/routes": "/rotas",
        "/connections": "/conexoes",
        "/users": "/usuarios",
        "/access": "/acessos"
    };
    return rotas.map(rota => mapeamento[rota] || rota);
}