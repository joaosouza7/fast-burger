import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// Função para páginas que só podem ser acessadas por usuários visitantes (NÃO LOGADOS)
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        // Se o usuário tentar acessar a página tendo um login salvo, será redirecionado.
        if(cookies["@nextauth.token"]) {
            return {
                redirect: {
                    destination: "/dashboard",
                    permanent: false,
                }
            }
        }

        return await fn(ctx);
    }
}