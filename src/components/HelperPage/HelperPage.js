import { Button, Flex,  HStack,  SimpleGrid, Tag } from '@chakra-ui/react'
import React from 'react'
import { Header } from './Header'
import { Helper } from './Helper'

export const HelperPage = () => {
    

    return (
        <Flex w="100%" align="center" direction="column" h="100vh">
            <Header />
            <Helper />
        </Flex>
    )
}