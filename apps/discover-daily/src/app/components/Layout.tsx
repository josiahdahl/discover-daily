import * as React from 'react';
import { FC } from 'react';
import { Flex } from '@chakra-ui/core';
import { BoxProps } from '@chakra-ui/core/dist/Box';

export const CenteredFullPage: FC<BoxProps> = ({ children, ...rest }) => (
  <Flex direction="column" justify="center" align="center" h="100vh" {...rest}>
    {children}
  </Flex>
);
