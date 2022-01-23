import React from 'react';
import { Flex, Text } from 'rebass';

const Popup = () => {



  return (
    <Flex minWidth="300px" minHeight="300px">
      <Flex width="100%" pr="10px" pl="10px" m="10px" flexDirection="column">
        <Flex justifyContent="center">
          <Text>Chrome Extension</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Popup;
