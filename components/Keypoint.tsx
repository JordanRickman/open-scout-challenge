import React from 'react';
import { Text } from '@chakra-ui/core';

/** Component to provide consistent styling for inline text that we want
 *   the user to notice at a glance.
 *  Why build this instead of just using <strong>?
 *   - central point to change color scheme or other styling
 *   - use inline-block, allowing us to use margins for further emphasis
 *   - wrap chakra-ui's <Text>, providing all its props for customization.
 */
export const Keypoint = ({
  children,
  color = 'green',
  marginLeft = '2px',
  marginRight = '2px',
  fontWeight = 'bolder',
  ...props
}) => {
    return (
      <Text
        as='strong'
        d='inline-block'
        style = {{
          // chakra-ui 'color' prop wasn't working, IDK why.
          color: color
        }}
        marginLeft={marginLeft}
        marginRight={marginRight}
        fontWeight={fontWeight}
        {...props}
      >
        {children}
      </Text>
    )
};