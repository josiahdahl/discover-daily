import * as React from 'react';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/core';
import { FC } from 'react';
import { apiClient } from '../services/api-client';

const Layout: FC = (props) => (
  <Flex direction="column" justify="center" align="center" h="100vh">
    {props.children}
  </Flex>
);

export const Landing = () => {
  return (
    <Layout>
      <Stack spacing={16} textAlign="center">
        <Stack>
          <Heading as="h1" size="2xl">
            Discover Daily
          </Heading>
          <Text color="gray.500" fontSize="lg">
            Escape the algorithm and find new music, daily
          </Text>
        </Stack>
        <Button onClick={() => (window.location.href = apiClient.loginUrl)}>
          Login with Spotify
        </Button>
      </Stack>
    </Layout>
  );
};
