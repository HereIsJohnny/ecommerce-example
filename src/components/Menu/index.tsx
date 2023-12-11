import { Box, Circle, Fade, Icon, Spinner, Stack, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useOrder } from "~/entities/order";

export default function Home() {
    const { totalItems, buyOrder } = useOrder();
    // TODO: move this state to the parent component. 
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('idle');
    const toast = useToast()

    async function handleBuyOrder() {
        const toastId = toast({
            title: "Processing order.",
            description: "We are processing your order.",
            status: 'loading',
            duration: 5000,
            isClosable: true,
        })

        // TODO: fix typing in buyOrder
        const res = await buyOrder() as unknown as { orderStatus: 'success' | 'error' };

        toast.close(toastId)

        toast({
            title: res.orderStatus === 'error' ? "An error occurred." : "Success.",
            description: res.orderStatus === 'error' ? "Unable to buy order." : "Order bought successfully.",
            status: res.orderStatus,
            duration: 5000,
            isClosable: true,
        })

    }

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
            <Stack alignItems={'flex-end'} justifyContent={'center'} >
                {/* TODO: refactor to button */}
                <Link onClick={e => { e.preventDefault(); handleBuyOrder() }} href="/cart" aria-label="Shopping Cart">
                    {
                        status === 'loading' && <Spinner />
                    }
                    {
                        status !== 'loading' && <Icon as={CiShoppingCart} fontSize="3em" color="gray.600" />
                    }
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