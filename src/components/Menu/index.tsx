import { Box, Circle, Fade, Icon, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { useOrder } from "~/entities/order";

export default function Home() {
    const { totalItems, buyOrder } = useOrder();

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
            zIndex={2}
        >
            <Stack alignItems={'flex-end'} justifyContent={'center'} aria-label="Shopping Cart">
                <Link onClick={e => { e.preventDefault(); buyOrder() }} href="/cart">
                    <Icon as={CiShoppingCart} fontSize="3em" color="gray.600" />
                    <Fade in={totalItems > 0}>
                        <Circle role="status" size='2em' fontSize={'small'} bg='tomato' color='white' position='absolute' top={4} right={4}>
                            {totalItems}
                        </Circle>
                    </Fade>
                </Link>
            </Stack>
        </Box >
    )
}