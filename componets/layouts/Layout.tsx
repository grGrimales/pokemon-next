import Head from "next/head"

import { FC } from "react"
import { Navbar } from "../ui";


interface Props {
    children: JSX.Element,
    title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'PokemonApp'}</title>
                < meta name="author" content="Grediana Rojas" />
                < meta name="description" content="Información sobre el pokemon XXXXX" />
                < meta name="keywords" content="pokemon, pokedex" />


            </Head>

            <Navbar />
            <main style={{
                padding: '0 20px'
            }}>
                {children}
            </main>
        </>
    )
}
