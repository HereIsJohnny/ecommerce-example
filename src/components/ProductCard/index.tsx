import {
    AspectRatio,
    Box,
    Button,
    Card,
    HStack,
    Image,
    Link,
    Skeleton,
    Stack,
    StackProps,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { PriceTag } from '../PriceTag'

interface Props {
    product: Product
    rootProps?: StackProps
}

export const ProductCard = (props: Props) => {
    const { product, rootProps } = props
    const { name, imageSrc, price } = product
    return (
        <Card p={{ base: '4', md: '4' }}>
            <Stack spacing={{ base: '4', md: '5' }} {...rootProps}>
                <Box position="relative">
                    <AspectRatio ratio={4 / 3}>
                        <Image
                            src={imageSrc}
                            alt={name}
                            draggable="false"
                            fallback={<Skeleton />}
                            borderRadius={{ base: 'md', md: 'xl' }}
                        />
                    </AspectRatio>
                </Box>
                <Stack spacing="1">
                    <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
                        {name}
                    </Text>
                    <PriceTag price={price} currency="USD" />
                </Stack>
                <Stack align="center">
                    <Button colorScheme="blue" width="full">
                        Add to cart
                    </Button>
                </Stack>
            </Stack>
        </Card>

    )
}