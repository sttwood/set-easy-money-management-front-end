import {withAuth} from 'next-auth/middleware'

export default withAuth({
  //   callbacks: {
  //     authorized: async ({req, token}: {req: any, token: any}) => {
  //       if (req.nextUrl.pathname.startsWith('/admin') && token) {
  //         return token?.role === 'admin'
  //       }
  //       return !!token
  //     }
  //   }
})

export const config = {
  matcher: [
    // '/dashboard',
    // '/income-expense',
    // '/savings',
  ]
}