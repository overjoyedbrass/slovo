import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Header } from './Header'

export const Helper = () => {
    return (
        <Flex w="100%" align="center" direction="column">
            <Header />
        </Flex>
    )
}