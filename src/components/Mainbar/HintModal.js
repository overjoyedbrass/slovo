import { Box, Center, Flex, HStack, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tag, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Tablecell } from '../Playtable/Tablecell'
import { Image, Modal, Heading, Text } from '@chakra-ui/react'
import infoLight from '../../img/infoLight.png'
import infoDark from '../../img/infoDark.png'
import { appColors as allAppColors } from '../../theme/theme'

export const HintModal = () => {
    const { colorMode } = useColorMode()
    const appColors = allAppColors[colorMode]

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Box
            as={Image}
            alt="infoicon"
            onClick={onOpen}
            className="icon"
            src={useColorModeValue(infoLight, infoDark)}
        />
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            isCentered
            scrollBehavior='inside'
            size="lg"
        >
            <ModalOverlay />
            <ModalContent backgroundColor="teal">
                <ModalHeader color="white">
                    Ako hrať?
                </ModalHeader>
                <ModalCloseButton />
                    <ModalBody color="white">
                        <Text textAlign="justify">
                            Uhádni SLOVO v 6 pokusoch. 
                            Každé hádane slovo musí byť validné slovo dĺžky 5. Stlač enter pre kontrolu. 
                            Po každom hádani sa zmení farba políčka podľa toho ako blízko bol váš pokus.
                        </Text>
                        <Center margin={2} as={Tag} size="lg">Príklad: Nech hádane slovo je "Motor"</Center>

                        <Heading size="lg">1. Pokus</Heading>
                        <HStack>
                            {
                                "HUDBA".split("").map((l, i) => 
                                    <Tablecell letter={l} key={i} color={appColors.wrongCell}/>
                                )
                            }
                        </HStack>
                        <Text textAlign="justify">
                            Žiadne z písmen sa v hádanom slove nenachádza
                        </Text>

                        <Heading size="lg">2. Pokus</Heading>
                        <Flex>
                            <Tablecell sx={{flexGrow: 1}} letter={"O"} color={appColors.containedCell} multiple={true}/>
                            <Tablecell letter={"K"} color={appColors.wrongCell}/>
                            <Tablecell letter={"R"} color={appColors.containedCell}/>
                            <Tablecell letter={"E"} color={appColors.wrongCell}/>
                            <Tablecell letter={"M"} color={appColors.containedCell}/>
                        </Flex>
                        <Text textAlign="justify">
                            Písmeno O sa nachádza v hádanom slove viackrát, ale je na nesprávnej pozícií. Písmena R a M sú v hádanom slove, ale v našom pokuse sú na nesprávnej pozícií.                        
                        </Text>

                        <Heading size="lg">3. Pokus</Heading>
                        <HStack>
                            <Tablecell letter={"M"} color={appColors.rightCell}/>
                            <Tablecell letter={"E"} color={appColors.wrongCell}/>
                            <Tablecell letter={"T"} color={appColors.rightCell}/>
                            <Tablecell letter={"R"} color={appColors.containedCell}/>
                            <Tablecell letter={"O"} color={appColors.containedCell} multiple={true}/>
                        </HStack>
                        <Text textAlign="justify">
                            Písmena M a T sú na správnej pozícií. Písmeno O sa v hádanom slove nachádza, ale nie je na správnej pozícií. Znak + nad písmenom znamená, že písmeno je v hádanom slove viackrát    
                        </Text>
                        

                        <Heading size="lg">4. Pokus</Heading>
                        <HStack>
                            {"MOTOR".split("").map((l, i) =>
                                (<Tablecell letter={l} key={i} color={appColors.rightCell} />)
                            )}
                        </HStack>
                        <Text textAlign="justify">
                            Uhádli sme hádane slovo.
                        </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}