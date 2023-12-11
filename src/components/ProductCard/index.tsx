import {
    AspectRatio,
    Box,
    Button,
    HStack,
    Image,
    Skeleton,
    Stack,
    StackProps,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { memo } from 'react';
import { PriceTag } from '../PriceTag';

interface Props {
    price: number;
    name: string;
    imageSrc: string;
    rootProps?: StackProps
    onAdd?: (props: OrderProduct) => void
    id: number,
    currentQuantity: number,
}

const areEqual = (prevProps: Props, nextProps: Props) => {
    // Compare the props you want to use for memoization
    return (
        prevProps.imageSrc === nextProps.imageSrc &&
        prevProps.price === nextProps.price &&
        prevProps.name === nextProps.name &&
        prevProps.id === nextProps.id &&
        prevProps.currentQuantity === nextProps.currentQuantity
    );
};

const ProductCard = (props: Props) => {
    const { price, name, imageSrc, rootProps, onAdd = () => { }, id, currentQuantity } = props
    const isProductInCart = currentQuantity > 0
    const handleChangeQuantity = (quantity: number) => {
        onAdd({ id, quantity })
    };

    return (
        <Stack spacing={{ base: '4', md: '5' }} {...rootProps}>
            <Box position="relative">
                <AspectRatio ratio={4 / 3}>
                    <Image
                        src={imageSrc}
                        alt={name}
                        draggable="false"
                        fallback={<Skeleton />}
                        borderRadius={{ base: 'md', md: 'xl' }}
                        loading='lazy'
                    />
                </AspectRatio>
            </Box>
            <Stack spacing="1">
                <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')} as={'h3'}>
                    {name}
                </Text>
                <PriceTag price={price} currency="USD" />
            </Stack>
            <Stack align="center">
                {isProductInCart && <HStack w={'100%'} justifyContent={'space-between'}><Button data-testid={`add-minus-${id}`} onClick={() => handleChangeQuantity(currentQuantity - 1)}>-</Button> <span>{currentQuantity}</span> <Button data-testid={`add-plus-${id}`} onClick={() => handleChangeQuantity(currentQuantity + 1)}>+</Button></HStack>}
                {!isProductInCart &&
                    <Button data-testid={`add-${id}`} colorScheme="blue" width="full" onClick={() => onAdd({ id, quantity: 1 })}>
                        Add to cart
                    </Button>
                }
            </Stack>
        </Stack>

    )
}

const MemoizedProductCard = memo(ProductCard, areEqual)

export {
    MemoizedProductCard as ProductCard
};
