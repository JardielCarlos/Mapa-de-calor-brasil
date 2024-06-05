import { Box, Heading, Text } from '@chakra-ui/react';

export function ErrorFallback() {
  return (
    <Box role="alert">
      <Heading>Desculpe, algo deu errado.</Heading>
      <Text>Estamos trabalhando para corrigir o problema. Por favor, tente novamente mais tarde.</Text>
    </Box>
  );
}
