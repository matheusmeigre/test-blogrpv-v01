// Define a estrutura do nosso payload do token JWT
interface JwtPayload {
  sub: string; // 'sub' (subject) é o padrão para o ID do usuário no JWT
  role: string;
}

declare namespace Express {
  export interface Request {
    user?: JwtPayload; // A propriedade 'user' agora existe no Request e é do tipo JwtPayload
  }
}