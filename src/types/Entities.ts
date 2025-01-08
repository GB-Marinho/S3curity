export type Usuario = {
    nome?: string,
    ativo?: boolean,
    horarioTrabalho?: string,
    diasDeTrabalho?: string[],
    perfis?: string[],
} 

export type Perfil = {
    nome?: string,
    descricao?: string,
    ativo?: boolean,
    dataCriacao?: Date | string,
    permissoes?: Permissao[],
}

export type Permissao = {
    id:string,
    nome: string,
    descricao: string,
    ativo?: boolean,
    dataCriacao?: Date | string,
}