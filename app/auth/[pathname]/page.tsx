import { AuthView } from "@neondatabase/auth/react"

//! when we click on sign in or sign up it will render the same page to distinguish and show the correct form we will use the pathname to determine which form to show

export default async function AuthPage({
    params
}:{
    params: Promise<{pathname: string}>
}){

    const { pathname } = await params;
    return (


        <div className="flex min-h-dvh w-full items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
            <AuthView pathname={pathname}/>

            </div>
        </div>
    )
}