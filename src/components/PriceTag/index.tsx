import { HStack, StackProps, Text, TextProps, useColorModeValue as mode } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { formatPrice } from '~/lib/formatPrice'

interface PriceTagProps {
    currency: string
    price: number
    rootProps?: StackProps
    priceProps?: TextProps
}

export type FormatPriceOptions = { locale?: string; currency?: string }

export const PriceTag = (props: PriceTagProps) => {
    const { price, currency, rootProps, priceProps } = props
    return (
        <HStack spacing="1" {...rootProps}>
            <Price textProps={priceProps}>
                {formatPrice(price, { currency })}
            </Price>
        </HStack>
    )
}

interface PriceProps {
    children?: ReactNode
    isOnSale?: boolean
    textProps?: TextProps
}

const Price = (props: PriceProps) => {
    const { children, textProps } = props
    return (
        <Text
            as="span"
            fontWeight="medium"
            color={mode('gray.700', 'gray.400')}
            {...textProps}
        >
            {children}
        </Text>
    )
}