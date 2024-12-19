// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const TOKEN_KEY = 'auth_token';

// export function middleware(request: NextRequest) {
//     const token = request.cookies.get(TOKEN_KEY)?.value;

//     console.log(token)
  
//     // Se não houver token e a rota não for pública, redireciona para login
//     if (!token && !request.nextUrl.pathname.startsWith('/login')) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
  
//     return NextResponse.next();
//   }
  
//   // Configuração das rotas que serão protegidas pelo middleware
//   export const config = {
//     matcher: [
//       // Adicione aqui os padrões de URL que devem ser protegidos
//       '/verzo',
//       // Exclui rotas públicas
//       '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
//     ],
//   };