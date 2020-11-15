import * as React from 'react';
import { Button, Image, Stack, Text } from '@chakra-ui/core';
import { apiClient } from '../services/api-client';
import { CenteredFullPage } from '../components/Layout';

export const Landing = () => {
  return (
    <CenteredFullPage bg="orange.100">
      <Stack spacing={16} textAlign="center">
        <Image src="/assets/DiscoverDaily.svg" />
        <Text color="orange.700" fontSize="lg">
          Escape the algorithm.
        </Text>
        <Button
          bg="green.600"
          color="white"
          py={6}
          textTransform="uppercase"
          letterSpacing={2}
          fontWeight="light"
          onClick={() => (window.location.href = apiClient.loginUrl)}
          boxShadow="lg"
          background="linear-gradient(25deg, #9e1f63 30%, #262262 80%)"
        >
          Login with Spotify
        </Button>
      </Stack>
    </CenteredFullPage>
  );
};
