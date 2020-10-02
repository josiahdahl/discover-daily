import * as React from 'react';
import { useEffect, useState } from 'react';
import { SimpleAlbum } from '@discover-daily/integrations/spotify';
import { apiClient } from '../services/api-client';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/core';

const Releases = (props: { releases: SimpleAlbum[] }) => (
  <Grid
    as="section"
    templateColumns={{
      base: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(4, 1fr)',
      lg: 'repeat(6, 1fr)',
      xl: 'repeat(8, 1fr)',
    }}
    gap={{ base: 1, md: 3 }}
  >
    {props.releases.map((release) => (
      <Flex
        as="article"
        borderWidth={1}
        borderRadius={3}
        direction="column"
        key={release.id}
      >
        <Image src={release.images[0].url} alt={`${release.name} album art`} />
        <Flex
          p={2}
          direction="column"
          justify="between"
          flexGrow={1}
          bg="gray.100"
        >
          <Box flexGrow={1} mb={3}>
            <Heading fontSize={{ md: 'sm', xl: 'md' }}>{release.name}</Heading>
            <Text fontSize="sm">{release.artists[0].name}</Text>
          </Box>
        </Flex>
        <Link
          href={release.external_urls.spotify}
          target="_blank"
          rel="noreferrer"
          bg="purple.500"
          p={2}
          display="block"
          textAlign="center"
          color="white"
          textTransform="uppercase"
          _hover={{ textDecoration: 'none' }}
        >
          Listen
        </Link>
      </Flex>
    ))}
  </Grid>
);

export const Dashboard = () => {
  const [loadingState, setLoadingState] = useState<string>('loading');
  const [newReleases, setNewReleases] = useState<SimpleAlbum[]>([]);
  async function fetchNewReleases() {
    try {
      setNewReleases(await apiClient.newReleases());
      setLoadingState('loaded');
    } catch (e) {
      setLoadingState('error');
    }
  }

  useEffect(() => {
    fetchNewReleases();
  }, []);

  return (
    <Box as="main" p={2} bg="orange.100" minH="100vh">
      <Flex mb={4} justify="space-between" alignItems="center">
        <Heading
          as="h1"
          display="flex"
          flexGrow={1}
          alignItems="center"
          color="purple.600"
          textTransform="uppercase"
          letterSpacing="tight"
          fontWeight="bold"
        >
          Discover Daily
        </Heading>
        <Link href="/logout" px={3}>
          Logout
        </Link>
      </Flex>
      {loadingState === 'loading' ? (
        <Text>Fetching new releases...</Text>
      ) : loadingState === 'error' ? (
        <Text>Failed to load albums.</Text>
      ) : (
        <Releases releases={newReleases} />
      )}
    </Box>
  );
};
