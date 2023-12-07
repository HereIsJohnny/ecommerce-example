import { Box, Circle, Fade, Icon, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

export default function Home() {
    return (
        <Box as="nav" py={{
            base: '4',
            md: '6',
        }}
            px={{
                base: '6',
                md: '8',
            }}
            position={'fixed'}
            left={'0'}
            right={'0'}
        >
            <VStack alignItems={'flex-end'} justifyContent={'center'}>
                <Link href="/cart">
                    <Icon as={CiShoppingCart} fontSize="4xl" color="gray.600" />
                    <Fade in={true}>
                        <Circle size='2em' fontSize={'small'} bg='tomato' color='white' position='absolute' top={4} right={4}>
                            2
                        </Circle>
                    </Fade>
                </Link>
            </VStack>
        </Box>
    )
}