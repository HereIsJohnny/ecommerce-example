import { Box, Circle, Fade, Icon, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { useOrder } from "~/entities/order";

export default function Home() {
    const { totalItems } = useOrder();
    // const totalItems = orderDetails?.products.reduce((acc, ({ quantity })) => acc + product.quantity, 0) || 0;
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
                    <Fade in={totalItems > 0}>
                        <Circle size='2em' fontSize={'small'} bg='tomato' color='white' position='absolute' top={4} right={4}>
                            {totalItems}
                        </Circle>
                    </Fade>
                </Link>
            </VStack >
        </Box >
    )
}