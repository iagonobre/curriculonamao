import { parseCookies } from "nookies";
import { GetServerSideProps,GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies['@cnm:token']) {
      return {
        redirect: {
          destination: '/app',
          permanent: false
        }
      }
    }

    return await fn(ctx)
  }
}