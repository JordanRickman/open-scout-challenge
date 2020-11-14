import React from 'react';
import { Heading } from '@chakra-ui/core';

/** Renders smaller heading. */
export const SubHeading = ({ children, ...props }) => (
  <Heading as='h2' size='sm' marginRight='10px' {...props}>
    {children}
  </Heading>
);