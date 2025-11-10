import { ProxyConfig, NextRequest, NextResponse } from "next/server"

const publicRoutes = [
    {path: '/SignIn', whenAuthenticated: 'redirect'},
    {path: '/SignUp', whenAuthenticated: 'next'},
    {path: '/', whenAuthenticated: 'next'},
] as const

const redirectPage = '/'


export function proxy(request: NextRequest){
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path);
    const authToken = request.cookies.get('authToken');

    if(!authToken && publicRoute){
        return NextResponse.next();
    }

    if(!authToken && !publicRoute){
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = redirectPage;
        return NextResponse.redirect(redirectUrl)
    }

    if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/Home';
        return NextResponse.redirect(redirectUrl)
    }

    if(authToken && !publicRoute){
        //checar se o Token JWT é válido, se sim remover o cookie e redirecionar para o login.
        if(authToken.value === 'undefined'){
            request.cookies.delete('authToken');
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}


export const config: ProxyConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)', 
    ]
}