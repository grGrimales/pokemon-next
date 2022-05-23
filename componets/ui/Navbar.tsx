import { useTheme, Text, Spacer, Link } from "@nextui-org/react";
import NextLink from 'next/link';
import Image from "next/image"

export const Navbar = () => {


    const { theme } = useTheme()
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0 20px',
            backgroundColor: theme?.colors.gray900.value

        }}>
            <NextLink href="/" passHref>
                <Link>
                    <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Icono de app" width={70} height={70} />
                </Link>

            </NextLink>
            <NextLink href="/" passHref>
                <Link>
                    <Text color="white" h2>P</Text>
                    <Text color="white" h3>okémon</Text>
                </Link>

            </NextLink>
            <Spacer css={{ flex: 1 }} />

            <NextLink href="/favorites" passHref>
                <Link css={{ marginRight: '10px' }}>
                    <Text color="white">Favoritos</Text>
                </Link>

            </NextLink>






        </div>
    )
}



